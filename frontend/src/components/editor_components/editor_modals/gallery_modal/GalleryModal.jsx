import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import Swal from "sweetalert2";

const GalleryModal = ({ isOpen, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [galleryData, setGalleryData] = useState({
    title: "Our Creative Gallery",
    subtitle: "Explore our stunning collection of work",
    bgColor: "#ffffff",
    textColor: "#1a1a1a",
    imageBgColor: "#f8f9fa",
    imageTextColor: "#1a1a1a",
    items: [
      {
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
        subtitle: "Nature",
        title: "Forest Landscape",
        description:
          "Beautiful forest scenery with sunlight filtering through trees",
      },
      {
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        subtitle: "Mountains",
        title: "Alpine View",
        description: "Majestic mountain range with clear blue skies",
      },
      {
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
        subtitle: "Landscape",
        title: "Misty Morning",
        description: "Early morning fog over peaceful countryside",
      },
    ],
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setGalleryData(data);
      });
  }, [API_URL]);

  const handleFieldChange = (field, value) => {
    setGalleryData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleColorChange = (field, value) => {
    setGalleryData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...galleryData.items];
    updatedItems[index][field] = value;
    setGalleryData({ ...galleryData, items: updatedItems });
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "gallery");

    try {
      const response = await fetch(`${API_URL}/images/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        handleInputChange(index, "image", data.image);
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const addNewImage = () => {
    setGalleryData({
      ...galleryData,
      items: [
        ...galleryData.items,
        { image: "", subtitle: "", title: "", description: "" },
      ],
    });
  };

  const handleRemoveImage = (index) => {
    setGalleryData({
      ...galleryData,
      items: galleryData.items.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(galleryData),
      });

      if (!response.ok) {
        throw new Error("Failed to update gallery data");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gallery Content Added Successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving gallery data:", error);
    }
  };

  return (
    <dialog
      id="gallery_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box w-11/12 max-w-5xl relative bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-xl">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2 bg-green-600 hover:bg-green-700 border-none text-white"
        >
          ✕
        </button>
        <h3 className="font-bold text-2xl mb-4 text-green-800">Edit Gallery</h3>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-green-700">
            Title:
          </label>
          <input
            type="text"
            value={galleryData.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="input input-bordered w-full mb-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-green-700">
            Subtitle:
          </label>
          <textarea
            value={galleryData.subtitle}
            onChange={(e) => handleFieldChange("subtitle", e.target.value)}
            className="textarea textarea-bordered w-full mb-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <label className="block mb-2 font-medium text-green-700">
              Background Color:
            </label>
            <HexColorPicker
              color={galleryData.bgColor || "#ffffff"}
              onChange={(color) => handleColorChange("bgColor", color)}
              className="mb-2"
            />
            <input
              type="text"
              value={galleryData.bgColor}
              onChange={(e) => handleColorChange("bgColor", e.target.value)}
              className="input input-bordered w-full mt-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <label className="block mb-2 font-medium text-green-700">
              Text Color:
            </label>
            <HexColorPicker
              color={galleryData.textColor || "#000000"}
              onChange={(color) => handleColorChange("textColor", color)}
              className="mb-2"
            />
            <input
              type="text"
              value={galleryData.textColor}
              onChange={(e) => handleColorChange("textColor", e.target.value)}
              className="input input-bordered w-full mt-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full table-auto border-collapse rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Subtitle</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100">
              {galleryData.items.map((item, index) => (
                <tr key={index} className="hover:bg-green-50 even:bg-green-50">
                  <td className="p-3 align-middle">
                    <div className="flex flex-col items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt="Preview"
                          className="w-16 h-16 object-cover mb-2 rounded-md border border-green-200"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(index, e.target.files[0])
                        }
                        className="file-input file-input-bordered file-input-sm w-full max-w-xs bg-white focus:border-green-500 focus:ring-green-500"
                        disabled={uploading}
                      />
                      {uploading && (
                        <span className="text-sm mt-1 text-green-600">
                          Uploading...
                        </span>
                      )}
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) =>
                          handleInputChange(index, "image", e.target.value)
                        }
                        className="input input-bordered w-full mt-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Or enter URL directly"
                      />
                    </div>
                  </td>
                  <td className="p-3 align-middle">
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) =>
                        handleInputChange(index, "subtitle", e.target.value)
                      }
                      className="input input-bordered w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="p-3 align-middle">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleInputChange(index, "title", e.target.value)
                      }
                      className="input input-bordered w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="p-3 align-middle">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                      className="input input-bordered w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="p-3 align-middle">
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={addNewImage}
            className="btn bg-yellow-400 hover:bg-yellow-500 border-none text-green-800 font-bold"
          >
            + Add New Image
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="btn bg-gray-200 hover:bg-gray-300 border-none text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn bg-green-600 hover:bg-green-700 border-none text-white font-bold"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default GalleryModal;
