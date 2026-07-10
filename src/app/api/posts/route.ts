// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';
import { z } from 'zod';

// Esquema de validación del Post
const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-_]+$/, 'Slug must only contain lowercase letters, numbers, hyphens, and underscores'),
  content: z.string().min(1, 'Content is required'),
  description: z.string().min(1, 'Description is required'),
  category_id: z.string().uuid('Invalid category_id UUID format'),
  image_url: z.string().optional().nullable(),
  author_name: z.string().optional(),
  status: z.string().optional(),
  is_featured: z.boolean().optional(),
  seotitle: z.string().optional().nullable(),
  seodescription: z.string().optional().nullable(),
  estimated_read_time: z.number().int().positive().optional().nullable(),
  tag_ids: z.array(z.string().uuid('Invalid tag_id UUID format')).optional(),
});

// Función para estimar el tiempo de lectura (promedio de 200 palabras por minuto)
function estimateReadTime(htmlContent: string): number {
  // Eliminar etiquetas HTML para calcular sobre texto plano
  const plainText = htmlContent.replace(/<[^>]*>/g, ' ');
  const words = plainText.trim().split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(words / 200));
}

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

    // 3. Obtener y validar el cuerpo de la petición
    const body = await request.json();
    const result = postSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Calcular tiempo de lectura si no viene proveído
    const finalReadTime = data.estimated_read_time ?? estimateReadTime(data.content);

    // 4. Insertar el Post en la base de datos
    const { data: newPost, error: postError } = await supabaseAdmin
      .from('posts')
      .insert({
        title: data.title,
        slug: data.slug,
        content: data.content,
        description: data.description,
        category_id: data.category_id,
        image_url: data.image_url || null,
        author_name: data.author_name || 'IA Insights Team',
        status: data.status || 'Published',
        is_featured: data.is_featured ?? false,
        seotitle: data.seotitle || data.title,
        seodescription: data.seodescription || data.description,
        estimated_read_time: finalReadTime,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (postError) {
      console.error('Supabase error inserting post:', postError);
      return NextResponse.json(
        { error: `Database error: ${postError.message}` },
        { status: 500 }
      );
    }

    // 5. Insertar etiquetas en la tabla asociativa `post_tags` si existen
    if (data.tag_ids && data.tag_ids.length > 0) {
      const postTagsToInsert = data.tag_ids.map((tagId) => ({
        post_id: newPost.id,
        tag_id: tagId,
      }));

      const { error: tagsError } = await supabaseAdmin
        .from('post_tags')
        .insert(postTagsToInsert);

      if (tagsError) {
        console.error('Supabase error inserting post_tags:', tagsError);
        
        // Simular un Rollback manual eliminando el post creado
        await supabaseAdmin.from('posts').delete().eq('id', newPost.id);

        return NextResponse.json(
          { error: `Database error associating tags: ${tagsError.message}. Post creation reverted.` },
          { status: 500 }
        );
      }
    }

    // 6. Retornar éxito con el post creado
    return NextResponse.json(
      {
        message: 'Post published successfully',
        post: {
          ...newPost,
          tag_ids: data.tag_ids || [],
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Unexpected error in POST /api/posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
