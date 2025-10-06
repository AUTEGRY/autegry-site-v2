import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WhyAutegry = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--corporate-dark-green))' }}>
              {t('whyAutegry.title')}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-4xl mx-auto">
              {t('whyAutegry.subtitle')}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border border-gray-200 hover:shadow-lg transition-all duration-300 group rounded-lg hover:rounded-lg">
              <CardHeader className="pb-4 p-0">
                <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-t-lg">
                  <img 
                    src="/lovable-uploads/79f5df57-e39c-46c8-b82d-49b3517bb1dc.png" 
                    alt="Automation" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-[#00473C] mb-2 px-3">
                  {t('whyAutegry.automation.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-3 pb-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('whyAutegry.automation.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border border-gray-200 hover:shadow-lg transition-all duration-300 group rounded-lg hover:rounded-lg">
              <CardHeader className="pb-4 p-0">
                <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-t-lg">
                  <img 
                    src="/lovable-uploads/dc2471d6-fb19-4ce3-bf56-51e6e25910e7.png" 
                    alt="Real Time Data" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-[#00473C] mb-2 px-3">
                  {t('whyAutegry.realTimeData.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-3 pb-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('whyAutegry.realTimeData.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border border-gray-200 hover:shadow-lg transition-all duration-300 group rounded-lg hover:rounded-lg">
              <CardHeader className="pb-4 p-0">
                <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-t-lg">
                  <img 
                    src="/lovable-uploads/5f13d23a-8f23-4495-98d5-80fd3876dc9f.png" 
                    alt="Analytics" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-[#00473C] mb-2 px-3">
                  {t('whyAutegry.analytics.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-3 pb-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('whyAutegry.analytics.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border border-gray-200 hover:shadow-lg transition-all duration-300 group rounded-lg hover:rounded-lg">
              <CardHeader className="pb-4 p-0">
                <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-t-lg">
                  <img 
                    src="/lovable-uploads/697672d7-10a9-4ef3-8b16-474f91f14f90.png" 
                    alt="Technology" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-[#00473C] mb-2 px-3">
                  {t('whyAutegry.technology.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-3 pb-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('whyAutegry.technology.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAutegry;