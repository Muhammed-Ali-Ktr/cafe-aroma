import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';

export function CartSheet() {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCart();
  const { language } = useLanguage();

  const totalItems = getTotalItems();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {language === 'tr' ? 'Sepetim' : 'My Cart'}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {language === 'tr' ? 'Sepetiniz boş' : 'Your cart is empty'}
              </p>
              <Link href="/menu">
                <Button className="mt-4">
                  {language === 'tr' ? 'Menüye Git' : 'Go to Menu'}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-card"
                  >
                    <img
                      src={item.image}
                      alt={item.name[language]}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{item.name[language]}</h4>
                      <p className="text-sm text-primary font-semibold mb-2">
                        {item.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 ml-auto text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total and Checkout */}
              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>{language === 'tr' ? 'Toplam' : 'Total'}:</span>
                  <span className="text-primary">{getTotalPrice().toFixed(2)}₺</span>
                </div>
                <Link href="/order">
                  <Button size="lg" className="w-full">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {language === 'tr' ? 'Siparişi Tamamla' : 'Complete Order'}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
