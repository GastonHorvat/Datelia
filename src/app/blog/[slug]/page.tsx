// src/app/blog/[slug]/page.tsx

// =======================================================================================
// SECCIÓN 1: IMPORTACIONES
// =======================================================================================
import { Layout } from '@/components/layout';
import { supabase } from '@/lib/supabaseClient';
import { Post } from '@/types/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { parseAndCleanHtml } from '@/lib/utils';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

// =======================================================================================
// SECCIÓN 2: OBTENCIÓN DE DATOS DEL POST (SIN CAMBIOS)
// =======================================================================================
async function getPostBySlug(slug: string): Promise<Post> {
  const { data, error } = await supabase
    .from('posts_view')
    .select('*')
    .eq('post_slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    notFound();
  }
  return data as Post;
}

// =======================================================================================
// SECCIÓN 3: GENERACIÓN DE METADATOS DINÁMICOS (SIN CAMBIOS)
// =======================================================================================
type MetadataProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post No Encontrado' };
  return {
    title: `${post.post_title} | Datelia Insights`,
    description: post.post_description,
    openGraph: {
      title: post.post_title,
      description: post.post_description,
      images: [{ url: post.post_image_url, width: 1200, height: 630, alt: post.post_title }],
    },
  };
}

// =======================================================================================
// SECCIÓN 4: EL COMPONENTE DE LA PÁGINA
// =======================================================================================
export default async function BlogPostPage({ params }: MetadataProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const displayTags = post.tag_names || [];
  const displayTagSlugs = post.tag_slugs || [];

  return (
    <Layout>
      <main className="bg-background">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <article className="max-w-3xl mx-auto">

            {/* Breadcrumbs */}
            <div className="flex justify-center mb-8">
              <Breadcrumbs lastItemName={post.post_title} />
            </div>

            {/* --- Cabecera del Artículo --- */}
            <header className="text-center mb-12">
              {post.category_name && (
                <Link href={`/blog/categoria/${post.category_slug}`}>
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs uppercase mb-4">
                    {post.category_name}
                  </Badge>
                </Link>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-foreground">
                {post.post_title}
              </h1>
              <div className="text-sm text-muted-foreground mt-6 flex justify-center items-center gap-4 flex-wrap">
                <span>Por <strong>{post.author_name}</strong></span>
                <span className="opacity-50">•</span>
                <span>{new Date(post.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {post.estimated_read_time > 0 && (
                  <>
                    <span className="opacity-50">•</span>
                    <span>{post.estimated_read_time} min de lectura</span>
                  </>
                )}
              </div>
            </header>

            {/* --- Imagen Principal --- */}
            {post.post_image_url && (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-12 shadow-lg">
                <Image
                  src={post.post_image_url}
                  alt={post.post_title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}

            {/* --- Contenido del Post --- */}
            <div className="
              prose max-w-none text-lg leading-relaxed
              text-muted-foreground
              prose-headings:text-foreground
              prose-strong:text-foreground
              prose-a:text-primary
              prose-a:hover:underline
              dark:prose-invert
            ">
              {parseAndCleanHtml(post.post_content)}
            </div>

            {/* --- Footer del Artículo --- */}
            <footer className="mt-12 pt-8 border-t border-border space-y-8">
              {/* Sección de Tags */}
              {displayTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <strong className="text-foreground mr-2">Tags:</strong>
                  {displayTags.map((tagName, index) => (
                    <Badge variant="outline" className="border-primary/50 text-primary" key={index}>
                      #{tagName}
                    </Badge>
                  ))}
                </div>
              )}

              <ShareButtons title={post.post_title} />
            </footer>

          </article>
        </div>
      </main>
    </Layout>
  );
}