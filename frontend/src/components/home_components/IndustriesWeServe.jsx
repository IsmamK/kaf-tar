import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spin } from 'antd';

const IndustriesWeServe = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/industries/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching industries data:", error);
        // Fallback to default data if API fails
        setData({
          heading: "Industries We Serve",
          subtitle: "Specialized workforce solutions tailored to your industry requirements",
          industries: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50 flex justify-center items-center h-96">
        <Spin size="large" />
      </section>
    );
  }

 

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.heading}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {data.subtitle}
          </p>
        </div>

        {/* Industry Selector - Horizontal Scroll */}
        <div className="mb-10 pb-2 overflow-x-auto">
          <div className="grid grid-cols-5 gap-4 space-x-2 w-max mx-auto px-4">
            {data.industries.map((industry, index) => (
              <button
                key={index}
                onClick={() => setActiveIndustry(index)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  index === activeIndustry
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {industry.title}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Panel */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={activeIndustry}
        >
          <div className="md:flex min-h-[400px]">
            {/* Industry Image */}
            <div className="md:w-2/5 relative">
              <img
                src={data.industries[activeIndustry].image}
                alt={data.industries[activeIndustry].title}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-medium">Industry Statistic</p>
                  <p className="text-xl font-bold">{data.industries[activeIndustry].stats}</p>
                </div>
              </div>
            </div>

            {/* Industry Content */}
            <div className="md:w-3/5 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {data.industries[activeIndustry].title} Workforce Solutions
              </h3>
              
              <p className="text-gray-700 text-lg mb-6">
                {data.industries[activeIndustry].description}
              </p>

              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Our Specializations:</h4>
                <ul className="space-y-2">
                  {data.industries[activeIndustry].highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                Request Industry-Specific Solution
                <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;