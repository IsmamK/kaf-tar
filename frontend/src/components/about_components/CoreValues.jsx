import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CoreValues = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    policyStatement: "",
    coreValues: [],
    certifications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default data
  const defaultData = {
    sectionTitle: "Our Quality Policy",
    sectionSubtitle: "Commitment to excellence in every service",
    policyStatement: "KAF TAR focuses on product quality for continuous improvement. Our Quality Control Department constantly monitors and enforces quality standards at all project stages, including post-sales. We strive to enhance performance for the best service quality, with dedicated project managers ensuring full monitoring and control.",
    coreValues: [
      {
        title: "Continuous Improvement",
        description: "Regularly enhancing our processes and services",
        icon: "improvement"
      },
      {
        title: "Quality Control",
        description: "Rigorous monitoring at all project stages",
        icon: "quality"
      },
      {
        title: "Customer Focus",
        description: "Delivering services that exceed client expectations",
        icon: "customer"
      },
      {
        title: "Accountability",
        description: "Taking ownership of all our deliverables",
        icon: "accountability"
      }
    ],
    certifications: [
      "ISO 9001 Certified",
      "Saudi Aramco Approved",
      "Royal Commission Certified"
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/about/core-values/`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        // Validate and merge data
        const validatedData = {
          sectionTitle: result.sectionTitle || defaultData.sectionTitle,
          sectionSubtitle: result.sectionSubtitle || defaultData.sectionSubtitle,
          policyStatement: result.policyStatement || defaultData.policyStatement,
          coreValues: Array.isArray(result.coreValues) ? result.coreValues : defaultData.coreValues,
          certifications: Array.isArray(result.certifications) ? result.certifications : defaultData.certifications
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
      improvement: (
        <svg className="w-8 h-8" fill="none" stroke="#7bbf42" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      quality: (
        <svg className="w-8 h-8" fill="none" stroke="#f9b414" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      customer: (
        <svg className="w-8 h-8" fill="none" stroke="#70308c" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
      accountability: (
        <svg className="w-8 h-8" fill="none" stroke="#040404" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
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
        Error loading data: {error}
      </div>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#f9f9f9] to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-[#7bbf42]/5 to-[#70308c]/5 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f9b414]/15 to-transparent rounded-full blur-xl"></div>

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
            {data.sectionTitle}
            <span className="block w-20 h-1 bg-[#f9b414] mx-auto mt-4"></span>
          </h2>
          <p className="text-xl text-[#7bbf42] max-w-2xl mx-auto">
            {data.sectionSubtitle}
          </p>
        </motion.div>

        {/* Policy Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#7bbf42]/10 to-[#70308c]/10 p-8 rounded-2xl mb-16 border-l-8 border-[#f9b414]"
        >
          <p className="text-lg md:text-xl text-[#040404] leading-relaxed">
            {data.policyStatement}
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.coreValues?.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#7bbf42] hover:border-[#f9b414] transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {getIcon(value.icon)}
                </div>
                <h3 className="text-2xl font-bold text-[#040404] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#70308c] to-[#7bbf42] p-8 rounded-2xl shadow-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Our Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.certifications?.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 text-white font-medium"
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues;