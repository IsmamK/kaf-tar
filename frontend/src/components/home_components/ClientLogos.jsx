import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Sample logo images (replace with your actual image imports)

const ClientLogos = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [logos, setLogos] = useState([]);

  // Default data with image imports
  const defaultLogos = [
    {
      name: "Education",
      image: 'https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-ladders-education-day_23-2149241014.jpg?ga=GA1.1.1052662833.1746607306&semt=ais_hybrid&w=740',
      category: "Education"
    },
    {
      name: "Healthcare",
      image: 'https://img.freepik.com/free-vector/group-medical-staff-carrying-health-related-icons_53876-43071.jpg?ga=GA1.1.1052662833.1746607306&semt=ais_hybrid&w=740',
      category: "Health Care"
    },
    {
      name: "Government",
      image: 'https://img.freepik.com/premium-vector/colored-urban-government-building_81894-1732.jpg?ga=GA1.1.1052662833.1746607306&semt=ais_hybrid&w=740',
      category: "Business and Government"
    },
    {
      name: "Retail",
      image:'https://img.freepik.com/free-photo/cyber-monday-shopping-sales_23-2148688502.jpg?ga=GA1.1.1052662833.1746607306&semt=ais_hybrid&w=740',
      category: "Commercial and Retail"
    },
    {
      name: "Airports",
      image: 'https://img.freepik.com/free-vector/airport-tower-concept-illustration_114360-11322.jpg?ga=GA1.1.1052662833.1746607306&semt=ais_hybrid&w=740',
      category: "Airports"
    },
    {
      name: "Manufacturing",
      image: 'https://img.freepik.com/free-psd/automated-packaging-system-hightech-warehouse-robotics_191095-77649.jpg?ga=GA1.1.1052662833.1746607306&semt=ais_hybrid&w=740',
      category: "Manufacturing"
    },
    {
      name: "Warehouses",
      image: 'https://img.freepik.com/free-vector/warehouse-outside-concept-illustration_114360-22339.jpg?ga=GA1.1.1052662833.1746607306&semt=ais_hybrid&w=740',
      category: "Warehouses"
    },
    {
      name: "Financial",
      image: 'https://img.freepik.com/free-vector/finance-financial-performance-concept-illustration_53876-40450.jpg?ga=GA1.1.1052662833.1746607306&semt=ais_hybrid&w=740',
      category: "Financial Institutions"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/home/client-logos/`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        // Merge API data with local images
        const mergedLogos = (result.logos || defaultLogos).map(logo => {
          const defaultLogo = defaultLogos.find(l => l.name === logo.name);
          return {
            ...logo,
            image: defaultLogo ? defaultLogo.image : null
          };
        });

        setLogos(mergedLogos);
        setCategories(['All', ...new Set(mergedLogos.map(logo => logo.category))]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLogos(defaultLogos);
        setCategories(['All', ...new Set(defaultLogos.map(logo => logo.category))]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const filteredLogos = activeCategory === 'All' 
    ? logos 
    : logos.filter(logo => logo.category === activeCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7bbf42]"></div>
      </div>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat bg-[length:40px_40px]"></div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7bbf42]/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#70308c]/15 to-transparent rounded-full blur-xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#040404] mb-4">
            Our Esteemed Partners
            <span className="block w-20 h-1 bg-[#f9b414] mx-auto mt-4"></span>
          </h2>
          <p className="text-xl text-[#7bbf42] max-w-2xl mx-auto">
            Trusted by leaders across multiple industries
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#7bbf42] text-white shadow-md'
                  : 'bg-gray-100 text-[#040404] hover:bg-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {filteredLogos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(123, 191, 66, 0.2)'
              }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#7bbf42]/50 transition-all duration-300 flex items-center justify-center h-40 shadow-sm hover:shadow-md"
            >
              <div className="relative w-full h-full flex items-center justify-center p-4">
                {logo.image ? (
                  <img 
                    src={logo.image} 
                    alt={logo.name} 
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <div className={`text-xl font-bold text-center p-4 rounded-lg ${
                    ['Education', 'Healthcare'].includes(logo.category) 
                      ? 'bg-[#7bbf42]/10 text-[#7bbf42]' 
                      : ['Government', 'Financial'].includes(logo.category) 
                        ? 'bg-[#70308c]/10 text-[#70308c]' 
                        : 'bg-[#f9b414]/10 text-[#f9b414]'
                  }`}>
                    {logo.name}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#7bbf42] to-[#f9b414] text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Become Our Partner
            <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;