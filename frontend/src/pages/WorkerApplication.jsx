import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Modal, Spin } from "antd";
import { motion } from "framer-motion";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

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

const WorkerApplication = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formFields, setFormFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({});
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const isPaymentExecuted = useRef(false);
  const [formMeta, setFormMeta] = useState({});
  const [filePreviews, setFilePreviews] = useState({});

  // Reset payment states on component mount
  useEffect(() => {
    setIsPaymentSuccess(false);
    setIsPaymentFailed(false);
  }, []);

  // Fetch form fields from the API
  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get(`${apiUrl}/forms/2`);
        setFormFields(response.data.fields || []);
        setFormMeta(response.data);
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
    setIsSubmitting(true);
  
    try {
      const paymentResponse = await axios.post(`${apiUrl}/create_payment/`, {
        amount: formMeta.payment_amount,
        callback_url: `${window.location.origin}/worker-registration`,
      });
  
      if (paymentResponse.data.status === "success") {
        const paymentID = paymentResponse.data.payment_id;
  
        let formData = new FormData();
        formData.append("payment_id", paymentID);
        formData.append("form_id", formMeta.id);
        
        formFields.forEach(field => {
          const value = formState[field.name];
          if ((field.field_type === "image" || field.field_type === "file") && value) {
            formData.append(`file_${field.id}`, value[0]);
            formData.append(`field_${field.id}`, "");
          } else {
            formData.append(`field_${field.id}`, value || "");
          }
        });
  
        await axios.post(`${apiUrl}/temp_form_data/`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
  
        setPaymentUrl(paymentResponse.data.bkash_url);
      } else {
        setIsPaymentFailed(true);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      setIsPaymentFailed(true);
      setIsSubmitting(false);
    }
  };

  // Handle payment callback
  useEffect(() => {
    const handlePaymentCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentID = urlParams.get("paymentID");
  
      if (paymentID && !isPaymentExecuted.current) {
        isPaymentExecuted.current = true;
  
        try {
          const executeResponse = await axios.post(`${apiUrl}/execute_payment/`, {
            payment_id: paymentID,
          });
  
          if (executeResponse.data.status === "success") {
            setIsPaymentSuccess(true);
          } else {
            setIsPaymentFailed(true);
          }
        } catch (error) {
          console.error("Error executing payment:", error);
          setIsPaymentFailed(true);
        }
      }
    };
  
    handlePaymentCallback();
  }, [apiUrl]);

  // Redirect to payment URL if set
  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      paddingTop: "80px",
      minHeight: "calc(100vh - 80px)"
    }}>
      {/* Hero Section */}
      <div 
        className="w-full py-16 px-8 text-center relative overflow-hidden"
        style={{ backgroundColor: COLORS.navy }}
      >
        <div className="absolute inset-0 z-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Background"
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
            Worker Registration
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Register as a worker to access international job opportunities
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Information Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-lg"
              style={{ backgroundColor: COLORS.lightGray }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.darkGray }}>
                Why Register With Us?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: COLORS.secondary }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.darkGray }}>Verified Employers</h3>
                    <p className="text-gray-600">Access to pre-screened international employers with legitimate job offers</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: COLORS.secondary }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.darkGray }}>No Hidden Fees</h3>
                    <p className="text-gray-600">Transparent pricing with no surprise charges</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: COLORS.secondary }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.darkGray }}>Visa Assistance</h3>
                    <p className="text-gray-600">Guidance through the entire visa application process</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: COLORS.primaryLight }}>
                <h3 className="text-xl font-bold text-white mb-3">Registration Fee</h3>
                <p className="text-white mb-4">
                  A one-time registration fee of {formMeta.payment_amount } BDT is required to process your application.
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://freelogopng.com/images/all_img/1656235199bkash-logo-transparent.png" 
                    alt="bKash" 
                    className="h-8 mr-3"
                  />
                  <span className="text-white text-lg font-semibold">Payment Accepted</span>
                </div>
              </div>
            </motion.div>

            {/* Form Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.darkGray }}>
                Registration Form
              </h2>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <Spin size="large" style={{ color: COLORS.primary }} />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                          placeholder={`Enter your ${field.name}`}
                          required={field.required}
                          value={formState[field.name] || ""}
                          onChange={handleInputChange}
                        />
                      )}

                      {/* Textarea */}
                      {field.field_type === "textarea" && (
                        <textarea
                          name={field.name}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none"
                          style={{
                            borderColor: '#E5E7EB',
                            focusBorderColor: COLORS.primary
                          }}
                          placeholder={`Enter your ${field.name}`}
                          rows="3"
                          required={field.required}
                          value={formState[field.name] || ""}
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
                            focusBorderColor: COLORS.primary
                          }}
                          required={field.required}
                          value={formState[field.name] || ""}
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
                                checked={formState[field.name]?.includes(option)}
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
                                checked={formState[field.name] === option}
                                onChange={handleInputChange}
                              />
                              <span className="text-sm" style={{ color: COLORS.darkGray }}>{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-6">
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
                          <Spin size="small" className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <img src="https://freelogopng.com/images/all_img/1656235199bkash-logo-transparent.png" alt="bKash" className="h-6 mr-2" />
                          Pay {formMeta.payment_amount || '500'} BDT to Register
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        visible={isPaymentSuccess}
        onCancel={() => setIsPaymentSuccess(false)}
        footer={null}
        centered
      >
        <div className="text-center p-6">
          <CheckCircleOutlined className="text-green-500 text-6xl mb-4" />
          <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.darkGray }}>
            Registration Complete!
          </h2>
          <p className="mb-6">Your payment has been processed successfully.</p>
          <button
            className="px-6 py-2 rounded-lg font-medium"
            style={{ 
              backgroundColor: COLORS.primary,
              color: COLORS.white
            }}
            onClick={() => setIsPaymentSuccess(false)}
          >
            Continue
          </button>
        </div>
      </Modal>

      {/* Failure Modal */}
      <Modal
        visible={isPaymentFailed}
        onCancel={() => setIsPaymentFailed(false)}
        footer={null}
        centered
      >
        <div className="text-center p-6">
          <CloseCircleOutlined className="text-red-500 text-6xl mb-4" />
          <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.darkGray }}>
            Payment Failed
          </h2>
          <p className="mb-6">There was an issue processing your payment. Please try again.</p>
          <button
            className="px-6 py-2 rounded-lg font-medium"
            style={{ 
              backgroundColor: COLORS.primary,
              color: COLORS.white
            }}
            onClick={() => setIsPaymentFailed(false)}
          >
            Try Again
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default WorkerApplication;