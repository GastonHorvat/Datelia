// src/components/blog/FeaturedPostCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types/blog'; // Importamos el tipo actualizado

export const FeaturedPostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.post_slug}`} className="block group">
      <Card className="md:grid md:grid-cols-2 overflow-hidden hover:border-primary transition-colors duration-300">
        <div className="relative h-64 md:h-full">
          <Image 
            src={post.post_image_url} 
            alt={post.post_title} 
            fill 
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <Badge>Destacado</Badge>
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <Badge variant="secondary" className="w-fit mb-4">{post.category_name}</Badge>
          <h2 className="text-3xl font-bold font-headline mb-4">{post.post_title}</h2>
          {/* USAMOS EL NOMBRE CORRECTO: post_description */}
          <p className="text-muted-foreground text-lg mb-6">{post.post_description}</p>
          <div className="text-sm text-muted-foreground">
            {/* USAMOS EL NOMBRE CORRECTO: published_at */}
            <span>{new Date(post.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {/* USAMOS EL NOMBRE CORRECTO: estimated_read_time */}
            {post.estimated_read_time > 0 && (
              <>
                <span className="mx-2">•</span>
                <span>{post.estimated_read_time} min de lectura</span>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};