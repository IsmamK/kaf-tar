import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

// ServicesEditor component
const ServicesEditor = () => {
  const [servicesData, setServicesData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/services/`)
      .then((res) => res.json())
      .then((data) => {
        setServicesData(data);
      });
  }, []);

  // Handle adding a new service page
  const addService = () => {
    setServicesData([
      ...servicesData,
      {
        slug: '',
        title: '',
        description: '',
        heroText: '',
        heroBgColor: '#000000',
        heroTextColor: '#FFFFFF',
        featuresBgColor: '#000000',
        featuresTextColor: '#FFFFFF',
        heroImage: '',
        features: [],
      },
    ]);
  };

  // Handle removing a service page
  const removeService = (index) => {
    const updatedServicesData = servicesData.filter((_, i) => i !== index);
    setServicesData(updatedServicesData);
  };

  // Handle updating a specific service page
  const updateService = (index, field, value) => {
    const updatedServicesData = servicesData.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    );
    setServicesData(updatedServicesData);
  };

  // Handle updating feature data for a specific service
  const updateFeature = (serviceIndex, featureIndex, field, value) => {
    const updatedServicesData = [...servicesData];
    updatedServicesData[serviceIndex].features[featureIndex][field] = value;
    setServicesData(updatedServicesData);
  };

  // Handle removing a feature
  const removeFeature = (serviceIndex, featureIndex) => {
    const updatedServicesData = [...servicesData];
    updatedServicesData[serviceIndex].features.splice(featureIndex, 1);
    setServicesData(updatedServicesData);
  };

  // Convert image to Base64
  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.error('Error converting image:', error);
  };

  const handleIconUpload = (serviceIndex, featureIndex, file) => {
    convertToBase64(file, (base64Image) => {
      updateFeature(serviceIndex, featureIndex, 'iconImage', base64Image);
    });
  };

  const saveServices = async () => {
    function formatString(str) {
      return str.toLowerCase().replace(/\s+/g, '-');
    }
    servicesData.forEach((service) => {
      if (!service.slug) {
        service.slug = formatString(service.title);
      }
    });
    try {
      const response = await fetch(`${apiUrl}/services/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(servicesData),
      });
      if (!response.ok) throw new Error('Error saving services');
      alert('Services saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save services');
    }
  };

  const handleHeroImageUpload = (serviceIndex, file) => {
    convertToBase64(file, (base64Image) => {
      updateService(serviceIndex, 'heroImage', base64Image); // Update heroImage
    });
  };


  return (
    <div className="container mx-auto p-5 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Services Editor</h1>

      {/* Service List */}
      {servicesData.map((service, serviceIndex) => (
        <div key={serviceIndex} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                className="text-xl font-semibold w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Service Title"
                value={service.title}
                onChange={(e) => updateService(serviceIndex, 'title', e.target.value)}
              />
            </div>
            <button
              className="text-red-600 hover:text-red-800 transition duration-300"
              onClick={() => removeService(serviceIndex)}
            >
              <i className="fas fa-trash-alt"></i> Remove
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Service Slug:</label>
            <textarea
              className="w-full p-2 border-2 border-gray-300 rounded-lg"
              placeholder="Slug"
              value={service.slug}
              onChange={(e) => updateService(serviceIndex, 'slug', e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Service Description:</label>
            <textarea
              className="w-full p-2 border-2 border-gray-300 rounded-lg"
              placeholder="Description"
              value={service.description}
              onChange={(e) => updateService(serviceIndex, 'description', e.target.value)}
            />
          </div>

           {/* Hero Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hero Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleHeroImageUpload(serviceIndex, e.target.files[0])}
              className="mb-2"
            />
            {service.heroImage && (
              <img src={service.heroImage} alt="Hero Image" className="h-20 w-20 object-cover mb-2" />
            )}
          </div>

          {/* Editable fields for colors */}
          <div className="flex mb-6 space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Background Color:</label>
              <HexColorPicker
                color={service.heroBgColor}
                onChange={(color) => updateService(serviceIndex, 'heroBgColor', color)}
              />
                <input
                type="text"
                value={service.heroBgColor}
                onChange={(e) => updateService(serviceIndex, 'heroBgColor', e.target.value)}
                className="input input-bordered w-20 ml-2 mt-2"
              />

              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Text Color:</label>
              <HexColorPicker
                color={service.heroTextColor}
                onChange={(color) => updateService(serviceIndex, 'heroTextColor', color)}
              />
                <input
                type="text"
                value={service.heroTextColor}
                onChange={(e) => updateService(serviceIndex, 'heroTextColor', e.target.value)}
                className="input input-bordered w-20 ml-2 mt-2"
              />

              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Features Background Color:</label>
              <HexColorPicker
                color={service.featuresBgColor}
                onChange={(color) => updateService(serviceIndex, 'featuresBgColor', color)}
              />
                  <input
                type="text"
                value={service.featuresBgColor}
                onChange={(e) => updateService(serviceIndex, 'featuresBgColor', e.target.value)}
                className="input input-bordered w-20 ml-2 mt-2"
              />

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Features Text Color:</label>
              <HexColorPicker
                color={service.featuresTextColor}
                onChange={(color) => updateService(serviceIndex, 'featuresTextColor', color)}
              />
                  <input
                type="text"
                value={service.featuresTextColor}
                onChange={(e) => updateService(serviceIndex, 'featuresTextColor', e.target.value)}
                className="input input-bordered w-20 ml-2 mt-2"
              />
            </div>
          </div>

          {/* Features Section */}
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Features</h3>
          {service.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="mb-4 p-4 border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <button
                className="bg-red-500 text-white p-2 rounded-full mb-2 hover:bg-red-700 transition duration-300"
                onClick={() => removeFeature(serviceIndex, featureIndex)}
              >
                Remove Feature
              </button>
              <input
                type="text"
                className="font-semibold w-full p-2 mb-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Feature Title"
                value={feature.title}
                onChange={(e) => updateFeature(serviceIndex, featureIndex, 'title', e.target.value)}
              />

              {/* Image Upload for Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Icon Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleIconUpload(serviceIndex, featureIndex, e.target.files[0])}
                  className="mb-2"
                />
                {feature.iconImage && (
                  <img src={feature.iconImage} alt="Feature Icon" className="h-10 w-10 mb-2" />
                )}
              </div>

              <textarea
                className="w-full p-2 border-2 border-gray-300 rounded-lg"
                placeholder="Feature Description"
                value={feature.description}
                onChange={(e) =>
                  updateFeature(serviceIndex, featureIndex, 'description', e.target.value)
                }
              />
            </div>
          ))}

          {/* Add new feature button */}
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() =>
              updateService(serviceIndex, 'features', [
                ...service.features,
                { title: '', description: '', iconImage: '' },
              ])
            }
          >
            Add New Feature
          </button>
        </div>
      ))}

      {/* Add Service Button */}
      <div className="text-center">
        <button
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={addService}
        >
          Add New Service
        </button>
      </div>

      {/* Save Button */}
      <div className="text-center mt-8">
        <button
          className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition duration-300"
          onClick={saveServices}
        >
          Save All Services
        </button>
      </div>
    </div>
  );
};

export default ServicesEditor;
