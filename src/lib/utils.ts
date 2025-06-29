import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode } from 'react';
import parse, { domToReact, Element, HTMLReactParserOptions, DOMNode } from 'html-react-parser';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseAndCleanHtml = (htmlString: string): ReactNode => {
  if (!htmlString || typeof htmlString !== 'string') {
    return null;
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        ['body', 'article', 'section', 'html'].includes(domNode.name)
      ) {
        return domToReact(domNode.children as unknown as DOMNode[], options);
      }
    },
  };

  return parse(htmlString, options);
};
