"use client";
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import qrCodeImg from '../context/qr-code.png';

export default function PaymentModal({ isOpen, onClose, total }) {
  const { t } = useSettings();
  const { setCart, setIsCartOpen } = useCart();
  const [method, setMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setCart([]); // Clear cart
        setIsSuccess(false);
        setMethod(null);
        onClose();
        setIsCartOpen(false); // Close cart drawer too
      }, 2500);
    }, 1500);
  };

  const handleBack = () => {
    setMethod(null);
  };

  const handleClose = () => {
    if (isProcessing || isSuccess) return;
    setMethod(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
      
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="p-6 bg-cake-bg border-b border-cake-primary/20 flex justify-between items-center">
          <h2 className="font-playfair text-2xl font-bold text-cake-text">
            {isSuccess ? t('Payment Successful', 'ชำระเงินสำเร็จ') : t('Checkout', 'ชำระเงิน')}
          </h2>
          {!(isProcessing || isSuccess) && (
            <button onClick={handleClose} className="text-2xl hover:text-cake-rose transition-colors">&times;</button>
          )}
        </div>

        <div className="p-6 min-h-[350px] flex flex-col">
          {isSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                ✓
              </div>
              <h3 className="font-playfair text-2xl font-bold text-cake-text mb-2">{t('Thank You!', 'ขอบคุณที่อุดหนุน!')}</h3>
              <p className="text-cake-text-light">{t('Your order has been placed successfully.', 'ได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว')}</p>
            </div>
          ) : !method ? (
            <div className="flex-1 flex flex-col">
              <div className="text-center mb-8">
                <p className="text-sm text-cake-text-light mb-1">{t('Total Amount', 'ยอดชำระทั้งหมด')}</p>
                <p className="font-playfair text-4xl font-bold text-cake-rose">฿{total.toLocaleString()}</p>
              </div>
              
              <p className="text-sm font-bold text-cake-text mb-4">{t('Select Payment Method', 'เลือกช่องทางการชำระเงิน')}</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setMethod('promptpay')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-cake-primary/20 hover:border-cake-rose hover:bg-cake-rose/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                    Pay
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-cake-text">{t('QR Code PromptPay', 'สแกนคิวอาร์โค้ด พร้อมเพย์')}</p>
                    <p className="text-xs text-cake-text-light">{t('Instant transfer via mobile banking app', 'โอนไวผ่านแอปพลิเคชันธนาคาร')}</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setMethod('bank')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-cake-primary/20 hover:border-cake-rose hover:bg-cake-rose/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl shrink-0 group-hover:scale-105 transition-transform">
                    🏦
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-cake-text">{t('Bank Transfer', 'โอนเงินผ่านธนาคาร')}</p>
                    <p className="text-xs text-cake-text-light">{t('Upload transfer slip to confirm', 'แนบสลิปเพื่อยืนยันการชำระเงิน')}</p>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-fade-in-up">
              <button onClick={handleBack} className="text-sm text-cake-text-light hover:text-cake-rose mb-4 font-bold flex items-center gap-1 w-fit">
                ← {t('Back', 'ย้อนกลับ')}
              </button>
              
              <div className="text-center mb-6">
                <p className="font-playfair text-3xl font-bold text-cake-rose">฿{total.toLocaleString()}</p>
              </div>

              {method === 'promptpay' ? (
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
                  <div className="w-48 h-48 bg-white border border-gray-200 p-2 shadow-sm rounded-lg flex items-center justify-center relative mb-4">
                    <Image src={qrCodeImg} alt="PromptPay QR Code" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs text-cake-text-light text-center">{t('Scan this QR code with any banking app', 'สแกนคิวอาร์โค้ดนี้ด้วยแอปธนาคารใดก็ได้')}</p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
                  <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">KBANK</div>
                    <div>
                      <p className="font-bold text-cake-text text-sm">{t('Kasikorn Bank', 'ธนาคารกสิกรไทย')}</p>
                      <p className="text-xs text-cake-text-light">Book & Bake Co., Ltd.</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-mono font-bold tracking-widest text-lg text-cake-text">012-3-45678-9</p>
                    <button className="text-[10px] bg-white border border-gray-200 px-3 py-1 rounded-full font-bold hover:bg-gray-50">{t('COPY', 'คัดลอก')}</button>
                  </div>
                </div>
              )}

              <div className="mt-auto">
                <label className="block w-full text-center border-2 border-dashed border-cake-primary/40 rounded-xl py-4 cursor-pointer hover:bg-cake-bg transition-colors mb-4">
                  <span className="text-sm font-bold text-cake-text-light">{t('Upload Transfer Slip (Optional)', 'แนบสลิปโอนเงิน (ไม่บังคับ)')}</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>

                <button 
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="w-full bg-cake-rose text-white font-bold py-4 rounded-xl shadow-md shadow-cake-rose/30 hover:bg-cake-rose/90 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t('Processing...', 'กำลังประมวลผล...')}
                    </>
                  ) : (
                    t('Confirm Payment', 'ยืนยันการชำระเงิน')
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
