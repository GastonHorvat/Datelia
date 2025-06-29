// src/components/ui/Pagination.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hasPrevPage = prevPage > 0;
  const hasNextPage = nextPage <= totalPages;

  return (
    <nav className="flex items-center justify-center gap-4 mt-16">
      <Button asChild variant="outline" disabled={!hasPrevPage}>
        <Link href={hasPrevPage ? `/blog?page=${prevPage}` : '#'}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Link>
      </Button>

      <span className="text-sm font-medium text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>

      <Button asChild variant="outline" disabled={!hasNextPage}>
        <Link href={hasNextPage ? `/blog?page=${nextPage}` : '#'}>
          Siguiente
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </nav>
  );
};