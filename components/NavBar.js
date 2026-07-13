"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

export default function NavBar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const { lang, t } = useSettings();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Home', thName: 'หน้าแรก', href: '/', icon: '🏠' },
    { name: 'Menu', thName: 'เมนูขนม', href: '/cakes', icon: '🍰' },
    { name: 'Custom Orders', thName: 'สั่งทำพิเศษ', href: '/custom', icon: '🎨' },
    { name: 'Account', thName: 'บัญชี', href: '/account', icon: '👤' },
    { name: 'Cart', thName: 'ตะกร้า', href: '#', icon: '🛍️' },
  ];

  return (
    <>
      {/* PC Navigation Bar (Top) */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 bg-cake-bg/90 backdrop-blur-md border-b border-cake-primary/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          <Link href="/" className="font-playfair text-2xl font-bold text-cake-rose flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-3xl">🎂</span> Book & Bake
          </Link>
          <div className="flex gap-8 text-sm font-semibold tracking-widest uppercase text-cake-text-light">
            {navItems.map((item) => (
              item.name === 'Cart' ? (
                <button 
                  key={item.name} 
                  onClick={() => setIsCartOpen(true)}
                  className={`transition-colors py-1 hover:text-cake-rose border-b-2 border-transparent flex items-center gap-1`}
                >
                  {t(item.name, item.thName)} {cartCount > 0 && <span className="bg-cake-rose text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>}
                </button>
              ) : (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`transition-colors py-1 ${pathname === item.href ? 'text-cake-rose border-b-2 border-cake-rose' : 'hover:text-cake-rose border-b-2 border-transparent'}`}
                >
                  {t(item.name, item.thName)}
                </Link>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Top Header (Logo Only Now) */}
      <div className="md:hidden flex justify-center items-center p-4 fixed top-0 w-full z-50 bg-cake-bg/90 backdrop-blur-md border-b border-cake-primary/20">
        <Link href="/" className="font-playfair text-xl font-bold text-cake-rose flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🎂</span> Book & Bake
        </Link>
      </div>

      {/* Mobile Navigation Bar (Bottom) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-cake-primary/20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] pb-safe">
        <div className="flex justify-around items-center px-2 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.name === 'Cart') {
              return (
                <button 
                  key={item.name} 
                  onClick={() => setIsCartOpen(true)}
                  className={`flex flex-col items-center gap-1 min-w-[64px] relative text-cake-text-light`}
                >
                  <span className="text-2xl transition-transform">{item.icon}</span>
                  {cartCount > 0 && <span className="absolute top-0 right-3 bg-cake-rose text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>}
                  <span className="text-[9px] font-bold uppercase tracking-wider opacity-70 text-center">
                    {t(item.name, item.thName).replace(' ', '\n')}
                  </span>
                </button>
              );
            }
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex flex-col items-center gap-1 min-w-[64px] ${isActive ? 'text-cake-rose' : 'text-cake-text-light'}`}
              >
                <span className={`text-2xl transition-transform ${isActive ? 'scale-110 drop-shadow-sm' : ''}`}>{item.icon}</span>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-70 text-center'}`}>
                  {t(item.name, item.thName).replace(' ', '\n')}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
