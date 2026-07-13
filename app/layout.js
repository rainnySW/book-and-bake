import { Pridi, Kanit } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import { CartProvider } from '@/context/CartContext';
import { SettingsProvider } from '@/context/SettingsContext';

const pridi = Pridi({ subsets: ['latin', 'thai'], weight: ['300', '400', '700'], variable: '--font-playfair' });
const kanit = Kanit({ subsets: ['latin', 'thai'], weight: ['300', '400', '500', '700'], variable: '--font-inter' });

export const metadata = {
  title: 'Book & Bake | Artisanal Cakes',
  description: 'Handcrafted luxury cakes for your special occasions.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎂</text></svg>',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} ${pridi.variable} font-sans antialiased`}>
        <SettingsProvider>
          <CartProvider>
            <NavBar />
            <div className="pt-16 md:pt-20 pb-20 md:pb-0">
              {children}
            </div>
          </CartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
