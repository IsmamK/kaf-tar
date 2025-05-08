import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/services/`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setServices(data.services);
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Corrected filtering logic
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (isLoading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7bbf42]"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-10 text-red-500">
      Error loading services: {error}
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#040404] mb-4">
            Our <span className="text-[#7bbf42]">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive facility management solutions tailored to your needs
          </p>
        </motion.div>

        {/* Category Filters - Updated with better state management */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeCategory === 'all' 
                ? 'bg-[#7bbf42] text-white shadow-lg shadow-[#7bbf42]/30' 
                : 'bg-[#f9b414] text-[#040404] hover:bg-[#f9b414]/90'
            }`}
          >
            All Services
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category.slug 
                  ? 'bg-[#70308c] text-white shadow-lg shadow-[#70308c]/30' 
                  : 'bg-gray-100 text-[#040404] hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Services Grid - Now properly shows all services when "All" is selected */}
        {filteredServices.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            key={activeCategory} // This ensures re-animation when category changes
          >
            {filteredServices.map(service => (
              <motion.div 
                key={service.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto`}
                    style={{
                      background: `linear-gradient(135deg, ${
                        service.category === 'hard' ? '#7bbf42' : 
                        service.category === 'soft' ? '#f9b414' : 
                        service.category === 'specialized' ? '#70308c' : '#040404'
                      }, ${
                        service.category === 'hard' ? '#7bbf42aa' : 
                        service.category === 'soft' ? '#f9b414aa' : 
                        service.category === 'specialized' ? '#70308caa' : '#040404aa'
                      })`
                    }}
                  >
                    <span className="text-white">{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#040404] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </div>
                <div className="px-6 pb-4 text-center">
                  <button className="text-[#7bbf42] font-semibold hover:text-[#5a9a32] transition-colors">
                    Learn more →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No services found in this category
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="/services"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#7bbf42] to-[#f9b414] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            View All Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;