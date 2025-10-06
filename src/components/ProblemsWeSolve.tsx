import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Settings, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ProblemsWeSolve = () => {
  const { t } = useLanguage();
  
  const renderWithMobileBreak = (text: string, breakBefore: string) => {
    const idx = text.indexOf(breakBefore);
    if (idx === -1) {
      return <span className="whitespace-normal md:whitespace-nowrap break-words">{text}</span>;
    }
    const first = text.slice(0, idx).trimEnd();
    const second = text.slice(idx);
    return (
      <>
        <span className="whitespace-normal">{first} </span>
        <br className="block md:hidden" />
        <span className="whitespace-normal">{second}</span>
      </>
    );
  };
  
  const problems = [
    {
      problem: t('problems.1.title'),
      description: t('problems.1.desc1'),
      features: [t('problems.1.feature1')],
      result: t('problems.1.result')
    },
    {
      problem: t('problems.2.title'),
      description: t('problems.2.desc1'),
      features: [t('problems.2.feature1')],
      result: t('problems.2.result')
    },
    {
      problem: t('problems.3.title'),
      description: t('problems.3.desc1'),
      features: [t('problems.3.feature1'), t('problems.3.feature2')],
      result: t('problems.3.result')
    },
    {
      problem: t('problems.4.title'),
      description: t('problems.4.desc1'),
      features: [t('problems.4.feature1'), t('problems.4.feature2')],
      result: t('problems.4.result')
    },
    {
      problem: t('problems.5.title'),
      description: t('problems.5.desc1'),
      features: [t('problems.5.feature1'), t('problems.5.feature2')],
      result: t('problems.5.result')
    },
    {
      problem: t('problems.6.title'),
      description: t('problems.6.desc1'),
      features: [t('problems.6.feature1'), t('problems.6.feature2'), t('problems.6.feature3')],
      result: t('problems.6.result')
    },
    {
      problem: t('problems.7.title'),
      description: t('problems.7.desc1'),
      features: [t('problems.7.feature1')],
      result: t('problems.7.result')
    },
    {
      problem: t('problems.8.title'),
      description: t('problems.8.desc1'),
      features: [t('problems.8.feature1'), t('problems.8.feature2'), t('problems.8.feature3')],
      result: t('problems.8.result')
    },
    {
      problem: t('problems.9.title'),
      description: t('problems.9.desc1'),
      features: [t('problems.9.feature1')],
      result: t('problems.9.result')
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--corporate-dark-green))' }}>
            {t('problems.title')}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-0">
            {problems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background border-0 border-b border-muted-foreground/20">
                <AccordionTrigger className="px-0 py-6 text-left font-medium text-corporate-navy hover:no-underline">
                  <div className="flex flex-1 min-w-0 items-center gap-2 md:flex-nowrap flex-wrap">
                    {item.problem.includes('→') ? (
                      <>
                        <span className="whitespace-nowrap">{item.problem.split(' → ')[0]}</span>
                        <ArrowRight className="w-4 h-4 text-corporate-navy flex-shrink-0" />
                        <span className="whitespace-normal md:whitespace-nowrap break-words">{item.problem.split(' → ')[1]}</span>
                      </>
                    ) : (
                  item.problem === t('problems.3.title')
                    ? (
                      <>
                        <span className="whitespace-normal">{item.problem.split(item.problem.includes('желан') ? ' желан' : ' desired')[0]}</span>
                        <br className="block md:hidden" />
                        <span className="whitespace-normal">{item.problem.includes('желан') ? ' желан риск' : ' desired risk'}</span>
                      </>
                    )
                        : item.problem === t('problems.4.title')
                          ? renderWithMobileBreak(
                              item.problem,
                              item.problem.includes('кандидати') ? 'кандидати' : 'candidates'
                            )
                          : <span className="whitespace-normal md:whitespace-nowrap break-words">{item.problem}</span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-6">
                  <div className="space-y-6">
                    <div className="text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          <Settings className="w-4 h-4 text-corporate-navy flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-corporate-navy font-medium">{item.result}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;