import { useState } from 'react';
import { Instagram, Facebook, MessageCircle, Users, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVisitorCounter } from '@/hooks/useVisitorCounter';
import { AboutModal } from './AboutModal';
import { Button } from './ui/button';

export default function Footer() {
  const { t, language } = useLanguage();
  const visitorCount = useVisitorCounter();
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: MessageCircle, href: 'https://wa.me/', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Café Aroma</h3>
            <p className="text-muted-foreground">
              {t('home.slogan')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('nav.menu')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">{t('nav.home')}</a></li>
              <li><a href="/menu" className="hover:text-primary transition-colors">{t('nav.menu')}</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">{t('nav.about')}</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.followUs')}</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <p>© {new Date().getFullYear()} Café Aroma. {t('footer.rights')}.</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAboutModalOpen(true)}
                className="h-6 px-2"
              >
                <Info className="h-3 w-3 mr-1" />
                {language === 'tr' ? 'Site Hakkında' : 'About Site'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{language === 'tr' ? 'Ziyaretçi' : 'Visitors'}: {visitorCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <AboutModal open={aboutModalOpen} onOpenChange={setAboutModalOpen} />
    </footer>
  );
}
