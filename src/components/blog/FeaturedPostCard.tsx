// src/components/blog/FeaturedPostCard.tsx

"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Badge se sigue usando como base
import { Post } from '@/types/blog';

export const FeaturedPostCard = ({ post }: { post: Post }) => {
  
  const postUrl = `/blog/${post.post_slug}`;
  const categoryUrl = post.category_slug ? `/blog/categoria/${post.category_slug}` : '#';
  const displayTags = post.tag_names || [];
  const displayTagSlugs = post.tag_slugs || [];

  return (
    <Card className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden border-border transition-shadow duration-300 hover:shadow-xl">
      
      {/* --- Columna de la Imagen --- */}
      <div className="relative min-h-[300px] md:min-h-full">
        <Link href={postUrl} aria-label={`Leer más sobre ${post.post_title}`}>
          {post.post_image_url && (
            <Image
              src={post.post_image_url}
              alt={post.post_title || 'Imagen del post destacado'}
              fill
              style={{ objectFit: 'cover' }}
              className="group-hover:scale-105 transition-transform duration-500"
              priority
            />
          )}
        </Link>
        <div className="absolute top-4 left-4 z-10">
          {/* CORRECCIÓN DE ESTILO: Badge de Destacado */}
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
            Destacado
          </Badge>
        </div>
      </div>

      {/* --- Columna de Contenido --- */}
      <div className="md:col-span-1 p-8 lg:p-10 flex flex-col">
        {post.category_name && (
          <Link 
            href={categoryUrl} 
            className="w-fit mb-4 z-10 relative"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* CORRECCIÓN DE ESTILO: Badge de Categoría */}
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs uppercase">
              {post.category_name}
            </Badge>
          </Link>
        )}
        
        <h2 className="text-2xl lg:text-3xl font-bold font-headline leading-tight mb-3">
          <Link href={postUrl} className="hover:text-primary transition-colors">
            {post.post_title}
          </Link>
        </h2>

        <p className="text-muted-foreground mb-6 flex-grow">
          {post.post_description}
        </p>
        
        <div className="border-t border-primary/50 pt-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">{post.author_name}</p>
          <div className="flex items-center gap-2 text-xs">
            <span>{new Date(post.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            {post.estimated_read_time > 0 && (
              <>
                <span className="opacity-50">•</span>
                <span>{post.estimated_read_time} min de lectura</span>
              </>
            )}
          </div>
        </div>

        {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-primary/50">
                {displayTags.map((tagName, index) => (
                    <Badge variant="outline" className="border-primary/50 text-primary" key={index}>
                        #{tagName}
                    </Badge>
                ))}
            </div>
        )}
      </div>
    </Card>
  );
};