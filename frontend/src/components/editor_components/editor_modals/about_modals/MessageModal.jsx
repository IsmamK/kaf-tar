import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Swal from 'sweetalert2';

const COLORS = {
  primary: "#2E8B57",       // Sea Green (primary)
  primaryDark: "#1E6F47",    // Darker Green
  primaryLight: "#4CAF7D",   // Lighter Green
  secondary: "#FFD700",      // Gold (secondary)
  secondaryLight: "#FFE55C", // Light Gold
  accent: "#FF7F50",         // Coral (accent)
  lightGray: "#F5F5F5",
  darkGray: "#333333",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0,0,0,0.7)"
};

const MessageModal = ({ isOpen, onClose }) => {
  const [messageData, setMessageData] = useState({
    heading: "CEO's Message",
    subheading: "Building the future of talent",
    description: "At our core, we believe in connecting exceptional talent with transformative opportunities. Our mission is to bridge the gap between ambition and achievement, creating meaningful careers and powerful teams.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=60",
    bgColor: COLORS.white,
    textColor: COLORS.darkGray,
    buttonColor: COLORS.primary,
    buttonTextColor: COLORS.white
  });

  const [showColorPicker, setShowColorPicker] = useState({
    bgColor: false,
    textColor: false,
    buttonColor: false
  });

  useEffect(() => {
    const fetchMessageData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}/about/message`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessageData(data);
      } catch (error) {
        console.error('Using default message data:', error);
      }
    };

    if (isOpen) {
      fetchMessageData();
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setMessageData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessageData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleColorPicker = (picker) => {
    setShowColorPicker(prev => ({
      ...prev,
      [picker]: !prev[picker]
    }));
  };

  const handleSave = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/about/message/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Our Clients Content Added Successfully",
              showConfirmButton: false,
              timer: 3000,
            });
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
        style={{ border: `1px solid ${COLORS.lightGray}` }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b flex justify-between items-center"
          style={{ borderColor: COLORS.lightGray }}
        >
          <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Edit CEO Message
          </h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke={COLORS.black} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div>
              {/* Heading */}
              <div className="mb-6">
                <label className="block mb-2 font-medium" style={{ color: COLORS.darkGray }}>
                  Heading
                </label>
                <input
                  type="text"
                  value={messageData.heading}
                  onChange={(e) => handleInputChange('heading', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all"
                  style={{
                    borderColor: COLORS.lightGray,
                    focusRingColor: COLORS.primaryLight
                  }}
                />
              </div>

              {/* Subheading */}
              <div className="mb-6">
                <label className="block mb-2 font-medium" style={{ color: COLORS.darkGray }}>
                  Subheading
                </label>
                <input
                  type="text"
                  value={messageData.subheading}
                  onChange={(e) => handleInputChange('subheading', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all"
                  style={{
                    borderColor: COLORS.lightGray,
                    focusRingColor: COLORS.primaryLight
                  }}
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block mb-2 font-medium" style={{ color: COLORS.darkGray }}>
                  Description
                </label>
                <textarea
                  rows="4"
                  value={messageData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all"
                  style={{
                    borderColor: COLORS.lightGray,
                    focusRingColor: COLORS.primaryLight
                  }}
                />
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div>
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block mb-2 font-medium" style={{ color: COLORS.darkGray }}>
                  Image
                </label>
                <div className="flex items-center space-x-4">
                  {messageData.image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                      <img
                        src={messageData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={messageData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="Image URL"
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all mb-2"
                      style={{
                        borderColor: COLORS.lightGray,
                        focusRingColor: COLORS.primaryLight
                      }}
                    />
                    <label className="inline-block">
                      <span 
                        className="px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: COLORS.primary,
                          color: COLORS.white,
                          hoverBackgroundColor: COLORS.primaryDark
                        }}
                      >
                        Upload Image
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Color Customization */}
              <div className="space-y-4">
                {/* Background Color */}
                <div>
                  <label className="block mb-2 font-medium" style={{ color: COLORS.darkGray }}>
                    Background Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-10 h-10 rounded-md cursor-pointer border"
                      style={{ 
                        backgroundColor: messageData.bgColor,
                        borderColor: COLORS.lightGray
                      }}
                      onClick={() => toggleColorPicker('bgColor')}
                    />
                    <span>{messageData.bgColor}</span>
                  </div>
                  {showColorPicker.bgColor && (
                    <div className="mt-2">
                      <HexColorPicker 
                        color={messageData.bgColor} 
                        onChange={(color) => handleInputChange('bgColor', color)} 
                      />
                    </div>
                  )}
                </div>

                {/* Text Color */}
                <div>
                  <label className="block mb-2 font-medium" style={{ color: COLORS.darkGray }}>
                    Text Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-10 h-10 rounded-md cursor-pointer border"
                      style={{ 
                        backgroundColor: messageData.textColor,
                        borderColor: COLORS.lightGray
                      }}
                      onClick={() => toggleColorPicker('textColor')}
                    />
                    <span>{messageData.textColor}</span>
                  </div>
                  {showColorPicker.textColor && (
                    <div className="mt-2">
                      <HexColorPicker 
                        color={messageData.textColor} 
                        onChange={(color) => handleInputChange('textColor', color)} 
                      />
                    </div>
                  )}
                </div>

                {/* Button Color */}
                <div>
                  <label className="block mb-2 font-medium" style={{ color: COLORS.darkGray }}>
                    Button Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-10 h-10 rounded-md cursor-pointer border"
                      style={{ 
                        backgroundColor: messageData.buttonColor,
                        borderColor: COLORS.lightGray
                      }}
                      onClick={() => toggleColorPicker('buttonColor')}
                    />
                    <span>{messageData.buttonColor}</span>
                  </div>
                  {showColorPicker.buttonColor && (
                    <div className="mt-2">
                      <HexColorPicker 
                        color={messageData.buttonColor} 
                        onChange={(color) => handleInputChange('buttonColor', color)} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="p-6 border-t flex justify-end space-x-3"
          style={{ borderColor: COLORS.lightGray }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium transition-colors border"
            style={{
              borderColor: COLORS.primary,
              color: COLORS.primary,
              hoverBackgroundColor: COLORS.lightGray
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.white,
              hoverBackgroundColor: COLORS.primaryDark
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;