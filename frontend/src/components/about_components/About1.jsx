import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CompanyHistory = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    timeline: [],
    achievements: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default data structure
  const defaultData = {
    sectionTitle: "Our Journey",
    sectionSubtitle: "From humble beginnings to industry leadership",
    timeline: [
      {
        year: "2010",
        title: "Foundation",
        description: "KAF TAR was established in Riyadh with a small team focused on facility maintenance services.",
        icon: "foundation"
      },
      {
        year: "2013",
        title: "First Major Contract",
        description: "Secured our first government contract, expanding our service portfolio.",
        icon: "contract"
      },
      {
        year: "2016",
        title: "ISO Certification",
        description: "Achieved ISO 9001 certification for quality management systems.",
        icon: "certification"
      }
    ],
    achievements: [
      {
        value: "500+",
        label: "Facilities Managed"
      },
      {
        value: "24/7",
        label: "Support Coverage"
      }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/about/about1/`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        
        // Validate and merge with default data
        const validatedData = {
          sectionTitle: result.sectionTitle || defaultData.sectionTitle,
          sectionSubtitle: result.sectionSubtitle || defaultData.sectionSubtitle,
          timeline: Array.isArray(result.timeline) ? result.timeline : defaultData.timeline,
          achievements: Array.isArray(result.achievements) ? result.achievements : defaultData.achievements
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
      foundation: (
        <svg className="w-8 h-8" fill="none" stroke="#7bbf42" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      contract: (
        <svg className="w-8 h-8" fill="none" stroke="#f9b414" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      certification: (
        <svg className="w-8 h-8" fill="none" stroke="#70308c" viewBox="0 0 24 24">
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
    <section className="relative pb-12 pt-32 overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-[#7bbf42]/5 to-[#70308c]/5"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f9b414]/20 to-transparent rounded-full blur-xl"></div>

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

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Timeline */}
          <div className="lg:w-2/3">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-[#7bbf42] via-[#f9b414] to-[#70308c]"></div>

              {data.timeline?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-16 pb-12 last:pb-0"
                >
                  {/* Year badge */}
                  <div className="absolute left-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#7bbf42] to-[#f9b414] text-white font-bold shadow-lg">
                    {item.year || "Year"}
                  </div>

                  {/* Content card */}
                  <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-[#70308c] hover:border-[#f9b414] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#040404] mb-2">
                          {item.title || "Milestone"}
                        </h3>
                        <p className="text-gray-600">
                          {item.description || "Description not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="bg-gradient-to-br from-[#70308c] to-[#7bbf42] p-8 rounded-xl shadow-xl h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Key Achievements</h3>
              
              <div className="space-y-6">
                {data.achievements?.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
                  >
                    <p className="text-4xl font-bold text-[#f9b414] mb-1">
                      {achievement.value || "N/A"}
                    </p>
                    <p className="text-white/90">
                      {achievement.label || "Achievement"}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-white/80 italic">
                  Building trust through excellence in facility management
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;