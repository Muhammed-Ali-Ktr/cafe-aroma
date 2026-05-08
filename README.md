# Café Aroma ☕

**Kokunun ve tadın buluştuğu yer**

Modern, responsive ve çok dilli kafe web sitesi. React 19, TypeScript ve Tailwind CSS 4 ile geliştirilmiştir.

## 🎯 Özellikler

### 📱 Sayfalar
- **Ana Sayfa**: Hero slider, günün kahvesi, müşteri yorumları
- **Menü**: Kategori filtreleme, arama, favoriler sistemi
- **Hakkımızda**: Hikaye, misyon, vizyon, ekip
- **Rezervasyon**: Form ile rezervasyon yapma
- **Galeri**: Lightbox ile fotoğraf galerisi
- **Blog**: Kahve kültürü ve tarifler
- **İletişim**: Google Maps, iletişim formu, sosyal medya

### 🌐 Çok Dilli Destek
- 🇹🇷 Türkçe
- 🇬🇧 İngilizce

### 🎨 Tasarım
- **Renk Paleti**: Kahverengi, krem, altın tonları
- **Fontlar**: Poppins (genel), Dancing Script (başlıklar)
- **Tema**: Açık/Koyu mod desteği
- **Responsive**: Mobil, tablet, masaüstü uyumlu

### 🛒 Online Sipariş Sistemi
- ✅ Sepet yönetimi (ürün ekleme/çıkarma, miktar ayarlama)
- ✅ Sepet badge (header'da canlı güncellenen ürün sayısı)
- ✅ Sipariş sayfası (checkout)
- ✅ Teslimat seçenekleri (adrese teslimat / gel-al)
- ✅ Ödeme yöntemleri (kapıda nakit / kart)
- ✅ Sipariş geçmişi (localStorage)
- ✅ Sipariş onay mesajı

### ⚡ Diğer Özellikler
- ✅ Sticky header (kaydırma ile sabit menü)
- ✅ Smooth scroll animasyonları
- ✅ Favoriler sistemi (localStorage)
- ✅ Rezervasyon sistemi (localStorage)
- ✅ İletişim mesajları (localStorage)
- ✅ Ziyaretçi sayacı
- ✅ Google Maps entegrasyonu
- ✅ Arama fonksiyonu
- ✅ Kategori filtreleme
- ✅ Lightbox galeri
- ✅ Site hakkında modalı

## 🚀 Teknolojiler

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **Icons**: Lucide React
- **Maps**: Google Maps API (Manus Proxy)

## 📁 Proje Yapısı

```
cafe-aroma/
├── client/
│   ├── public/
│   │   ├── images/          # Görseller
│   │   └── data/            # JSON veri dosyaları
│   └── src/
│       ├── components/      # Yeniden kullanılabilir bileşenler
│       ├── contexts/        # React context'leri
│       ├── hooks/           # Custom hooks
│       ├── pages/           # Sayfa bileşenleri
│       └── lib/             # Yardımcı fonksiyonlar
└── README.md
```

## 🎨 Renk Paleti

- **Primary**: Zengin kahve kahverengi (#6F4E37)
- **Secondary**: Açık krem tonu
- **Accent**: Altın (#D4AF37)
- **Background**: Açık krem (light mode), Koyu kahve (dark mode)

## 📝 Veri Yönetimi

Tüm kullanıcı verileri localStorage'da saklanır:
- `cart`: Sepet ürünleri
- `orders`: Sipariş geçmişi
- `favorites`: Favori ürünler
- `reservations`: Rezervasyonlar
- `contactMessages`: İletişim mesajları
- `visitorCount`: Ziyaretçi sayısı
- `lastVisit`: Son ziyaret zamanı

## 🌍 Çok Dilli Destek

Dil değiştirme header'daki bayrak ikonları ile yapılır. Tüm içerik LanguageContext üzerinden yönetilir.

## 📱 Responsive Tasarım

- **Mobil**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Gelecek Özellikler

- [ ] Sadakat programı (üyelik ve puan sistemi)
- [ ] Canlı etkinlik takvimi
- [ ] Arka plan müzik aç/kapa
- [ ] QR kod oluşturucu (menü için)
- [ ] Günün tatlısı (random)

## 📄 Lisans

© 2025 Café Aroma. Tüm hakları saklıdır.

---

**Geliştirici Notu**: Bu proje Manus AI ile geliştirilmiştir.
