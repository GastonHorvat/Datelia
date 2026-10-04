import React from 'react';
// CORRECCIÓN 1: Se importa 'Header' con llaves {}
import { Header } from '../components/landing/header'; 
import { Footer } from '../components/landing/footer';
import { Breadcrumbs } from './ui/breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
  /** Sobrescribe el nombre del último breadcrumb (ej. el título de un post o categoría en vez del slug). */
  breadcrumbLastItemName?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, breadcrumbLastItemName }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Breadcrumbs lastItemName={breadcrumbLastItemName} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

// Ya no necesitas un 'export default' al final porque lo exportamos en la línea de arriba.