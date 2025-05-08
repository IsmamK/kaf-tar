import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ServiceCard = ({ serviceId, onClose }) => {
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data function to replace API call
  const fetchMockServiceData = (id) => {
    const mockServices = {
      1: {
        id: 1,
        title: "Manpower Support Services",
        category: "support",
        description: "Comprehensive workforce solutions tailored to your operational needs with skilled professionals.",
        details: {
          features: [
            "Skilled workforce provisioning",
            "Flexible staffing solutions",
            "Industry-specific expertise",
            "24/7 availability",
            "Cost-effective solutions"
          ],
          benefits: [
            "Reduced hiring costs",
            "Quick staffing solutions",
            "Trained professionals",
            "Scalable workforce",
            "Compliance with labor laws"
          ]
        },
        icon: "👥",
        industries: ["Construction", "Healthcare", "Hospitality", "Retail"],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
      },
      2: {
        id: 2,
        title: "Professional Cleaning Services",
        category: "soft",
        description: "Premium cleaning solutions for facilities of all sizes, ensuring hygienic and pristine environments.",
        details: {
          features: [
            "Daily, weekly, or monthly plans",
            "Eco-friendly products",
            "Trained cleaning staff",
            "Customized schedules",
            "Quality inspections"
          ],
          benefits: [
            "Improved hygiene standards",
            "Enhanced facility appearance",
            "Healthier environment",
            "Tailored cleaning plans",
            "24/7 emergency service"
          ]
        },
        icon: "🧹",
        industries: ["Commercial", "Healthcare", "Education", "Government"],
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      3: {
        id: 3,
        title: "HVAC Maintenance",
        category: "hard",
        description: "Expert installation and maintenance of heating, ventilation, and air conditioning systems.",
        details: {
          features: [
            "Preventive maintenance",
            "24/7 emergency service",
            "Energy efficiency audits",
            "System upgrades",
            "Indoor air quality checks"
          ],
          benefits: [
            "Extended equipment life",
            "Reduced energy costs",
            "Improved air quality",
            "Minimized downtime",
            "Certified technicians"
          ]
        },
        icon: "❄️",
        industries: ["Commercial", "Residential", "Healthcare", "Industrial"],
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      }
    };
    return mockServices[id] || null;
  };

  useEffect(() => {
    if (serviceId) {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with timeout
      const timer = setTimeout(() => {
        try {
          const data = fetchMockServiceData(serviceId);
          if (data) {
            setService(data);
          } else {
            throw new Error('Service not found');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }, 500); // Simulate network delay

      return () => clearTimeout(timer);
    }
  }, [serviceId]);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'hard': return 'from-[#7bbf42] to-[#5a9a32]';
      case 'soft': return 'from-[#f9b414] to-[#d89b12]';
      case 'specialized': return 'from-[#70308c] to-[#58256f]';
      case 'support': return 'from-[#040404] to-[#333333]';
      default: return 'from-[#7bbf42] to-[#f9b414]';
    }
  };

  return (
    <AnimatePresence>
      {serviceId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {isLoading ? (
                <div className="p-8">
                  <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-4 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-4 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-[#7bbf42] text-white rounded-lg hover:bg-[#5a9a32] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : service ? (
                <>
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${getCategoryColor(service.category)} p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <motion.h2 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-3xl font-bold text-white"
                        >
                          {service.title}
                        </motion.h2>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="w-16 h-1 bg-white/80 mt-2 rounded-full"
                        />
                      </div>
                      <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                      >
                        <XMarkIcon className="h-8 w-8" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="grid md:grid-cols-2 gap-8 p-6">
                    {/* Left Column */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                      >
                        <h3 className="text-xl font-semibold text-[#040404] mb-4 flex items-center gap-3">
                          <span className={`text-3xl ${service.category === 'hard' ? 'text-[#7bbf42]' : 
                            service.category === 'soft' ? 'text-[#f9b414]' : 
                            service.category === 'specialized' ? 'text-[#70308c]' : 'text-[#040404]'}`}>
                            {service.icon}
                          </span>
                          Service Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="text-xl font-semibold text-[#040404] mb-4">Key Features</h3>
                        <ul className="space-y-3">
                          {service.details.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <span className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
                                service.category === 'hard' ? 'bg-[#7bbf42]' : 
                                service.category === 'soft' ? 'bg-[#f9b414]' : 
                                service.category === 'specialized' ? 'bg-[#70308c]' : 'bg-[#040404]'
                              }`} />
                              <span className="text-gray-600">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                      >
                        {service.image && (
                          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
                            <img 
                              src={service.image} 
                              alt={service.title} 
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/800x400?text=Service+Image';
                              }}
                            />
                          </div>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="text-xl font-semibold text-[#040404] mb-4">Benefits</h3>
                        <ul className="space-y-3">
                          {service.details.benefits.map((benefit, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <span className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
                                service.category === 'hard' ? 'bg-[#7bbf42]' : 
                                service.category === 'soft' ? 'bg-[#f9b414]' : 
                                service.category === 'specialized' ? 'bg-[#70308c]' : 'bg-[#040404]'
                              }`} />
                              <span className="text-gray-600">{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      {service.industries && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="mt-8"
                        >
                          <h3 className="text-xl font-semibold text-[#040404] mb-4">Suitable For</h3>
                          <div className="flex flex-wrap gap-2">
                            {service.industries.map((industry, index) => (
                              <motion.span
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.05 }}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  service.category === 'hard' ? 'bg-[#7bbf42]/10 text-[#7bbf42]' : 
                                  service.category === 'soft' ? 'bg-[#f9b414]/10 text-[#f9b414]' : 
                                  service.category === 'specialized' ? 'bg-[#70308c]/10 text-[#70308c]' : 'bg-[#040404]/10 text-[#040404]'
                                }`}
                              >
                                {industry}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className={`bg-gradient-to-r ${getCategoryColor(service.category)}/10 p-6 border-t border-gray-200`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <p className="text-gray-600">
                        Interested in our {service.title.toLowerCase()}?
                      </p>
                      <button
                        className={`px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${
                          service.category === 'hard' ? 'from-[#7bbf42] to-[#5a9a32]' : 
                          service.category === 'soft' ? 'from-[#f9b414] to-[#d89b12]' : 
                          service.category === 'specialized' ? 'from-[#70308c] to-[#58256f]' : 'from-[#040404] to-[#333333]'
                        } hover:shadow-lg transition-all`}
                      >
                        Request a Quote
                      </button>
                    </div>
                  </motion.div>
                </>
              ) : null}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceCard;