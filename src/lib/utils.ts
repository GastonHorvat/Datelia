// src/lib/utils.ts
// =======================================================================================
// SECCIÓN 1: IMPORTACIONES
// =======================================================================================
// Importamos solo las herramientas que necesitamos de librerías externas.
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode } from 'react';
// Importamos los tipos y herramientas necesarios de 'html-react-parser'.
import parse, { domToReact, Element, DOMNode, HTMLReactParserOptions } from 'html-react-parser';

// =======================================================================================
// SECCIÓN 2: FUNCIÓN `cn` PARA CLASES DE TAILWIND
// =======================================================================================
// Esta función fusiona clases de Tailwind de forma inteligente para evitar conflictos.
// La definimos y exportamos aquí. NO la importamos.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =======================================================================================
// SECCIÓN 3: FUNCIÓN "BULLETPROOF" PARA PARSEAR HTML
// =======================================================================================
// Esta es la versión final, robusta y con los tipos correctos para limpiar y renderizar tu contenido.
export const parseAndCleanHtml = (htmlString: string): ReactNode => {
  // Verificación inicial para manejar casos donde el contenido sea nulo o no sea un string.
  if (!htmlString || typeof htmlString !== 'string') {
    return null;
  }

  // Opciones de configuración para la librería 'html-react-parser'.
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      // Verificamos si el nodo es un elemento HTML para poder acceder a sus propiedades.
      if (domNode instanceof Element && domNode.attribs) {
        
        // REGLA DE LIMPIEZA 1: Ignorar la etiqueta <head> y todo su contenido.
        if (domNode.name === 'head') {
          return null; // Retornamos null para eliminarlo por completo.
        }

        // REGLA DE LIMPIEZA 2: "Desenvolver" etiquetas contenedoras.
        // Si el contenido viene envuelto en estas etiquetas, las ignoramos y procesamos a sus hijos.
        if (['html', 'body', 'article', 'section'].includes(domNode.name)) {
          // Le decimos a React que renderice solo los hijos de estas etiquetas.
          // Pasamos las 'options' de nuevo para que la limpieza sea recursiva.
          return domToReact(domNode.children as DOMNode[], options);
        }

        // REGLA DE LIMPIEZA 3: Remover etiquetas de script y style por seguridad
        if (['script', 'style'].includes(domNode.name)) {
          return null;
        }

        // REGLA DE LIMPIEZA 4: Limpiar atributos peligrosos
        if (domNode.attribs) {
          // Removemos atributos que pueden ser peligrosos
          delete domNode.attribs.onclick;
          delete domNode.attribs.onload;
          delete domNode.attribs.onerror;
          delete domNode.attribs.onmouseover;
          // Podés agregar más atributos aquí según necesites
        }
      }

      // Si no hay reglas específicas, retornamos undefined para que se procese normalmente
      return undefined;
    },
  };

  // Ejecutamos el parseo final con nuestras reglas de limpieza.
  return parse(htmlString, options);
};