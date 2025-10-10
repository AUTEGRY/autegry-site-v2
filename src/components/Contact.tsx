import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/api";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation helpers - same logic as backend
  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Phone is required";
    // Same phone validation as backend: allows +, numbers, spaces, hyphens, parentheses, min 10 chars
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return "Please enter a valid phone number (at least 10 digits, +, -, (), spaces allowed)";
    }
    return "";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleBlur = (field: string) => {
    if (field === "email") {
      const emailError = validateEmail(formData.email);
      setErrors(prev => ({
        ...prev,
        email: emailError
      }));
    }

    if (field === "phone") {
      const phoneError = validatePhone(formData.phone);
      setErrors(prev => ({
        ...prev,
        phone: phoneError
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone)
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.SEND_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you! Your message has been sent successfully.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-0">
      <div className="grid lg:grid-cols-2">
        {/* Contact Form - Left Side with Primary Color Background */}
        <div className="bg-primary p-6 md:p-12 lg:p-16 xl:p-20 lg:pr-12">
          <div className="max-w-lg mx-auto lg:ml-auto lg:mr-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-6 md:mb-8">
              {t('contact.title')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                    {t('contact.name')}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t('contact.namePlaceholder')}
                    className="bg-transparent border-0 border-b-2 border-white/30 text-white placeholder:text-white/60 focus:border-b-white rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                    {t('contact.email')}
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder={t('contact.emailPlaceholder')}
                    className={`bg-transparent border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-white/30'} text-white placeholder:text-white/60 focus:border-b-white rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                    {t('contact.phone')}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    placeholder={t('contact.phonePlaceholder')}
                    className={`bg-transparent border-0 border-b-2 ${errors.phone ? 'border-red-500' : 'border-white/30'} text-white placeholder:text-white/60 focus:border-b-white rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                    {t('contact.subject')}
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder={t('contact.subjectPlaceholder')}
                    className="bg-transparent border-0 border-b-2 border-white/30 text-white placeholder:text-white/60 focus:border-b-white rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                  {t('contact.message')}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder={t('contact.messagePlaceholder')}
                  rows={6}
                  className="bg-transparent border-0 border-b-2 border-white/30 text-white placeholder:text-white/60 focus:border-b-white rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: '#00473C' }}
                className="w-full md:w-auto px-6 md:px-8 py-4 md:py-6 hover:opacity-90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  t('contact.submit')
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information - Right Side with Dark Background */}
        <div style={{ backgroundColor: '#00473C' }} className="p-6 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center">
          <div className="max-w-lg">
            {/* Top Badge */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-medium text-white uppercase tracking-wider">{t('contact.contactUs')}</span>
              <div className="h-px bg-white w-12"></div>
            </div>

            <div className="space-y-6 md:space-y-8 mb-8 md:mb-12 mt-6 md:mt-10">
              {/* Email and Phone on first line */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                 <div>
                   <p className="text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">{t('contact.emailLabel')}</p>
                   <p className="text-white text-lg">info@autegry.com</p>
                 </div>
                 <div>
                   <p className="text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">{t('contact.phoneLabel')}</p>
                   <p className="text-white text-lg">+359 89 999 9999</p>
                 </div>
              </div>

              {/* Office and Social on second line */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                 <div>
                   <p className="text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">{t('contact.officeLabel')}</p>
                   <p className="text-white text-lg">{t('contact.officeAddress')}</p>
                 </div>
                 <div>
                   <p className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">{t('contact.socialLabel')}</p>
                   <div className="flex space-x-4">
                     <a
                       href="#"
                       className="hover:opacity-70 transition-opacity duration-300"
                     >
                       <Linkedin className="w-5 h-5 text-white" />
                     </a>
                     <a
                       href="#"
                       className="hover:opacity-70 transition-opacity duration-300"
                     >
                       <Instagram className="w-5 h-5 text-white" />
                     </a>
                     <a
                       href="#"
                       className="hover:opacity-70 transition-opacity duration-300"
                     >
                       <Facebook className="w-5 h-5 text-white" />
                     </a>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;