import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faPlaneDeparture, 
  faFileAlt, 
  faUserCheck, 
  faHospital,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

// Color scheme
const colors = {
  primary: '#38a169', // Vibrant green
  primaryLight: '#9ae6b4', // Light green
  primaryDark: '#2f855a', // Dark green
  secondary: '#f6e05e', // Yellow
  secondaryDark: '#d69e2e', // Dark yellow
  accent: '#2d3748', // Dark gray/black
  light: '#f7fafc', // Very light gray/white
  dark: '#1a202c', // Very dark gray
  white: '#ffffff'
};

// Icon mapping
const iconMap = {
  'user-check': faUserCheck,
  'file-alt': faFileAlt,
  'check-circle': faCheckCircle,
  'hospital': faHospital,
  'plane-departure': faPlaneDeparture
};

// Default data structure
const defaultData = {
  heading: "Our Streamlined Process",
  subtitle: "Transparent workflow from initial contact to successful deployment",
  processes: {
    "process-1": {
      title: "Recruitment Process",
      steps: [
        {
          title: "Client Requirement Analysis",
          icon: "user-check",
          description: "We analyze your specific workforce needs and requirements",
          details: "Detailed analysis of job roles, skills required, shift patterns, and cultural fit"
        },
        {
          title: "Candidate Sourcing",
          icon: "file-alt",
          description: "Our team sources qualified candidates from our extensive network",
          details: "Utilizing our database of 50,000+ healthcare professionals and targeted recruitment campaigns"
        }
      ]
    },
    "process-2": {
      title: "Placement Process",
      steps: [
        {
          title: "Candidate Presentation",
          icon: "user-check",
          description: "We present carefully vetted candidates for your review",
          details: "Comprehensive profiles including qualifications, experience, and video interviews"
        },
        {
          title: "Client Interviews",
          icon: "hospital",
          description: "Facilitating interviews between you and the candidates",
          details: "We coordinate schedules and provide technical support for virtual interviews"
        }
      ]
    }
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Timeline = () => {
  const [activeProcess, setActiveProcess] = useState("process-1");
  const [expandedStep, setExpandedStep] = useState(null);
  const [data, setData] = useState(defaultData); // Initialize with default data
  const [loading, setLoading] = useState(false); // Start with false since we have default data
  const apiUrl = import.meta.env.VITE_API_URL;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  useEffect(() => {
    const fetchData = async () => {
      if (!apiUrl) {
        console.log("No API URL provided, using default data");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/home/timeline/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
        // Use default data if API fails
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <section 
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: colors.accent }}>
            {data.heading}
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.dark }}>
            {data.subtitle}
          </p>
        </motion.div>

        {/* Process Tabs */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-8 overflow-x-auto"
        >
          <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
            {Object.keys(data.processes).map((processKey) => (
              <motion.button
                key={processKey}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveProcess(processKey)}
                className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeProcess === processKey
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: activeProcess === processKey ? colors.primary : 'transparent',
                  transform: activeProcess === processKey ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {data.processes[processKey].title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Timeline Steps */}
        <motion.div 
          variants={containerVariants}
          className="relative max-w-4xl mx-auto"
        >
          {/* Vertical line */}
          <motion.div 
            className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-green-300 to-green-500"
            style={{ zIndex: 0 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <AnimatePresence mode="wait">
            {data.processes[activeProcess]?.steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative mb-8 pl-12"
                style={{ zIndex: 1 }}
              >
                {/* Icon circle */}
                <motion.div 
                  className={`absolute left-0 flex items-center justify-center w-8 h-8 rounded-full shadow-md ${
                    expandedStep === index ? 'ring-4 ring-opacity-30' : ''
                  }`}
                  style={{
                    backgroundColor: colors.white,
                    border: `2px solid ${colors.primary}`,
                    top: '0.25rem',
                    transform: expandedStep === index ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    ...(expandedStep === index ? { 
                      boxShadow: `0 0 0 4px ${colors.primaryLight}` 
                    } : {})
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FontAwesomeIcon 
                    icon={iconMap[step.icon]} 
                    className="text-lg" 
                    style={{ color: colors.primary }}
                  />
                </motion.div>

                {/* Step card */}
                <motion.div
                  className={`p-6 rounded-xl shadow-sm cursor-pointer transition-all duration-300 ${
                    expandedStep === index ? 'shadow-md' : 'hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: colors.white,
                    borderLeft: `4px solid ${colors.primary}`,
                    transform: expandedStep === index ? 'translateX(5px)' : 'translateX(0)'
                  }}
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 
                        className="text-xl font-semibold mb-2"
                        style={{ color: colors.accent }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ color: colors.dark }}>
                        {step.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedStep === index ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className="ml-4 mt-1" 
                        style={{ color: colors.primary }}
                      />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedStep === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                      >
                        <div 
                          className="p-4 rounded-lg"
                          style={{ 
                            backgroundColor: colors.primaryLight + '20',
                            borderLeft: `3px solid ${colors.primary}`
                          }}
                        >
                          <p style={{ color: colors.dark }}>
                            {step.details}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-12"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.button
            className="px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
            style={{
              backgroundColor: colors.secondary,
              color: colors.dark,
              boxShadow: `0 4px 0 ${colors.secondaryDark}`
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Timeline;