import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

export default function Blog() {
  const { t, language } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      title: {
        tr: 'Kahve Çekirdeği Seçiminin Önemi',
        en: 'The Importance of Coffee Bean Selection',
      },
      excerpt: {
        tr: 'Kaliteli bir kahve deneyimi için doğru çekirdek seçimi çok önemlidir...',
        en: 'Choosing the right beans is crucial for a quality coffee experience...',
      },
      date: '2024-11-10',
      image: '/images/coffee-beans.jpg',
      category: { tr: 'Kahve Kültürü', en: 'Coffee Culture' },
    },
    {
      id: 2,
      title: {
        tr: 'Evde Mükemmel Latte Nasıl Yapılır?',
        en: 'How to Make the Perfect Latte at Home?',
      },
      excerpt: {
        tr: 'Barista kalitesinde latte yapmak için ipuçları ve püf noktaları...',
        en: 'Tips and tricks for making barista-quality latte...',
      },
      date: '2024-11-08',
      image: '/images/latte.jpg',
      category: { tr: 'Tarifler', en: 'Recipes' },
    },
    {
      id: 3,
      title: {
        tr: 'Tiramisu Tarifi: İtalyan Klasiği',
        en: 'Tiramisu Recipe: Italian Classic',
      },
      excerpt: {
        tr: 'Geleneksel İtalyan tatlısı tiramisu\'nun sırları...',
        en: 'Secrets of the traditional Italian dessert tiramisu...',
      },
      date: '2024-11-05',
      image: '/images/tiramisu.jpg',
      category: { tr: 'Tarifler', en: 'Recipes' },
    },
    {
      id: 4,
      title: {
        tr: 'Café Aroma\'da Yeni Etkinlik: Latte Art Workshop',
        en: 'New Event at Café Aroma: Latte Art Workshop',
      },
      excerpt: {
        tr: 'Bu ay düzenlediğimiz latte art workshop\'una katılın...',
        en: 'Join our latte art workshop this month...',
      },
      date: '2024-11-01',
      image: '/images/cappuccino.jpg',
      category: { tr: 'Etkinlikler', en: 'Events' },
    },
    {
      id: 5,
      title: {
        tr: 'Kahvenin Sağlık Faydaları',
        en: 'Health Benefits of Coffee',
      },
      excerpt: {
        tr: 'Bilimsel araştırmalara göre kahvenin sağlığa faydaları...',
        en: 'Health benefits of coffee according to scientific research...',
      },
      date: '2024-10-28',
      image: '/images/espresso.jpg',
      category: { tr: 'Sağlık', en: 'Health' },
    },
    {
      id: 6,
      title: {
        tr: 'Soğuk Demleme Kahve Trendi',
        en: 'Cold Brew Coffee Trend',
      },
      excerpt: {
        tr: 'Yaz aylarının vazgeçilmezi soğuk demleme kahve hakkında her şey...',
        en: 'Everything about cold brew coffee, the summer essential...',
      },
      date: '2024-10-25',
      image: '/images/cafe-interior-1.jpg',
      category: { tr: 'Trendler', en: 'Trends' },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
              {t('blog.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('blog.latest')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={post.image}
                  alt={post.title[language]}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}</span>
                    <span className="ml-auto px-2 py-1 bg-accent/20 rounded-full text-xs">
                      {post.category[language]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title[language]}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt[language]}</p>
                  <Button variant="outline" className="w-full group">
                    {t('blog.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
