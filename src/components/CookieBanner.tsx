import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 animate-slide-up">
      {/* Mobile Layout */}
      <div className="max-w-md mx-auto flex flex-col items-start text-left gap-4 md:hidden">
        {/* Logo at top */}
        <div className="flex-shrink-0">
          <img 
            src="/lovable-uploads/7deed23c-be53-4ad5-aaab-04474a25e582.png" 
            alt="AUTEGRY Logo" 
            className="h-8 w-auto"
          />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground">
          {t('cookieBanner.title')}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {t('cookieBanner.description')} <span className="underline cursor-pointer" onClick={() => navigate('/legal?tab=cookies')}>Cookie Policy</span>.
        </p>
        
        {/* Buttons at bottom */}
        <div className="flex flex-col gap-3 w-full">
          <Button onClick={handleAccept} className="w-full">
            {t('cookieBanner.allowAll')}
          </Button>
          <Button onClick={handleCancel} className="w-full">
            {t('cookieBanner.necessary')}
          </Button>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="max-w-6xl mx-auto hidden md:flex items-start gap-4 px-2">
        {/* Logo on left */}
        <div className="flex-shrink-0">
          <img 
            src="/lovable-uploads/7deed23c-be53-4ad5-aaab-04474a25e582.png" 
            alt="AUTEGRY Logo" 
            className="h-8 w-auto"
          />
        </div>
        
        {/* Content in middle */}
        <div className="flex-1 max-w-2xl pr-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {t('cookieBanner.title')}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('cookieBanner.description')}
          </p>
        </div>
        
        {/* Buttons on right */}
        <div className="flex flex-col gap-3 flex-shrink-0 w-64 ml-2">
          <Button onClick={handleAccept} className="w-full text-sm px-8 py-3">
            {t('cookieBanner.allowAll')}
          </Button>
          <Button onClick={handleCancel} className="w-full text-sm px-8 py-3">
            {t('cookieBanner.necessary')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;