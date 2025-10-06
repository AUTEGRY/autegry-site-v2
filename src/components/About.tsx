import { useLanguage } from "@/contexts/LanguageContext";
import Team from "@/components/Team";

const About = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="about" 
      className="relative py-20 lg:py-32 overflow-hidden bg-white"
    >
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* About Autegry Title */}
        <div className="text-center mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--corporate-dark-green))' }}>
            {t('about.title')}
          </h2>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-8 lg:gap-16 mt-16 relative pb-8 md:pb-16">
          {/* Mission - Left */}
          <div className="text-center flex flex-col justify-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#00473C] mb-4 md:mb-6">
              {t('about.mission.title')}
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 md:mb-0">
              {t('about.mission.desc')}
            </p>
          </div>

          {/* Vision - Right */}
          <div className="text-center flex flex-col justify-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#00473C] mb-4 md:mb-6">
              {t('about.vision.title')}
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xs mx-auto mb-8 md:mb-0">
              {t('about.vision.desc')}
            </p>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="text-center mt-8 md:mt-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#00473C] mb-4 md:mb-6">
            {t('about.whoWeAre.title')}
          </h3>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {t('about.whoWeAre.desc')}
          </p>
          
          {/* Team Section */}
          <Team />
        </div>
      </div>
    </section>
  );
};

export default About;