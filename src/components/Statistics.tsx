import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Statistics = () => {
  const { t } = useLanguage();

  const stats = [
    {
      number: "93%",
      title: t('statistics.processAutomation')
    },
    {
      number: "10+",
      title: t('statistics.businessCompanies')
    },
    {
      number: "10+",
      title: t('statistics.analyticalProducts')
    }
  ];

  return (
    <>
      <section className="py-8 md:py-10 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center relative">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-[hsl(var(--stats-text))]">
                    {stat.number}
                  </span>
                  <div className="text-[hsl(var(--stats-text))]">
                    <div className="font-medium">
                      {stat.title}
                    </div>
                  </div>
                </div>
                {/* Mobile separator lines */}
                {index < 2 && (
                  <div className="flex justify-center mt-8 mb-0 md:hidden">
                    <div className="w-24 h-px bg-border"></div>
                  </div>
                )}
                {/* Desktop separator lines */}
                {index < 2 && (
                  <div className="absolute right-0 top-0 h-full w-px bg-border hidden md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Separator className="bg-border hidden md:block" />
    </>
  );
};

export default Statistics;