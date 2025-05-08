import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/project/project-gallery/`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
    show: { opacity: 1, y: 0 }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#040404] to-[#1a1a1a]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-[#7bbf42] border-t-[#f9b414] rounded-full"
      ></motion.div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#040404] to-[#1a1a1a] text-red-500">
      Error: {error}
    </div>
  );

  return (
    <section className="relative bg-gradient-to-br from-[#1a1a1a] to-[#040404] py-16 md:py-24 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ x: -100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 right-0 w-64 h-64 rounded-full bg-[#7bbf42]/10 blur-3xl"
      ></motion.div>
      
      <motion.div 
        initial={{ x: 100, y: 100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-[#f9b414]/10 blur-3xl"
      ></motion.div>
      
      {/* Animated top border */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7bbf42] via-[#f9b414] to-[#7bbf42]"
      ></motion.div>

      <div className="container pt-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-2 bg-[#7bbf42]/20 text-[#7bbf42] rounded-full mb-4 font-medium"
          >
            Our Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            <motion.span
              animate={{ color: ["#ffffff", "#f9b414", "#ffffff"] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Building Dreams
            </motion.span>{' '}
            Into Reality
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
            className="w-20 h-1 bg-[#f9b414] mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Explore our completed projects that showcase our craftsmanship and attention to detail
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['all', ...new Set(projects.map(p => p.category))].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full capitalize font-medium transition-all ${
                filter === category
                  ? 'bg-[#f9b414] text-[#040404] shadow-lg'
                  : 'bg-[#040404] text-white border border-[#7bbf42]/40 hover:border-[#f9b414]'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -10 }}
              className="relative group overflow-hidden rounded-xl shadow-2xl"
            >
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-64 w-full overflow-hidden"
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040404]/90 via-[#040404]/30 to-transparent"></div>
              </motion.div>

              <motion.div
                initial={{ y: 100 }}
                whileHover={{ y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#040404] to-transparent"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-3 py-1 mb-2 bg-[#f9b414] text-[#040404] text-sm font-bold rounded-full"
                >
                  {project.category}
                </motion.div>
                <motion.h3
                  whileHover={{ color: "#f9b414" }}
                  className="text-xl font-bold text-white mb-2"
                >
                  {project.title}
                </motion.h3>
                <motion.p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2 bg-[#7bbf42] hover:bg-[#f9b414] text-[#040404] font-bold rounded-lg transition-colors duration-300"
                  >
                    View Project
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to build your dream project?
          </h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-[#f9b414] hover:bg-[#7bbf42] text-[#040404] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get a Free Consultation
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040404]/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-xl shadow-2xl border border-[#7bbf42]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#040404] rounded-full hover:bg-[#f9b414] transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="h-64 md:h-96 w-full overflow-hidden">
              <img
                src={selectedProject.mainImage}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-[#f9b414] text-[#040404] text-sm font-bold rounded-full">
                  {selectedProject.category}
                </span>
                <span className="px-3 py-1 bg-[#7bbf42] text-[#040404] text-sm font-bold rounded-full">
                  {selectedProject.year}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-gray-300 mb-6">{selectedProject.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-[#f9b414] mb-2">Project Details</h4>
                  <ul className="space-y-2">
                    {selectedProject.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 text-[#7bbf42] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-[#f9b414] mb-2">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 text-[#7bbf42] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {selectedProject.galleryImages.map((image, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="overflow-hidden rounded-lg cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`${selectedProject.title} - ${i + 1}`}
                      className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="flex-1 px-6 py-3 bg-[#f9b414] hover:bg-[#7bbf42] text-[#040404] font-bold rounded-lg text-center transition-colors"
                >
                  Start Your Project
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 px-6 py-3 border border-[#f9b414] text-[#f9b414] hover:bg-[#f9b414]/10 font-bold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectGallery;