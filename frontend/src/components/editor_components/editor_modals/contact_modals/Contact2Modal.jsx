import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaPlus, FaTimes } from "react-icons/fa";

const Contact2Modal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const sampleData = {
    title: "Contact Us",
    subtitle: "Reach Out To Us",
    phoneNumbers: [
      "Main office: +880 1234-567890"
    ],
    email: "Pagedone1234@gmail.com",
    addresses: [
      {
        heading: "Headquarters",
        details: "Address 1"
      }
    ],
    businessHours: [],
    socialMedia: [],
    imageUrl: "",
    bgColor: "#2ecc71", // Vibrant green
    textColor: "#ffffff", // White
    accentColor: "#f39c12" // Orange/yellow
  };

  const [formData, setFormData] = useState(() => ({
    ...sampleData,
    phoneNumbers: [],
    addresses: [],
    businessHours: [],
    socialMedia: []
  }));

  useEffect(() => {
    if (isOpen) {
      fetch(`${apiUrl}/contact/contact2/`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            ...sampleData,
            ...data,
            phoneNumbers: data.phoneNumbers || [],
            addresses: data.addresses || [],
            businessHours: data.businessHours || [],
            socialMedia: data.socialMedia || []
          });
        })
        .catch(() => {
          setFormData(sampleData);
        });
    }
  }, [apiUrl, isOpen]);

  const handleColorChange = (color, field) => {
    setFormData(prev => ({ ...prev, [field]: color }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDynamicFieldChange = (key, index, field, value) => {
    const updatedFields = [...(formData[key] || [])];
    if (typeof updatedFields[index] === 'object') {
      updatedFields[index] = { ...updatedFields[index], [field]: value };
    } else {
      updatedFields[index] = value;
    }
    setFormData(prev => ({ ...prev, [key]: updatedFields }));
  };

  const addField = (key, defaultValue = "") => {
    const isObject = typeof defaultValue === 'object';
    setFormData(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), isObject ? { ...defaultValue } : defaultValue]
    }));
  };

  const removeField = (key, index) => {
    setFormData(prev => ({
      ...prev,
      [key]: (prev[key] || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${apiUrl}/contact/contact2/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-t-8" style={{ borderTopColor: formData.bgColor }}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-emerald-500">
              Edit Contact Information
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4 p-4 rounded-lg border-2 bg-emerald-50 border-emerald-500">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Subtitle</label>
                <textarea
                  name="subtitle"
                  value={formData.subtitle || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 rounded-lg border-2 border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Contact Information Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Numbers */}
              <div className="space-y-4 p-4 rounded-lg border-2 border-emerald-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold flex items-center text-emerald-500">
                    <FaPhone className="mr-2 text-emerald-500" />
                    Phone Numbers
                  </h3>
                  <button
                    type="button"
                    onClick={() => addField("phoneNumbers", "")}
                    className="flex items-center text-sm px-3 py-1 rounded-full border-2 border-emerald-500 bg-emerald-100 text-emerald-500 hover:bg-emerald-200 transition-colors"
                  >
                    <FaPlus className="mr-1" /> Add
                  </button>
                </div>

                {(formData.phoneNumbers || []).map((phone, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => handleDynamicFieldChange("phoneNumbers", index, index, e.target.value)}
                      className="flex-1 p-2 rounded-lg border-2 border-emerald-500"
                      placeholder="e.g., Main office: +880 1234-567890"
                    />
                    <button
                      type="button"
                      onClick={() => removeField("phoneNumbers", index)}
                      className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 border-2 border-red-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="space-y-4 p-4 rounded-lg border-2 border-emerald-500">
                <h3 className="text-xl font-semibold flex items-center text-emerald-500">
                  <FaEnvelope className="mr-2 text-emerald-500" />
                  Email Address
                </h3>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-emerald-500"
                  placeholder="e.g., info@company.com"
                />
              </div>
            </div>

            {/* Addresses */}
            <div className="space-y-4 p-4 rounded-lg border-2 border-emerald-500">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center text-emerald-500">
                  <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                  Addresses
                </h3>
                <button
                  type="button"
                  onClick={() => addField("addresses", { heading: "", details: "" })}
                  className="flex items-center text-sm px-3 py-1 rounded-full border-2 border-emerald-500 bg-emerald-100 text-emerald-500 hover:bg-emerald-200 transition-colors"
                >
                  <FaPlus className="mr-1" /> Add
                </button>
              </div>

              {(formData.addresses || []).map((address, index) => (
                <div key={index} className="space-y-2 p-3 rounded-lg border-2 border-emerald-500 bg-emerald-50">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Address {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeField("addresses", index)}
                      className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 border-2 border-red-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={address?.heading || ''}
                    onChange={(e) => handleDynamicFieldChange("addresses", index, "heading", e.target.value)}
                    className="w-full p-2 rounded-lg border-2 border-emerald-500 mb-2"
                    placeholder="Heading (e.g., Headquarters)"
                  />
                  <textarea
                    value={address?.details || ''}
                    onChange={(e) => handleDynamicFieldChange("addresses", index, "details", e.target.value)}
                    rows={2}
                    className="w-full p-2 rounded-lg border-2 border-emerald-500"
                    placeholder="Full address details"
                  />
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="space-y-4 p-4 rounded-lg border-2 border-emerald-500">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center text-emerald-500">
                  <FaClock className="mr-2 text-emerald-500" />
                  Business Hours
                </h3>
                <button
                  type="button"
                  onClick={() => addField("businessHours", "")}
                  className="flex items-center text-sm px-3 py-1 rounded-full border-2 border-emerald-500 bg-emerald-100 text-emerald-500 hover:bg-emerald-200 transition-colors"
                >
                  <FaPlus className="mr-1" /> Add
                </button>
              </div>

              {(formData.businessHours || []).map((hours, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => handleDynamicFieldChange("businessHours", index, index, e.target.value)}
                    className="flex-1 p-2 rounded-lg border-2 border-emerald-500"
                    placeholder="e.g., Mon-Fri: 9AM-5PM"
                  />
                  <button
                    type="button"
                    onClick={() => removeField("businessHours", index)}
                    className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 border-2 border-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            {/* Color Pickers and Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Background Color */}
              <div className="space-y-2">
                <label className="block font-medium">Background Color</label>
                <div className="flex items-center space-x-4">
                  <HexColorPicker
                    color={formData.bgColor}
                    onChange={(color) => handleColorChange(color, "bgColor")}
                    className="!w-full !h-32 border-2 border-emerald-500 rounded-lg"
                  />
                  <input
                    type="text"
                    value={formData.bgColor || ''}
                    onChange={(e) => handleColorChange(e.target.value, "bgColor")}
                    className="w-24 p-2 rounded-lg border-2 border-emerald-500"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div className="space-y-2">
                <label className="block font-medium">Text Color</label>
                <div className="flex items-center space-x-4">
                  <HexColorPicker
                    color={formData.textColor}
                    onChange={(color) => handleColorChange(color, "textColor")}
                    className="!w-full !h-32 border-2 border-emerald-500 rounded-lg"
                  />
                  <input
                    type="text"
                    value={formData.textColor || ''}
                    onChange={(e) => handleColorChange(e.target.value, "textColor")}
                    className="w-24 p-2 rounded-lg border-2 border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="block font-medium">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-emerald-500"
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="max-h-40 rounded-lg object-cover border-2 border-emerald-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-lg font-medium border-2 border-emerald-500 text-emerald-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors border-2 border-emerald-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact2Modal;