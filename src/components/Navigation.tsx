import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string, filter?: string) => {
    if (location.pathname === '/') {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        
        // If filter is provided for services section, trigger filter change
        if (sectionId === 'services' && filter) {
          const event = new CustomEvent('serviceFilterChange', { detail: { filter } });
          window.dispatchEvent(event);
        }
      }
    } else {
      // If on another page, navigate to home first
      if (sectionId === 'hero') {
        navigate('/');
      } else {
        const hash = filter ? `#${sectionId}?filter=${filter}` : `#${sectionId}`;
        navigate(hash);
      }
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => { setActiveSection('hero'); setIsMobileMenuOpen(false); }} className="flex items-center cursor-pointer">
              <img 
                src="/lovable-uploads/7deed23c-be53-4ad5-aaab-04474a25e582.png" 
                alt="AUTEGRY Logo" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => handleNavigation('hero')}
                className={`relative transition-colors duration-300 ${
                  activeSection === 'hero' 
                    ? 'text-primary font-medium' 
                    : 'text-[#00473C] hover:text-primary font-normal hover:font-medium'
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 ${
                  activeSection === 'hero' ? 'after:scale-x-0' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left'
                }`}
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => handleNavigation('services')}
                className={`relative transition-colors duration-300 ${
                  activeSection === 'services' 
                    ? 'text-primary font-medium' 
                    : 'text-[#00473C] hover:text-primary font-normal hover:font-medium'
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 ${
                  activeSection === 'services' ? 'after:scale-x-0' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left'
                }`}
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className={`relative transition-colors duration-300 ${
                  activeSection === 'about' 
                    ? 'text-primary font-medium' 
                    : 'text-[#00473C] hover:text-primary font-normal hover:font-medium'
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 ${
                  activeSection === 'about' ? 'after:scale-x-0' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left'
                }`}
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => handleNavigation('contact')}
                className={`relative transition-colors duration-300 ${
                  activeSection === 'contact' 
                    ? 'text-primary font-medium' 
                    : 'text-[#00473C] hover:text-primary font-normal hover:font-medium'
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 ${
                  activeSection === 'contact' ? 'after:scale-x-0' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left'
                }`}
              >
                {t('nav.contact')}
              </button>
            </div>

            {/* Desktop Get in Touch Button and Language Switcher */}
            <div className="hidden lg:flex items-center gap-4">
              <Button 
                onClick={() => handleNavigation('contact')}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-[99px] font-medium transition-all duration-300 hover:scale-105"
              >
                {t('nav.getInTouch')}
              </Button>
              <LanguageSwitcher />
            </div>

            {/* Tablet Get in Touch Button */}
            <div className="hidden md:flex lg:hidden items-center gap-1">
              <Button 
                onClick={() => handleNavigation('contact')}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-[99px] font-medium transition-all duration-300 hover:scale-105"
              >
                {t('nav.getInTouch')}
              </Button>
            </div>

            {/* Mobile Right Section: Language Switcher + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={toggleMobileMenu}
                className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm text-primary hover:text-primary/80 transition-colors duration-300"
                style={{ backgroundColor: '#E1E6F0' }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden" style={{ top: '72px' }}>
          <div className="px-6 py-8 space-y-6">
            {/* Home */}
            <button
              onClick={() => handleNavigation('hero')}
              className="block w-full text-left text-lg font-medium text-[#00473C] hover:text-primary transition-colors"
            >
              {t('nav.home')}
            </button>
            
            {/* Separator */}
            <hr className="border-gray-200" />
            
            {/* Services */}
            <button
              onClick={() => handleNavigation('services')}
              className="block w-full text-left text-lg font-medium text-[#00473C] hover:text-primary transition-colors"
            >
              {t('nav.services')}
            </button>
            
            {/* Separator */}
            <hr className="border-gray-200" />
            
            {/* About */}
            <button
              onClick={() => handleNavigation('about')}
              className="block w-full text-left text-lg font-medium text-[#00473C] hover:text-primary transition-colors"
            >
              {t('nav.about')}
            </button>
            
            {/* Separator */}
            <hr className="border-gray-200" />
            
            {/* Contact */}
            <button
              onClick={() => handleNavigation('contact')}
              className="block w-full text-left text-lg font-medium text-[#00473C] hover:text-primary transition-colors"
            >
              {t('nav.contact')}
            </button>
            
            {/* Get in Touch Button */}
            <div className="pt-4">
              <Button 
                onClick={() => handleNavigation('contact')}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-[99px] font-medium transition-all duration-300 hover:scale-105"
              >
                {t('nav.getInTouch')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;