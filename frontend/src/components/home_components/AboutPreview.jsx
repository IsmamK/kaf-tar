import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const AboutPreview = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/about-preview/`);
        if (!response.ok) {
          throw new Error('Failed to fetch about data');
        }
        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Error: {error}</div>;

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#040404] to-[#1a1a1a] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#f9b414]"></div>
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-[#7bbf42]/10 blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-[#f9b414]/10 blur-xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section - Now on LEFT */}
          <div className="lg:w-1/2 relative order-1">
            <div className="relative group">
              <img 
                src={aboutData?.image} 
                alt={aboutData.title} 
                className="w-full h-auto rounded-lg shadow-2xl transform group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#f9b414] rounded-lg z-0 group-hover:-bottom-3 group-hover:-right-3 transition-all duration-300"></div>
              <div className="absolute -inset-4 bg-[#7bbf42]/10 rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Experience badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#f9b414] text-[#040404] px-6 py-3 rounded-lg shadow-lg">
              <div className="text-3xl font-bold">{aboutData.experienceYears}+</div>
              <div className="text-sm font-semibold">Years Experience</div>
            </div>
          </div>
          
          {/* Content Section - Now on RIGHT */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 order-2">
            <div className="inline-block px-4 py-2 bg-[#7bbf42]/20 text-[#7bbf42] rounded-full mb-4 font-medium">
              {aboutData.subtitle}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {aboutData.title}
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              {aboutData.description}
            </p>
            
            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {aboutData.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3 text-[#f9b414]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/about" 
                className="px-8 py-4 bg-[#f9b414] hover:bg-[#7bbf42] text-[#040404] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-center"
              >
                Learn More About Us
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 border-2 border-[#f9b414] text-[#f9b414] hover:bg-[#f9b414]/10 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;