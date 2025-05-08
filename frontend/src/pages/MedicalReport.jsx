import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const COLORS = {
  primary: "#F15A24",
  primaryLight: "#FF7A45",
  secondary: "#FFC20E",
  secondaryLight: "#FFD95E",
  lightGray: "#F8F8F8",
  darkGray: "#2D2D2D",
  white: "#FFFFFF",
  black: "#000000",
  navy: "#060544"

};

const MedicalReport = () => {
  const [passportNumber, setPassportNumber] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [reportLink, setReportLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleDownloadReport = () => {
    if (reportLink) {
      window.open(reportLink, "_blank");
    } else {
      alert("No report available to download.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsValid(null);
    setReportLink("");
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${apiUrl}/medical-reports/${passportNumber}/`
      );

      if (response.data && response.data.medical_report) {
        setReportLink(response.data.medical_report);
        setIsValid(true);
      } else {
        throw new Error("Report not found");
      }
    } catch (error) {
      setErrorMessage("No medical report found for this passport number.");
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setPassportNumber(e.target.value);
    setIsValid(null);
  };

  return (
    <div className="min-h-screen flex flex-col" 
    style={{ 
      paddingTop: "80px",
      minHeight: "calc(100vh - 80px)"
    }}
    
    >
      {/* Hero Section */}
      <div 
        className="w-full py-16 px-8 text-center relative overflow-hidden"
        style={{ backgroundColor: COLORS.navy }}
      >
        <div className="absolute inset-0 z-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Medical background"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Medical Report Portal
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Access your medical examination results securely
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white py-12 px-8">
        <div className=" mx-auto grid md:grid-cols-2 gap-12">
          {/* Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-lg"
            style={{ backgroundColor: COLORS.lightGray }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.darkGray }}>
              About Your Medical Report
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: COLORS.secondary }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.darkGray }}>Secure Access</h3>
                  <p className="text-gray-600">Your medical information is protected and only accessible with your passport number</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: COLORS.secondary }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.darkGray }}>Instant Results</h3>
                  <p className="text-gray-600">Get immediate access to your medical examination report</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: COLORS.secondary }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.darkGray }}>Official Documentation</h3>
                  <p className="text-gray-600">Download your verified medical report for visa processing</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: COLORS.primaryLight }}>
              <h3 className="text-xl font-bold text-white mb-3">Need Help?</h3>
              <p className="text-white mb-4">
                If you're having trouble accessing your report, please contact our support team.
              </p>
              <button
                className="w-full py-2 px-4 rounded-lg font-medium"
                style={{ 
                  backgroundColor: COLORS.white,
                  color: COLORS.primary
                }}
              >
                Contact Support
              </button>
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.darkGray }}>
              Retrieve Your Report
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: COLORS.darkGray }}
                  htmlFor="passport-number"
                >
                  Passport Number
                </label>
                <input
                  type="text"
                  id="passport-number"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: '#E5E7EB',
                    focusBorderColor: COLORS.primary
                  }}
                  placeholder="Enter your passport number"
                  value={passportNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center"
                style={{ 
                  backgroundColor: COLORS.primary,
                  color: COLORS.white
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'View Medical Report'
                )}
              </button>
            </form>

            {/* Report Status */}
            {isValid !== null && (
              <div className="mt-8">
                {isValid ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-lg border-2"
                    style={{ 
                      borderColor: COLORS.secondary,
                      backgroundColor: COLORS.lightGray
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <svg className="w-8 h-8 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="text-xl font-bold" style={{ color: COLORS.darkGray }}>
                        Report Found
                      </h3>
                    </div>
                    <p className="mb-6" style={{ color: COLORS.darkGray }}>
                      Your medical examination report is ready for download.
                    </p>
                    <button
                      className="w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                      style={{ 
                        backgroundColor: COLORS.secondary,
                        color: COLORS.darkGray
                      }}
                      onClick={handleDownloadReport}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Download Report
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-lg border-2"
                    style={{ 
                      borderColor: COLORS.primaryLight,
                      backgroundColor: COLORS.lightGray
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <svg className="w-8 h-8 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <h3 className="text-xl font-bold" style={{ color: COLORS.darkGray }}>
                        Report Not Found
                      </h3>
                    </div>
                    <p className="mb-6" style={{ color: COLORS.darkGray }}>
                      {errorMessage || "No medical report found for this passport number."}
                    </p>
                    <div className="text-sm" style={{ color: COLORS.darkGray }}>
                      <p>Please check your passport number or contact support if you believe this is an error.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MedicalReport;