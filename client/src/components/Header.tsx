import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { APP_LOGO } from '@/const';
import { CartSheet } from './CartSheet';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/menu', label: t('nav.menu') },
    { path: '/about', label: t('nav.about') },
    { path: '/reservation', label: t('nav.reservation') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src={APP_LOGO}
                alt="Café Aroma"
                className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary">Café Aroma</h1>
                <p className="text-xs text-muted-foreground">{t('home.slogan')}</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <Button
                  variant={location === link.path ? 'default' : 'ghost'}
                  className="transition-all"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <CartSheet />

            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="hidden sm:flex gap-2"
            >
              {language === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}
            </Button>

            {/* Theme Switcher */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-in slide-in-from-top">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <Button
                    variant={location === link.path ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="flex gap-2 mt-2 sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                  className="flex-1"
                >
                  {language === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex-1"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
