import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabaseClient'

const baseUrl = 'https://www.datelia.com.ar'

// El sitio tiene es/en/pt con localePrefix 'as-needed' (es sin prefijo, en/pt con
// prefijo). Para cada ruta estática armamos las 3 URLs y las "languages" de hreflang.
function staticRouteEntry(
  pathWithoutLocale: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${pathWithoutLocale}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        es: `${baseUrl}${pathWithoutLocale}`,
        en: `${baseUrl}/en${pathWithoutLocale}`,
        pt: `${baseUrl}/pt${pathWithoutLocale}`,
      },
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Rutas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    staticRouteEntry('', 'weekly', 1),
    staticRouteEntry('/soluciones', 'monthly', 0.9),
    staticRouteEntry('/soluciones/rendicion-de-gastos', 'monthly', 0.8),
    staticRouteEntry('/soluciones/pedidos-y-presupuestos', 'monthly', 0.8),
    staticRouteEntry('/soluciones/facturas-y-proveedores', 'monthly', 0.8),
    staticRouteEntry('/soluciones/tableros-de-gestion', 'monthly', 0.8),
    staticRouteEntry('/soluciones/tracker', 'monthly', 0.8),
    staticRouteEntry('/casos', 'monthly', 0.9),
    staticRouteEntry('/casos/cedsa', 'monthly', 0.7),
    staticRouteEntry('/casos/la-francisca', 'monthly', 0.7),
    staticRouteEntry('/casos/la-tablada', 'monthly', 0.7),
    staticRouteEntry('/blog', 'weekly', 0.8),
    staticRouteEntry('/sobre-nosotros', 'monthly', 0.6),
    staticRouteEntry('/contacto', 'monthly', 0.7),
    // Páginas legales
    staticRouteEntry('/legal/politica-de-privacidad', 'yearly', 0.3),
    staticRouteEntry('/legal/terminos-y-condiciones', 'yearly', 0.3),
    staticRouteEntry('/legal/politica-de-cookies', 'yearly', 0.3),
  ]

  // Rutas dinámicas del blog
  let blogRoutes: MetadataRoute.Sitemap = []
  let categoryRoutes: MetadataRoute.Sitemap = []

  try {
    // Obtener todos los posts del blog
    const { data: posts, error: postsError } = await supabase
      .from('posts_view')
      .select('post_slug, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (!postsError && posts) {
      blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.post_slug}`,
        lastModified: new Date(post.published_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }

    // Obtener todas las categorías
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('slug, updated_at')

    if (!categoriesError && categories) {
      categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/blog/categoria/${category.slug}`,
        lastModified: category.updated_at ? new Date(category.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error)
    // En caso de error, continuamos con las rutas estáticas
  }

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes]
}