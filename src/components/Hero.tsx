import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "./Navigation";
import heroBg1 from "@/assets/hero-bg-new.png";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="hero" 
      className="relative h-[90vh] md:h-[75vh] lg:h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <Navigation />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg1}
          alt="Professional businesswoman in modern tech environment with green digital network background"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
        />
      </div>

      {/* Central Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center lg:items-end justify-center py-8 lg:pb-12 lg:pt-0">
        <div className="w-full text-center">
          <div className="max-w-4xl mx-auto relative px-4">
            {/* Main Title */}
            <div className="mb-8 md:mb-12 relative z-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 max-w-4xl mx-auto font-bold leading-tight text-white text-center">
                <div className="mb-2">
                  {t('hero.mainTitle').includes('Агрегираме') ? (
                    <>
                      <span className="text-primary">Агрегираме</span> данни,<br />
                      <span className="text-primary">автоматизираме</span> процеси
                    </>
                  ) : (
                    <>
                      We <span className="text-primary">aggregate</span> data,<br />
                      <span className="text-primary">automate</span> processes
                    </>
                  )}
                </div>
              </h1>
              <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed text-white/90 text-center mb-8 md:mb-12">
                {t('hero.subtitle').includes('оптимални') ? (
                  <>
                    и доставяме <span className="font-medium italic">моментни справки</span>,<br />
                    <span className="font-medium italic">оптимални</span>, <span className="font-medium italic">скалируеми</span> и <span className="font-medium italic">достъпни</span><br />
                    аналитични <span className="font-medium italic">решения</span>.
                  </>
                ) : (
                  <>
                    and deliver <span className="font-medium italic">real-time reports</span>,<br />
                    <span className="font-medium italic">optimal</span>, <span className="font-medium italic">scalable</span>, and <span className="font-medium italic">affordable</span><br />
                    analytical <span className="font-medium italic">solutions</span>.
                  </>
                )}
              </p>
            </div>
            
            <div className="relative z-10 mb-8 md:mb-12">
              <h2 className="text-base sm:text-lg font-semibold text-white mb-6 text-left">
                {t('hero.businessTitle')}
              </h2>
              <ul className="text-base max-w-3xl mx-auto text-left space-y-1 md:space-y-2 text-white/90">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <li key={num} className="flex items-start">
                    <span className="text-white mr-3 text-lg">•</span>
                    <span>
                      {t(`hero.feature${num}`).split('"').map((part, index) => {
                        if (index % 2 === 1) {
                          return <span key={index} className="text-primary font-medium">{part}</span>;
                        }
                        return <span key={index}>{part}</span>;
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;