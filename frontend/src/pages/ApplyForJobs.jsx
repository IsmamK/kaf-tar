import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Spin } from "antd";
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

const ApplyForJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [jobOpportunities, setJobOpportunities] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [submitting, setSubmitting] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({});
  const [filePreviews, setFilePreviews] = useState({});

  useEffect(() => {
    axios.get(`${apiUrl}/jobs/`)
      .then((response) => {
        setJobOpportunities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedJob) {
      setFormState((prevState) => ({
        ...prevState,
        Job: `${selectedJob.title} in ${selectedJob.country}`,
      }));
    }
  }, [selectedJob]);

  useEffect(() => {
    if (selectedJob) {
      document.getElementById("apply-now-form").scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedJob]);

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get(`${apiUrl}/forms/4`);
        setFormFields(response.data.fields || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching form fields:", error);
        setIsLoading(false);
      }
    };
    fetchFormFields();
  }, [apiUrl]);

  const handleApply = (job) => {
    setSelectedJob(job);
  };

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
  
    formData.append("form_id", 4);
    formFields.forEach((field) => {
      const fieldValue = formState[field.name];
  
      if ((field.field_type === "image" || field.field_type === "file") && formState[field.name]) {
        const file = formState[field.name][0];
        formData.append(`file_${field.id}`, file);
        formData.append(`field_${field.id}`, "");
      } else if (fieldValue || field.field_type === "checkbox" || field.field_type === "radio") {
        formData.append(`field_${field.id}`, fieldValue || "");
      }
    });
  
    try {
      const response = await axios.post(`${apiUrl}/form_responses/submit/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);
      Modal.success({
        title: 'Application Submitted!',
        content: 'Your job application has been submitted successfully.',
      });
      setFormState({});
      setSelectedJob(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      Modal.error({
        title: 'Submission Failed',
        content: 'There was an error submitting the form. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredJobs = jobOpportunities.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      paddingTop: "80px",
      minHeight: "calc(100vh - 80px)"
    }}>
      {/* Hero Section */}
      <div 
        className="relative w-full py-16 px-8 text-center"
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
        >
          
          <h1 className="text-4xl font-bold text-white mb-4">
            International Job Opportunities
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Browse exciting job opportunities abroad and apply for positions that match your skills and aspirations.
          </p>
        </motion.div>
      </div>

      {/* Search and Job Listings */}
      <div className="flex-1 bg-white py-12 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex mb-12 justify-center relative max-w-2xl mx-auto"
          >
            <input
              type="text"
              className="w-full px-6 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.lightGray,
                focusRingColor: COLORS.primary,
                backgroundColor: COLORS.lightGray
              }}
              placeholder="Search for jobs by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
              fill="none" 
              stroke={COLORS.darkGray} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </motion.div>

          {/* Job Listings */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
              >
                <div className="flex items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: COLORS.secondary }}
                  >
                    <span className="text-white font-bold">
                      {job.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: COLORS.darkGray }}>
                      {job.title}
                    </h2>
                    <p className="text-gray-600">
                      {job.city}, {job.country}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke={COLORS.primary} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm" style={{ color: COLORS.darkGray }}>{job.industry}</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke={COLORS.primary} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    <p className="text-sm" style={{ color: COLORS.darkGray }}>
                      <strong>Requirements:</strong> {job.requirements}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job)}
                  className="w-full py-2 px-4 rounded-lg font-medium"
                  style={{ 
                    backgroundColor: COLORS.secondary,
                    color: COLORS.darkGray
                  }}
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 rounded-lg font-medium"
              style={{ 
                backgroundColor: currentPage === 1 ? COLORS.lightGray : COLORS.secondary,
                color: COLORS.darkGray
              }}
            >
              Previous
            </button>
            <span className="mx-4 flex items-center" style={{ color: COLORS.darkGray }}>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 rounded-lg font-medium"
              style={{ 
                backgroundColor: currentPage === totalPages ? COLORS.lightGray : COLORS.secondary,
                color: COLORS.darkGray
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Application Form */}
      {selectedJob && (
        <div 
          id="apply-now-form"
          className="w-full py-16 px-8"
          style={{ backgroundColor: COLORS.lightGray }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                {/* Job Details Side */}
                <div 
                  className="md:w-1/3 p-8"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {selectedJob.title}
                  </h2>
                  <div className="space-y-4 text-white">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{selectedJob.city}, {selectedJob.country}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span>{selectedJob.industry}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      <span>Requirements: {selectedJob.requirements}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: COLORS.secondary }}>
                    <h3 className="font-bold text-lg mb-2">Application Tips</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Ensure all information is accurate</li>
                      <li>Upload clear copies of required documents</li>
                      <li>Double-check contact details</li>
                    </ul>
                  </div>
                </div>

                {/* Application Form Side */}
                <div className="md:w-2/3 p-8">
                  <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.darkGray }}>
                    Application Form
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
                            field.name === "Job" ? (
                              <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none"
                                style={{
                                  borderColor: '#E5E7EB',
                                  focusBorderColor: COLORS.primary,
                                  backgroundColor: COLORS.lightGray
                                }}
                                value={selectedJob ? `${selectedJob.title} in ${selectedJob.country}` : ""}
                                readOnly
                              />
                            ) : (
                              <input
                                type={field.field_type === "phone" ? "tel" : field.field_type}
                                name={field.name}
                                id={field.name}
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
                            )
                          )}

                          {/* Textarea */}
                          {field.field_type === "textarea" && (
                            <textarea
                              name={field.name}
                              id={field.name}
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
                                    {/* <p className="text-xs text-gray-500">
                                      {field.field_type === "image" ? "PNG, JPG (MAX. 5MB)" : "PDF, DOCX (MAX. 10MB)"}
                                    </p> */}
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
                              id={field.name}
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
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyForJobs;