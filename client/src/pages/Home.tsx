import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, Heart, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/images/cafe-interior-1.jpg',
    '/images/cafe-interior-2.jpg',
    '/images/cafe-interior-3.jpg',
  ];

  const testimonials = [
    {
      name: { tr: 'Ayşe Yılmaz', en: 'Ayşe Yılmaz' },
      text: { tr: 'Harika bir atmosfer ve lezzetli kahveler!', en: 'Great atmosphere and delicious coffee!' },
      rating: 5,
    },
    {
      name: { tr: 'Mehmet Demir', en: 'Mehmet Demir' },
      text: { tr: 'En sevdiğim kafe, her zaman buraya geliyorum.', en: 'My favorite cafe, I always come here.' },
      rating: 5,
    },
    {
      name: { tr: 'Zeynep Kaya', en: 'Zeynep Kaya' },
      text: { tr: 'Tatlıları muhteşem, özellikle tiramisu!', en: 'The desserts are amazing, especially the tiramisu!' },
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide}
                alt={`Cafe ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 animate-in fade-in slide-in-from-bottom duration-1000">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">
            {t('home.title')}
          </h1>
          <p className="text-2xl md:text-3xl mb-8 drop-shadow-md">
            {t('home.slogan')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation">
              <Button size="lg" className="text-lg px-8 py-6">
                <Coffee className="mr-2 h-5 w-5" />
                {t('home.reserveNow')}
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white">
                {t('home.viewMenu')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              {t('nav.about')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('home.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Daily Coffee Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
            {t('home.dailyCoffee')}
          </h2>
          <div className="max-w-md mx-auto">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img
                src="/images/latte.jpg"
                alt="Daily Coffee"
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">Caramel Latte</h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'tr' 
                    ? 'Karamelli latte ile güne tatlı bir başlangıç yapın!' 
                    : 'Start your day sweet with caramel latte!'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">55₺</span>
                  <Button>
                    <Heart className="mr-2 h-4 w-4" />
                    {t('menu.addToFavorites')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
            {t('home.testimonials')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text[language]}"
                  </p>
                  <p className="font-semibold">{testimonial.name[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
