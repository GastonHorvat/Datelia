import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://datelia.tech'
  
  // Rutas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/soluciones`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soluciones/chatbots-inteligentes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/soluciones/agentes-de-voz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/casos-de-exito`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/casos-de-exito/caso-retail-chatbot`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/casos-de-exito/caso-logistica-ia-medida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/casos-de-exito/caso-clinica-agente-voz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
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