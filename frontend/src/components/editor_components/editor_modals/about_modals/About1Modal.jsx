import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import Swal from "sweetalert2";

// Color scheme
const COLORS = {
  primary: "#38a169", // Vibrant green
  primaryDark: "#2f855a", // Darker green
  primaryLight: "#9ae6b4", // Light green
  secondary: "#f6e05e", // Yellow
  secondaryDark: "#ecc94b", // Darker yellow
  accent: "#2d3748", // Dark gray/black
  text: "#f7fafc", // Very light gray/white
  background: "#ffffff", // White
  hover: "#2f855a", // Dark green for hover
  border: "#e2e8f0", // Light gray
};

const About1Modal = ({ isOpen, onClose }) => {
  const [aboutData, setAboutData] = useState({
    title: "About Our Company",
    description:
      "We are a leading provider of healthcare staffing solutions with years of experience in connecting qualified professionals with healthcare facilities worldwide.",
    image1: "https://via.placeholder.com/500x300?text=About+Us",
    image2: "https://via.placeholder.com/500x300?text=Our+Team",
    buttonLabel: "Learn More",
    buttonLink: "/about",
    bgColor: "#FFFFFF",
    textColor: "#2d3748",
  });

  const [showColorPicker, setShowColorPicker] = useState({
    bgColor: false,
    textColor: false,
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}/about/about1`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAboutData((prevData) => ({
          ...prevData,
          ...data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isOpen) {
      fetchAboutData();
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setAboutData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/about/about1/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aboutData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Our Clients Content Added Successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const toggleColorPicker = (field) => {
    setShowColorPicker((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div
        className="modal-box w-11/12 max-w-3xl relative p-8 rounded-lg shadow-xl"
        style={{ backgroundColor: COLORS.background }}
      >
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-4 top-4"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.text,
            borderColor: COLORS.primaryDark,
          }}
        >
          ✕
        </button>

        <h3
          className="font-bold text-2xl mb-6"
          style={{ color: COLORS.primary }}
        >
          Edit About Us Section
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: COLORS.accent }}
              >
                Title:
              </label>
              <input
                type="text"
                value={aboutData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="input input-bordered w-full"
                style={{
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.background,
                }}
              />
            </div>

            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: COLORS.accent }}
              >
                Description:
              </label>
              <textarea
                value={aboutData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="textarea textarea-bordered w-full h-32"
                style={{
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.background,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block mb-2 font-medium"
                  style={{ color: COLORS.accent }}
                >
                  Button Label:
                </label>
                <input
                  type="text"
                  value={aboutData.buttonLabel}
                  onChange={(e) =>
                    handleInputChange("buttonLabel", e.target.value)
                  }
                  className="input input-bordered w-full"
                  style={{
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.background,
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-2 font-medium"
                  style={{ color: COLORS.accent }}
                >
                  Button Link:
                </label>
                <input
                  type="text"
                  value={aboutData.buttonLink}
                  onChange={(e) =>
                    handleInputChange("buttonLink", e.target.value)
                  }
                  className="input input-bordered w-full"
                  style={{
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.background,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: COLORS.accent }}
              >
                Image 1 URL:
              </label>
              <input
                type="text"
                value={aboutData.image1}
                onChange={(e) => handleInputChange("image1", e.target.value)}
                className="input input-bordered w-full"
                style={{
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.background,
                }}
              />
              {aboutData.image1 && (
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={aboutData.image1}
                    alt="Preview"
                    className="w-full h-auto max-h-40 object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: COLORS.accent }}
              >
                Image 2 URL:
              </label>
              <input
                type="text"
                value={aboutData.image2}
                onChange={(e) => handleInputChange("image2", e.target.value)}
                className="input input-bordered w-full"
                style={{
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.background,
                }}
              />
              {aboutData.image2 && (
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={aboutData.image2}
                    alt="Preview"
                    className="w-full h-auto max-h-40 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="relative">
            <label
              className="block mb-2 font-medium"
              style={{ color: COLORS.accent }}
            >
              Background Color:
            </label>
            <div
              className="w-full p-2 rounded-md cursor-pointer border flex items-center"
              style={{
                backgroundColor: aboutData.bgColor,
                borderColor: COLORS.border,
              }}
              onClick={() => toggleColorPicker("bgColor")}
            >
              <span className="flex-grow">{aboutData.bgColor}</span>
              <div
                className="w-6 h-6 rounded border"
                style={{
                  backgroundColor: aboutData.bgColor,
                  borderColor: COLORS.accent,
                }}
              ></div>
            </div>
            {showColorPicker.bgColor && (
              <div className="absolute z-10 mt-2">
                <HexColorPicker
                  color={aboutData.bgColor}
                  onChange={(color) => handleInputChange("bgColor", color)}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <label
              className="block mb-2 font-medium"
              style={{ color: COLORS.accent }}
            >
              Text Color:
            </label>
            <div
              className="w-full p-2 rounded-md cursor-pointer border flex items-center"
              style={{
                backgroundColor: aboutData.textColor,
                color: getContrastColor(aboutData.textColor),
                borderColor: COLORS.border,
              }}
              onClick={() => toggleColorPicker("textColor")}
            >
              <span className="flex-grow">{aboutData.textColor}</span>
              <div
                className="w-6 h-6 rounded border"
                style={{
                  backgroundColor: aboutData.textColor,
                  borderColor: COLORS.accent,
                }}
              ></div>
            </div>
            {showColorPicker.textColor && (
              <div className="absolute z-10 mt-2">
                <HexColorPicker
                  color={aboutData.textColor}
                  onChange={(color) => handleInputChange("textColor", color)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            className="px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.text,
              borderColor: COLORS.primaryDark,
            }}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine text color based on background
function getContrastColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#FFFFFF";
}

export default About1Modal;
