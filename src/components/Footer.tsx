import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Dribbble } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const getHref = (linkText: string) => {
    // Email links
    if (linkText.includes('@')) return `mailto:${linkText}`;
    
    // Company links
    if (linkText === t('footer.home')) return '#';
    if (linkText === t('footer.aboutUs')) return '#about';
    if (linkText === t('footer.solutions')) return '#services';
    if (linkText === t('footer.contact')) return '#contact';
    
    // Services links - all point to services section
    if (linkText === t('services.filters.all') || 
        linkText === t('services.filters.applicants') ||
        linkText === t('services.filters.activeClients') ||
        linkText === t('services.filters.inactiveClients')) {
      return '#services';
    }
    
    return '#';
  };

  const footerSections = [
    {
      title: t('footer.company'),
      links: [
        t('footer.home'),
        t('footer.aboutUs'),
        t('footer.solutions'),
        t('footer.contact')
      ]
    },
    {
      title: t('footer.services'),
      links: [
        t('services.filters.all'),
        t('services.filters.applicants'),
        t('services.filters.activeClients'),
        t('services.filters.inactiveClients')
      ]
    },
    {
      title: t('footer.getInTouch'),
      links: [
        "info@autegry.com"
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/7deed23c-be53-4ad5-aaab-04474a25e582.png" 
                alt="AUTEGRY Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Footer Sections */}
          <div className="lg:col-span-4 grid lg:grid-cols-3 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-gray-900">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={getHref(link)}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              {section.title === "Get in touch" && (
                <div className="flex space-x-3 mt-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <Linkedin className="w-4 h-4 text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <Instagram className="w-4 h-4 text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <Facebook className="w-4 h-4 text-gray-600" />
                  </a>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0 text-center md:text-left">
            {t('footer.copyright')}
          </div>

          <div className="flex space-x-6 text-sm justify-center md:justify-end">
            <a href="/legal?tab=terms" className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
              {t('footer.terms')}
            </a>
            <a href="/legal?tab=privacy" className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
              {t('footer.privacy')}
            </a>
            <a href="/legal?tab=cookies" className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
              {t('footer.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;