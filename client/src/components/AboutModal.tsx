import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Coffee, Code, Heart } from 'lucide-react';

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Coffee className="h-6 w-6 text-primary" />
            {language === 'tr' ? 'Site Hakkında' : 'About This Site'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Code className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                {language === 'tr' ? 'Teknoloji' : 'Technology'}
              </h3>
              <p className="text-sm text-muted-foreground">
                React 19, TypeScript, Tailwind CSS 4, Wouter
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">
                {language === 'tr' ? 'Versiyon' : 'Version'}
              </h3>
              <p className="text-sm text-muted-foreground">v1.0.0</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              {language === 'tr'
                ? 'Café Aroma - Modern, responsive ve kullanıcı dostu bir kafe web sitesi.'
                : 'Café Aroma - A modern, responsive and user-friendly cafe website.'}
            </p>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Café Aroma
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
