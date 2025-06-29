// src/app/blog/categoria/[slug]/page.tsx

// =======================================================================================
// SECCIÓN 1: IMPORTACIONES Y TIPOS
// =======================================================================================
import { Layout } from '@/components/layout';
import { supabase } from '@/lib/supabaseClient';
import { Post } from '@/types/blog';
import { notFound } from 'next/navigation';
import { BlogPostCard } from '@/components/blog/BlogPostCard'; // Reutilizamos la tarjeta de post

// =======================================================================================
// SECCIÓN 2: OBTENCIÓN DE DATOS POR CATEGORÍA
// =======================================================================================
// Esta función obtiene los posts y el nombre de la categoría basado en el slug.
async function getPostsByCategory(categorySlug: string) {
  try {
    // Usamos la vista `posts_view` que ya tiene la información de la categoría unida.
    const { data: posts, error } = await supabase
      .from('posts_view')
      .select('*')
      .eq('category_slug', categorySlug) // ¡El filtro clave!
      .order('published_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching posts for category "${categorySlug}": ${error.message}`);
    }

    // Si no se encuentran posts, podría ser que la categoría no existe o está vacía.
    if (!posts || posts.length === 0) {
      // Para ser más precisos, podemos verificar si la categoría existe en la tabla de categorías.
      const { data: categoryExists } = await supabase
        .from('categories')
        .select('name')
        .eq('slug', categorySlug)
        .single();
      
      if (!categoryExists) {
        notFound(); // Si la categoría no existe, muestra la página 404.
      }
    }

    // Obtenemos el nombre de la categoría del primer post encontrado.
    const categoryName = posts?.[0]?.category_name || categorySlug.replace(/-/g, ' ');

    return { posts: posts as Post[], categoryName, error: null };

  } catch (error) {
    console.error("Error en getPostsByCategory:", error);
    const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido.";
    return { posts: [], categoryName: 'Error', error: errorMessage };
  }
}

// =======================================================================================
// SECCIÓN 3: METADATOS DINÁMICOS PARA LA PÁGINA DE CATEGORÍA
// =======================================================================================
type CategoryPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: CategoryPageProps) {
  // Obtenemos el nombre de la categoría para el título de la página.
  const { categoryName } = await getPostsByCategory(params.slug);
  return {
    title: `Categoría: ${categoryName} | Datelia Insights`,
    description: `Explora todos los artículos de Datelia en la categoría de ${categoryName}.`,
  };
}

// =======================================================================================
// SECCIÓN 4: EL COMPONENTE DE LA PÁGINA
// =======================================================================================
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { posts, categoryName, error } = await getPostsByCategory(params.slug);

  return (
    <Layout>
      {/* --- Encabezado de la Página de Categoría --- */}
      <section className="bg-accent text-accent-foreground pt-28 pb-12 text-center">
        <div className="container mx-auto px-4">
          <p className="text-primary font-semibold mb-2">Categoría</p>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            {categoryName}
          </h1>
        </div>
      </section>

      {/* --- Contenido Principal --- */}
      <div className="container mx-auto px-4 py-16 sm:py-20">
        {error ? (
          <div className="text-center py-20 text-destructive">
            <h2 className="text-2xl font-bold">Error al Cargar Contenido</h2>
            <p>{error}</p>
          </div>
        ) : posts.length > 0 ? (
          // Si hay posts, mostramos la grilla
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard post={post} key={post.post_id} />
            ))}
          </div>
        ) : (
          // Si no hay posts en esta categoría, mostramos un mensaje amigable
          <div className="text-center py-20 text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground">No hay artículos aquí todavía</h2>
            <p>Aún no hemos publicado contenido en la categoría "{categoryName}". ¡Vuelve pronto!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}