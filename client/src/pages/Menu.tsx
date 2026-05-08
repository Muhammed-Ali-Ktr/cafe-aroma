import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, Search, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface MenuItem {
  id: number;
  name: { tr: string; en: string };
  description: { tr: string; en: string };
  price: string;
  image: string;
  category: string;
}

interface MenuData {
  coffees: MenuItem[];
  desserts: MenuItem[];
  drinks: MenuItem[];
  sandwiches: MenuItem[];
}

export default function Menu() {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetch('/data/menu.json')
      .then((res) => res.json())
      .then((data) => setMenuData(data))
      .catch((err) => console.error('Failed to load menu:', err));

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const categories = [
    { id: 'all', label: t('menu.all') },
    { id: 'coffees', label: t('menu.coffees') },
    { id: 'desserts', label: t('menu.desserts') },
    { id: 'drinks', label: t('menu.drinks') },
    { id: 'sandwiches', label: t('menu.sandwiches') },
  ];

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    toast.success(
      favorites.includes(id)
        ? t('menu.removeFromFavorites')
        : t('menu.addToFavorites')
    );
  };

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast.success(
      language === 'tr' ? 'Ürün sepete eklendi!' : 'Item added to cart!'
    );
  };

  const getAllItems = (): MenuItem[] => {
    if (!menuData) return [];
    return [
      ...menuData.coffees,
      ...menuData.desserts,
      ...menuData.drinks,
      ...menuData.sandwiches,
    ];
  };

  const getFilteredItems = (): MenuItem[] => {
    let items = getAllItems();

    if (selectedCategory !== 'all') {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      items = items.filter((item) =>
        item.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description[language].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  };

  if (!menuData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
              {t('menu.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'tr' 
                ? 'Özenle hazırlanmış kahvelerimiz ve lezzetli ürünlerimizi keşfedin' 
                : 'Discover our carefully prepared coffees and delicious products'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('menu.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredItems().map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name[language]}</h3>
                  <p className="text-muted-foreground mb-4">
                    {item.description[language]}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {language === 'tr' ? 'Sepete Ekle' : 'Add to Cart'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {getFilteredItems().length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {language === 'tr' ? 'Ürün bulunamadı' : 'No products found'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
