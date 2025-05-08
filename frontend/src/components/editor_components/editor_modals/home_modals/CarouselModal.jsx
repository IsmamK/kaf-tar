import React, { useState, useEffect } from "react";

const CarouselModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Initial state with predefined images
  const [images, setImages] = useState([]);
  const [newLink, setNewLink] = useState(""); // State to store the new link input

  useEffect(() => {
    // Fetch the data from the API
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/carousel`);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data.images); // Update the images state (assuming the API returns an array of URLs)
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [apiUrl]);

  // Handle adding a new link
  const handleAddLink = () => {
    if (newLink.trim()) {
      setImages((prevImages) => [...prevImages, newLink.trim()]);
      setNewLink(""); // Clear the input field
    } else {
      alert("Please enter a valid link.");
    }
  };

  // Handle removing an image link
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare the data to be sent to the server
      const response = await fetch(`${apiUrl}/home/carousel/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }), // Send the URLs array
      });

      if (!response.ok) {
        throw new Error("Failed to update images");
      }

      const result = await response.json();
      alert("Updated Carousel Images");
      console.log(result); // Log the server response
    } catch (error) {
      console.error("Error updating images:", error);
    }

    onClose(); // Close modal after saving
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-2xl relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Edit Carousel Images</h3>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter image link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <button className="btn btn-secondary w-full" onClick={handleAddLink}>
            Add Link
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Carousel Image ${index + 1}`}
                className="w-full h-auto rounded-md"
              />
              <button
                className="btn btn-circle btn-error absolute top-2 right-2"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CarouselModal;
