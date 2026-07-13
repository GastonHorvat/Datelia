// src/app/api/image/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

// Extrae el nombre de archivo desde las cabeceras del request (Make.com las suele enviar)
function getFilenameFromHeaders(request: Request, fallback: string): string {
  const disposition = request.headers.get('content-disposition') ?? '';
  const match = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^;"'\r\n]+)/i);
  if (match?.[1]) return decodeURIComponent(match[1].trim().replace(/["']/g, ''));

  const xFilename = request.headers.get('x-filename') ?? request.headers.get('x-file-name');
  if (xFilename) return xFilename;

  return fallback;
}

export async function POST(request: Request) {
  console.log('[/api/image] POST request received');
  try {
    // 1. Validar la API Key de escritura
    const apiKey = request.headers.get('x-api-key');
    const expectedKey = process.env.API_WRITE_KEY;

    if (!expectedKey || apiKey !== expectedKey) {
      console.warn('[/api/image] Step 1 FAIL: invalid API key');
      return NextResponse.json({ error: 'Unauthorized: Invalid or missing API key' }, { status: 401 });
    }
    console.log('[/api/image] Step 1 OK: API key valid');

    // 2. Validar configuración de Supabase Admin
    const adminConfigured = isSupabaseAdminConfigured();
    console.log('[/api/image] Step 2: isSupabaseAdminConfigured =', adminConfigured);
    if (!adminConfigured) {
      console.error('[/api/image] Step 2 FAIL: SUPABASE_SERVICE_ROLE_KEY not properly configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    console.log('[/api/image] Step 2 OK: Supabase admin configured');

    // 3. Extraer buffer e info del archivo — soporta 3 modos:
    //    a) multipart/form-data  (campo "image" o "file")
    //    b) raw binary           (Content-Type: image/*)  ← lo que Make.com envía por defecto
    //    c) application/json     (campo "image_base64" en base64)
    const contentType = request.headers.get('content-type') ?? '';
    console.log('[/api/image] Step 3: Content-Type =', contentType);

    let fileBuffer: Uint8Array;
    let fileName: string;
    let mimeType: string;

    if (contentType.includes('multipart/form-data')) {
      // ── Modo A: multipart/form-data ──────────────────────────────
      let formData: FormData;
      try {
        formData = await request.formData();
      } catch (err: any) {
        console.error('[/api/image] Step 3 FAIL: multipart parse error:', err?.message);
        return NextResponse.json(
          { error: `Failed to parse multipart form data: ${err?.message}` },
          { status: 400 }
        );
      }

      const file = (formData.get('image') ?? formData.get('file')) as File | null;
      if (!file) {
        const keys = [...formData.keys()];
        console.error('[/api/image] Step 3 FAIL: no image/file field. Keys:', keys);
        return NextResponse.json(
          { error: `No image provided. Form fields received: [${keys.join(', ')}]` },
          { status: 400 }
        );
      }

      const ab = await file.arrayBuffer();
      fileBuffer = new Uint8Array(ab);
      fileName   = file.name || 'upload.png';
      mimeType   = file.type || 'image/png';
      console.log(`[/api/image] Step 3 OK (multipart): file="${fileName}" type="${mimeType}" size=${fileBuffer.byteLength}`);

    } else if (contentType.startsWith('image/')) {
      // ── Modo B: raw binary con Content-Type image/* ───────────────
      // Make.com HTTP module envía así cuando el cuerpo es un binario directo
      const ab = await request.arrayBuffer();
      fileBuffer = new Uint8Array(ab);
      mimeType   = contentType.split(';')[0].trim();
      const ext  = mimeType.split('/')[1] ?? 'png';
      fileName   = getFilenameFromHeaders(request, `upload.${ext}`);
      console.log(`[/api/image] Step 3 OK (raw binary): file="${fileName}" type="${mimeType}" size=${fileBuffer.byteLength}`);

    } else if (contentType.includes('application/json')) {
      // ── Modo C: JSON con base64 ───────────────────────────────────
      const body = await request.json();
      const base64 = body?.image_base64 ?? body?.image ?? body?.file;
      if (!base64 || typeof base64 !== 'string') {
        console.error('[/api/image] Step 3 FAIL: JSON body missing image_base64 field');
        return NextResponse.json(
          { error: 'JSON body must contain an "image_base64" field with a base64-encoded image' },
          { status: 400 }
        );
      }
      // Soporta "data:image/png;base64,..." y base64 puro
      const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
      const mimeMatch  = base64.match(/^data:(image\/[^;]+);base64,/);
      mimeType   = mimeMatch?.[1] ?? body?.mime_type ?? 'image/png';
      const ext  = mimeType.split('/')[1] ?? 'png';
      fileName   = body?.filename ?? `upload.${ext}`;
      fileBuffer = new Uint8Array(Buffer.from(base64Data, 'base64'));
      console.log(`[/api/image] Step 3 OK (base64): file="${fileName}" type="${mimeType}" size=${fileBuffer.byteLength}`);

    } else {
      // Modo desconocido — intentar raw binary como fallback
      console.warn('[/api/image] Step 3: unknown Content-Type, attempting raw binary fallback');
      const ab = await request.arrayBuffer();
      fileBuffer = new Uint8Array(ab);
      mimeType   = 'image/png';
      fileName   = getFilenameFromHeaders(request, 'upload.png');
      console.log(`[/api/image] Step 3 OK (fallback raw): file="${fileName}" size=${fileBuffer.byteLength}`);
    }

    if (fileBuffer.byteLength === 0) {
      console.error('[/api/image] Step 3 FAIL: empty file body');
      return NextResponse.json({ error: 'File body is empty' }, { status: 400 });
    }

    if (!mimeType.startsWith('image/')) {
      console.warn('[/api/image] Step 3 FAIL: invalid mime type:', mimeType);
      return NextResponse.json({ error: `Invalid file type "${mimeType}". Only images are allowed` }, { status: 400 });
    }

    // 4. Subir al bucket 'blog-assets' en Supabase Storage
    const timestamp     = Date.now();
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const uniqueFileName = `${timestamp}-${cleanFileName}`;
    console.log(`[/api/image] Step 4: uploading as "${uniqueFileName}"`);

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('blog-assets')
      .upload(uniqueFileName, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      console.error('[/api/image] Step 4 FAIL:', JSON.stringify(uploadError));
      return NextResponse.json(
        {
          error: `Storage upload failed: ${uploadError.message}`,
          details: {
            statusCode: (uploadError as any).statusCode,
            error: (uploadError as any).error,
          },
        },
        { status: 500 }
      );
    }
    console.log('[/api/image] Step 4 OK: path =', uploadData.path);

    // 5. Obtener y retornar la URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('blog-assets')
      .getPublicUrl(uniqueFileName);

    console.log('[/api/image] Step 5 OK: url =', publicUrlData.publicUrl);
    return NextResponse.json(
      {
        message: 'Image uploaded successfully',
        image_url: publicUrlData.publicUrl,
        file_path: uploadData.path,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('[/api/image] UNEXPECTED catch error:', error?.message, error?.stack);
    return NextResponse.json(
      { error: 'Internal server error', detail: error?.message },
      { status: 500 }
    );
  }
}
