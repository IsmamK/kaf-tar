import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    contactInfo: {},
    formFields: [],
    workingHours: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Default data
  const defaultData = {
    sectionTitle: "Get In Touch",
    sectionSubtitle: "We're ready to assist you with your facility management needs",
    contactInfo: {
      phone: "+966 56 705 5580",
      email: "info@kaftaroperations.com",
      address: "9191 Al Olaya Dist. Riyadh 12611, Saudi Arabia"
    },
    formFields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true
      },
      {
        name: "serviceInterest",
        label: "Service Interest",
        type: "select",
        options: [
          "Facility Management",
          "Manpower Services",
          "Cleaning Services",
          "Technical Maintenance"
        ]
      }
    ],
    workingHours: "Sunday - Thursday: 8:00 AM - 5:00 PM"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/contact/contact1/`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        // Validate data
        const validatedData = {
          sectionTitle: result.sectionTitle || defaultData.sectionTitle,
          sectionSubtitle: result.sectionSubtitle || defaultData.sectionSubtitle,
          contactInfo: result.contactInfo || defaultData.contactInfo,
          formFields: Array.isArray(result.formFields) ? result.formFields : defaultData.formFields,
          workingHours: result.workingHours || defaultData.workingHours
        };
        
        setData(validatedData);
        
        // Initialize form data
        const initialFormData = {};
        validatedData.formFields.forEach(field => {
          initialFormData[field.name] = "";
        });
        setFormData(initialFormData);
        
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      // Reset form after submission
      const resetForm = {};
      data.formFields.forEach(field => {
        resetForm[field.name] = "";
      });
      setFormData(resetForm);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
        Error loading contact data: {error}
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
            y: [0, -50, 0]
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

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="bg-gradient-to-br from-[#70308c] to-[#7bbf42] p-8 rounded-2xl shadow-xl h-full text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href={`tel:${data.contactInfo.phone}`} className="hover:underline">
                      {data.contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href={`mailto:${data.contactInfo.email}`} className="hover:underline">
                      {data.contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p>{data.contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/20">
                  <h4 className="font-medium mb-2">Working Hours</h4>
                  <p>{data.workingHours}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-[#7bbf42] to-[#f9b414] p-8 rounded-2xl shadow-lg text-center text-white"
              >
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-lg mb-6">Your message has been sent successfully.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-white text-[#040404] font-medium rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {data.formFields.map((field, index) => {
                    if (field.type === 'textarea') {
                      return (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="md:col-span-2"
                        >
                          <label htmlFor={field.name} className="block text-sm font-medium text-[#040404] mb-2">
                            {field.label} {field.required && <span className="text-[#f9b414]">*</span>}
                          </label>
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all duration-300"
                          />
                        </motion.div>
                      );
                    } else if (field.type === 'select') {
                      return (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className={index >= data.formFields.length - 2 ? "md:col-span-2" : ""}
                        >
                          <label htmlFor={field.name} className="block text-sm font-medium text-[#040404] mb-2">
                            {field.label} {field.required && <span className="text-[#f9b414]">*</span>}
                          </label>
                          <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all duration-300"
                          >
                            <option value="">Select an option</option>
                            {field.options.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </select>
                        </motion.div>
                      );
                    } else {
                      return (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <label htmlFor={field.name} className="block text-sm font-medium text-[#040404] mb-2">
                            {field.label} {field.required && <span className="text-[#f9b414]">*</span>}
                          </label>
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all duration-300"
                          />
                        </motion.div>
                      );
                    }
                  })}
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-full font-bold text-white transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400'
                      : 'bg-gradient-to-r from-[#7bbf42] to-[#f9b414] hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;