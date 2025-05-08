import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const apiUrl = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/contacts/`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-r from-[#7bbf42]/10 to-[#f9b414]/10">
        <div className="animate-pulse text-[#040404]">Loading...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      id="contact-cta"
    >
      {/* Section Title */}
      <motion.div
        className="text-center mb-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7bbf42] to-[#f9b414]">
          Connect With KAF TAR
        </h2>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#7bbf42] via-[#f9b414] to-[#70308c] rounded-full"></div>
      </motion.div>

      {/* Main Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7bbf42]/5 via-[#f9b414]/5 to-[#70308c]/5"></div>
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#f9b414]/10 blur-xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#70308c]/10 blur-xl"
        animate={{
          x: [0, -20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Rest of your existing component remains the same */}
          <div className="grid md:grid-cols-2">
            {/* Left Side - Content */}
            <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-white to-[#f8f9fa]">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-[#040404] mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {data.title}
              </motion.h2>

              <motion.p
                className="text-lg text-[#040404]/80 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                {data.subtitle}
              </motion.p>

              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-[#70308c] mb-4">
                  Why Choose KAF TAR?
                </h3>
                <ul className="space-y-3">
                  {data.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="w-6 h-6 rounded-full bg-[#7bbf42]/10 flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-[#7bbf42]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#040404]">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <a
                  href={data.ctaButton.link}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-[#f9b414] to-[#7bbf42] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {data.ctaButton.text}
                </a>
              </motion.div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-[#70308c] to-[#4a1d5f] text-white">
              <motion.h3
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Contact Information
              </motion.h3>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-[#f9b414]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f9b414]">Phone</h4>
                    <p className="mt-1">{data.contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-[#f9b414]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f9b414]">Email</h4>
                    <p className="mt-1">{data.contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-[#f9b414]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#f9b414]">Address</h4>
                    <p className="mt-1">{data.contactInfo.address}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
