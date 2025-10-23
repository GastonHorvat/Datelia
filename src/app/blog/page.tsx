// src/app/blog/page.tsx

import { Layout } from '@/components/layout';
import { supabase } from '@/lib/supabaseClient';
import { Post } from '@/types/blog'; 
import { FeaturedPostCard } from '@/components/blog/FeaturedPostCard';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { Pagination } from '@/components/ui/Pagination'; // Importamos el nuevo componente

export const revalidate = 3600; // Revalidar cada hora

const POSTS_PER_PAGE = 6; // ¡Nuestra nueva constante!

// --- SECCIÓN 2: OBTENCIÓN DE DATOS CON LÓGICA DE PAGINACIÓN ---
async function getPosts({ currentPage = 1 }: { currentPage: number }) {
  try {
    let featuredPost: Post | null = null;
    let regularPostsQuery = supabase.from('posts_view').select('*', { count: 'exact' });

    // El post destacado solo se busca y se muestra en la primera página
    if (currentPage === 1) {
      const { data: featuredData, error: featuredError } = await supabase
        .from('posts_view')
        .select('*')
        .eq('is_featured', true)
        .limit(1)
        .maybeSingle<Post>();

      if (featuredError) console.error("Error fetching featured post:", featuredError.message);
      featuredPost = featuredData;
      
      // Si encontramos un destacado, lo excluimos de la consulta de posts regulares
      if (featuredPost) {
        regularPostsQuery = regularPostsQuery.neq('post_id', featuredPost.post_id);
      }
    }
    
    // Filtramos para obtener solo los no destacados
    regularPostsQuery = regularPostsQuery.or('is_featured.is.null,is_featured.eq.false');

    // Calculamos el rango de posts a obtener para la página actual
    const offset = (currentPage - 1) * POSTS_PER_PAGE;
    
    const { data: regularPosts, error: regularError, count } = await regularPostsQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + POSTS_PER_PAGE - 1);

    if (regularError) throw new Error(regularError.message);

    const totalPages = Math.ceil((count || 0) / POSTS_PER_PAGE);

    return { featuredPost, regularPosts: regularPosts as Post[], totalPages, error: null };

  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Error en getPosts:", message);
    return { featuredPost: null, regularPosts: [], totalPages: 0, error: message };
  }
}

// --- SECCIÓN 3: EL COMPONENTE DE LA PÁGINA ---
// Ahora recibe `searchParams` para saber en qué página estamos
export default async function BlogIndexPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = (await searchParams)?.page;
  const currentPage = Number(page) || 1;
  
  const { featuredPost, regularPosts, totalPages, error } = await getPosts({ currentPage });

  return (
    <Layout>
      <section className="bg-accent text-accent-foreground pt-28 pb-12 text-center">
        {/* ... (código del encabezado sin cambios) ... */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Datelia Insights</h1>
          <p className="text-xl text-accent-foreground/80 max-w-2xl mx-auto">Tu fuente de conocimiento sobre IA, consejos de automatización y estrategias de negocio.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 sm:py-20">
        {error ? (
          <div className="text-center py-20 text-destructive">
            <h2 className="text-2xl font-bold">Error al Cargar Contenido</h2><p>{error}</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* El post destacado solo se muestra en la primera página */}
            {currentPage === 1 && featuredPost && <FeaturedPostCard post={featuredPost} />}
            
            {regularPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <BlogPostCard post={post} key={post.post_id} />
                  ))}
                </div>
                {/* La paginación solo se muestra si hay más de una página */}
                {totalPages > 1 && <Pagination totalPages={totalPages} />}
              </>
            ) : currentPage === 1 && !featuredPost ? (
              <div className="text-center py-20 text-muted-foreground">
                <h2 className="text-2xl font-bold text-foreground">Próximamente...</h2>
                <p>Estamos preparando contenido increíble. ¡Vuelve pronto!</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Layout>
  );
}