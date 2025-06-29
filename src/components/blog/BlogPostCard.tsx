// src/components/blog/BlogPostCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types/blog'; // Importamos el tipo actualizado
import { ArrowRight } from 'lucide-react';

export const BlogPostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.post_slug}`} key={post.post_id} className="block group h-full">
      <Card className="flex flex-col overflow-hidden h-full hover:border-primary transition-colors duration-300">
        <div className="relative aspect-video">
          <Image
            src={post.post_image_url}
            alt={post.post_title}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <CardHeader>
          <Badge variant="secondary" className="w-fit text-xs">{post.category_name}</Badge>
          <CardTitle className="text-lg font-headline mt-2">{post.post_title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* USAMOS EL NOMBRE CORRECTO: post_description */}
          <p className="text-sm text-muted-foreground line-clamp-3">{post.post_description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between items-center">
          <div>
            {/* USAMOS EL NOMBRE CORRECTO: published_at */}
            <span>{new Date(post.published_at).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}</span>
            
            {/* USAMOS EL NOMBRE CORRECTO: estimated_read_time */}
            {post.estimated_read_time > 0 && (
              <>
                <span className="mx-2">•</span>
                <span>{post.estimated_read_time} min de lectura</span>
              </>
            )}
          </div>
          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardFooter>
      </Card>
    </Link>
  );
};