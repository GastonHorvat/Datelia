// src/app/blog/page.tsx

// =======================================================================================
// SECCIÓN 1: IMPORTACIONES
// =======================================================================================
import { Layout } from '@/components/layout';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Post } from '@/types/blog'; // ¡Importamos nuestro tipo unificado y centralizado!

// ¡Importamos los componentes que acabamos de arreglar!
import { FeaturedPostCard } from '@/components/blog/FeaturedPostCard';
import { BlogPostCard } from '@/components/blog/BlogPostCard';

// Buena práctica: Revalidar los datos del blog cada hora para no sobrecargar la DB.
export const revalidate = 3600; 

// =======================================================================================
// SECCIÓN 2: OBTENCIÓN DE DATOS (DATA FETCHING)
// =======================================================================================
async function getPosts() {
  try {
    // Usamos la misma lógica robusta de tu código que ya funcionaba
    const { data: allPosts, error } = await supabase
      .from('posts_view') // Usamos la vista
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
    
    // Ahora hacemos el type casting a un array de nuestro tipo Post unificado
    const posts = allPosts as Post[];

    // Lógica para separar el destacado de los regulares
    const featuredPost = posts.find(p => p.is_featured) || null;
    const regularPosts = posts.filter(p => !p.is_featured);

    return { featuredPost, regularPosts, error: null };

  } catch (error) {
    console.error("Error connecting to Supabase or processing posts:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { featuredPost: null, regularPosts: [], error: errorMessage };
  }
}

// =======================================================================================
// SECCIÓN 3: EL COMPONENTE DE LA PÁGINA
// =======================================================================================
export default async function BlogIndexPage() {
  const { featuredPost, regularPosts, error } = await getPosts();

  return (
    <Layout>
      {/* --- Encabezado --- */}
      <section className="bg-accent text-accent-foreground py-32 sm:py-32 text-center"> 
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Datelia Insights</h1>
          <p className="text-xl text-accent-foreground/80 max-w-2xl mx-auto">
            Tu fuente de conocimiento sobre IA, consejos de automatización y estrategias de negocio.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 sm:py-20">
        {/* --- Manejo de Errores --- */}
        {error ? (
          <div className="text-center py-20 text-destructive">
            <h2 className="text-2xl font-bold">Error al Cargar Contenido</h2>
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* --- Renderizado de Post Destacado (si existe) --- */}
            {featuredPost && <FeaturedPostCard post={featuredPost} />}
            
            {/* --- Renderizado de Posts Regulares (si existen) --- */}
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <BlogPostCard post={post} key={post.post_id} />
                ))}
              </div>
            ) : !featuredPost ? ( // Solo muestra "Próximamente" si NO hay destacado tampoco
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