"use client";
import { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function AccountPage() {
  const { isDark, setIsDark, lang, setLang, t } = useSettings();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [user, setUser] = useState(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem('cake_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
      const body = isLoginMode ? { email, password } : { name, email, password, lang, theme: isDark };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setErrorMsg(data.error || 'Authentication failed');
      } else {
        setUser(data.user);
        localStorage.setItem('cake_user', JSON.stringify(data.user));
        
        // Apply saved preferences if they exist
        if (data.user.preferences) {
          if (data.user.preferences.lang) setLang(data.user.preferences.lang);
          if (data.user.preferences.theme !== undefined) setIsDark(data.user.preferences.theme);
        }
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = async (type, value) => {
    // 1. Update local context instantly
    if (type === 'lang') setLang(value);
    if (type === 'theme') setIsDark(value);

    // 2. Save to database if logged in
    if (user) {
      try {
        await fetch('/api/auth/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, [type]: value })
        });
        
        // Update local user object
        const updatedUser = { ...user, preferences: { ...(user.preferences || {}), [type]: value } };
        setUser(updatedUser);
        localStorage.setItem('cake_user', JSON.stringify(updatedUser));
      } catch (err) {
        console.error("Failed to save preference");
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cake_user');
    setEmail('');
    setPassword('');
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-cake-bg px-4 py-8 md:py-12">
      <div className="max-w-md mx-auto animate-fade-in-up">
        <h1 className="font-playfair text-4xl font-bold text-center text-cake-text mb-8">
          {user ? t('My Account', 'บัญชีของฉัน') : t('Welcome', 'ยินดีต้อนรับ')}
        </h1>

        {user ? (
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-cake-rose/5 border border-cake-primary/10 relative overflow-hidden">
            {/* Decorative background blob */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cake-primary/20 rounded-full blur-2xl"></div>
            
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cake-primary to-cake-rose flex items-center justify-center mx-auto mb-4 text-4xl shadow-md">
                👤
              </div>
              <h2 className="font-playfair text-2xl font-bold text-center text-cake-text mb-1">{user.name}</h2>
              <p className="text-center text-cake-text-light text-sm mb-8">{user.email}</p>

              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-cake-text mb-2 border-b border-cake-primary/10 pb-2">
                  {t('User Preferences', 'การตั้งค่าผู้ใช้')}
                </h3>
                
                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4">
                  <button 
                    onClick={() => handlePreferenceChange('lang', lang === 'en' ? 'th' : 'en')}
                    className="py-3 px-2 md:py-4 md:px-5 bg-cake-bg rounded-xl font-bold text-xs md:text-sm text-cake-text hover:bg-cake-primary/20 active:scale-95 transition-all flex items-center justify-center gap-1 md:gap-2 border border-cake-primary/10 shadow-sm"
                  >
                    <span className="text-sm md:text-base">🌐</span>
                    <span>{lang === 'en' ? 'English' : 'ภาษาไทย'}</span>
                  </button>

                  <div 
                    onClick={() => handlePreferenceChange('theme', !isDark)}
                    className="py-3 px-2 md:py-4 md:px-5 bg-cake-bg rounded-xl font-bold text-xs md:text-sm text-cake-text hover:bg-cake-primary/20 active:scale-95 transition-all flex items-center justify-between border border-cake-primary/10 cursor-pointer shadow-sm group"
                  >
                    <div className="flex items-center gap-1 md:gap-3">
                      <span className="text-sm md:text-xl">{isDark ? '🌙' : '☀️'}</span>
                      <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                    <div className={`w-10 h-5 md:w-12 md:h-6 rounded-full p-1 transition-colors duration-300 relative ${isDark ? 'bg-cake-rose' : 'bg-gray-300'}`}>
                      <div className={`bg-white w-3 h-3 md:w-4 md:h-4 rounded-full shadow-md transform transition-transform duration-300 ${isDark ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </div>

                <button onClick={handleLogout} className="w-full py-4 text-sm font-bold text-red-400 bg-red-50 rounded-xl hover:bg-red-100 hover:text-red-500 transition-colors mt-8 shadow-sm">
                  {t('Log Out', 'ออกจากระบบ')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-cake-rose/5 border border-cake-primary/10">
            <div className="flex mb-8 bg-cake-bg p-1 rounded-xl">
              <button 
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${isLoginMode ? 'bg-white text-cake-text shadow-sm' : 'text-cake-text-light hover:text-cake-text'}`}
              >
                {t('Sign In', 'เข้าสู่ระบบ')}
              </button>
              <button 
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${!isLoginMode ? 'bg-white text-cake-text shadow-sm' : 'text-cake-text-light hover:text-cake-text'}`}
              >
                {t('Register', 'สมัครสมาชิก')}
              </button>
            </div>
            
            {errorMsg && (
              <div className="bg-red-50 text-red-500 text-sm font-bold p-3 rounded-lg mb-4 text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-5">
              {!isLoginMode && (
                <div className="animate-fade-in-up" style={{animationDuration: '0.3s'}}>
                  <label className="block text-sm font-bold text-cake-text mb-2">{t('Full Name', 'ชื่อ-นามสกุล')}</label>
                  <input 
                    type="text" required={!isLoginMode}
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose transition-colors"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-cake-text mb-2">{t('Email Address', 'อีเมล')}</label>
                <input 
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-cake-text mb-2">{t('Password', 'รหัสผ่าน')}</label>
                <input 
                  type="password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full p-4 bg-cake-bg border border-cake-primary/20 rounded-xl focus:outline-none focus:border-cake-rose transition-colors"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-cake-rose text-white font-bold py-4 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cake-rose/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t('Processing...', 'กำลังดำเนินการ...')}
                  </>
                ) : (
                  isLoginMode ? t('Sign In', 'เข้าสู่ระบบ') : t('Create Account', 'สร้างบัญชี')
                )}
              </button>
            </form>
          </div>
        )}

        {/* Preferences Section (Only show if logged out) */}
        {!user && (
          <div className="mt-8 bg-cake-card rounded-[2rem] p-6 shadow-xl shadow-cake-rose/5 border border-cake-primary/10">
            <h3 className="font-playfair text-xl font-bold text-cake-text mb-4 text-center">{t('Preferences', 'การตั้งค่า')}</h3>
            
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <button 
                onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
                className="py-3 px-2 md:py-4 md:px-5 bg-cake-bg rounded-xl font-bold text-xs md:text-sm text-cake-text hover:bg-cake-primary/20 transition-colors flex items-center justify-center gap-1 md:gap-2 border border-cake-primary/10 shadow-sm"
              >
                <span className="text-sm md:text-base">🌐</span>
                <span>{lang === 'en' ? 'English' : 'ภาษาไทย'}</span>
              </button>

              <div 
                onClick={() => setIsDark(!isDark)}
                className="py-3 px-2 md:py-4 md:px-5 bg-cake-bg rounded-xl font-bold text-xs md:text-sm text-cake-text hover:bg-cake-primary/10 transition-colors flex items-center justify-between border border-cake-primary/10 cursor-pointer shadow-sm group"
              >
                <div className="flex items-center gap-1 md:gap-3">
                  <span className="text-sm md:text-xl">{isDark ? '🌙' : '☀️'}</span>
                  <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
                <div className={`w-10 h-5 md:w-12 md:h-6 rounded-full p-1 transition-colors duration-300 relative ${isDark ? 'bg-cake-rose' : 'bg-gray-300'}`}>
                  <div className={`bg-white w-3 h-3 md:w-4 md:h-4 rounded-full shadow-md transform transition-transform duration-300 ${isDark ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
