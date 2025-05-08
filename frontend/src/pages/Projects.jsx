import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const controls = useAnimation();
  const [ref, inView] = useInView();

  // Sample data - in a real app you would fetch this from the API
  const sampleData = {
    "title": "Our Training Facilities",
    "subtitle": "Specialized vocational training centers across the region",
    "colors": {
      "primary": "#2ecc71",
      "secondary": "#f39c12",
      "lightGray": "#f5f5f5",
      "darkGray": "#333333",
      "navy": "#2c3e50"
    },
    "centers": [
      {
        "name": "Dhaka Construction Academy",
        "specialty": "Construction Skills Training",
        "description": "Certified programs in masonry, electrical work, and plumbing with hands-on training from industry experts.",
        "location": "Dhaka Central District",
        "contact": "+880 1234 567890",
        "hours": "Mon-Sat: 8AM-6PM",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        "name": "Chittagong Technical Institute",
        "specialty": "Maritime and Logistics",
        "description": "Advanced training in port operations, shipping logistics, and maritime safety procedures.",
        "location": "Chittagong Port Area",
        "contact": "+880 9876 543210",
        "hours": "Mon-Fri: 9AM-5PM",
        "image": "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate API fetch
        await new Promise(resolve => setTimeout(resolve, 800));
        setProjects(sampleData);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!projects) {
    return <div className="text-center py-20 text-gray-500">Failed to load projects data</div>;
  }

  const { title, subtitle, colors, centers } = projects;
  const { primary, secondary, darkGray, navy } = colors;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: `0 15px 30px -5px ${primary}40`,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.lightGray }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            style={{ color: darkGray }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: navy }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
          <motion.div 
            className="w-24 h-1.5 bg-green-500 mx-auto mt-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        {/* Training Centers */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {centers.map((center, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              style={{ borderBottom: `4px solid ${primary}` }}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={center.image}
                  alt={center.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6"
                >
                  <motion.h3 
                    className="text-2xl font-bold text-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {center.name}
                  </motion.h3>
                </div>
              </div>

              <div className="p-6">
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: `${secondary}20`, color: darkGray }}
                  >
                    {center.specialty}
                  </span>
                </motion.div>

                <motion.p 
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {center.description}
                </motion.p>

                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3" style={{ color: primary }} />
                    <span style={{ color: darkGray }}>{center.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-3" style={{ color: primary }} />
                    <span style={{ color: darkGray }}>{center.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-3" style={{ color: primary }} />
                    <span style={{ color: darkGray }}>{center.hours}</span>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <button
                    className="px-6 py-2 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: primary,
                      color: 'white'
                    }}
                    whileHover={{
                      backgroundColor: `#27ae60`, // Slightly darker green
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                  >
                    Learn More
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4" style={{ color: darkGray }}>
            Ready to Start Your Journey?
          </h3>
          <div className="flex justify-center space-x-4">
            <motion.button
              className="px-8 py-3 rounded-lg font-medium"
              style={{
                backgroundColor: primary,
                color: 'white'
              }}
              whileHover={{
                backgroundColor: `#27ae60`,
                scale: 1.05
              }}
              whileTap={{
                scale: 0.98
              }}
            >
              Apply Now
            </motion.button>
            <motion.button
              className="px-8 py-3 rounded-lg font-medium border"
              style={{
                borderColor: primary,
                color: primary,
                backgroundColor: 'white'
              }}
              whileHover={{
                backgroundColor: `${primary}10`,
                scale: 1.05
              }}
              whileTap={{
                scale: 0.98
              }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;