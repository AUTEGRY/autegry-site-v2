import { CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Process = () => {
  const { t } = useLanguage();
  const steps = [
    {
      number: "01",
      titleKey: "process.step1.title",
      descriptionKey: "process.step1.desc"
    },
    {
      number: "02", 
      titleKey: "process.step2.title",
      descriptionKey: "process.step2.desc"
    },
    {
      number: "03",
      titleKey: "process.step3.title",
      descriptionKey: "process.step3.desc"
    },
    {
      number: "04",
      titleKey: "process.step4.title",
      descriptionKey: "process.step4.desc"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--corporate-dark-green))' }}>
            {t('process.title')}
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--corporate-text-muted))' }}>
            {t('process.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-corporate-accent to-primary opacity-30"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step Number Circle */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-corporate-accent rounded-full mb-6 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>

                {/* Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full transform -translate-y-1/2 z-0">
                    <ArrowRight className="w-6 h-6 text-primary/40 ml-4" />
                  </div>
                )}

                {/* Content Card */}
                <div className="bg-white p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-corporate-light/50">
                  <h3 className="text-xl font-bold text-corporate-navy mb-3 group-hover:text-primary transition-colors duration-300">
                    {t(step.titleKey)}
                  </h3>
                  
                  <p className="leading-relaxed text-sm" style={{ color: 'hsl(var(--corporate-text-muted))' }}>
                    {t(step.descriptionKey)}
                  </p>

                  {/* Completion indicator */}
                  <div className="mt-4 flex items-center text-corporate-success opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">Process Step</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-corporate-accent/10 rounded-full border border-primary/20">
            <span className="text-primary font-medium">Ready to get started?</span>
            <ArrowRight className="w-4 h-4 ml-2 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;