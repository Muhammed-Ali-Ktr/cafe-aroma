import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface Translations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { tr: 'Ana Sayfa', en: 'Home' },
  'nav.menu': { tr: 'Menü', en: 'Menu' },
  'nav.about': { tr: 'Hakkımızda', en: 'About Us' },
  'nav.reservation': { tr: 'Rezervasyon', en: 'Reservation' },
  'nav.gallery': { tr: 'Galeri', en: 'Gallery' },
  'nav.blog': { tr: 'Blog', en: 'Blog' },
  'nav.contact': { tr: 'İletişim', en: 'Contact' },
  
  // Home Page
  'home.title': { tr: 'Café Aroma', en: 'Café Aroma' },
  'home.slogan': { tr: 'Kokunun ve tadın buluştuğu yer', en: 'Where aroma meets taste' },
  'home.reserveNow': { tr: 'Şimdi Rezervasyon Yap', en: 'Reserve Now' },
  'home.viewMenu': { tr: 'Menüyü Gör', en: 'View Menu' },
  'home.intro': { tr: 'Café Aroma\'da her fincan kahve, özenle seçilmiş çekirdeklerden hazırlanır. Sıcak atmosferimizde kendinizi evinizde hissedin.', en: 'At Café Aroma, every cup of coffee is prepared from carefully selected beans. Feel at home in our warm atmosphere.' },
  'home.testimonials': { tr: 'Müşteri Yorumları', en: 'Customer Reviews' },
  'home.dailyCoffee': { tr: 'Günün Kahvesi', en: 'Coffee of the Day' },
  
  // Menu Page
  'menu.title': { tr: 'Menümüz', en: 'Our Menu' },
  'menu.all': { tr: 'Tümü', en: 'All' },
  'menu.coffees': { tr: 'Kahveler', en: 'Coffees' },
  'menu.desserts': { tr: 'Tatlılar', en: 'Desserts' },
  'menu.drinks': { tr: 'İçecekler', en: 'Drinks' },
  'menu.sandwiches': { tr: 'Sandviçler', en: 'Sandwiches' },
  'menu.addToFavorites': { tr: 'Favorilere Ekle', en: 'Add to Favorites' },
  'menu.removeFromFavorites': { tr: 'Favorilerden Çıkar', en: 'Remove from Favorites' },
  'menu.search': { tr: 'Ürün ara...', en: 'Search products...' },
  
  // About Page
  'about.title': { tr: 'Hakkımızda', en: 'About Us' },
  'about.story': { tr: 'Hikayemiz', en: 'Our Story' },
  'about.mission': { tr: 'Misyonumuz', en: 'Our Mission' },
  'about.vision': { tr: 'Vizyonumuz', en: 'Our Vision' },
  'about.team': { tr: 'Bizimle Tanışın', en: 'Meet Our Team' },
  
  // Reservation Page
  'reservation.title': { tr: 'Rezervasyon', en: 'Reservation' },
  'reservation.date': { tr: 'Tarih', en: 'Date' },
  'reservation.time': { tr: 'Saat', en: 'Time' },
  'reservation.guests': { tr: 'Kişi Sayısı', en: 'Number of Guests' },
  'reservation.name': { tr: 'Ad Soyad', en: 'Full Name' },
  'reservation.phone': { tr: 'Telefon', en: 'Phone' },
  'reservation.email': { tr: 'E-posta', en: 'Email' },
  'reservation.submit': { tr: 'Rezervasyon Yap', en: 'Make Reservation' },
  'reservation.success': { tr: 'Rezervasyonunuz başarıyla alındı!', en: 'Your reservation has been received!' },
  
  // Gallery Page
  'gallery.title': { tr: 'Galeri', en: 'Gallery' },
  'gallery.interior': { tr: 'Kafe İçi', en: 'Interior' },
  'gallery.products': { tr: 'Ürünlerimiz', en: 'Our Products' },
  'gallery.events': { tr: 'Etkinlikler', en: 'Events' },
  
  // Blog Page
  'blog.title': { tr: 'Blog', en: 'Blog' },
  'blog.readMore': { tr: 'Devamını Oku', en: 'Read More' },
  'blog.latest': { tr: 'Son Yazılar', en: 'Latest Posts' },
  
  // Contact Page
  'contact.title': { tr: 'İletişim', en: 'Contact' },
  'contact.form': { tr: 'İletişim Formu', en: 'Contact Form' },
  'contact.name': { tr: 'İsim', en: 'Name' },
  'contact.email': { tr: 'E-posta', en: 'Email' },
  'contact.message': { tr: 'Mesaj', en: 'Message' },
  'contact.send': { tr: 'Gönder', en: 'Send' },
  'contact.hours': { tr: 'Çalışma Saatleri', en: 'Working Hours' },
  'contact.address': { tr: 'Adres', en: 'Address' },
  'contact.phone': { tr: 'Telefon', en: 'Phone' },
  'contact.success': { tr: 'Mesajınız başarıyla gönderildi!', en: 'Your message has been sent successfully!' },
  
  // Footer
  'footer.rights': { tr: 'Tüm hakları saklıdır', en: 'All rights reserved' },
  'footer.followUs': { tr: 'Bizi Takip Edin', en: 'Follow Us' },
  
  // Common
  'common.loading': { tr: 'Yükleniyor...', en: 'Loading...' },
  'common.close': { tr: 'Kapat', en: 'Close' },
  'common.save': { tr: 'Kaydet', en: 'Save' },
  'common.cancel': { tr: 'İptal', en: 'Cancel' },
  'common.search': { tr: 'Ara', en: 'Search' },
  'common.filter': { tr: 'Filtrele', en: 'Filter' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
