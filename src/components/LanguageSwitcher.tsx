import { useLanguage, Language } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bg' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-12 h-12 rounded-full border-2 border-white/20 font-medium text-sm text-foreground hover:text-primary transition-colors duration-300 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: '#E1E6F0' }}
    >
      {language.toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;