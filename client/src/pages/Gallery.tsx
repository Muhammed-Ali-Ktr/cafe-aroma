import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

export default function Gallery() {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: language === 'tr' ? 'Tümü' : 'All' },
    { id: 'interior', label: t('gallery.interior') },
    { id: 'products', label: t('gallery.products') },
    { id: 'events', label: t('gallery.events') },
  ];

  const images = [
    { src: '/images/cafe-interior-1.jpg', category: 'interior', alt: 'Cafe Interior 1' },
    { src: '/images/cafe-interior-2.jpg', category: 'interior', alt: 'Cafe Interior 2' },
    { src: '/images/cafe-interior-3.jpg', category: 'interior', alt: 'Cafe Interior 3' },
    { src: '/images/espresso.jpg', category: 'products', alt: 'Espresso' },
    { src: '/images/latte.jpg', category: 'products', alt: 'Latte' },
    { src: '/images/cappuccino.jpg', category: 'products', alt: 'Cappuccino' },
    { src: '/images/tiramisu.jpg', category: 'products', alt: 'Tiramisu' },
    { src: '/images/coffee-beans.jpg', category: 'products', alt: 'Coffee Beans' },
  ];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
              {t('gallery.title')}
            </h1>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-5 w-5" />
          </Button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
