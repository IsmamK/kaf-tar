import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Associates = () => {
  // Brand colors
  const colors = {
    white: '#ffffff',
    primary: '#7bbf42',
    primaryLight: '#a3d177',
    primaryDark: '#5a9e2d',
    secondary: '#f9b414',
    secondaryLight: '#fbc740',
    tertiary: '#040404',
    lightBg: '#f8faf7'
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const controls = useAnimation();
  const associatesContainerRef = useRef(null);
  const containerRef = useRef(null);

  // Enhanced infinite scroll animation
  useEffect(() => {
    if (!data?.associates?.length) return;

    const container = associatesContainerRef.current;
    if (!container) return;

    const duration = data.associates.length * 7;

    const animate = async () => {
      await controls.start({
        x: ['0%', '-100%'],
        transition: {
          duration: duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }
      });
    };

    animate();

    const handleMouseEnter = () => controls.stop();
    const handleMouseLeave = () => animate();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [data, controls]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/associates/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching associates data:", error);
        setData({
          title: "OUR TRUSTED PARTNERS",
          subtitle: "Collaborating with industry leaders worldwide",
          associates: [
            {
              logo: "https://via.placeholder.com/150x80?text=GreenBuild",
              link: "#",
              name: "GreenBuild Solutions",
              location: "New York, USA"
            },
            {
              logo: "https://via.placeholder.com/150x80?text=EcoConstruct",
              link: "#",
              name: "EcoConstruct",
              location: "London, UK"
            },
            {
              logo: "https://via.placeholder.com/150x80?text=Sustainable",
              link: "#",
              name: "Sustainable Designs",
              location: "Berlin, Germany"
            },
            {
              logo: "https://via.placeholder.com/150x80?text=UrbanDev",
              link: "#",
              name: "Urban Developers",
              location: "Tokyo, Japan"
            },
            {
              logo: "https://via.placeholder.com/150x80?text=ModernStruct",
              link: "#",
              name: "Modern Structures",
              location: "Sydney, Australia"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
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
          style={{ borderColor: colors.primary }}
        ></motion.div>
      </div>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: colors.lightBg }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full" 
             style={{ backgroundColor: colors.primary }}></div>
        <div className="absolute -left-10 -bottom-10 w-96 h-96 rounded-full" 
             style={{ backgroundColor: colors.secondary }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Always visible with initial animation */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.tertiary }}
          >
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg md:text-xl mb-6" style={{ color: colors.primaryDark }}>
              {data.subtitle}
            </p>
          )}
          <motion.div 
            className="w-24 h-1.5 mx-auto rounded-full"
            style={{ backgroundColor: colors.secondary }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          ></motion.div>
        </motion.div>

        {/* Partners Marquee */}
        <div 
          ref={associatesContainerRef}
          className="relative overflow-hidden py-8"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          <motion.div
            className="flex items-stretch"
            animate={controls}
            style={{ width: 'max-content' }}
          >
            {[...data.associates, ...data.associates].map((partner, index) => (
              <motion.div
                key={`${partner.link}-${index}`}
                className="px-4 sm:px-6 flex"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <a 
                  href={partner.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative block w-full"
                >
                  <div 
                    className="h-full p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg flex flex-col"
                    style={{ 
                      backgroundColor: colors.white,
                      border: `2px solid ${colors.primary}20`,
                      minWidth: '260px'
                    }}
                  >
                    <div className="flex-grow flex items-center justify-center mb-4">
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`}
                        className="max-h-16 object-contain transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-center">
                      <h3 
                        className="text-lg font-bold mb-1 transition-colors duration-300"
                        style={{ color: colors.tertiary }}
                      >
                        {partner.name}
                      </h3>
                      {partner.location && (
                        <div className="flex items-center justify-center text-sm" style={{ color: colors.primaryDark }}>
                          <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                          <span>{partner.location}</span>
                        </div>
                      )}
                    </div>
                    <div 
                      className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ color: colors.primary }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button - Always visible with initial animation */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.button
            className="px-12 py-4 rounded-full font-bold text-lg relative overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: colors.white,
              boxShadow: `0 4px 15px ${colors.primary}40`
            }}
            whileHover={{ 
              y: -2,
              scale: 1.02,
              boxShadow: `0 6px 20px ${colors.primary}60`
            }}
            whileTap={{ 
              scale: 0.98,
              boxShadow: `0 2px 10px ${colors.primary}30`
            }}
          >
            <span className="relative z-10">Join Our Network</span>
            <span 
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
            ></span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Associates;