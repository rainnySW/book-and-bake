"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

export default function OptionsModal() {
  const { editingItem, setEditingItem, saveItemOptions } = useCart();
  const { t } = useSettings();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Standard (6\")");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingItem) {
      setQuantity(editingItem.quantity || 1);
      setSize(editingItem.options?.size || "Standard (6\")");
      setMessage(editingItem.options?.message || "");
    }
  }, [editingItem]);

  if (!editingItem) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl animate-fade-in-up relative">
        <button onClick={() => setEditingItem(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-cake-text hover:bg-white z-10">&times;</button>
        
        <div className={`w-full h-48 bg-gradient-to-br ${editingItem.color} overflow-hidden`}>
          {editingItem.image && <img src={editingItem.image} alt={editingItem.name} className="w-full h-full object-cover" />}
        </div>
        
        <div className="p-6 md:p-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-cake-text mb-1">{editingItem.name}</h2>
          <p className="text-cake-text-light text-sm mb-6 line-clamp-2">{editingItem.desc}</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-cake-text mb-3">{t('Cake Size', 'ขนาด')}</label>
              <div className="flex gap-2">
                {[
                  { en: 'Small (4")', th: 'เล็ก (4")' }, 
                  { en: 'Standard (6")', th: 'มาตรฐาน (6")' }, 
                  { en: 'Large (8")', th: 'ใหญ่ (8")' }
                ].map(s => (
                  <button 
                    key={s.en} 
                    onClick={() => setSize(s.en)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 transition-all ${size === s.en ? 'border-cake-rose bg-cake-rose/10 text-cake-rose' : 'border-cake-primary/20 text-cake-text-light hover:border-cake-primary/50'}`}
                  >
                    {t(s.en, s.th)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-cake-text mb-2">{t('Custom Message (Optional)', 'ข้อความบนเค้ก (ไม่บังคับ)')}</label>
              <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder={t('e.g. Happy Birthday Sarah!', 'เช่น สุขสันต์วันเกิดจ๋า')} 
                maxLength={40}
                className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose text-sm text-cake-text"
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <label className="block text-sm font-bold text-cake-text">{t('Quantity', 'จำนวน')}</label>
              <div className="flex items-center gap-4 bg-cake-bg p-1 rounded-full border border-cake-primary/10">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-white text-cake-text font-bold shadow-sm hover:text-cake-rose transition-colors">-</button>
                <span className="font-bold w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-white text-cake-text font-bold shadow-sm hover:text-cake-rose transition-colors">+</button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <button onClick={() => setEditingItem(null)} className="flex-1 py-3 text-cake-text font-bold bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">{t('Cancel', 'ยกเลิก')}</button>
            <button onClick={() => saveItemOptions({...editingItem, quantity, options: { size, message }})} className="flex-[2] py-3 text-white font-bold bg-cake-rose rounded-xl shadow-md shadow-cake-rose/30 hover:bg-cake-rose/90 transition-all active:scale-95">
              {t('Save Options', 'บันทึกตัวเลือก')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
