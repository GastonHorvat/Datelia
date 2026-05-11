import React from 'react';
// CORRECCIÓN 1: Se importa 'Header' con llaves {}
import { Header } from '../components/landing/header'; 
import { Footer } from '../components/landing/footer';
import { Breadcrumbs } from './ui/breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

// Ya no necesitas un 'export default' al final porque lo exportamos en la línea de arriba.