import { useState } from 'react';
import { motion } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    projectDetails: '',
    startTimeline: '',
    budget: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/quote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        projectDetails: '',
        startTimeline: '',
        budget: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const projectTypes = [
    'New Home Construction',
    'Home Renovation',
    'Commercial Building',
    'Kitchen Remodel',
    'Bathroom Remodel',
    'Outdoor Living Space',
    'Other'
  ];

  const budgetRanges = [
    'Under $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    'Over $500,000'
  ];

  const timelines = [
    'Immediately',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months'
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-4 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl pt-12 font-bold text-[#040404] mb-4">
            Get Your <span className="text-[#7bbf42]">Free</span> Quote
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours with a customized quote for your project.
          </p>
        </motion.div>

        {submitSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#7bbf42]/10 border border-[#7bbf42] rounded-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-[#7bbf42] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#040404] mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">Your quote request has been submitted successfully. Our team will contact you shortly.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-2 bg-[#7bbf42] text-white font-medium rounded-lg hover:bg-[#6aa837] transition-colors duration-300"
            >
              Request Another Quote
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="h-2 bg-gradient-to-r from-[#7bbf42] via-[#f9b414] to-[#040404]"></div>
            
            <div className="p-8">
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-[#040404] mb-1">
                    Full Name <span className="text-[#f9b414]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all"
                  />
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-[#040404] mb-1">
                    Email <span className="text-[#f9b414]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all"
                  />
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-[#040404] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all"
                  />
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="projectType" className="block text-sm font-medium text-[#040404] mb-1">
                    Project Type <span className="text-[#f9b414]">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all"
                  >
                    <option value="">Select Project Type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="md:col-span-2"
                >
                  <label htmlFor="projectDetails" className="block text-sm font-medium text-[#040404] mb-1">
                    Project Details <span className="text-[#f9b414]">*</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all"
                    placeholder="Describe your project in detail..."
                  ></textarea>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="startTimeline" className="block text-sm font-medium text-[#040404] mb-1">
                    When do you want to start? <span className="text-[#f9b414]">*</span>
                  </label>
                  <select
                    id="startTimeline"
                    name="startTimeline"
                    value={formData.startTimeline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all"
                  >
                    <option value="">Select Timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="budget" className="block text-sm font-medium text-[#040404] mb-1">
                    Estimated Budget <span className="text-[#f9b414]">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7bbf42] focus:border-[#7bbf42] transition-all"
                  >
                    <option value="">Select Budget Range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(123, 191, 66, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#7bbf42] to-[#f9b414] text-white font-bold rounded-lg text-lg transition-all duration-300 flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Get Your Free Quote"
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </motion.section>
  );
};

export default QuoteForm;