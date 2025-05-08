import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;

const About2 = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/about/about2/`);
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return (
    <div className="py-20 bg-gradient-to-br from-white to-[#7bbf42]/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-pulse space-y-12">
          <div className="h-10 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="py-16 bg-white text-center text-red-500">
      Error loading Vision & Mission: {error}
    </div>
  );

  if (!data) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-white to-[#7bbf42]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#040404]">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7bbf42] to-[#f9b414]">Core</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7bbf42] to-[#f9b414] mx-auto mt-4"></div>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#7bbf42]/20 hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7bbf42] to-[#f9b414] flex items-center justify-center text-3xl mb-6">
                {data.vision.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#040404] mb-4">{data.vision.title}</h3>
              <p className="text-gray-600 leading-relaxed">{data.vision.content}</p>
            </div>
            <div className="h-2 bg-gradient-to-r from-[#7bbf42] to-[#70308c]"></div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#f9b414]/20 hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f9b414] to-[#70308c] flex items-center justify-center text-3xl mb-6">
                {data.mission.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#040404] mb-4">{data.mission.title}</h3>
              <p className="text-gray-600 leading-relaxed">{data.mission.content}</p>
            </div>
            <div className="h-2 bg-gradient-to-r from-[#f9b414] to-[#7bbf42]"></div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-[#040404] mb-6">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#70308c] to-[#7bbf42]">Values</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto ${
                index % 3 === 0 ? 'bg-[#7bbf42]/10 text-[#7bbf42]' :
                index % 3 === 1 ? 'bg-[#f9b414]/10 text-[#f9b414]' :
                'bg-[#70308c]/10 text-[#70308c]'
              }`}>
                {value.icon}
              </div>
              <h4 className="text-xl font-bold text-[#040404] mb-3">{value.title}</h4>
              <p className="text-gray-600">{value.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About2;