import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Spin } from "antd";
import { motion } from "framer-motion";

const COLORS = {
  primary: "#F15A24",
  secondary: "#FFC20E",
  white: "#FFFFFF",
  darkGray: "#2D2D2D",
  navy: "#060544"

};

const AgentRegistration = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formFields, setFormFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [filePreviews, setFilePreviews] = useState({});

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get(`${apiUrl}/forms/1`);
        setFormFields(response.data.fields || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching form fields:", error);
        setIsLoading(false);
      }
    };
    fetchFormFields();
  }, [apiUrl]);

  const handleFilePreview = (name, files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreviews(prev => ({ ...prev, [name]: e.target.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let formData = new FormData();
    formData.append("form_id", 1);

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
        title: 'Application Submitted!',
        content: 'We will review your information and contact you shortly.',
        onOk: () => window.location.reload(),
      });
    } catch (error) {
      Modal.error({
        title: 'Submission Error',
        content: 'Please check your details and try again.',
      });
    } finally {
      setSubmitting(false);
    }
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
    
    <div className="min-h-screen flex flex-col"
>

      {/* Split Content */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Information Panel (Left) */}
        <div 
          className="lg:w-1/2 p-8 lg:p-12"
          style={{ backgroundColor: COLORS.primary }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto lg:mx-0"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Stech Agent Registration
             </h2>
            
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: "💰",
                  title: "Competitive Commissions",
                  text: "Earn industry-leading rates for successful placements"
                },
                {
                  icon: "🌐", 
                  title: "National Reach",
                  text: "Access job opportunities across multiple regions"
                },
                {
                  icon: "🛠️",
                  title: "Dedicated Support",
                  text: "Get marketing materials and recruitment tools"
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <span className="text-2xl mr-4">{item.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-white opacity-90">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: COLORS.secondary }}>
              <h3 className="text-xl font-bold text-white mb-3">Why Join Us?</h3>
              <ul className="list-disc pl-5 space-y-2 text-white">
                <li>Weekly payment settlements</li>
                <li>Priority access to high-demand jobs</li>
                <li>Free training and certification</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Form Panel (Right) */}
        <div className="lg:w-1/2 bg-white p-6 md:p-12 flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full  mx-auto"
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.darkGray }}>
              Agent Application
            </h2>
            <p className="text-gray-600 mb-6">
              Complete this form to start recruiting with us
            </p>

            {isLoading ? (
              <div className="text-center py-12">
                <Spin size="large" style={{ color: COLORS.primary }} />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formFields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: COLORS.darkGray }}>
                      {field.name}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {/* Text Inputs */}
                    {["text", "email", "phone"].includes(field.field_type) && (
                      <input
                        type={field.field_type === "phone" ? "tel" : field.field_type}
                        name={field.name}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none"
                        style={{
                          borderColor: '#E5E7EB',
                          focusBorderColor: COLORS.primary
                        }}
                        required={field.required}
                        onChange={handleInputChange}
                      />
                    )}

                    {/* Textarea */}
                    {field.field_type === "textarea" && (
                      <textarea
                        name={field.name}
                        rows="4"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none"
                        style={{
                          borderColor: '#E5E7EB',
                          focusBorderColor: COLORS.primary
                        }}
                        required={field.required}
                        onChange={handleInputChange}
                      />
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
                                <span className="font-semibold">Click to upload</span>
                              </p>
                            </div>
                            <input 
                              type="file" 
                              name={field.name} 
                              className="hidden" 
                              onChange={handleInputChange}
                              // accept={field.field_type === "image" ? "image/*" : "*"}
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
                                <span className="text-sm">Document uploaded</span>
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
                          focusBorderColor: COLORS.primary
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
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Spin size="small" className="mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AgentRegistration;