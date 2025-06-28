import Image from 'next/image';

export function ClientsSection() {
  const clientLogos = [
    { src: 'https://placehold.co/150x50.png', alt: 'Logo Cliente 1', hint: 'tech company' },
    { src: 'https://placehold.co/150x50.png', alt: 'Logo Cliente 2', hint: 'finance startup' },
    { src: 'https://placehold.co/150x50.png', alt: 'Logo Cliente 3', hint: 'logistics enterprise' },
    { src: 'https://placehold.co/150x50.png', alt: 'Logo Cliente 4', hint: 'ecommerce brand' },
    { src: 'https://placehold.co/150x50.png', alt: 'Logo Cliente 5', hint: 'saas company' },
  ];

  return (
    <section className="py-12 bg-background sm:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
            Con la confianza de empresas líderes
          </p>
          <div className="mt-8 grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-3 lg:grid-cols-5 items-center">
            {clientLogos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={50}
                  className="grayscale opacity-60 hover:opacity-100 transition-opacity duration-300"
                  data-ai-hint={logo.hint}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
