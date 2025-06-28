import React from 'react';
// CORRECCIÓN 1: Se importa 'Header' con llaves {}
import { Header } from '../components/landing/header'; 
// CORRECCIÓN 2: Se importa 'Footer' con llaves {}
import { Footer } from '../components/landing/footer';

interface LayoutProps {
  children: React.ReactNode;
}

// CORRECCIÓN 3: Se añade 'export' para que este componente pueda ser importado en otras páginas
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

// Ya no necesitas un 'export default' al final porque lo exportamos en la línea de arriba.