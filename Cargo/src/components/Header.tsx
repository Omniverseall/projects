import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext.hooks';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-primary">CARGO</div>
          
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button 
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#hero" className="hover:text-primary transition-colors">{t('nav.home')}</a>
            <a href="#services" className="hover:text-primary transition-colors">{t('nav.services')}</a>
            <a href="#map" className="hover:text-primary transition-colors">{t('nav.warehouses')}</a>
            <a href="#advantages" className="hover:text-primary transition-colors">{t('nav.benefits')}</a>
            <a href="#contact" className="hover:text-primary transition-colors">{t('nav.application')}</a>
            <LanguageSwitcher />
          </nav>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <a 
              href="#hero" 
              onClick={handleLinkClick} 
              className="block text-primary"
            >
              {t('nav.home')}
            </a>
            <a 
              href="#services" 
              onClick={handleLinkClick} 
              className="block text-primary"
            >
              {t('nav.services')}
            </a>
            <a 
              href="#map" 
              onClick={handleLinkClick} 
              className="block text-primary"
            >
              {t('nav.warehouses')}
            </a>
            <a 
              href="#advantages" 
              onClick={handleLinkClick} 
              className="block text-primary"
            >
              {t('nav.benefits')}
            </a>
            <a 
              href="#contact" 
              onClick={handleLinkClick} 
              className="block text-primary"
            >
              {t('nav.application')}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;