import { useState, useEffect } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import aleksandurEfremov from "@/assets/aleksandur-efremov.webp";
import radostinMerakov from "@/assets/radostin-merakov-new.webp";
import ivetaGrigorova from "@/assets/iveta-grigorova-new.webp";
import aleksandurKaramfilov from "@/assets/aleksandur-karamfilov.webp";
import nelinaNedelcheva from "@/assets/nelina-nedelcheva-new.webp";

const Team = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const teamMembers = [
    {
      id: 1,
      image: aleksandurEfremov,
      name: t('team.member1.name'),
      position: t('team.member1.position'),
      email: t('team.member1.email'),
      bio: t('team.member1.bio'),
      linkedin: t('team.member1.linkedin')
    },
    {
      id: 3,
      image: radostinMerakov,
      name: t('team.member3.name'),
      position: t('team.member3.position'),
      email: t('team.member3.email'),
      bio: t('team.member3.bio'),
      linkedin: 'www.linkedin.com/in/radostin-merakov-775055241'
    },
    {
      id: 4,
      image: ivetaGrigorova,
      name: t('team.member4.name'),
      position: t('team.member4.position'),
      email: t('team.member4.email'),
      bio: t('team.member4.bio'),
      linkedin: 'www.linkedin.com/in/iveta-grigorova-0b4b9916b/'
    },
    {
      id: 5,
      image: aleksandurKaramfilov,
      name: t('team.member5.name'),
      position: t('team.member5.position'),
      email: t('team.member5.email'),
      bio: t('team.member5.bio'),
      linkedin: t('team.member5.linkedin')
    },
    {
      id: 6,
      image: nelinaNedelcheva,
      name: t('team.member6.name'),
      position: t('team.member6.position'),
      email: t('team.member6.email'),
      bio: t('team.member6.bio'),
      linkedin: 'www.linkedin.com/in/nelina-nedelcheva/'
    }
  ];

  // Desktop: 2 pages (cards 1,2,3 and cards 4,5,1)
  // Tablet: 3 pages (cards 1,2 and 3,4 and 5)
  // Mobile: 5 pages (one card each)
  const normalizedCurrent = current % teamMembers.length;
  
  // Calculate which page we're on based on the first visible card
  const getDesktopPage = () => {
    // Page 0: positions 0,1,2 (cards 1,2,3)
    // Page 1: positions 3,4 (cards 4,5,1)
    return normalizedCurrent >= 3 ? 1 : 0;
  };
  
  const getTabletPage = () => {
    // Page 0: positions 0,1 (cards 1,2)
    // Page 1: positions 2,3 (cards 3,4)
    // Page 2: position 4 (card 5)
    if (normalizedCurrent <= 1) return 0;
    if (normalizedCurrent <= 3) return 1;
    return 2;
  };
  
  const currentPage = isMobile 
    ? normalizedCurrent 
    : isDesktop 
      ? getDesktopPage()
      : getTabletPage();

  return (
    <div className="mt-16 bg-white">
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: isMobile ? 1 : isDesktop ? 3 : 2,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {teamMembers.map((member) => (
              <CarouselItem key={member.id} className="pl-2 basis-[90%] md:basis-1/2 lg:basis-1/3">
                <div className="relative overflow-hidden rounded-lg shadow-lg h-[540px] flex flex-col bg-white">
                  {/* Person Image - 2/3 of card */}
                  <div className="h-[360px] overflow-hidden rounded-t-lg flex-shrink-0">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  
                  {/* Text Section - 1/3 of card */}
                  <div className="bg-white p-6 rounded-b-lg h-[180px] flex-shrink-0 relative">
                    <div className="flex flex-col justify-between h-full">
                      <div className="text-left">
                        <h3 className="text-lg font-bold mb-2 text-left" style={{ color: 'hsl(var(--corporate-dark-green))' }}>
                          {member.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-left">
                          {member.position}
                        </p>
                      </div>
                      
                      {/* Plus Button */}
                      <div className="flex justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button 
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                              style={{ backgroundColor: 'hsl(var(--corporate-dark-green))' }}
                              aria-label={`View details for ${member.name}`}
                            >
                              <Plus className="h-4 w-4 text-white" />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md bg-white">
                            <div className="relative">
                              {/* Close button is automatically handled by DialogContent */}
                              
                              {/* Modal Content */}
                              <div className="flex flex-col items-center text-center space-y-4">
                                {/* Image */}
                                <div className="w-32 h-32 rounded-full overflow-hidden">
                                  <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                                
                                {/* Name */}
                                <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--corporate-dark-green))' }}>
                                  {member.name}
                                </h3>
                                
                                {/* Position */}
                                <p className="text-gray-600 font-medium">
                                  {member.position}
                                </p>
                                
                                {/* Bio */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {member.bio}
                                </p>
                                
                                {/* LinkedIn Button */}
                                <Button
                                  asChild
                                  className="rounded-full px-6 py-2 mt-2 text-white hover:opacity-90 transition-opacity"
                                  style={{ backgroundColor: 'hsl(var(--corporate-dark-green))' }}
                                >
                                  <a 
                                    href={`https://${member.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    {t('team.connect')}
                                    <Linkedin size={16} />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious 
            onClick={(e) => {
              e.preventDefault();
              if (isDesktop) {
                // Desktop: toggle between position 0 and 3
                const targetPosition = normalizedCurrent >= 3 ? 0 : 0;
                api?.scrollTo(targetPosition);
              } else if (!isMobile) {
                // Tablet: go back by 2
                const newPos = (normalizedCurrent - 2 + teamMembers.length) % teamMembers.length;
                api?.scrollTo(newPos);
              } else {
                // Mobile: use default behavior
                api?.scrollPrev();
              }
            }}
            className="left-0 -translate-x-20 bg-transparent border-none text-gray-700 hover:text-gray-800 hover:bg-transparent shadow-none w-12 h-12" 
          />
          <CarouselNext 
            onClick={(e) => {
              e.preventDefault();
              if (isDesktop) {
                // Desktop: toggle between position 0 and 3
                const targetPosition = normalizedCurrent < 3 ? 3 : 0;
                api?.scrollTo(targetPosition);
              } else if (!isMobile) {
                // Tablet: go forward by 2
                const newPos = (normalizedCurrent + 2) % teamMembers.length;
                api?.scrollTo(newPos);
              } else {
                // Mobile: use default behavior
                api?.scrollNext();
              }
            }}
            className="right-0 translate-x-20 bg-transparent border-none text-gray-700 hover:text-gray-800 hover:bg-transparent shadow-none w-12 h-12" 
          />
        </Carousel>
        
        {/* Dots Indicator - Mobile only */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {isMobile ? (
            // Mobile: show all 5 dots
            teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  current % teamMembers.length === index
                    ? "w-8 bg-[hsl(var(--corporate-dark-green))]"
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))
          ) : isDesktop ? (
            // Desktop: Dot 1 = cards 1,2,3 (positions 0-2), Dot 2 = cards 4,5,1 (positions 3-4)
            [0, 1].map((dotIndex) => {
              const isActive = currentPage === dotIndex;
              return (
                <button
                  key={dotIndex}
                  onClick={() => api?.scrollTo(dotIndex === 0 ? 0 : 3)}
                  className={`h-2 rounded-full transition-all ${
                    isActive
                      ? "w-8 bg-[hsl(var(--corporate-dark-green))]"
                      : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to page ${dotIndex + 1}`}
                />
              );
            })
          ) : (
            // Tablet: Dot 1 = cards 1,2 (positions 0-1), Dot 2 = cards 3,4 (positions 2-3), Dot 3 = card 5 (position 4)
            [0, 1, 2].map((dotIndex) => {
              const isActive = currentPage === dotIndex;
              const scrollPositions = [0, 2, 4];
              return (
                <button
                  key={dotIndex}
                  onClick={() => api?.scrollTo(scrollPositions[dotIndex])}
                  className={`h-2 rounded-full transition-all ${
                    isActive
                      ? "w-8 bg-[hsl(var(--corporate-dark-green))]"
                      : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to page ${dotIndex + 1}`}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;