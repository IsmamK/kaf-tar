import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Enhanced color palette
const COLORS = {
  primary: '#2ecc71',       // Vibrant green
  primaryDark: '#27ae60',    // Darker green
  secondary: '#f39c12',      // Yellow/orange
  accent: '#e74c3c',         // Vibrant red
  textDark: '#2c3e50',       // Dark blue/black
  textLight: '#ecf0f1',      // Light gray
  backgroundLight: '#ffffff',
  backgroundDark: '#34495e', // Dark slate
  border: '#bdc3c7',         // Light gray border
  highlight: '#3498db'       // Bright blue
};

const Cards = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Enhanced fallback data with more countries
  const fallbackData = {
    "heading": "Our Global Network",
    "subheading": "Trusted Recruitment Across Borders",
    "countries": [
      {
        "name": "Saudi Arabia",
        "workersPlaced": "50,000+",
        "flag": "https://flagcdn.com/sa.svg",
        "imageSrc": "https://images.unsplash.com/photo-1517842645767-c639042777db",
        "keyIndustries": ["Oil & Gas", "Construction", "Healthcare"],
        "highlights": [
          "Primary destination for skilled workers",
          "Fastest growing job market in GCC",
          "High demand for healthcare professionals",
          "Stable economy with competitive salaries",
          "Cultural orientation programs provided"
        ]
      },
      {
        "name": "United Arab Emirates",
        "workersPlaced": "35,000+",
        "flag": "https://flagcdn.com/ae.svg",
        "imageSrc": "https://images.unsplash.com/photo-1518684079-3c830dcef090",
        "keyIndustries": ["Hospitality", "Retail", "Construction"],
        "highlights": [
          "Tax-free salaries attract global talent",
          "Diverse multicultural work environment",
          "Leading hub for service industry jobs",
          "Modern infrastructure and facilities",
          "Excellent work-life balance"
        ]
      },
      {
        "name": "Qatar",
        "workersPlaced": "25,000+",
        "flag": "https://flagcdn.com/qa.svg",
        "imageSrc": "https://images.unsplash.com/photo-1517365884913-3c33884b06fa",
        "keyIndustries": ["Construction", "Domestic Work", "Engineering"],
        "highlights": [
          "Rapidly developing infrastructure",
          "High demand for skilled labor",
          "Excellent compensation packages",
          "Modern worker accommodations",
          "Strict labor laws for worker protection"
        ]
      },
      {
        "name": "Malaysia",
        "workersPlaced": "30,000+",
        "flag": "https://flagcdn.com/my.svg",
        "imageSrc": "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
        "keyIndustries": ["Plantation", "Manufacturing", "Electronics"],
        "highlights": [
          "Tropical climate and beautiful landscapes",
          "Growing manufacturing sector",
          "Cultural similarity for Asian workers",
          "Affordable cost of living",
          "Stable political environment"
        ]
      }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/cards/`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: 'linear'
          }}
          className="rounded-full h-12 w-12 border-t-4 border-b-4"
          style={{ borderColor: COLORS.primary }}
        ></motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-64"
      >
        <p className="text-red-500">Failed to load data. Please try again later.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {error && (
          <motion.div 
            variants={slideUpVariants}
            className="max-w-7xl mx-auto mb-8 p-4 rounded-lg shadow-md"
            style={{ 
              backgroundColor: '#fff3f3',
              borderLeft: `4px solid ${COLORS.accent}`
            }}
          >
            <p className="text-red-700 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Warning: Using fallback data. Could not fetch from API: {error}
            </p>
          </motion.div>
        )}
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
        >
          <motion.h2 
            variants={slideUpVariants}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #2ecc71, #3498db)',
              lineHeight: '1.2'
            }}
          >
            {data.heading}
          </motion.h2>
          <motion.p
            variants={slideUpVariants}
            className="text-xl md:text-2xl font-medium max-w-3xl mx-auto"
            style={{ color: COLORS.textDark }}
          >
            {data.subheading}
          </motion.p>
        </motion.div>

        {/* Country Cards Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {data.countries?.map((country, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Gorgeous Card Design */}
              <div 
                className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ${expandedCard === index ? 'min-h-[550px]' : 'h-[420px]'}`}
                style={{
                  backgroundColor: COLORS.backgroundLight,
                  border: `1px solid ${COLORS.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10"></div>
                
                {/* Country Flag with floating effect */}
                <motion.div 
                  className="absolute top-4 right-4 z-20 w-16 h-12 bg-white rounded-lg shadow-xl overflow-hidden border-2 border-white"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={country.flag} 
                    alt={`${country.name} flag`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Country Image with parallax effect */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0"></div>
                  <img
                    src={country.imageSrc}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold z-10 drop-shadow-lg">
                    {country.name}
                  </h3>
                </div>

                {/* Country Content */}
                <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50">
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md"
                      style={{ 
                        backgroundColor: COLORS.primary,
                        boxShadow: `0 4px 10px ${COLORS.primary}80`
                      }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold" style={{ color: COLORS.primaryDark }}>
                      {country.workersPlaced} workers placed
                    </span>
                  </div>

                  {/* Industries */}
                  <div className="mb-4">
                    <h4 
                      className="text-sm font-semibold mb-3 uppercase tracking-wider text-gray-500"
                    >
                      KEY INDUSTRIES
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {country.keyIndustries?.map((industry, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="text-xs px-3 py-1.5 rounded-full font-medium shadow-sm"
                          style={{
                            backgroundColor: `${COLORS.secondary}15`,
                            color: COLORS.textDark,
                            border: `1px solid ${COLORS.secondary}`,
                            backdropFilter: 'blur(5px)'
                          }}
                        >
                          {industry}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights (shown when expanded) */}
                  {expandedCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.4 }}
                      className="mt-2 flex-1 overflow-y-auto"
                    >
                      <h4 
                        className="text-sm font-semibold mb-3 uppercase tracking-wider text-gray-500"
                      >
                        HIGHLIGHTS
                      </h4>
                      <ul className="space-y-3">
                        {country.highlights?.map((highlight, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start"
                          >
                            <div 
                              className="w-5 h-5 rounded-full mr-2 mt-0.5 flex-shrink-0 flex items-center justify-center shadow-sm"
                              style={{ 
                                backgroundColor: COLORS.highlight,
                                boxShadow: `0 2px 5px ${COLORS.highlight}80`
                              }}
                            >
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="4" />
                              </svg>
                            </div>
                            <span 
                              className="text-sm text-gray-700"
                            >
                              {highlight}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* Expand/Collapse Button */}
                <div className="px-6 pb-4 text-center bg-gradient-to-b from-gray-50 to-white">
                  <motion.button
                    onClick={() => toggleExpand(index)}
                    className="px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center mx-auto shadow-md"
                    style={{
                      backgroundColor: expandedCard === index ? COLORS.primaryDark : COLORS.primary,
                      color: 'white',
                      width: '100%',
                      maxWidth: '200px',
                      boxShadow: `0 4px 15px ${expandedCard === index ? COLORS.primaryDark : COLORS.primary}50`
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: `0 6px 20px ${expandedCard === index ? COLORS.primaryDark : COLORS.primary}70`
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {expandedCard === index ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Show Less
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Learn More
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeInVariants}
          className="mt-20 text-center"
        >
          <h3 
            className="text-2xl md:text-3xl font-bold mb-6"
            style={{ color: COLORS.textDark }}
          >
            Ready to find your international opportunity?
          </h3>
          <motion.button
            className="px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
            style={{
              background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.primary})`,
              color: 'white',
              boxShadow: `0 5px 20px ${COLORS.secondary}50`
            }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: `0 8px 25px ${COLORS.secondary}70`
            }}
            whileTap={{ scale: 0.98 }}
          >
            Browse Available Positions
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cards;