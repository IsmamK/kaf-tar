import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Updated color constants with your brand colors
const COLORS = {
  primary: '#7bbf42',       // Your primary green
  primaryDark: '#5a9e2d',   // Darker shade of primary
  secondary: '#f9b414',     // Your yellow
  tertiary: '#040404',      // Your dark color
  white: '#ffffff',         // White
  lightBg: '#f8fafc'        // Light background variant
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const marqueeVariants = {
  animate: {
    x: ['-100%', '0%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      }
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 0.2
    }
  }
};

const OurClients = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/our-clients/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching clients data:", error);
        setData({
          title: "Trusted By Industry Leaders",
          subtitle: "Building relationships that stand the test of time",
          clients: [
            {
              "logo": "https://logo.clearbit.com/google.com",
              "link": "https://google.com",
              "name": "Google"
            },
            {
              "logo": "https://logo.clearbit.com/microsoft.com",
              "link": "https://microsoft.com",
              "name": "Microsoft"
            },
            {
              "logo": "https://logo.clearbit.com/apple.com",
              "link": "https://apple.com",
              "name": "Apple"
            },
            {
              "logo": "https://logo.clearbit.com/amazon.com",
              "link": "https://amazon.com",
              "name": "Amazon"
            },
            {
              "logo": "https://logo.clearbit.com/facebook.com",
              "link": "https://facebook.com",
              "name": "Facebook"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

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

  if (!data || !data.clients || data.clients.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">No client data available</p>
      </div>
    );
  }

  // Duplicate clients for seamless looping
  const duplicatedClients = [...data.clients, ...data.clients];

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.lightBg} 100%)`
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full" 
             style={{ backgroundColor: COLORS.primary }}></div>
        <div className="absolute -left-10 -bottom-10 w-80 h-80 rounded-full" 
             style={{ backgroundColor: COLORS.secondary }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title with animation */}
        <motion.div 
          variants={titleVariants}
          className="text-center mb-8"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: COLORS.tertiary }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle && (
            <p className="text-lg md:text-xl mb-6" style={{ color: COLORS.primary }}>
              {data.subtitle}
            </p>
          )}
          <motion.div 
            className="w-20 h-1.5 mx-auto rounded-full"
            style={{ backgroundColor: COLORS.secondary }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          ></motion.div>
        </motion.div>

        {/* Marquee container */}
        <div className="relative overflow-hidden py-8">
          <motion.div
            className="flex"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedClients.map((client, index) => (
              <motion.a
                key={`${index}-${client.link}`}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-4 p-6 rounded-xl flex flex-col items-center justify-center"
                style={{
                  backgroundColor: COLORS.white,
                  border: `2px solid ${COLORS.primary}20`,
                  minWidth: '220px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  borderColor: `${COLORS.primary}80`,
                  boxShadow: `0 8px 25px ${COLORS.primary}30`,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative h-16 w-full flex items-center justify-center mb-3">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-medium mt-2" style={{ color: COLORS.tertiary }}>
                  {client.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 rounded-lg font-bold text-lg relative overflow-hidden group"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.white
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: COLORS.primaryDark,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Become Our Client</span>
            <span 
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
            ></span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurClients;