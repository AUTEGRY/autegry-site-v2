import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Services from "@/components/Services";
import ProblemsWeSolve from "@/components/ProblemsWeSolve";
import WhyAutegry from "@/components/WhyAutegry";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Statistics />
      <ProblemsWeSolve />
      <Services />
      <WhyAutegry />
      <About />
      <Contact />
      <Footer />
      <ScrollToTop />
      <CookieBanner />
    </div>
  );
};

export default Index;
