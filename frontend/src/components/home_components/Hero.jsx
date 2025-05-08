import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const demodata = {
    title: "Kaf Tar - Premier Facility Management",
    subtitle: "Delivering exceptional operation & maintenance services across Saudi Arabia",
    highlightText: "CERTIFIED PROFESSIONALS | 24/7 SUPPORT | QUALITY GUARANTEED",
    ctaButton: {
      text: "Request Free Consultation",
      link: "/contact"
    },
    stats: [
      { value: "500+", label: "Facilities Managed", icon: "building" },
      { value: "99%", label: "Client Satisfaction", icon: "heart" },
      { value: "24/7", label: "Emergency Response", icon: "shield" },
      { value: "ISO", label: "Certified Quality", icon: "certificate" }
    ],
    backgroundImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/home/hero/`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.log('Using default hero data due to:', error.message);
        setHeroData(demodata);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0b675a]">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!heroData) return null;

  return (
    <section className="relative h-screen max-h-[900px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${heroData.backgroundImage})`,
          backgroundPosition: 'center center'
        }}
      ></div>
      
      {/* Gradient Overlay - Using brand colors */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(11, 103, 90, 0.85) 0%, rgba(106, 48, 140, 0.7) 100%)'
        }}
      ></div>
      
      {/* Subtle Radial Gradient for focal point */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244, 206, 20, 0.15) 0%, transparent 70%)'
        }}
      ></div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {heroData.title}
            <span className="block w-20 h-1 bg-[#f4ce14] mt-4"></span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-lg">
            {heroData.subtitle}
          </p>
          
          {/* Highlight Text */}
          <div className="flex items-center mb-10">
            <div className="h-1 w-16 bg-[#f4ce14] mr-4"></div>
            <p className="text-[#f4ce14] font-medium tracking-wider uppercase text-sm">
              {heroData.highlightText}
            </p>
          </div>
          
          {/* CTA Button */}
          <a
            href={heroData.ctaButton.link}
            className="inline-flex items-center px-8 py-4 bg-[#f4ce14] text-[#0b675a] font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-[#f8d83a]"
            style={{ boxShadow: '0 4px 14px rgba(244, 206, 20, 0.4)' }}
          >
            {heroData.ctaButton.text}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
        
        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {heroData.stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/20 hover:border-[#f4ce14] transition-all duration-300 group"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-[#f4ce14] mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </p>
              <p className="text-white/90 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-white/80 text-xs mb-1">Scroll Down</p>
          <svg className="w-6 h-6 text-[#f4ce14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;