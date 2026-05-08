import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { ShoppingBag, MapPin, CreditCard, Wallet, CheckCircle } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Order() {
  const { language } = useLanguage();
  const { items, getTotalPrice, clearCart } = useCart();
  const [, setLocation] = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    deliveryType: 'delivery', // 'delivery' or 'pickup'
    paymentMethod: 'cash', // 'cash' or 'card'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error(language === 'tr' ? 'Sepetiniz boş!' : 'Your cart is empty!');
      return;
    }

    // Save order to localStorage
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: items,
      total: getTotalPrice(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      },
      deliveryType: formData.deliveryType,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      status: 'pending',
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    clearCart();

    // Show success message
    toast.success(
      language === 'tr'
        ? 'Siparişiniz başarıyla alındı! En kısa sürede size ulaşacağız.'
        : 'Your order has been received! We will contact you shortly.',
      { duration: 5000 }
    );

    // Redirect to home
    setTimeout(() => {
      setLocation('/');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="container">
            <Card className="max-w-md mx-auto text-center p-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                {language === 'tr' ? 'Sepetiniz Boş' : 'Your Cart is Empty'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {language === 'tr'
                  ? 'Sipariş vermek için önce menüden ürün ekleyin.'
                  : 'Please add items from the menu to place an order.'}
              </p>
              <Button onClick={() => setLocation('/menu')}>
                {language === 'tr' ? 'Menüye Git' : 'Go to Menu'}
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
              {language === 'tr' ? 'Siparişi Tamamla' : 'Complete Order'}
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <Card className="animate-in fade-in slide-in-from-left duration-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {language === 'tr' ? 'Teslimat Bilgileri' : 'Delivery Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Delivery Type */}
                  <div className="space-y-2">
                    <Label>{language === 'tr' ? 'Teslimat Türü' : 'Delivery Type'}</Label>
                    <RadioGroup
                      value={formData.deliveryType}
                      onValueChange={(value) => setFormData({ ...formData, deliveryType: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="cursor-pointer">
                          {language === 'tr' ? 'Adrese Teslimat' : 'Home Delivery'}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="cursor-pointer">
                          {language === 'tr' ? 'Gel Al' : 'Pickup'}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{language === 'tr' ? 'Ad Soyad' : 'Full Name'}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">{language === 'tr' ? 'Telefon' : 'Phone'}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Address (only for delivery) */}
                  {formData.deliveryType === 'delivery' && (
                    <div className="space-y-2">
                      <Label htmlFor="address">{language === 'tr' ? 'Adres' : 'Address'}</Label>
                      <Textarea
                        id="address"
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {language === 'tr' ? 'Ödeme Yöntemi' : 'Payment Method'}
                    </Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="cursor-pointer flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          {language === 'tr' ? 'Kapıda Nakit' : 'Cash on Delivery'}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="cursor-pointer flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          {language === 'tr' ? 'Kapıda Kart' : 'Card on Delivery'}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">{language === 'tr' ? 'Sipariş Notu (Opsiyonel)' : 'Order Notes (Optional)'}</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={language === 'tr' ? 'Özel istekleriniz...' : 'Special requests...'}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {language === 'tr' ? 'Siparişi Onayla' : 'Confirm Order'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="animate-in fade-in slide-in-from-right duration-700 h-fit sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  {language === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                    <img
                      src={item.image}
                      alt={item.name[language]}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name[language]}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x {item.price}
                      </p>
                    </div>
                    <div className="font-semibold text-primary">
                      {(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}₺
                    </div>
                  </div>
                ))}

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{language === 'tr' ? 'Toplam' : 'Total'}:</span>
                    <span className="text-primary">{getTotalPrice().toFixed(2)}₺</span>
                  </div>
                  {formData.deliveryType === 'delivery' && (
                    <p className="text-sm text-muted-foreground">
                      {language === 'tr'
                        ? '* Teslimat ücreti dahildir'
                        : '* Delivery fee included'}
                    </p>
                  )}
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
