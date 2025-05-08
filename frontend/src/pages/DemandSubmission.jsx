import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";
import { motion } from "framer-motion";

const COLORS = {
  primary: "#F15A24",
  secondary: "#FFC20E",
  white: "#FFFFFF",
  darkGray: "#2D2D2D",
  navy: "#060544"

};

const DemandSubmission = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formFields, setFormFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreviews, setFilePreviews] = useState({});

  // Fetch form fields
  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get(`${apiUrl}/forms/3`);
        setFormFields(response.data.fields || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching form fields:", error);
        setIsLoading(false);
      }
    };
    fetchFormFields();
  }, [apiUrl]);

  // Handle file previews
  const handleFilePreview = (name, files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreviews(prev => ({ ...prev, [name]: e.target.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    
    if (type === "file") {
      handleFilePreview(name, files);
      setFormState(prev => ({ ...prev, [name]: files }));
    } else if (type === "checkbox") {
      setFormState(prev => ({
        ...prev,
        [name]: prev[name] 
          ? checked 
            ? [...prev[name], value] 
            : prev[name].filter(v => v !== value)
          : checked 
            ? [value] 
            : []
      }));
    } else if (type === "radio") {
      setFormState(prev => ({ ...prev, [name]: value }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formData = new FormData();
    formData.append("form_id", 3);

    formFields.forEach(field => {
      const value = formState[field.name];
      if ((field.field_type === "image" || field.field_type === "file") && value) {
        formData.append(`file_${field.id}`, value[0]);
        formData.append(`field_${field.id}`, "");
      } else {
        formData.append(`field_${field.id}`, value || "");
      }
    });

    try {
      await axios.post(`${apiUrl}/form_responses/submit/`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      Modal.success({
        title: 'Demand Submitted Successfully!',
        content: 'Our recruitment team will contact you within 24 hours.',
        onOk: () => window.location.reload(),
      });
    } catch (error) {
      Modal.error({
        title: 'Submission Error',
        content: 'Please check your details and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const NAVBAR_HEIGHT = "80px"; // Adjust this to match your navbar height

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
            <div className="absolute inset-0 z-0 opacity-40">
              <img 
                src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?t=st=1743119176~exp=1743122776~hmac=7cccf575cb40196d9334057de880eaec72271d62b5e28bbb9b97b109d3bde32e&w=2000" 
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
                Demand Submission Portal
              </h1>
              <p className="text-xl text-white max-w-2xl mx-auto">
                Access your medical examination results securely
              </p>
            </motion.div>
          </div>

    <div className="min-h-screen flex"
 
    >
      
      {/* Information Panel (Left) */}
      <div 
        className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{ backgroundColor: COLORS.primary }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: COLORS.secondary }}>
              <span className="text-white font-bold">ST</span>
            </div>
            <span className="text-xl font-bold text-white">STECH HR Solutions</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">
            Submit Your Workforce Demand
          </h1>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white mb-2">Fast Placement</h3>
                <p className="text-white opacity-90">
                  Average placement time of 72 hours for standard requests
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white mb-2">Cost Effective</h3>
                <p className="text-white opacity-90">
                  Competitive pricing with no upfront fees - pay only after successful placement
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white mb-2">Verified Workers</h3>
                <p className="text-white opacity-90">
                  All candidates undergo background checks and skills verification
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 rounded-lg"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Need immediate assistance?</h3>
          <p className="text-white mb-4">
            Call our recruitment hotline for urgent staffing needs
          </p>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <span className="text-xl font-semibold text-white">+1 (800) 123-4567</span>
          </div>
        </motion.div>
      </div>

      {/* Form Panel (Right) */}
      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <div className="lg:hidden mb-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: COLORS.primary }}>
                <span className="text-white font-bold">ST</span>
              </div>
              <span className="text-xl font-bold" style={{ color: COLORS.primary }}>STECH HR Solutions</span>
            </div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: COLORS.darkGray }}>
              Submit Your Workforce Demand
            </h1>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" 
                style={{ borderColor: COLORS.primary }} />
              <p className="mt-4" style={{ color: COLORS.darkGray }}>Loading form...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.darkGray }}>
                  Employer Information
                </h2>
                <p className="text-gray-600 mb-6">
                  Tell us about your company and contact details
                </p>
              </div>

              {formFields.filter(f => ["text", "email", "phone"].includes(f.field_type)).map((field, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: COLORS.darkGray }}>
                    {field.name}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type={field.field_type === "phone" ? "tel" : field.field_type}
                    name={field.name}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none"
                    style={{
                      borderColor: '#E5E7EB',
                      focusBorderColor: COLORS.primary,
                      focusRingColor: COLORS.primary + '50'
                    }}
                    required={field.required}
                    onChange={handleInputChange}
                  />
                </div>
              ))}

              <div className="pt-6 mt-6 border-t">
                <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.darkGray }}>
                  Workforce Requirements
                </h2>
                <p className="text-gray-600 mb-6">
                  Detail the positions you need to fill
                </p>
              </div>

              {formFields.filter(f => !["text", "email", "phone"].includes(f.field_type)).map((field, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: COLORS.darkGray }}>
                    {field.name}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {/* Text/Textarea */}
                  {(field.field_type === "text" || field.field_type === "textarea") && (
                    field.field_type === "textarea" ? (
                      <textarea
                        name={field.name}
                        rows="4"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none"
                        style={{
                          borderColor: '#E5E7EB',
                          focusBorderColor: COLORS.primary,
                          focusRingColor: COLORS.primary + '50'
                        }}
                        required={field.required}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <input
                        type="text"
                        name={field.name}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none"
                        style={{
                          borderColor: '#E5E7EB',
                          focusBorderColor: COLORS.primary,
                          focusRingColor: COLORS.primary + '50'
                        }}
                        required={field.required}
                        onChange={handleInputChange}
                      />
                    )
                  )}

                  {/* File Upload */}
                  {(field.field_type === "file" || field.field_type === "image") && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              {field.field_type === "image" ? "PNG, JPG (MAX. 5MB)" : "PDF, DOCX (MAX. 10MB)"}
                            </p>
                          </div>
                          <input 
                            type="file" 
                            name={field.name} 
                            className="hidden" 
                            onChange={handleInputChange}
                            accept={field.field_type === "image" ? "image/*" : "*"}
                          />
                        </label>
                      </div>
                      {filePreviews[field.name] && (
                        <div className="mt-2">
                          {field.field_type === "image" ? (
                            <img 
                              src={filePreviews[field.name]} 
                              alt="Preview" 
                              className="h-32 rounded object-cover border"
                            />
                          ) : (
                            <div className="flex items-center p-3 bg-gray-50 rounded border">
                              <svg className="w-6 h-6 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                              </svg>
                              <span className="text-sm">Document ready</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Select Dropdown */}
                  {field.field_type === "select" && (
                    <select
                      name={field.name}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-right-3 bg-center bg-[length:20px_20px]"
                      style={{
                        borderColor: '#E5E7EB',
                        focusBorderColor: COLORS.primary,
                        focusRingColor: COLORS.primary + '50'
                      }}
                      required={field.required}
                      onChange={handleInputChange}
                    >
                      <option value="">Select {field.name.toLowerCase()}</option>
                      {field.options?.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  )}

                  {/* Checkbox Group */}
                  {field.field_type === "checkbox" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {field.options?.map((option, i) => (
                        <label key={i} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name={field.name}
                            value={option}
                            className="w-5 h-5 rounded border-gray-300 focus:ring-2"
                            style={{
                              borderColor: '#E5E7EB',
                              focusRingColor: COLORS.primary + '50',
                              checkedColor: COLORS.primary
                            }}
                            onChange={handleInputChange}
                          />
                          <span className="text-sm" style={{ color: COLORS.darkGray }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Radio Group */}
                  {field.field_type === "radio" && (
                    <div className="space-y-3">
                      {field.options?.map((option, i) => (
                        <label key={i} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={field.name}
                            value={option}
                            className="w-5 h-5 border-gray-300 focus:ring-2"
                            style={{
                              borderColor: '#E5E7EB',
                              focusRingColor: COLORS.primary + '50',
                              checkedColor: COLORS.primary
                            }}
                            onChange={handleInputChange}
                          />
                          <span className="text-sm" style={{ color: COLORS.darkGray }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center"
                  style={{ 
                    backgroundColor: COLORS.primary,
                    color: COLORS.white
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Workforce Request'
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>

    </div>
  );
};

export default DemandSubmission;