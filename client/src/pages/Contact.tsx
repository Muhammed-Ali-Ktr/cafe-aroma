import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { MapView } from '@/components/Map';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({ ...formData, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    toast.success(t('contact.success'));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      content: language === 'tr' 
        ? 'Bağdat Caddesi No: 123, Kadıköy, İstanbul'
        : 'Bağdat Avenue No: 123, Kadıköy, Istanbul',
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: '+90 (216) 555 01 23',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@cafearoma.com',
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      content: language === 'tr'
        ? 'Pazartesi - Pazar: 08:00 - 22:00'
        : 'Monday - Sunday: 08:00 - 22:00',
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: MessageCircle, href: 'https://wa.me/', label: 'WhatsApp', color: 'hover:text-green-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'tr' 
                ? 'Bizimle iletişime geçin, sorularınızı yanıtlayalım' 
                : 'Get in touch with us, let us answer your questions'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="animate-in fade-in slide-in-from-left duration-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">{t('contact.form')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.message')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {t('contact.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Social Media */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">{t('footer.followUs')}</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all ${social.color}`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-700">
            <Card>
              <CardContent className="p-0">
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapView
                    onMapReady={(map: google.maps.Map) => {
                      // Set default location (Istanbul, Kadıköy)
                      const location = { lat: 40.9905, lng: 29.0255 };
                      map.setCenter(location);
                      map.setZoom(15);
                      
                      // Add marker
                      new google.maps.Marker({
                        position: location,
                        map: map,
                        title: 'Café Aroma',
                      });
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
