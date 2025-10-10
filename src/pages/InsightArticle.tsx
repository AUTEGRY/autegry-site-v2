import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const InsightArticle = () => {
  const { id } = useParams();
  const { getLanguagePath } = useLanguage();

  // Sample article data (in a real app, this would come from an API)
  const articles = {
    "smart-lending-collaboration": {
      title: "Smarter lending, powered by Experian and Plaid",
      description: "Discover how our collaboration is reshaping the future of lending and financial inclusion.",
      category: "New collaboration",
      image: "/lovable-uploads/a8af5ce7-904f-4421-8c44-3960ec7732dc.png",
      content: `
        <h2>The Future of Lending</h2>
        <p>In today's rapidly evolving financial landscape, the collaboration between Experian and Plaid represents a significant leap forward in lending technology. This partnership combines Experian's comprehensive credit data with Plaid's innovative financial connectivity platform.</p>
        
        <h3>Key Benefits</h3>
        <ul>
          <li>Enhanced credit decisioning through real-time financial data</li>
          <li>Improved financial inclusion for underserved populations</li>
          <li>Streamlined application processes</li>
          <li>Reduced risk for lenders</li>
        </ul>

        <h3>Impact on the Industry</h3>
        <p>This collaboration is set to transform how lenders evaluate creditworthiness, moving beyond traditional credit scores to a more holistic view of a borrower's financial health.</p>
      `
    },
    "automotive-quarterly-trends": {
      title: "Experian Automotive Quarterly Trends",
      description: "Quarterly analysis of the automotive market, financing and consumer buying trends.",
      category: "Report",
      image: "/lovable-uploads/a8af5ce7-904f-4421-8c44-3960ec7732dc.png",
      content: `
        <h2>Q4 2024 Automotive Market Analysis</h2>
        <p>The automotive market continues to show resilience despite economic uncertainties. Our quarterly analysis reveals key trends shaping the industry.</p>
        
        <h3>Market Highlights</h3>
        <ul>
          <li>Used vehicle prices stabilizing after years of volatility</li>
          <li>Electric vehicle adoption accelerating</li>
          <li>Financing terms becoming more favorable</li>
          <li>Inventory levels improving across dealerships</li>
        </ul>

        <h3>Consumer Behavior Insights</h3>
        <p>Consumers are showing increased confidence in making automotive purchases, with financing applications up 15% compared to the previous quarter.</p>
      `
    },
    "commercial-insights-hub": {
      title: "Commercial Insights Hub",
      description: "Access the latest commercial insights on small business. Explore and subscribe.",
      category: "Insights",
      image: "/lovable-uploads/a8af5ce7-904f-4421-8c44-3960ec7732dc.png",
      content: `
        <h2>Your Gateway to Commercial Intelligence</h2>
        <p>The Commercial Insights Hub provides small businesses with the data and analytics they need to make informed decisions in today's competitive marketplace.</p>
        
        <h3>What You'll Find</h3>
        <ul>
          <li>Market trend analysis</li>
          <li>Industry benchmarking data</li>
          <li>Credit risk insights</li>
          <li>Economic forecasting</li>
        </ul>

        <h3>Stay Informed</h3>
        <p>Subscribe to receive weekly updates on commercial trends, market shifts, and opportunities for your business.</p>
      `
    },
    "data-breach-response-guide": {
      title: "2024-2025 Data Breach Response Guide",
      description: "Maximize your organization's data breach preparedness strategy.",
      category: "Report",
      image: "/lovable-uploads/a8af5ce7-904f-4421-8c44-3960ec7732dc.png",
      content: `
        <h2>Comprehensive Data Breach Preparedness</h2>
        <p>In an era of increasing cyber threats, organizations must be prepared for potential data breaches. This guide provides a comprehensive framework for response and recovery.</p>
        
        <h3>Key Components of Breach Response</h3>
        <ul>
          <li>Immediate containment procedures</li>
          <li>Stakeholder communication protocols</li>
          <li>Legal and regulatory compliance</li>
          <li>Recovery and remediation strategies</li>
        </ul>

        <h3>Best Practices for 2024-2025</h3>
        <p>Updated guidelines reflect the latest regulatory requirements and emerging threat vectors, ensuring your organization stays ahead of potential risks.</p>
      `
    },
    "key-trends-2025": {
      title: "5 Key Trends to Watch in 2025",
      description: "Key 2025 trends shaping the economy and lending: job market shifts, delinquency stabilization, and more.",
      category: "Report",
      image: "/lovable-uploads/a8af5ce7-904f-4421-8c44-3960ec7732dc.png",
      content: `
        <h2>Economic Landscape 2025</h2>
        <p>As we look ahead to 2025, several key trends are emerging that will significantly impact the lending industry and broader economy.</p>
        
        <h3>The Five Key Trends</h3>
        <ol>
          <li><strong>Job Market Transformation:</strong> Remote work stabilization and skill-based hiring</li>
          <li><strong>Delinquency Stabilization:</strong> Credit performance reaching new equilibrium</li>
          <li><strong>Digital-First Lending:</strong> Fully automated decision making</li>
          <li><strong>Regulatory Evolution:</strong> New frameworks for fintech operations</li>
          <li><strong>ESG Integration:</strong> Environmental and social factors in credit decisions</li>
        </ol>

        <h3>Industry Implications</h3>
        <p>These trends will reshape how financial institutions operate, requiring new strategies for risk management, customer engagement, and regulatory compliance.</p>
      `
    }
  };

  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to={getLanguagePath('')}>
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link to={getLanguagePath('')} className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <Badge className="mb-4">
            {article.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {article.description}
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      <Footer />
    </div>
  );
};

export default InsightArticle;