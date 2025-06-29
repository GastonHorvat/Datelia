// src/components/blog/ShareButtons.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, MessageSquare, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  title: string;
}

export const ShareButtons = ({ title }: ShareButtonsProps) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  // Obtenemos la URL actual del navegador solo cuando el componente se monta
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: 'bg-black hover:bg-gray-800' },
    { name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, color: 'bg-sky-600 hover:bg-sky-700' },
    { name: 'WhatsApp', icon: MessageSquare, href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, color: 'bg-green-500 hover:bg-green-600' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess('¡Copiado!');
      setTimeout(() => setCopySuccess(''), 2000); // El mensaje desaparece después de 2 segundos
    }, (err) => {
      console.error('Error al copiar el enlace: ', err);
      setCopySuccess('Error');
       setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Share this story</h3>
        <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                    <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                        className={cn("w-12 h-12 flex items-center justify-center rounded-full text-white transition-transform hover:scale-110", social.color)}>
                        <Icon className="h-6 w-6" />
                    </Link>
                );
            })}
            
            {/* Botón para copiar enlace */}
            <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full border-border text-muted-foreground transition-transform hover:scale-110"
                onClick={handleCopyLink}
            >
                <Link2 className="h-6 w-6" />
            </Button>
            {copySuccess && <span className="text-sm text-primary font-medium ml-2">{copySuccess}</span>}
        </div>
    </div>
  );
};