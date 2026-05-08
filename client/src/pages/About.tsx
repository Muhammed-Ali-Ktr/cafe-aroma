import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const { language } = useLanguage();

  const teamMembers = [
    {
      name: 'Ahmet Yılmaz',
      role: { tr: 'Kurucu & Baş Barista', en: 'Founder & Head Barista' },
      image: '/images/cafe-interior-1.jpg',
    },
    {
      name: 'Elif Demir',
      role: { tr: 'Pastry Şefi', en: 'Pastry Chef' },
      image: '/images/cafe-interior-2.jpg',
    },
    {
      name: 'Can Kaya',
      role: { tr: 'Barista', en: 'Barista' },
      image: '/images/cafe-interior-3.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden mb-12">
          <img
            src="/images/cafe-interior-2.jpg"
            alt="About Us"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <h1 className="relative z-10 text-5xl md:text-6xl font-bold text-white">
            {language === 'tr' ? 'Hakkımızda' : 'About Us'}
          </h1>
        </section>

        <div className="container">
          {/* Story Section */}
          <section className="mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl font-bold mb-6 text-primary text-center">
              {language === 'tr' ? 'Hikayemiz' : 'Our Story'}
            </h2>
            <div className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                {language === 'tr'
                  ? 'Café Aroma, 2015 yılında kahve tutkunu bir grup arkadaş tarafından kuruldu. Amacımız, şehrin kalbinde insanların rahatça buluşabileceği, kaliteli kahve içebileceği ve kendilerini evlerinde hissedebilecekleri bir mekan yaratmaktı.'
                  : 'Café Aroma was founded in 2015 by a group of coffee-loving friends. Our goal was to create a space in the heart of the city where people could meet comfortably, drink quality coffee, and feel at home.'}
              </p>
              <p>
                {language === 'tr'
                  ? 'Her sabah taze kavrulan kahve çekirdeklerimiz, dünyanın dört bir yanından özenle seçilir. Barista ekibimiz, her fincanın mükemmel olması için özveriyle çalışır.'
                  : 'Our coffee beans, freshly roasted every morning, are carefully selected from around the world. Our barista team works dedicatedly to ensure every cup is perfect.'}
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  {language === 'tr' ? 'Misyonumuz' : 'Our Mission'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'tr'
                    ? 'En kaliteli kahve deneyimini sunarak, müşterilerimizin günlük rutinlerini özel anılara dönüştürmek. Her fincan kahveyle bir hikaye anlatmak.'
                    : 'To transform our customers\' daily routines into special memories by providing the highest quality coffee experience. To tell a story with every cup of coffee.'}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  {language === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'tr'
                    ? 'Türkiye\'nin en sevilen ve saygın kafe zincirlerinden biri olmak. Kahve kültürünü yaygınlaştırmak ve her şubemizde aynı kalite standardını korumak.'
                    : 'To become one of Turkey\'s most beloved and respected cafe chains. To spread coffee culture and maintain the same quality standards in all our branches.'}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Team Section */}
          <section className="animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl font-bold mb-12 text-primary text-center">
              {language === 'tr' ? 'Bizimle Tanışın' : 'Meet Our Team'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role[language]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
