// src/components/blog/BlogPostCard.tsx

"use client"; // Marcamos como de cliente por el `onClick`

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types/blog';
import { ArrowRight } from 'lucide-react';

export const BlogPostCard = ({ post }: { post: Post }) => {
  const postUrl = `/blog/${post.post_slug}`;
  const categoryUrl = post.category_slug ? `/blog/categoria/${post.category_slug}` : '#';
  const displayTags = post.tag_names || [];
  const displayTagSlugs = post.tag_slugs || [];

  return (
    // CORRECCIÓN: La Card ya no es un Link. En su lugar, es un contenedor normal.
    // El 'group' y los efectos de hover se mantienen para la estética.
    <Card className="group flex flex-col overflow-hidden h-full border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* --- Contenedor de la Imagen (Ahora es un Link) --- */}
      <Link href={postUrl} className="relative aspect-video overflow-hidden block">
        {post.post_image_url && (
        <Image
            src={post.post_image_url}
            alt={post.post_title || 'Imagen del post'}
            fill
            style={{ objectFit: 'cover' }} // <-- 2. Volvemos a 'cover'
            className="object-top group-hover:scale-105 transition-transform duration-500" // <-- 3. ¡LA MAGIA!
          />
        )}
      </Link>

      {/* --- Contenido de Texto --- */}
      <div className="p-4 flex flex-col flex-grow">
        {post.category_name && (
          <Link 
            href={categoryUrl} 
            className="w-fit mb-2 z-10 relative"
            // Detenemos la propagación por si acaso, aunque ya no es estrictamente necesario
            onClick={(e) => e.stopPropagation()}
          >
            <Badge variant="outline" className="text-xs uppercase border-primary/50 text-primary hover:bg-primary/10">
              {post.category_name}
            </Badge>
          </Link>
        )}

        <CardTitle className="text-lg font-headline mt-1 mb-2 leading-snug">
          {/* El Título también es un Link */}
          <Link href={postUrl} className="hover:text-primary transition-colors">
            {post.post_title}
          </Link>
        </CardTitle>

        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
          {post.post_description}
        </p>

        {/* Meta Info */}
        <div className="border-t border-border pt-3 mt-4 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground/80 mb-1">{post.author_name}</p>
            <div className="flex items-center gap-2">
              <span>{new Date(post.published_at).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}</span>
              {post.estimated_read_time > 0 && (
                <>
                  <span className="opacity-50">•</span>
                  <span>{post.estimated_read_time} min de lectura</span>
                </>
              )}
            </div>
        </div>

        {/* Tags */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-border">
            {displayTags.map((tagName, index) => (
              <Badge variant="secondary" key={index}>#{tagName}</Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};