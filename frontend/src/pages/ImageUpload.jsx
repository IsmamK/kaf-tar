import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Spin, message } from "antd";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/images/`);
      if (Array.isArray(response.data)) {
        setImages(response.data);
        fetchCategories(response.data);
      } else {
        console.error("Fetched data is not an array", response.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchCategories = (imagesData) => {
    const uniqueCategories = [
      ...new Set(imagesData.map((img) => img.category.toLowerCase())),
    ];
    setCategories(uniqueCategories);
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0 || !category) {
      message.warning("Please select images and provide a category.");
      return;
    }

    setLoading(true);

    const uploadPromises = Array.from(imageFiles).map((file) => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", category);

      return axios.post(`${apiUrl}/images/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    });

    try {
      await Promise.all(uploadPromises);
      setLoading(false);
      setSuccessModalVisible(true);
      setCategory("");
      fetchImages();
    } catch (error) {
      setLoading(false);
      console.error("Error uploading images:", error);
      message.error("Failed to upload images.");
    }
  };

  const handleDeleteMultiple = async () => {
    try {
      await Promise.all(
        selectedImages.map((id) => axios.delete(`${apiUrl}/images/${id}/`))
      );
      message.success("Selected images deleted successfully!");
      setSelectedImages([]);
      fetchImages();
    } catch (error) {
      console.error("Error deleting images:", error);
      message.error("Failed to delete selected images.");
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const filteredIds = filteredImages.map((img) => img.id);
      setSelectedImages(filteredIds);
    } else {
      const filteredIds = filteredImages.map((img) => img.id);
      setSelectedImages((prev) => prev.filter((id) => !filteredIds.includes(id)));
    }
  };
  

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        setCopyNotification(true);
        setTimeout(() => setCopyNotification(false), 2000);
      },
      (err) => console.error("Failed to copy:", err)
    );
  };

  const filteredImages = filterCategory
    ? images.filter(
        (img) => img.category.toLowerCase() === filterCategory.toLowerCase()
      )
    : images;

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Upload & Table View</h1>

      {copyNotification && (
        <div className="fixed top-[15%] right-[1%] bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          Link copied!
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <Spin size="large" tip="Uploading images..." />
        </div>
      )}

      {/* Success Modal */}
      <Modal
        open={successModalVisible}
        onOk={() => setSuccessModalVisible(false)}
        onCancel={() => setSuccessModalVisible(false)}
        title="Upload Successful"
        okText="Great!"
      >
        <p>🎉 Your images have been uploaded successfully!</p>
      </Modal>

      {/* Upload Form */}
      <form onSubmit={handleBulkUpload} className="mb-8">
        <label className="block mb-2">
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value.toLowerCase())}
            className="block w-full p-2 border rounded mt-1"
            placeholder="Enter a category"
          />
        </label>
        <label className="block mb-2">
          Select Images:
          <input
            type="file"
            multiple
            onChange={(e) => setImageFiles(e.target.files)}
            className="block w-full mt-1"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Bulk Upload Images
        </button>
      </form>

      {/* Filter */}
      <div className="mb-4">
        <label>
          Filter by Category:
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="">-- All Categories --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Delete Button */}
      {selectedImages.length > 0 && (
       <button
       onClick={() => {
         Modal.confirm({
           title: "Confirm Deletion",
           content: (
             <div>
               <p>Are you sure you want to delete the following images?</p>
               <ul className="mt-2 list-disc pl-5 max-h-40 overflow-y-auto">
                 {images
                   .filter((img) => selectedImages.includes(img.id))
                   .map((img) => (
                     <li key={img.id}>
                       {img.image.split("/").pop()} {/* Show filename */}
                     </li>
                   ))}
               </ul>
             </div>
           ),
           okText: "Yes, Delete",
           okType: "danger",
           cancelText: "Cancel",
           onOk: handleDeleteMultiple,
         });
       }}
       className="bg-red-500 text-white py-2 px-4 rounded mb-4"
     >
       Delete Selected Images
     </button>
     
     
      )}

      {/* Image Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  filteredImages.length > 0 &&
                  filteredImages.every((img) => selectedImages.includes(img.id))
                }
                
              />
            </th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {filteredImages.map((img) => (
            <tr key={img.id}>
              <td className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  checked={selectedImages.includes(img.id)}
                  onChange={() =>
                    setSelectedImages((prev) =>
                      prev.includes(img.id)
                        ? prev.filter((id) => id !== img.id)
                        : [...prev, img.id]
                    )
                  }
                />
              </td>
              <td className="border border-gray-300 p-2">
                <img
                  src={img.image}
                  alt={img.category}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={img.image}
                    readOnly
                    className="p-2 border rounded mr-2 w-full"
                  />
                  <button
                    onClick={() => handleCopyLink(img.image)}
                    className="bg-green-500 text-white py-1 px-2 rounded"
                  >
                    Copy
                  </button>
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(img.uploaded_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImageUpload;
