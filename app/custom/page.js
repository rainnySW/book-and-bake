"use client";
import { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';

export default function CustomOrders() {
  const { t } = useSettings();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [occasion, setOccasion] = useState('Wedding');
  const [guests, setGuests] = useState('50-100');
  
  const occasions = [t('Wedding', 'แต่งงาน'), t('Birthday', 'วันเกิด'), t('Anniversary', 'วันครบรอบ'), t('Corporate', 'งานเลี้ยงบริษัท'), t('Other', 'อื่นๆ')];
  const guestRanges = ['10-20', '20-50', '50-100', '100+'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Hide success message after 4 seconds
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen bg-cake-bg px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cake-text mb-4">{t('Design Your Dream Cake', 'ออกแบบเค้กในฝันของคุณ')}</h1>
          <p className="text-cake-text-light max-w-xl mx-auto">
            {t('From towering wedding cakes to bespoke birthday centerpieces, our master bakers will bring your unique vision to life.', 'ไม่ว่าจะเป็นเค้กแต่งงานสุดอลังการ หรือเค้กวันเกิดดีไซน์พิเศษ เราพร้อมเนรมิตเค้กในฝันของคุณให้เป็นจริง')}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-cake-card rounded-3xl p-6 md:p-10 shadow-xl shadow-cake-rose/5 border border-cake-primary/10 animate-fade-in-up" style={{animationDelay: '100ms'}}>
          
          {isSubmitted ? (
            <div className="py-20 text-center animate-fade-in-up">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                ✨
              </div>
              <h2 className="font-playfair text-3xl font-bold text-cake-text mb-3">{t('Request Received!', 'ได้รับคำขอแล้ว!')}</h2>
              <p className="text-cake-text-light max-w-sm mx-auto">
                {t('Thank you! Our head pastry chef will review your design and contact you within 24 hours to discuss details and pricing.', 'ขอบคุณค่ะ! ทีมงานของเราจะตรวจสอบรายละเอียดและติดต่อกลับภายใน 24 ชั่วโมงเพื่อประเมินราคาและพูดคุยเพิ่มเติม')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Occasion Section */}
              <div>
                <label className="block font-playfair text-xl font-bold text-cake-text mb-4">{t("1. What's the occasion?", '1. เนื่องในโอกาสอะไร?')}</label>
                <div className="flex flex-wrap gap-3">
                  {occasions.map(occ => (
                    <button
                      key={occ} type="button"
                      onClick={() => setOccasion(occ)}
                      className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${occasion === occ ? 'bg-cake-text text-cake-bg shadow-md shadow-cake-text/20' : 'bg-cake-bg text-cake-text-light border border-cake-primary/20 hover:border-cake-primary/50'}`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests Section */}
              <div>
                <label className="block font-playfair text-xl font-bold text-cake-text mb-4">{t('2. Estimated Guests?', '2. จำนวนแขกโดยประมาณ?')}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {guestRanges.map(range => (
                    <button
                      key={range} type="button"
                      onClick={() => setGuests(range)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all ${guests === range ? 'bg-cake-text text-cake-bg shadow-sm' : 'bg-cake-bg text-cake-text-light border border-cake-primary/20 hover:border-cake-primary/50'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Flavor Profile */}
                <div>
                  <label className="block font-playfair text-xl font-bold text-cake-text mb-4">{t('3. Flavor Profile', '3. รสชาติที่ต้องการ')}</label>
                  <select className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose text-cake-text font-medium appearance-none">
                    <option>{t('Madagascar Vanilla Bean', 'วานิลลามาดากัสการ์')}</option>
                    <option>{t('Valrhona Dark Chocolate', 'ดาร์กช็อกโกแลตเข้มข้น')}</option>
                    <option>{t('Red Velvet & Cream Cheese', 'เรดเวลเวท และครีมชีส')}</option>
                    <option>{t('Lemon Raspberry', 'เลมอน ราสเบอร์รี่')}</option>
                    <option>{t('I have a custom flavor in mind', 'มีรสชาติพิเศษในใจ')}</option>
                  </select>
                </div>

                {/* Event Date */}
                <div>
                  <label className="block font-playfair text-xl font-bold text-cake-text mb-4">{t('4. Event Date', '4. วันที่จัดงาน')}</label>
                  <input 
                    type="date" required
                    className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose text-cake-text font-medium"
                  />
                </div>
              </div>

              {/* Design Description */}
              <div>
                <label className="block font-playfair text-xl font-bold text-cake-text mb-4">{t('5. Design Vision', '5. รูปแบบที่ต้องการ')}</label>
                <textarea 
                  rows="4" required
                  placeholder={t('Describe your dream cake... (colors, themes, floral arrangements, specific styles)', 'อธิบายเค้กในฝันของคุณ... (ธีมสี, ดอกไม้ประดับ, หรือสไตล์ที่ชอบ)')}
                  className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose text-cake-text text-sm resize-none"
                ></textarea>
              </div>

              {/* Contact Info */}
              <div className="bg-cake-bg/50 p-6 rounded-2xl border border-cake-primary/10">
                <label className="block font-playfair text-xl font-bold text-cake-text mb-4">{t('6. Your Details', '6. ข้อมูลติดต่อ')}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder={t('Full Name', 'ชื่อ-นามสกุล')} required className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose text-sm text-cake-text" />
                  <input type="email" placeholder={t('Email Address', 'อีเมล')} required className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose text-sm text-cake-text" />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-cake-text text-cake-bg font-bold py-5 rounded-2xl mt-4 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-cake-text/20 transition-all text-lg flex items-center justify-center gap-3 group">
                {t('Submit Consultation Request', 'ส่งคำขอประเมินราคา')}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
