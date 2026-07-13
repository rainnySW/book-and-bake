"use client";
import Link from 'next/link';
import { useSettings } from '../context/SettingsContext';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useSettings();
  const [slideIndex, setSlideIndex] = useState(0);
  
  const featuredCakes = [
    { name: "Raspberry Rose Delight", desc: t("Vanilla sponge with raspberry compote and rose buttercream.", "สปันจ์วานิลลา ซอสราสเบอร์รี่ และครีมกุหลาบ"), price: "฿250", image: "/images/raspberry_rose_cake_1783664181286.jpg" },
    { name: "Matcha Velvet", desc: t("Premium ceremonial matcha layers with white chocolate ganache.", "มัทฉะเกรดพรีเมียม สลับชั้นไวท์ช็อกโกแลต"), price: "฿280", image: "/images/matcha_velvet_cake_1783664314968.jpg" },
    { name: "Classic Earl Grey", desc: t("Earl grey infused cake with salted caramel drip and fresh figs.", "เค้กชาเอิร์ลเกรย์ ราดคาราเมล ตกแต่งด้วยมะเดื่อฝรั่ง"), price: "฿240", image: "/images/earl_grey_cake_1783677188490.jpg" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % featuredCakes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-cake-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-cake-secondary/30 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-cake-text leading-tight mb-6">
              {t("Freshly Baked &", 'อบสดใหม่ &')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cake-rose to-cake-primary">{t('Irresistibly Delicious.', 'อร่อยจนหยุดไม่ได้')}</span>
            </h1>
            <p className="text-lg text-cake-text-light mb-10 max-w-lg mx-auto md:mx-0">
              {t('Indulge in our selection of premium handcrafted cakes. Baked fresh daily with the finest ingredients to bring joy to every occasion.', 'สัมผัสความอร่อยของเค้กโฮมเมดระดับพรีเมียม อบสดใหม่ทุกวันด้วยวัตถุดิบคุณภาพสูง เพื่อเติมเต็มความสุขในทุกโอกาสของคุณ')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
               <Link href="/cakes" className="bg-cake-text text-cake-bg px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cake-text/20 text-center">
                {t('Explore Menu', 'ดูเมนูทั้งหมด')}
              </Link>
              <Link href="/custom" className="bg-cake-card text-cake-text px-8 py-4 rounded-full font-bold text-lg border border-cake-primary/30 hover:border-cake-rose hover:text-cake-rose transition-all text-center">
                {t('Custom Design', 'สั่งทำเค้กพิเศษ')}
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative z-10 w-full">
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-cake-rose/20 border-8 border-white group bg-gradient-to-tr from-cake-primary to-cake-accent">
              {featuredCakes.map((cake, idx) => (
                <img 
                  key={cake.image}
                  src={cake.image}
                  alt={cake.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    idx === slideIndex ? 'opacity-100' : 'opacity-0'
                  } group-hover:scale-105 duration-700`}
                />
              ))}
              <div className="absolute inset-0 bg-black/10 z-10 transition-colors group-hover:bg-black/0"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white/70 font-playfair text-2xl font-bold z-20 mix-blend-overlay pointer-events-none">Book & Bake</div>
            </div>
            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-cake-secondary rounded-full -z-10 animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cake-pink/50 rounded-full -z-10 backdrop-blur-xl"></div>
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section className="py-20 px-6 bg-cake-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-cake-text mb-4">{t('Signature Creations', 'เมนูแนะนำของเรา')}</h2>
            <p className="text-cake-text-light max-w-2xl mx-auto">{t('Our most beloved recipes, baked fresh daily and ready to impress.', 'สูตรเฉพาะที่ใครได้ชิมก็ต้องหลงรัก อบสดใหม่พร้อมเสิร์ฟทุกวัน')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCakes.map((cake, i) => (
              <div key={i} className="group bg-cake-bg rounded-3xl p-6 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-cake-rose/10 cursor-pointer border border-cake-primary/10">
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-cake-primary/50 to-cake-secondary/50 mb-6 overflow-hidden relative">
                   <img src={cake.image} alt={cake.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-xl font-bold text-cake-text">{cake.name}</h3>
                  <span className="font-bold text-cake-rose">{cake.price}</span>
                </div>
                <p className="text-sm text-cake-text-light">{cake.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
