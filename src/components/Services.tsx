
import {
  Building,
  Shield,
  Brain,
  TrendingUp,
  LogOut,
  BookOpen,
  DollarSign,
  Megaphone,
  Check,
  FileText,
  RotateCcw
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const Services = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);
  const isMobile = useIsMobile();

  // Listen for filter change events from navigation
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      const { filter } = event.detail;
      if (filter) {
        setActiveFilter(filter);
        setVisibleCardsCount(3);
      }
    };

    window.addEventListener('serviceFilterChange', handleFilterChange as EventListener);
    
    return () => {
      window.removeEventListener('serviceFilterChange', handleFilterChange as EventListener);
    };
  }, []);
  
  const filterCategories = [
    { id: 'all', label: t('services.filters.all') },
    { id: 'currently-applying', label: t('services.filters.applicants') },
    { id: 'active-clients', label: t('services.filters.activeClients') },
    { id: 'inactive-clients', label: t('services.filters.inactiveClients') }
  ];

  const serviceCategories = {
    'currently-applying': [0, 1, 2], // Bureau Scoring, Application Scoring, Fraud Scoring
    'active-clients': [3, 6, 7, 8], // Behavioral Scoring, Collection, Recovery, Cashflow
    'inactive-clients': [4, 5, 9] // Propensity Scoring, Churn Scoring, Marketing
  };
  
  const services = [
    {
      icon: Building,
      titleKey: "services.bureauScoring.title",
      descriptionKey: "services.bureauScoring.desc",
      featureKeys: ["services.features.bureauScoring.1", "services.features.bureauScoring.2", "services.features.bureauScoring.3", "services.features.bureauScoring.4", "services.features.bureauScoring.5"]
    },
    {
      icon: FileText,
      titleKey: "services.applicationScoring.title",
      descriptionKey: "services.applicationScoring.desc",
      featureKeys: ["services.features.applicationScoring.1", "services.features.applicationScoring.2", "services.features.applicationScoring.3", "services.features.applicationScoring.4"]
    },
    {
      icon: Shield,
      titleKey: "services.fraudScoring.title",
      descriptionKey: "services.fraudScoring.desc",
      featureKeys: ["services.features.fraudScoring.1", "services.features.fraudScoring.2", "services.features.fraudScoring.3", "services.features.fraudScoring.4"]
    },
    {
      icon: TrendingUp,
      titleKey: "services.behavioralScoring.title",
      descriptionKey: "services.behavioralScoring.desc",
      featureKeys: ["services.features.behavioral.1", "services.features.behavioral.2", "services.features.behavioral.3"]
    },
    {
      icon: Brain,
      titleKey: "services.propensityScoring.title",
      descriptionKey: "services.propensityScoring.desc",
      featureKeys: ["services.features.churn.1", "services.features.churn.2"]
    },
    {
      icon: LogOut,
      titleKey: "services.churnScore.title",
      descriptionKey: "services.churnScore.desc",
      featureKeys: ["services.features.churn.1", "services.features.churn.2"]
    },
    {
      icon: BookOpen,
      titleKey: "services.collection.title",
      descriptionKey: "services.collection.desc",
      featureKeys: ["services.features.collection.1", "services.features.collection.2"]
    },
    {
      icon: RotateCcw,
      titleKey: "services.recovery.title",
      descriptionKey: "services.recovery.desc",
      featureKeys: ["services.features.recovery.1", "services.features.recovery.2"]
    },
    {
      icon: DollarSign,
      titleKey: "services.cashflow.title",
      descriptionKey: "services.cashflow.desc",
      featureKeys: ["services.features.cashflow.1", "services.features.cashflow.2", "services.features.cashflow.3"]
    },
    {
      icon: Megaphone,
      titleKey: "services.marketing.title",
      descriptionKey: "services.marketing.desc",
      featureKeys: ["services.features.marketing.1", "services.features.marketing.2", "services.features.marketing.3", "services.features.marketing.4", "services.features.marketing.5"]
    }
  ];

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter((_, index) => serviceCategories[activeFilter]?.includes(index));

  // For mobile "All" tab, limit visible cards
  const displayedServices = (isMobile && activeFilter === 'all') 
    ? filteredServices.slice(0, visibleCardsCount)
    : filteredServices;

  const hasMoreCards = isMobile && activeFilter === 'all' && visibleCardsCount < filteredServices.length;
  const showingAllCards = isMobile && activeFilter === 'all' && visibleCardsCount >= filteredServices.length && filteredServices.length > 3;

  const handleLoadMore = () => {
    setVisibleCardsCount(prev => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCardsCount(3);
  };

  // Reset visible cards when filter changes
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setVisibleCardsCount(3);
  };

  return (
    <section id="services" className="py-20" style={{ backgroundColor: 'hsl(var(--corporate-services-bg))' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--corporate-dark-green))' }}>
                {t('services.title')}
              </h2>
              <p className="text-lg mb-4 text-gray-700 leading-relaxed text-left md:text-justify">
                {t('services.description')}
              </p>
              
              {/* Solutions breakdown */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-gray-700 mt-0.5">•</span>
                  <p className="text-lg text-gray-700 leading-snug text-left md:text-justify">
                    <span className="font-medium">{t('services.rsp.title')}</span> - {t('services.rsp.desc')}
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="text-gray-700 mt-0.5">•</span>
                  <p className="text-lg text-gray-700 leading-snug text-left md:text-justify">
                    <span className="font-medium">{t('services.sol.title')}</span> - {t('services.sol.desc')}
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="text-gray-700 mt-0.5">•</span>
                  <p className="text-lg text-gray-700 leading-snug text-left md:text-justify">
                    <span className="font-medium">{t('services.asf.title')}</span> - {t('services.asf.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex overflow-x-auto scrollbar-hide gap-3 mb-8 pb-2">
          <div className="flex gap-3 min-w-max">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === category.id
                    ? 'text-white'
                    : 'bg-white border border-border text-foreground hover:bg-muted'
                }`}
                style={activeFilter === category.id ? { backgroundColor: 'hsl(var(--primary))' } : {}}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-white border border-border hover:bg-primary/5 transition-all duration-300 relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-6 left-6">
                <service.icon 
                  size={32}
                  style={{ color: 'hsl(var(--primary))' }}
                  className="group-hover:opacity-80 transition-all duration-300"
                />
              </div>
              
              <div className="mt-16">
                <h3 className="text-xl font-bold text-corporate-navy mb-4 group-hover:text-primary transition-colors duration-300">
                  {t(service.titleKey)}
                </h3>
                
                <p className="leading-relaxed mb-6" style={{ color: 'hsl(var(--corporate-text-muted))' }}>
                  {t(service.descriptionKey)}
                </p>

                <div className="space-y-2 min-h-[72px]">
                  {service.featureKeys
                    .filter(featureKey => t(featureKey) && t(featureKey).trim() !== '')
                    .map((featureKey, featureIndex) => (
                       <div key={featureIndex} className="flex items-start gap-2">
                         <Check size={16} style={{ color: 'hsl(var(--primary))' }} className="flex-shrink-0 mt-0.5" />
                        <span className="text-sm" style={{ color: 'hsl(var(--corporate-text-muted))' }}>
                          {t(featureKey)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Load More Button - Only visible on mobile for "All" tab */}
        {hasMoreCards && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full"
            >
              {t('services.loadMore')}
            </Button>
          </div>
        )}

        {/* Show Less Button - Only visible on mobile for "All" tab when all cards are shown */}
        {showingAllCards && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleShowLess}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full"
            >
              {t('services.showLess')}
            </Button>
          </div>
        )}
    </section>
  );
};

export default Services;
