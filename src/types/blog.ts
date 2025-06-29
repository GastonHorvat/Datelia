// src/types/blog.ts

export type Post = {
  // --- Columnas principales de la vista ---
  post_id: string; // Es un UUID, por lo tanto, string
  post_title: string;
  post_slug: string;
  post_description: string; // En tu vista se llama post_description, no post_excerpt
  post_image_url: string;
  post_content: string; // Lo incluimos para la página del post individual

  // --- Columnas de autor y categoría ---
  author_name: string;
  category_name: string;
  category_slug: string;

  // --- Metadatos y fechas ---
  published_at: string;
  created_at: string;
  updated_at: string | null; // Puede ser null
  is_featured: boolean;
  estimated_read_time: number; // ¡Aquí está! El nombre correcto es estimated_read_time

  // --- Columnas de tags (Arrays de texto) ---
  tag_names: string[];
  tag_slugs: string[];
};