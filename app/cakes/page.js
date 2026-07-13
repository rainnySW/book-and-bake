"use client";

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';

export default function CakeMenu() {
  const { t } = useSettings();
  const [activeCategory, setActiveCategory] = useState("All");
  const { quickAddToCart, setEditingItem } = useCart();

  const cakeMenu = [
    { id: 1, name: "Raspberry Rose Delight", category: "Signature", desc: t("Vanilla sponge with raspberry compote and delicate rose buttercream.", "สปันจ์วานิลลานุ่มละมุน สอดไส้ซอสราสเบอร์รี่และบัตเตอร์ครีมกุหลาบหอมหวาน"), price: "฿250", popular: true, color: "from-pink-200 to-rose-200", image: "/images/raspberry_rose_cake_1783664181286.jpg" },
    { id: 2, name: "Matcha Velvet", category: "Signature", desc: t("Premium ceremonial matcha layers with white chocolate ganache.", "มัทฉะพรีเมียมเข้มข้น สลับชั้นกับไวท์ช็อกโกแลตกานาซสุดหรู"), price: "฿280", popular: true, color: "from-green-200 to-emerald-200", image: "/images/matcha_velvet_cake_1783664314968.jpg" },
    { id: 3, name: "Classic Earl Grey", category: "Classic", desc: t("Earl grey infused cake with salted caramel drip and fresh figs.", "เค้กเนื้อนุ่มหอมกลิ่นชาเอิร์ลเกรย์ ราดคาราเมลเค็มและท็อปด้วยมะเดื่อฝรั่งสด"), price: "฿240", popular: false, color: "from-amber-100 to-orange-200", image: "/images/earl_grey_cake_1783677188490.jpg" },
    { id: 4, name: "Dark Truffle Noir", category: "Classic", desc: t("Decadent 70% dark chocolate sponge with espresso ganache.", "สปันจ์ดาร์กช็อกโกแลต 70% สุดเข้มข้น พร้อมเอสเพรสโซ่กานาซชุ่มฉ่ำ"), price: "฿290", popular: true, color: "from-stone-700 to-stone-900", image: "/images/dark_truffle_cake_1783677201107.jpg" },
    { id: 5, name: "Lemon Lavender", category: "Seasonal", desc: t("Zesty lemon cake with calming lavender infused buttercream.", "เค้กเลมอนเปรี้ยวอมหวาน หอมกลิ่นบัตเตอร์ครีมดอกลาเวนเดอร์อ่อนๆ"), price: "฿220", popular: false, color: "from-purple-200 to-indigo-200", image: "/images/lemon_lavender_cake_1783677218564.jpg" },
    { id: 6, name: "Pistachio Framboise", category: "Signature", desc: t("Roasted pistachio sponge layered with tart raspberry gel.", "เค้กพิสตาชิโอคั่วหอมกรุ่น สลับชั้นเจลลี่ราสเบอร์รี่รสเปรี้ยวอมหวาน"), price: "฿270", popular: false, color: "from-lime-200 to-green-300", image: "/images/pistachio_framboise_cake_1783677228333.jpg" },
    { id: 7, name: "Mango Passionfruit Oasis", category: "Seasonal", desc: t("A tropical delight featuring fresh mango layers and tangy passionfruit gel.", "เค้กสไตล์ทรอปิคอล สลับชั้นด้วยเนื้อมะม่วงน้ำดอกไม้สดและเจลลี่เสาวรสรสอมเปรี้ยว"), price: "฿260", popular: true, color: "from-yellow-200 to-orange-200", image: "/images/mango_passion_cake_1783930822559.jpg" },
    { id: 8, name: "Strawberry Shortcake Cloud", category: "Signature", desc: t("Japanese-style light sponge cake with fresh strawberries and fluffy chantilly cream.", "สตรอว์เบอร์รีชอร์ตเค้กสไตล์ญี่ปุ่น เนื้อเค้กเนียนนุ่มดุจปุยเมฆ พร้อมครีมสดและสตรอว์เบอร์รี"), price: "฿240", popular: true, color: "from-red-100 to-rose-200", image: "/images/strawberry_shortcake_1783930831687.jpg" },
    { id: 9, name: "Caramel Macadamia Bliss", category: "Classic", desc: t("Rich coffee sponge cake topped with salted caramel drip and roasted macadamia nuts.", "เค้กกาแฟรสเข้มข้น ราดด้วยซอสคาราเมลเค็มหวานมัน และท็อปปิ้งแมคคาเดเมียคั่วกรอบ"), price: "฿290", popular: false, color: "from-amber-200 to-amber-600", image: "/images/caramel_macadamia_1783930842180.jpg" },
    { id: 10, name: "Red Velvet Royale", category: "Classic", desc: t("Classic red velvet cake with creamy cream cheese frosting and a hint of cocoa.", "เค้กเรดเวลเวตสีแดงกำมะหยี่ หอมกลิ่นโกโก้อ่อนๆ พร้อมครีมชีสฟรอสติ้งสุดละมุน"), price: "฿250", popular: true, color: "from-red-600 to-red-800", image: "/images/red_velvet_cake_1783931015550.jpg" },
    { id: 11, name: "Coconut Pandan Dream", category: "Signature", desc: t("Traditional Thai pandan chiffon with layers of young coconut meat and light cream.", "ชิฟฟ่อนใบเตยสูตรต้นตำรับ สอดไส้เนื้อมะพร้าวอ่อนและครีมสดหอมหวาน"), price: "฿220", popular: true, color: "from-green-100 to-emerald-300", image: "/images/coconut_pandan_cake_1783931027353.jpg" },
    { id: 12, name: "Blueberry Cheesecake Swirl", category: "Classic", desc: t("Baked New York cheesecake swirled with homemade blueberry compote.", "นิวยอร์กชีสเค้กอบเนื้อเนียนแน่น สลับชั้นด้วยซอสบลูเบอร์รีโฮมเมด"), price: "฿280", popular: false, color: "from-indigo-200 to-purple-400", image: "/images/blueberry_cheesecake_1783931036547.jpg" },
    { id: 13, name: "Tiramisu Elegance", category: "Signature", desc: t("Espresso-soaked ladyfingers with rich mascarpone cream and dusted cocoa.", "เลดี้ฟิงเกอร์ชุ่มฉ่ำด้วยกาแฟเอสเพรสโซ่ และมาสคาร์โปนครีมเนื้อเนียน โรยผงโกโก้"), price: "฿270", popular: true, color: "from-stone-300 to-stone-500", image: "/images/tiramisu_cake_1783931046526.jpg" },
    { id: 14, name: "Yuzu Citrus Burst", category: "Seasonal", desc: t("Light sponge cake layered with tangy Japanese yuzu curd and fluffy meringue.", "สปันจ์เค้กเนื้อเบา สลับชั้นด้วยครีมยูซุญี่ปุ่นรสเปรี้ยวอมหวาน และเมอแรงก์นุ่มฟู"), price: "฿260", popular: false, color: "from-yellow-100 to-yellow-300", image: "/images/yuzu_citrus_cake_1783931056240.jpg" },
    { id: 15, name: "Chocolate Hazelnut Praline", category: "Signature", desc: t("Dense chocolate cake loaded with Nutella buttercream and caramelized hazelnuts.", "เค้กช็อกโกแลตเนื้อแน่น สอดไส้บัตเตอร์ครีมนูเทลล่าและเฮเซลนัทคาราเมลกรุบกรอบ"), price: "฿320", popular: true, color: "from-amber-800 to-stone-800", image: "/images/choco_hazelnut_cake_1783931065888.jpg" }
  ];

  const categories = ["All", "Signature", "Classic", "Seasonal"];
  const categoryThMap = { "All": "ทั้งหมด", "Signature": "ซิกเนเจอร์", "Classic": "คลาสสิก", "Seasonal": "ฤดูกาล" };

  const filteredCakes = cakeMenu.filter(cake => 
    activeCategory === "All" || cake.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-cake-bg px-4 md:px-8 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto pt-6 md:pt-12 mb-10 text-center md:text-left animate-fade-in-up">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cake-text mb-4">{t('Our Collection', 'เมนูเค้กของเรา')}</h1>
        <p className="text-cake-text-light max-w-xl mx-auto md:mx-0">{t('Browse our selection of meticulously crafted cakes. Perfect for any celebration or a luxurious afternoon treat.', 'เลือกสรรเค้กสุดพิเศษที่อบสดใหม่ในทุกๆ วัน เพื่อช่วงเวลาแห่งความสุขของคุณ')}</p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-10 animate-fade-in-up" style={{animationDelay: '100ms'}}>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${activeCategory === cat ? 'bg-cake-text text-cake-bg shadow-md' : 'bg-cake-card text-cake-text-light hover:bg-cake-primary/10 hover:text-cake-text'}`}
            >
              {t(cat, categoryThMap[cat])}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 pb-12">
        {filteredCakes.map((cake, index) => (
          <div 
            key={cake.id} 
            className="group flex flex-col md:flex-row lg:flex-col bg-cake-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-cake-rose/15 transition-all duration-500 border border-cake-primary/10 relative animate-fade-in-up"
            style={{animationDelay: `${(index % 6) * 100 + 200}ms`}}
          >
            
            {/* Image Area */}
            <div 
              onClick={() => setEditingItem({...cake, quantity: 1, options: { size: "Standard (6\")", message: "" }})}
              className={`relative w-full aspect-square md:aspect-auto lg:aspect-[4/3] bg-gradient-to-br ${cake.color} overflow-hidden shrink-0 cursor-pointer`}
            >
              <img src={cake.image} alt={cake.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              
              {cake.popular && (
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-cake-bg/90 backdrop-blur-sm text-cake-rose text-[8px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1 rounded-full shadow-sm uppercase tracking-wider z-10">
                  {t('Bestseller', 'ขายดี')}
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm">
                <span className="bg-cake-card text-cake-text font-bold px-4 py-2 rounded-full text-sm shadow-lg">{t('View Details', 'ดูรายละเอียด')}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-3 md:p-6 flex flex-col flex-1">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs font-bold text-cake-rose mb-1 uppercase tracking-wider">{t(cake.category, categoryThMap[cake.category])}</p>
                  <p className="font-playfair text-xl font-bold text-cake-text">{cake.name}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); quickAddToCart(cake); }}
                  className="w-10 h-10 rounded-full bg-cake-text text-cake-bg flex items-center justify-center font-bold hover:scale-110 active:scale-95 transition-transform shadow-md" 
                  title={t("Quick Add", "เพิ่มลงตะกร้า")}
                >
                  +
                </button>
              </div>
              
              <p className="text-[10px] md:text-sm text-cake-text-light mb-3 md:mb-6 flex-1 line-clamp-2 md:line-clamp-none lg:line-clamp-2 leading-snug md:leading-normal">
                {cake.desc}
              </p>
              
              {/* Add Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setEditingItem({...cake, quantity: 1, options: { size: "Standard (6\")", message: "" }}); }}
                className="w-full mt-auto bg-cake-bg text-cake-text font-bold py-2 px-2 md:py-3 md:px-6 rounded-xl md:rounded-2xl hover:bg-cake-rose hover:text-white transition-all flex justify-center items-center gap-1 md:gap-2 group/btn border border-cake-primary/20 hover:border-transparent active:scale-95 text-xs md:text-base"
              >
                <span>{t('Options & Add', 'เลือกตัวเลือก & เพิ่ม')}</span>
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
