// src/app/api/image/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 1. Validar la API Key de escritura
    const apiKey = request.headers.get('x-api-key');
    const expectedKey = process.env.API_WRITE_KEY;

    if (!expectedKey || apiKey !== expectedKey) {
      return NextResponse.json({ error: 'Unauthorized: Invalid or missing API key' }, { status: 401 });
    }

    // 2. Validar configuración de Supabase Admin
    if (!isSupabaseAdminConfigured()) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not properly configured in the environment');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 3. Procesar el FormData y el archivo de imagen
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided. Make sure to send a "image" field in form-data' }, { status: 400 });
    }

    // Validar tipo de contenido básico (debe ser imagen)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed' }, { status: 400 });
    }

    // 4. Preparar el archivo para subirlo a Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);
    
    // Crear un nombre de archivo único para evitar colisiones
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const uniqueFileName = `${timestamp}-${cleanFileName}`;

    // Subir al bucket 'blog-assets'
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('blog-assets')
      .upload(uniqueFileName, fileBuffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase Storage upload error:', uploadError);
      return NextResponse.json({ error: `Storage upload failed: ${uploadError.message}` }, { status: 500 });
    }

    // 5. Obtener y retornar la URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('blog-assets')
      .getPublicUrl(uniqueFileName);

    return NextResponse.json({
      message: 'Image uploaded successfully',
      image_url: publicUrlData.publicUrl,
      file_path: uploadData.path
    }, { status: 200 });

  } catch (error: any) {
    console.error('Unexpected error in POST /api/image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
