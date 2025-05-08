import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Sustainability = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    intro: "",
    pillars: [],
    initiatives: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default data
  const defaultData = {
    sectionTitle: "Our Sustainability Commitment",
    sectionSubtitle: "Building a greener future through responsible operations",
    intro: "KAF TAR is committed to continual improvement in sustainability and reducing environmental impact across all our activities, products, and services.",
    pillars: [
      {
        title: "Energy Efficiency",
        description: "Reducing consumption through efficient systems and renewable technologies",
        icon: "energy",
        stats: "35% reduction target by 2025"
      },
      {
        title: "Material Stewardship",
        description: "Sustainable selection, reuse, and recycling of materials",
        icon: "materials",
        stats: "75% waste diversion rate"
      }
    ],
    initiatives: [
      "Solar panel installations",
      "Water recycling systems",
      "Green cleaning products"
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/sustainability/`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        // Validate data
        const validatedData = {
          sectionTitle: result.sectionTitle || defaultData.sectionTitle,
          sectionSubtitle: result.sectionSubtitle || defaultData.sectionSubtitle,
          intro: result.intro || defaultData.intro,
          pillars: Array.isArray(result.pillars) ? result.pillars : defaultData.pillars,
          initiatives: Array.isArray(result.initiatives) ? result.initiatives : defaultData.initiatives
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
      energy: (
        <svg className="w-10 h-10" fill="none" stroke="#f9b414" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      materials: (
        <svg className="w-10 h-10" fill="none" stroke="#7bbf42" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      ),
      waste: (
        <svg className="w-10 h-10" fill="none" stroke="#70308c" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      ),
      pollution: (
        <svg className="w-10 h-10" fill="none" stroke="#040404" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
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
        Error loading sustainability data: {error}
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
            y: [0, 50, 0]
          }}
          transition={{
            duration: 25,
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
            y: [0, -50, 0]
          }}
          transition={{
            duration: 30,
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

        {/* Sustainability Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.pillars?.map((pillar, index) => (
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
                  {getIcon(pillar.icon)}
                </div>
                <h3 className="text-2xl font-bold text-[#040404] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {pillar.description}
                </p>
                <div className="mt-auto px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-[#70308c]">
                  {pillar.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Initiatives */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#70308c] to-[#7bbf42] p-8 rounded-2xl shadow-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Key Initiatives
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.initiatives?.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 text-white font-medium flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${
                  index % 4 === 0 ? 'bg-[#7bbf42]' : 
                  index % 4 === 1 ? 'bg-[#f9b414]' : 
                  index % 4 === 2 ? 'bg-white' : 'bg-[#040404]'
                }`}></span>
                {initiative}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sustainability;