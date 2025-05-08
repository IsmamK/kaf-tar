import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CareersPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    intro: "",
    benefits: [],
    openPositions: [],
    culture: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPosition, setExpandedPosition] = useState(null);

  // Default data
  const defaultData = {
    sectionTitle: "Join Our Team",
    sectionSubtitle: "Build your career with KAF TAR",
    intro: "We're looking for passionate professionals to join our growing team.",
    benefits: [
      {
        title: "Competitive Salaries",
        icon: "salary",
        description: "Industry-leading compensation packages"
      },
      {
        title: "Training Programs",
        icon: "training",
        description: "Continuous professional development"
      }
    ],
    openPositions: [
      {
        id: 1,
        title: "Facility Manager",
        location: "Riyadh",
        type: "Full-time",
        department: "Operations",
        description: "Lead facility management teams and ensure service excellence."
      }
    ],
    culture: "At KAF TAR, we foster a collaborative environment where every team member's contribution is valued."
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/career/`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        // Validate data
        const validatedData = {
          sectionTitle: result.sectionTitle || defaultData.sectionTitle,
          sectionSubtitle: result.sectionSubtitle || defaultData.sectionSubtitle,
          intro: result.intro || defaultData.intro,
          benefits: Array.isArray(result.benefits) ? result.benefits : defaultData.benefits,
          openPositions: Array.isArray(result.openPositions) ? result.openPositions : defaultData.openPositions,
          culture: result.culture || defaultData.culture
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
      salary: (
        <svg className="w-8 h-8" fill="none" stroke="#7bbf42" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      training: (
        <svg className="w-8 h-8" fill="none" stroke="#f9b414" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      growth: (
        <svg className="w-8 h-8" fill="none" stroke="#70308c" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      ),
      balance: (
        <svg className="w-8 h-8" fill="none" stroke="#040404" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
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
        Error loading careers data: {error}
      </div>
    );
  }

  return (
    <section className="relative py-20 pt-32 overflow-hidden bg-white">
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
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(123, 191, 66, 0.15) 0%, transparent 70%)',
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
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(106, 48, 140, 0.1) 0%, transparent 70%)',
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

        {/* Intro paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#7bbf42]/10 to-[#70308c]/10 p-8 rounded-2xl mb-16 border-l-8 border-[#f9b414]"
        >
          <p className="text-lg md:text-xl text-[#040404] leading-relaxed">
            {data.intro}
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-[#040404] mb-8 text-center">
            Employee Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.benefits?.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg border-t-4 hover:shadow-xl transition-all duration-300"
                style={{
                  borderTopColor: 
                    index % 4 === 0 ? '#7bbf42' : 
                    index % 4 === 1 ? '#f9b414' : 
                    index % 4 === 2 ? '#70308c' : '#040404'
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {getIcon(benefit.icon)}
                  </div>
                  <h4 className="text-xl font-bold text-[#040404] mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-[#040404] mb-8 text-center">
            Current Openings
          </h3>
          <div className="space-y-4">
            {data.openPositions?.map((position) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => setExpandedPosition(expandedPosition === position.id ? null : position.id)}
                  className="w-full p-6 text-left focus:outline-none"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-[#040404]">
                        {position.title}
                      </h4>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="px-3 py-1 bg-[#7bbf42]/10 text-[#7bbf42] rounded-full text-sm">
                          {position.location}
                        </span>
                        <span className="px-3 py-1 bg-[#f9b414]/10 text-[#f9b414] rounded-full text-sm">
                          {position.type}
                        </span>
                        <span className="px-3 py-1 bg-[#70308c]/10 text-[#70308c] rounded-full text-sm">
                          {position.department}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedPosition === position.id ? 180 : 0 }}
                      className="mt-4 md:mt-0"
                    >
                      <svg className="w-6 h-6 text-[#040404]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </motion.div>
                  </div>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedPosition === position.id ? 'auto' : 0,
                    opacity: expandedPosition === position.id ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                    <p className="text-gray-600 mb-4">{position.description}</p>
                    <a
                      href={`/apply?position=${position.id}`}
                      className="inline-block px-6 py-2 bg-gradient-to-r from-[#7bbf42] to-[#f9b414] text-white font-medium rounded-full hover:shadow-md transition-all duration-300"
                    >
                      Apply Now
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Culture */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#70308c] to-[#7bbf42] p-8 rounded-2xl shadow-xl text-white"
        >
          <h3 className="text-3xl font-bold mb-6 text-center">
            Our Culture
          </h3>
          <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed">
            {data.culture}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersPage;