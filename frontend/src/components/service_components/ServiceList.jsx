import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ServiceList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    services: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Default data
  const defaultData = {
    sectionTitle: "Our Comprehensive Services",
    sectionSubtitle: "End-to-end facility management solutions",
    services: [
      {
        category: "Hard Services",
        icon: "hard-services",
        items: [
          "Electrical Systems",
          "Air-conditioning & HVAC",
          "Mechanical Systems",
          "Plumbing Systems"
        ]
      },
      {
        category: "Soft Services",
        icon: "soft-services",
        items: [
          "Cleaning Services",
          "Facade Cleaning",
          "Swimming Pool Operation",
          "Hospitality"
        ]
      }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/service/service-list/`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        // Validate data
        const validatedData = {
          sectionTitle: result.sectionTitle || defaultData.sectionTitle,
          sectionSubtitle: result.sectionSubtitle || defaultData.sectionSubtitle,
          services: Array.isArray(result.services) ? result.services : defaultData.services
        };
        
        setData(validatedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const getIcon = (iconName) => {
    const icons = {
      'hard-services': (
        <svg className="w-8 h-8" fill="none" stroke="#7bbf42" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      'soft-services': (
        <svg className="w-8 h-8" fill="none" stroke="#f9b414" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
        </svg>
      ),
      'specialized': (
        <svg className="w-8 h-8" fill="none" stroke="#70308c" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      'support': (
        <svg className="w-8 h-8" fill="none" stroke="#040404" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      )
    };
    return icons[iconName] || <div className="w-8 h-8 rounded-full bg-gray-300"></div>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7bbf42]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading services: {error}
      </div>
    );
  }

  return (
    <section className="relative pb-10 pt-32 overflow-hidden bg-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute rounded-full"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(123, 191, 66, 0.3) 0%, transparent 70%)',
            top: '20%',
            left: '10%'
          }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(106, 48, 140, 0.3) 0%, transparent 70%)',
            bottom: '20%',
            right: '10%'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated gradient title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              backgroundImage: 'linear-gradient(90deg, #7bbf42, #f9b414, #70308c, #7bbf42)'
            }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {data.sectionTitle}
          </motion.h2>
          <p className="text-xl text-[#7bbf42] max-w-2xl mx-auto">
            {data.sectionSubtitle}
          </p>
        </motion.div>

        {/* Service Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {data.services?.map((service, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-[#7bbf42] to-[#f9b414] text-white shadow-lg'
                    : 'bg-gray-100 text-[#040404] hover:bg-gray-200'
                }`}
              >
                {service.category}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          {data.services?.length > 0 && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#f9f9f9] to-white p-8 rounded-2xl shadow-md border border-gray-200"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  {getIcon(data.services[activeTab].icon)}
                </div>
                <h3 className="text-3xl font-bold text-[#040404]">
                  {data.services[activeTab].category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.services[activeTab].items?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#7bbf42] hover:border-[#f9b414] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index % 3 === 0 ? 'bg-[#7bbf42]' : 
                        index % 3 === 1 ? 'bg-[#f9b414]' : 'bg-[#70308c]'
                      }`}></div>
                      <p className="text-lg text-[#040404]">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceList;