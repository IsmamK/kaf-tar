import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ChairmansMessage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Brand colors
  const colors = {
    white: '#ffffff',
    primary: '#7bbf42',
    primaryLight: '#a3d177',
    primaryDark: '#5a9e2d',
    secondary: '#f9b414',
    secondaryLight: '#fbc740',
    tertiary: '#040404',
    lightBg: '#f8faf7'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/about/message/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData.chairman);
      } catch (error) {
        console.error("Error fetching chairman data:", error);
        // Fallback data
        setData({
          name: "John A. Smith",
          title: "Founder & Chairman",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          message: "For over 25 years, our company has been at the forefront of innovative construction solutions. We take pride in transforming visions into concrete realities while maintaining the highest standards of quality and safety.",
          signature: "https://via.placeholder.com/200x80?text=Signature",
          years_of_experience: "30+",
          projects_completed: "500+",
          company_established: "1995"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colors.primary }}
        ></div>
      </div>
    );
  }

  return (
    <section 
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.lightBg }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10" 
           style={{ backgroundColor: colors.primary }}></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10" 
           style={{ backgroundColor: colors.secondary }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.tertiary }}
          >
            CHAIRMAN'S MESSAGE
          </h2>
          <div 
            className="w-24 h-1.5 mx-auto rounded-full mb-4"
            style={{ backgroundColor: colors.secondary }}
          ></div>
          <p 
            className="text-lg"
            style={{ color: colors.primaryDark }}
          >
            Leadership Vision for the Future
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Chairman's image */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={data.image} 
                alt={data.name} 
                className="w-full h-auto object-cover"
              />
              {/* Stats overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ 
                  background: `linear-gradient(to top, ${colors.primary}dd, transparent)`
                }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="text-white">
                    <div className="text-2xl font-bold">{data.years_of_experience}</div>
                    <div className="text-sm">Years Experience</div>
                  </div>
                  <div className="text-white">
                    <div className="text-2xl font-bold">{data.projects_completed}</div>
                    <div className="text-sm">Projects</div>
                  </div>
                  <div className="text-white">
                    <div className="text-2xl font-bold">{data.company_established}</div>
                    <div className="text-sm">Established</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chairman's message */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="bg-white p-8 md:p-12 rounded-2xl shadow-lg relative"
              style={{ borderLeft: `6px solid ${colors.secondary}` }}
            >
              {/* Quote icon */}
              <div 
                className="absolute top-8 left-8 text-6xl opacity-10"
                style={{ color: colors.primary }}
              >
                "
              </div>

              <p 
                className="text-lg md:text-xl italic mb-8 relative z-10"
                style={{ color: colors.tertiary }}
              >
                {data.message}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 
                    className="text-2xl font-bold"
                    style={{ color: colors.primaryDark }}
                  >
                    {data.name}
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ color: colors.secondary }}
                  >
                    {data.title}
                  </p>
                </div>
                {data.signature && (
                  <div className="mt-4 sm:mt-0">
                    <img 
                      src={data.signature} 
                      alt="Signature" 
                      className="h-16 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="hidden lg:block absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20" 
                 style={{ backgroundColor: colors.secondary }}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChairmansMessage;