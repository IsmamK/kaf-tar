import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Upload, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const { TextArea } = Input;

const ProjectsModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Sample JSON data structure
  const sampleData = {
    title: "Our Training Facilities",
    subtitle: "Specialized vocational training centers across the region",
    colors: {
      primary: "#2ecc71",  // Vibrant green
      secondary: "#f39c12", // Orange/yellow
      lightGray: "#f5f5f5",
      darkGray: "#333333",
      navy: "#2c3e50"
    },
    centers: [
      {
        name: "Dhaka Construction Academy",
        specialty: "Construction Skills Training",
        description: "Certified programs in masonry, electrical work, and plumbing with hands-on training from industry experts.",
        location: "Dhaka Central District",
        contact: "+880 1234 567890",
        hours: "Mon-Sat: 8AM-6PM",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Chittagong Technical Institute",
        specialty: "Maritime and Logistics",
        description: "Advanced training in port operations, shipping logistics, and maritime safety procedures.",
        location: "Chittagong Port Area",
        contact: "+880 9876 543210",
        hours: "Mon-Fri: 9AM-5PM",
        image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  };

  // Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        // In a real app, you would fetch from API
        const response = await fetch(`${apiUrl}/projects/`);
        const data = await response.json();
        
        // For demo, we'll use the sample data
        form.setFieldsValue(data);
      } catch (error) {
        message.error('Failed to load projects data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleImageUpload = async (file, centerIndex) => {
    setImageUploading(true);
    try {
      // Simulate upload in demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would upload to server
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`${apiUrl}/images/`, { method: 'POST', body: formData });
      const data = await response.json();
      
      // For demo, we'll use a placeholder
      const demoImageUrl = URL.createObjectURL(file);
      
      const centers = form.getFieldValue('centers') || [];
      centers[centerIndex].image = demoImageUrl;
      form.setFieldsValue({ centers });
      
      message.success('Image uploaded successfully');
    } catch (error) {
      message.error('Image upload failed');
      console.error(error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();
      console.log('Saved values:', values); // For demo purposes
      
      // In a real app, you would save to API
      await fetch(`${apiUrl}/projects/`, { method: 'PATCH', body: JSON.stringify(values) });
      
      message.success('Projects updated successfully');
      onClose();
    } catch (error) {
      message.error('Failed to save changes');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Get primary color for styling
  const primaryColor = form.getFieldValue(['colors', 'primary']) || '#2ecc71';
  const secondaryColor = form.getFieldValue(['colors', 'secondary']) || '#f39c12';
  const darkGray = form.getFieldValue(['colors', 'darkGray']) || '#333333';

  return (
    <Modal
      title="Edit Projects"
      open={isOpen}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={saving}>
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSave}
          loading={saving}
          style={{ 
            backgroundColor: primaryColor,
            borderColor: primaryColor,
          }}
          className="hover:opacity-90 transition-opacity"
        >
          Save Changes
        </Button>,
      ]}
      destroyOnClose
      className="rounded-lg overflow-hidden"
    >
      <Form form={form} layout="vertical" className="space-y-6">
        {/* Header Section */}
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`,
            borderColor: `${primaryColor}30`
          }}
        >
          <h3 className="font-semibold mb-4 text-lg" style={{ color: darkGray }}>Header Content</h3>
          
          <Form.Item 
            name="title" 
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input 
              placeholder="Our Training Facilities" 
              className="rounded hover:border-green-400 focus:border-green-500"
            />
          </Form.Item>

          <Form.Item 
            name="subtitle" 
            label="Subtitle"
            rules={[{ required: true, message: 'Please enter the subtitle' }]}
          >
            <Input 
              placeholder="Specialized vocational training centers..." 
              className="rounded hover:border-green-400 focus:border-green-500"
            />
          </Form.Item>
        </div>

        <Divider className="my-6" style={{ borderColor: `${primaryColor}20` }} />

        {/* Training Centers Section */}
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`,
            borderColor: `${primaryColor}30`
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg" style={{ color: darkGray }}>Training Centers</h3>
            <span className="text-sm text-gray-500">{form.getFieldValue('centers')?.length || 0} centers</span>
          </div>
          
          <Form.List name="centers">
            {(fields, { add, remove }) => (
              <div className="space-y-6">
                {fields.map(({ key, name, ...restField }, index) => (
                  <div 
                    key={key} 
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderColor: `${primaryColor}30` }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium" style={{ color: primaryColor }}>Center {index + 1}</h4>
                      <Button
                        danger
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        className="text-red-500 hover:text-red-700"
                      />
                    </div>

                    {/* Image Upload */}
                    <Form.Item
                      {...restField}
                      name={[name, 'image']}
                      label="Center Image"
                      rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                      <Upload
                        name="image"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleImageUpload(file, index);
                          return false;
                        }}
                        disabled={imageUploading}
                        className="rounded-lg overflow-hidden border-2 border-dashed hover:border-green-400 transition-colors"
                        style={{ borderColor: `${primaryColor}50` }}
                      >
                        {form.getFieldValue(['centers', index, 'image']) ? (
                          <div className="relative w-full h-32">
                            <img 
                              src={form.getFieldValue(['centers', index, 'image'])} 
                              alt="Center preview" 
                              className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                              <Button 
                                icon={<UploadOutlined />} 
                                type="text" 
                                className="text-white hover:text-white"
                                style={{ backgroundColor: `${primaryColor}90` }}
                              >
                                Change
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4">
                            <UploadOutlined className="text-2xl mb-2" style={{ color: primaryColor }} />
                            <p className="text-sm" style={{ color: darkGray }}>Click to upload</p>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        label="Center Name"
                        rules={[{ required: true, message: 'Please enter name' }]}
                      >
                        <Input 
                          placeholder="Dhaka Construction Academy" 
                          className="hover:border-green-400 focus:border-green-500"
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'specialty']}
                        label="Specialty"
                        rules={[{ required: true, message: 'Please enter specialty' }]}
                      >
                        <Input 
                          placeholder="Construction Skills Training" 
                          className="hover:border-green-400 focus:border-green-500"
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="Description"
                      rules={[{ required: true, message: 'Please enter description' }]}
                    >
                      <TextArea 
                        rows={3} 
                        placeholder="Certified programs in masonry..." 
                        className="hover:border-green-400 focus:border-green-500"
                      />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, 'location']}
                        label={
                          <span className="flex items-center" style={{ color: darkGray }}>
                            <FaMapMarkerAlt className="mr-2" style={{ color: primaryColor }} /> Location
                          </span>
                        }
                        rules={[{ required: true, message: 'Please enter location' }]}
                      >
                        <Input 
                          placeholder="Dhaka Central District" 
                          className="hover:border-green-400 focus:border-green-500"
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'contact']}
                        label={
                          <span className="flex items-center" style={{ color: darkGray }}>
                            <FaPhone className="mr-2" style={{ color: primaryColor }} /> Contact
                          </span>
                        }
                        rules={[{ required: true, message: 'Please enter contact' }]}
                      >
                        <Input 
                          placeholder="+880 1234 567890" 
                          className="hover:border-green-400 focus:border-green-500"
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'hours']}
                        label={
                          <span className="flex items-center" style={{ color: darkGray }}>
                            <FaClock className="mr-2" style={{ color: primaryColor }} /> Hours
                          </span>
                        }
                        rules={[{ required: true, message: 'Please enter hours' }]}
                      >
                        <Input 
                          placeholder="Mon-Sat: 8AM-6PM" 
                          className="hover:border-green-400 focus:border-green-500"
                        />
                      </Form.Item>
                    </div>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add({
                    name: '',
                    specialty: '',
                    description: '',
                    location: '',
                    contact: '',
                    hours: '',
                    image: ''
                  })}
                  icon={<PlusOutlined />}
                  block
                  className="mt-2"
                  style={{ 
                    borderColor: primaryColor,
                    color: primaryColor
                  }}
                >
                  Add Training Center
                </Button>
              </div>
            )}
          </Form.List>
        </div>

        <Divider className="my-6" style={{ borderColor: `${primaryColor}20` }} />

        {/* Color Scheme Section */}
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`,
            borderColor: `${primaryColor}30`
          }}
        >
          <h3 className="font-semibold mb-4 text-lg" style={{ color: darkGray }}>Color Scheme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name={['colors', 'primary']} label="Primary Color (Green)">
              <div className="flex items-center">
                <Input 
                  type="color" 
                  className="w-16 h-10 cursor-pointer mr-2" 
                  style={{ borderRadius: '8px' }}
                />
                <span className="text-sm text-gray-600">Used for buttons, links, highlights</span>
              </div>
            </Form.Item>
            <Form.Item name={['colors', 'secondary']} label="Secondary Color (Yellow/Orange)">
              <div className="flex items-center">
                <Input 
                  type="color" 
                  className="w-16 h-10 cursor-pointer mr-2" 
                  style={{ borderRadius: '8px' }}
                />
                <span className="text-sm text-gray-600">Used for secondary buttons, accents</span>
              </div>
            </Form.Item>
            <Form.Item name={['colors', 'lightGray']} label="Light Gray">
              <div className="flex items-center">
                <Input 
                  type="color" 
                  className="w-16 h-10 cursor-pointer mr-2" 
                  style={{ borderRadius: '8px' }}
                />
                <span className="text-sm text-gray-600">Backgrounds, subtle elements</span>
              </div>
            </Form.Item>
            <Form.Item name={['colors', 'darkGray']} label="Dark Gray">
              <div className="flex items-center">
                <Input 
                  type="color" 
                  className="w-16 h-10 cursor-pointer mr-2" 
                  style={{ borderRadius: '8px' }}
                />
                <span className="text-sm text-gray-600">Text, headings, dark elements</span>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ProjectsModal;


