import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Circle } from "lucide-react";

const Legal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("terms");
  const { t } = useLanguage();

  const renderTextWithBullets = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.trim().startsWith('-')) {
        const content = line.trim().substring(1).trim();
        return (
          <div key={index} className="flex items-start gap-2 my-2">
            <Circle className="w-2 h-2 fill-current text-primary mt-2 flex-shrink-0" />
            <span>{content}</span>
          </div>
        );
      }
      return line ? <p key={index}>{line}</p> : <br key={index} />;
    });
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["terms", "privacy", "cookies"].includes(tab)) {
      setActiveSection(tab);
    }
  }, [searchParams]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    navigate(`/legal?tab=${section}`, { replace: true });
  };

  const menuItems = [
    { id: "terms", label: t('footer.terms') },
    { id: "privacy", label: t('footer.privacy') },
    { id: "cookies", label: t('footer.cookies') },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "terms":
        return (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#00473C' }}>{t('legal.terms.title')}</h2>
            <div className="space-y-6 leading-relaxed" style={{ color: '#00473C' }}>
              <p>{t('legal.terms.intro')}</p>
              
              <h3 className="text-xl font-medium mt-8 mb-4" style={{ color: '#00473C' }}>{t('legal.terms.section1.title')}</h3>
              <p>{t('legal.terms.section1.p1')}</p>
              <p>{t('legal.terms.section1.p2')}</p>

              <h3 className="text-xl font-medium mt-8 mb-4" style={{ color: '#00473C' }}>{t('legal.terms.section2.title')}</h3>
              <p>{t('legal.terms.section2.p1')}</p>
              <p>{t('legal.terms.section2.p2')}</p>

              <h3 className="text-xl font-medium mt-8 mb-4" style={{ color: '#00473C' }}>{t('legal.terms.section3.title')}</h3>
              <p>{t('legal.terms.section3.p1')}</p>
              <p>{t('legal.terms.section3.p2')}</p>

              <h3 className="text-xl font-medium mt-8 mb-4" style={{ color: '#00473C' }}>{t('legal.terms.section4.title')}</h3>
              <p>{t('legal.terms.section4.p1')}</p>
              <p>{t('legal.terms.section4.p2')}</p>

              <h3 className="text-xl font-medium mt-8 mb-4" style={{ color: '#00473C' }}>{t('legal.terms.section5.title')}</h3>
              <p>{t('legal.terms.section5.p1')}</p>
              <p>{t('legal.terms.section5.p2')}</p>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: '#00473C' }}>
              {t('legal.privacy.title')}
            </h2>
            <h3 className="text-xl font-semibold" style={{ color: '#00473C' }}>
              {t('legal.privacy.subtitle')}
            </h3>
            <p className="whitespace-pre-line" style={{ color: '#00473C' }}>
              {t('legal.privacy.intro')}
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold" style={{ color: '#00473C' }}>
                {t('legal.privacy.section1.title')}
              </h3>
              <div style={{ color: '#00473C' }}>
                {renderTextWithBullets(t('legal.privacy.section1.intro'))}
              </div>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.privacy.section1.1.title')}
              </h4>
              <div style={{ color: '#00473C' }}>
                {renderTextWithBullets(t('legal.privacy.section1.1.content'))}
              </div>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.privacy.section1.2.title')}
              </h4>
              <div style={{ color: '#00473C' }}>
                {renderTextWithBullets(t('legal.privacy.section1.2.content'))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold" style={{ color: '#00473C' }}>
                {t('legal.privacy.section2.title')}
              </h3>
              <p className="whitespace-pre-line" style={{ color: '#00473C' }}>
                {t('legal.privacy.section2.content')}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold" style={{ color: '#00473C' }}>
                {t('legal.privacy.section3.title')}
              </h3>
              <div style={{ color: '#00473C' }}>
                {renderTextWithBullets(t('legal.privacy.section3.intro'))}
              </div>
              <div style={{ color: '#00473C' }}>
                {renderTextWithBullets(t('legal.privacy.section3.deletion'))}
              </div>
              <div style={{ color: '#00473C' }}>
                {renderTextWithBullets(t('legal.privacy.section3.restriction'))}
              </div>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.privacy.section3.1.title')}
              </h4>
              <p className="whitespace-pre-line" style={{ color: '#00473C' }}>
                {t('legal.privacy.section3.1.content')}
              </p>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.privacy.section3.2.title')}
              </h4>
              <p className="whitespace-pre-line" style={{ color: '#00473C' }}>
                {t('legal.privacy.section3.2.content')}
              </p>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.privacy.section3.3.title')}
              </h4>
              <p className="whitespace-pre-line" style={{ color: '#00473C' }}>
                {t('legal.privacy.section3.3.content')}
              </p>
            </div>
          </div>
        );

      case "cookies":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: '#00473C' }}>
              {t('legal.cookies.title')}
            </h2>
            <h3 className="text-xl font-semibold" style={{ color: '#00473C' }}>
              {t('legal.cookies.subtitle')}
            </h3>
            <p style={{ color: '#00473C' }}>
              {t('legal.cookies.intro')}
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold" style={{ color: '#00473C' }}>
                {t('legal.cookies.section1.title')}
              </h3>
              <p style={{ color: '#00473C' }}>
                {t('legal.cookies.section1.content')}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold" style={{ color: '#00473C' }}>
                {t('legal.cookies.section2.title')}
              </h3>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.cookies.section2.subsection1.title')}
              </h4>
              <p style={{ color: '#00473C' }}>
                {t('legal.cookies.section2.subsection1.content')}
              </p>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.cookies.section2.subsection2.title')}
              </h4>
              <p style={{ color: '#00473C' }}>
                {t('legal.cookies.section2.subsection2.content')}
              </p>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.cookies.section2.subsection3.title')}
              </h4>
              <p style={{ color: '#00473C' }}>
                {t('legal.cookies.section2.subsection3.content')}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold" style={{ color: '#00473C' }}>
                {t('legal.cookies.section3.title')}
              </h3>
              <p style={{ color: '#00473C' }}>
                {t('legal.cookies.section3.content')}
              </p>
              
              <h4 className="text-lg font-semibold mt-4" style={{ color: '#00473C' }}>
                {t('legal.cookies.section3.subsection1.title')}
              </h4>
              <p style={{ color: '#00473C' }}>
                {t('legal.cookies.section3.subsection1.content')}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Mobile/Tablet: Horizontal Scrollable Menu */}
        <div className="lg:hidden mb-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-3 pb-2">
            <div className="flex gap-3 min-w-max">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'bg-white border border-border text-foreground hover:bg-muted'
                  }`}
                  style={activeSection === item.id ? { backgroundColor: 'hsl(var(--primary))' } : {}}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Sidebar Layout */}
        <div className="flex gap-8">
          {/* Left Sidebar Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full text-left py-3 px-4 transition-colors ${
                      activeSection === item.id
                        ? "text-primary font-medium"
                        : "hover:text-primary"
                    }`}
                    style={{
                      color: activeSection === item.id ? 'hsl(var(--primary))' : '#C7CCD5'
                    }}
                  >
                    <span>{item.label}</span>
                  </button>
                  {index < menuItems.length - 1 && (
                    <hr className="border-gray-200 my-2" />
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Vertical Separator - Hidden on mobile/tablet */}
          <div className="hidden lg:block w-px bg-border"></div>

          {/* Content Area */}
          <div className="flex-1 lg:pl-8">
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Legal;