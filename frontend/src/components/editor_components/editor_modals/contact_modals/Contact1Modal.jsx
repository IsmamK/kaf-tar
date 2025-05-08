import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

// Color scheme constants
const COLORS = {
  primary: "#2E8B57", // Green
  primaryLight: "#3CB371", // Lighter Green
  primaryDark: "#1E5A3A", // Darker Green
  secondary: "#FFD700", // Gold/Yellow
  secondaryLight: "#FFEC8B", // Lighter Yellow
  secondaryDark: "#FFC125", // Darker Yellow
  accent: "#FF7F50", // Coral/Orange
  lightGray: "#F8F8F8",
  darkGray: "#2D2D2D",
  white: "#FFFFFF",
  black: "#000000"
};

const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondaryLight} 100%)`,
  dark: `linear-gradient(135deg, ${COLORS.darkGray} 0%, ${COLORS.black} 100%)`
};

const Contact1Modal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    header: "Get in Touch With Us",
    subHeader: "Our team is ready to assist you with any inquiries or partnership opportunities",
    buttonText: "Send Us a Message",
    buttonLink: "#contact-form",
    email: "contact@stech.com",
    phone: "+880 1234-567890",
    bgColor: COLORS.white,
    textColor: COLORS.darkGray,
    locations: [
      {
        country: "Bangladesh HQ",
        address: "123 Business Avenue, Dhaka 1212",
        imgSrc: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=60",
        phone: "+880 1234-567890",
        maplink: "https://maps.google.com/maps?q=dhaka"
      },
      {
        country: "UAE Office",
        address: "456 Trade Center, Dubai",
        imgSrc: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=60",
        phone: "+971 1234-567890",
        maplink: "https://maps.google.com/maps?q=dubai"
      }
    ]
  });

  useEffect(() => {
    if (isOpen) {
      fetch(`${apiUrl}/contact/contact1/`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [apiUrl, isOpen]);

  const handleBgColorChange = (color) => {
    setFormData((prevData) => ({
      ...prevData,
      bgColor: color,
    }));
  };

  const handleTextColorChange = (color) => {
    setFormData((prevData) => ({
      ...prevData,
      textColor: color,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      locations: updatedLocations,
    }));
  };

  const handleAddLocation = () => {
    setFormData((prevData) => ({
      ...prevData,
      locations: [
        ...prevData.locations,
        { 
          country: "", 
          address: "", 
          imgSrc: "",
          phone: "",
          maplink: ""
        },
      ],
    }));
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = formData.locations.filter(
      (_, locIndex) => locIndex !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      locations: updatedLocations,
    }));
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedLocations = [...formData.locations];
      updatedLocations[index].imgSrc = reader.result;
      setFormData((prevData) => ({
        ...prevData,
        locations: updatedLocations,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${apiUrl}/contact/contact1/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Contact Information Updated Successfully",
          showConfirmButton: false,
          timer: 3000,
        });
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "There was an error updating the contact information",
        });
      });
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        style={{ border: `2px solid ${COLORS.primary}` }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: COLORS.primary }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.primaryDark }}>
          Edit Contact Information
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.primaryDark }}>Header</label>
              <input
                type="text"
                name="header"
                value={formData.header}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ borderColor: COLORS.primary }}
              />
            </div>
            
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.primaryDark }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ borderColor: COLORS.primary }}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-bold mb-2" style={{ color: COLORS.primaryDark }}>SubHeader</label>
            <textarea
              name="subHeader"
              value={formData.subHeader}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ borderColor: COLORS.primary }}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.primaryDark }}>Button Text</label>
              <input
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ borderColor: COLORS.primary }}
              />
            </div>
            
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.primaryDark }}>Button Link</label>
              <input
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ borderColor: COLORS.primary }}
              />
            </div>
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block font-bold mb-3" style={{ color: COLORS.primaryDark }}>Background Color</label>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <HexColorPicker
                  color={formData.bgColor}
                  onChange={handleBgColorChange}
                  style={{ width: '100%', maxWidth: '200px' }}
                />
                <input
                  type="text"
                  name="bgColor"
                  value={formData.bgColor}
                  onChange={handleChange}
                  className="p-3 rounded-lg border-2 w-full"
                  style={{ borderColor: COLORS.primary }}
                />
              </div>
            </div>
            
            <div>
              <label className="block font-bold mb-3" style={{ color: COLORS.primaryDark }}>Text Color</label>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <HexColorPicker
                  color={formData.textColor}
                  onChange={handleTextColorChange}
                  style={{ width: '100%', maxWidth: '200px' }}
                />
                <input
                  type="text"
                  name="textColor"
                  value={formData.textColor}
                  onChange={handleChange}
                  className="p-3 rounded-lg border-2 w-full"
                  style={{ borderColor: COLORS.primary }}
                />
              </div>
            </div>
          </div>

          {/* Locations Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold" style={{ color: COLORS.primaryDark }}>Locations</h3>
              <motion.button
                type="button"
                onClick={handleAddLocation}
                className="px-4 py-2 rounded-full font-medium"
                style={{ 
                  background: GRADIENTS.secondary,
                  color: COLORS.black
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Location
              </motion.button>
            </div>

            {formData.locations.map((location, index) => (
              <motion.div 
                key={index} 
                className="mb-6 p-6 rounded-xl border-2"
                style={{ borderColor: COLORS.primaryLight }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                    Location {index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-1" style={{ color: COLORS.primaryDark }}>Country</label>
                    <input
                      type="text"
                      value={location.country}
                      onChange={(e) =>
                        handleLocationChange(index, "country", e.target.value)
                      }
                      className="w-full p-2 rounded-lg border-2"
                      style={{ borderColor: COLORS.primary }}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1" style={{ color: COLORS.primaryDark }}>Phone</label>
                    <input
                      type="text"
                      value={location.phone}
                      onChange={(e) =>
                        handleLocationChange(index, "phone", e.target.value)
                      }
                      className="w-full p-2 rounded-lg border-2"
                      style={{ borderColor: COLORS.primary }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1" style={{ color: COLORS.primaryDark }}>Address</label>
                  <input
                    type="text"
                    value={location.address}
                    onChange={(e) =>
                      handleLocationChange(index, "address", e.target.value)
                    }
                    className="w-full p-2 rounded-lg border-2"
                    style={{ borderColor: COLORS.primary }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1" style={{ color: COLORS.primaryDark }}>Map Embed Link</label>
                  <input
                    type="text"
                    value={location.maplink}
                    onChange={(e) =>
                      handleLocationChange(index, "maplink", e.target.value)
                    }
                    className="w-full p-2 rounded-lg border-2"
                    style={{ borderColor: COLORS.primary }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1" style={{ color: COLORS.primaryDark }}>Image Link</label>
                  <input
                    type="text"
                    value={location.imgSrc}
                    onChange={(e) =>
                      handleLocationChange(index, "imgSrc", e.target.value)
                    }
                    className="w-full p-2 rounded-lg border-2 mb-2"
                    style={{ borderColor: COLORS.primary }}
                  />
                  {location.imgSrc && (
                    <img
                      src={location.imgSrc}
                      alt={`Location ${index + 1}`}
                      className="mt-2 max-h-40 w-full object-cover rounded-lg"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <motion.button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full font-medium border-2"
              style={{ 
                borderColor: COLORS.primary,
                color: COLORS.primaryDark
              }}
              whileHover={{ 
                backgroundColor: COLORS.lightGray
              }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-6 py-2 rounded-full font-medium"
              style={{ 
                background: GRADIENTS.primary,
                color: COLORS.white
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 5px 15px ${COLORS.primary}80`
              }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact1Modal;