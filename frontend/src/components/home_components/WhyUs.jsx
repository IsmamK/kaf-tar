import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default data if API fails
  const defaultData = {
    sectionTitle: "Why Choose KAF TAR",
    sectionSubtitle: "Discover what sets us apart in facility management",
    features: [
      {
        title: "No Outsourcing",
        description: "Full control with our in-house teams ensuring quality and accountability",
        icon: "in-house"
      },
      // ... other default features
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/home/why-us/`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7bbf42]"></div>
      </div>
    );
  }

  if (!data) return null;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#040404] to-[#70308c]">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: `radial-gradient(circle, rgba(123, 191, 66, 0.3) 0%, transparent 70%)`,
              top: `${i * 15}%`,
              left: `${i * 10}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {data.sectionTitle}
            <span className="block w-20 h-1 bg-[#f9b414] mx-auto mt-4"></span>
          </h2>
          <p className="text-xl text-[#7bbf42] max-w-2xl mx-auto">
            {data.sectionSubtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-[#f9b414]/30 transition-all duration-300"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#7bbf42] to-[#f9b414] flex items-center justify-center mb-6">
                {getFeatureIcon(feature.icon)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-[#7bbf42] to-[#f9b414]"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#7bbf42] to-[#f9b414] text-[#040404] font-bold rounded-full hover:shadow-lg hover:shadow-[#f9b414]/30 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
            <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function for icons (replace with your actual icons)
const getFeatureIcon = (icon) => {
  const icons = {
    'in-house': (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>
    ),
    'support': (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
    ),
    // Add more icons as needed
  };
  return icons[icon] || <div className="w-6 h-6 bg-white rounded-full"></div>;
};

export default WhyChooseUs;