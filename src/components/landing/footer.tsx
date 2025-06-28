import { Mountain } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card text-foreground/70">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
            <img
              src="/images/logo.jpg" // Ruta correcta
              alt="Logo de Datelia"
              className="h-9 w-auto"
            />
          </Link>
            <p className="text-sm max-w-xs">
              Agencia de Inteligencia artificial aplicada a los negocios.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground tracking-wider uppercase">Enlaces</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#servicios" className="hover:text-primary transition-colors">Servicios</Link></li>
              <li><Link href="#casos-de-exito" className="hover:text-primary transition-colors">Casos de Éxito</Link></li>
              <li><Link href="#contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
 <li><Link href="/politica-de-privacidad" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground tracking-wider uppercase">Contacto</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:contacto@datelia.tech" className="hover:text-primary transition-colors">info@datelia.tech</a></li>
              <li><p>+54 11.5246.6310</p></li>
              <li><p>Dirección de la oficina</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Datelia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
