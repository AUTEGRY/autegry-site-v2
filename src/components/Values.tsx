import { Shield, Users, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Values = () => {
  const { t } = useLanguage();
  const values = [
    {
      icon: Shield,
      titleKey: "values.integrity.title",
      descriptionKey: "values.integrity.desc"
    },
    {
      icon: Users,
      titleKey: "values.innovation.title", 
      descriptionKey: "values.innovation.desc"
    },
    {
      icon: Target,
      titleKey: "values.excellence.title",
      descriptionKey: "values.excellence.desc"
    }
  ];

  return (
    <section id="values" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--corporate-dark-green))' }}>
            {t('values.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('values.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-br from-white to-corporate-light/50"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-corporate-navy mb-4 group-hover:text-primary transition-colors duration-300">
                {t(value.titleKey)}
              </h3>
              
              <p className="leading-relaxed" style={{ color: 'hsl(var(--corporate-text-muted))' }}>
                {t(value.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;