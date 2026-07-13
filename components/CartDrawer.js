"use client";
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import PaymentModal from './PaymentModal';

export default function CartDrawer() {
  const { cart, setCart, isCartOpen, setIsCartOpen, setEditingItem } = useCart();
  const { t } = useSettings();
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Safe parse price removing ฿ or $
  const parsePrice = (price) => parseFloat(String(price || '0').replace(/฿|\$|,/g, '')) || 0;
  const cartTotal = cart.reduce((sum, item) => sum + (parsePrice(item.price) * (item.quantity || 1)), 0);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity" onClick={() => setIsCartOpen(false)}></div>
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-cake-bg shadow-2xl z-[101] flex flex-col animate-slide-side">
        <div className="p-6 border-b border-cake-primary/20 flex justify-between items-center bg-white">
          <h2 className="font-playfair text-2xl font-bold text-cake-text">{t('Your Order', 'รายการสั่งซื้อของคุณ')}</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-2xl hover:text-cake-rose transition-colors">&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-cake-text-light mt-10">{t('Your cart is empty.', 'ยังไม่มีสินค้าในตะกร้า')}</p>
          ) : (
            cart.map(item => (
              <div key={item.uid} className="bg-cake-card p-4 rounded-2xl shadow-sm border border-cake-primary/10 flex gap-4 relative group/cartitem">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.color} shrink-0 overflow-hidden`}>
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-cake-text truncate">{item.name}</h3>
                    <span className="font-bold text-cake-rose shrink-0">฿{(parsePrice(item.price) * (item.quantity || 1)).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-cake-text-light mb-1 mt-1">{t('Qty', 'จำนวน')}: {item.quantity} | {item.options?.size}</p>
                  {item.options?.message && <p className="text-[10px] text-cake-rose font-semibold truncate">"{item.options.message}"</p>}
                  
                  <div className="flex gap-4 mt-3">
                    <button onClick={() => setEditingItem(item)} className="text-xs font-bold text-[#FFB7B2] hover:text-cake-rose transition-colors">{t('Edit', 'แก้ไข')}</button>
                    <button onClick={() => setCart(prev => prev.filter(i => i.uid !== item.uid))} className="text-xs font-bold text-red-300 hover:text-red-500 transition-colors">{t('Remove', 'ลบ')}</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-cake-primary/20 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] pb-24 md:pb-6">
            <div className="flex justify-between font-playfair text-2xl font-black mb-6">
              <span>{t('Total', 'ยอดรวม')}</span>
              <span>฿{cartTotal.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={() => setIsPaymentOpen(true)}
              className="w-full bg-cake-text text-cake-bg font-bold py-4 rounded-full mb-4 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cake-text/20 transition-all"
            >
              {t('Checkout Now', 'ชำระเงิน')}
            </button>
            
            {!isConfirmingClear ? (
              <button onClick={() => setIsConfirmingClear(true)} className="w-full text-sm font-bold text-red-400 py-2 hover:text-red-500 transition-colors">
                {t('Clear Cart', 'ล้างตะกร้า')}
              </button>
            ) : (
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center animate-fade-in-up">
                <p className="text-xs font-bold text-red-500 mb-3">{t('Are you sure you want to clear?', 'คุณแน่ใจหรือไม่ว่าต้องการล้างตะกร้า?')}</p>
                <div className="flex justify-center gap-2">
                  <button onClick={() => setIsConfirmingClear(false)} className="flex-1 text-xs font-bold text-gray-500 bg-white py-2 rounded-lg hover:bg-gray-50 border border-gray-200">{t('Nevermind', 'ยกเลิก')}</button>
                  <button onClick={() => { setCart([]); setIsConfirmingClear(false); }} className="flex-1 text-xs font-bold text-white bg-red-500 py-2 rounded-lg hover:bg-red-600 shadow-sm">{t('Yes! Proceed', 'ใช่ ลบทั้งหมด')}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        total={cartTotal} 
      />
    </>
  );
}
