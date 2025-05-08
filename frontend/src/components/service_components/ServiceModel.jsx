import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ServiceModel = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    phases: [],
    keyBenefits: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePhase, setActivePhase] = useState(0);

  // Default data
  const defaultData = {
    sectionTitle: "Our Service Model",
    sectionSubtitle: "A proven approach to facility management excellence",
    phases: [
      {
        title: "Client Consultation",
        description: "Open dialogue to understand your needs",
        icon: "consultation",
        features: ["Needs assessment", "Transparent pricing"]
      },
      {
        title: "Service Kickoff",
        description: "Dedicated project team assigned",
        icon: "kickoff",
        features: ["Dedicated manager", "SLA establishment"]
      }
    ],
    keyBenefits: [
      "Single point of accountability",
      "Cost-efficient solutions"
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/service-model/`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        // Validate data
        const validatedData = {
          sectionTitle: result.sectionTitle || defaultData.sectionTitle,
          sectionSubtitle: result.sectionSubtitle || defaultData.sectionSubtitle,
          phases: Array.isArray(result.phases) ? result.phases : defaultData.phases,
          keyBenefits: Array.isArray(result.keyBenefits) ? result.keyBenefits : defaultData.keyBenefits
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
      consultation: (
        <svg className="w-10 h-10" fill="none" stroke="#7bbf42" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      ),
      kickoff: (
        <svg className="w-10 h-10" fill="none" stroke="#f9b414" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      performance: (
        <svg className="w-10 h-10" fill="none" stroke="#70308c" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      support: (
        <svg className="w-10 h-10" fill="none" stroke="#040404" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      )
    };
    return icons[iconName] || <div className="w-10 h-10 rounded-full bg-gray-300"></div>;
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
        Error loading service model: {error}
      </div>
    );
  }

  return (
    <section className="relative pb-10 overflow-hidden bg-white">
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

        {/* Process Timeline */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Phase Selector */}
          <div className="lg:w-1/4">
            <div className="bg-gradient-to-b from-[#7bbf42]/10 to-[#70308c]/10 p-6 rounded-2xl border-l-4 border-[#f9b414]">
              <h3 className="text-xl font-bold text-[#040404] mb-6">Our Process</h3>
              <div className="space-y-4">
                {data.phases?.map((phase, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActivePhase(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activePhase === index
                        ? 'bg-gradient-to-r from-[#7bbf42] to-[#f9b414] text-white shadow-md'
                        : 'bg-white hover:bg-gray-50 text-[#040404]'
                    }`}
                  >
                    <span className="font-medium">{phase.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Phase Details */}
          <div className="lg:w-3/4">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 h-full"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  {getIcon(data.phases[activePhase]?.icon)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#040404] mb-2">
                    {data.phases[activePhase]?.title}
                  </h3>
                  <p className="text-gray-600">
                    {data.phases[activePhase]?.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.phases[activePhase]?.features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      index % 4 === 0 ? 'bg-[#7bbf42]' : 
                      index % 4 === 1 ? 'bg-[#f9b414]' : 
                      index % 4 === 2 ? 'bg-[#70308c]' : 'bg-[#040404]'
                    }`}></div>
                    <span className="text-[#040404]">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#70308c] to-[#7bbf42] p-8 rounded-2xl shadow-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Key Benefits
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.keyBenefits?.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 text-white text-center"
              >
                <div className="text-4xl font-bold text-[#f9b414] mb-3">
                  {index + 1}
                </div>
                <p>{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceModel;