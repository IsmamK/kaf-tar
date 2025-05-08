import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, message, Upload, Spin, Card } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';
import Swal from 'sweetalert2';

const { TextArea } = Input;

const HeroModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [stats, setStats] = useState([]);
  const [newStat, setNewStat] = useState({ value: '', label: '' });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [ctaStyle, setCtaStyle] = useState({
    primaryColor: '#2ecc71',
    secondaryColor: '#f1c40f',
    textColor: '#ffffff'
  });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchHeroData();
    }
  }, [isOpen]);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/home/hero/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch hero data');
      }

      const data = await response.json();
      
      form.setFieldsValue({
        headline: data.headline,
        subheadline: data.subheadline,
        tagline: data.tagline,
        primaryButtonText: data.primaryButton?.text || 'Get Free Quote',
        primaryButtonLink: data.primaryButton?.link || '/contact',
        secondaryButtonText: data.secondaryButton?.text || 'View Projects',
        secondaryButtonLink: data.secondaryButton?.link || '/projects',
        backgroundImage: data.backgroundImage,
        featuredService1: data.featuredServices?.[0] || '',
        featuredService2: data.featuredServices?.[1] || '',
        featuredService3: data.featuredServices?.[2] || '',
      });

      if (data.ctaStyle) {
        setCtaStyle(data.ctaStyle);
      }

      setStats(data.stats || [
        { value: '15+', label: 'Years Experience' },
        { value: '200+', label: 'Projects Completed' },
        { value: '50+', label: 'Happy Clients' }
      ]);

      setImageUrl(data.backgroundImage || '');
    } catch (error) {
      console.error('Error fetching hero data:', error);
      message.error('Failed to load hero section data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', 'hero_images');

    try {
      setImageLoading(true);
      
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/images/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const newImageUrl = `${data.image}`;
      
      form.setFieldsValue({ backgroundImage: newImageUrl });
      setImageUrl(newImageUrl);
      return newImageUrl;
    } catch (error) {
      console.error('Upload error:', error);
      message.error('Image upload failed');
      return null;
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = () => {
    form.setFieldsValue({ backgroundImage: '' });
    setImageUrl('');
  };

  const uploadProps = {
    name: 'image',
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        onSuccess(imageUrl, file);
      } else {
        onError(new Error('Upload failed'));
      }
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      return isImage && isLt5M;
    },
  };

  const handleAddStat = () => {
    if (newStat.value.trim() && newStat.label.trim()) {
      setStats([...stats, { ...newStat }]);
      setNewStat({ value: '', label: '' });
    }
  };

  const handleRemoveStat = (indexToRemove) => {
    setStats(stats.filter((_, index) => index !== indexToRemove));
  };

  const handleStatChange = (field, value, index) => {
    const updatedStats = [...stats];
    updatedStats[index][field] = value;
    setStats(updatedStats);
  };

  const handleColorChange = (color, field) => {
    setCtaStyle({
      ...ctaStyle,
      [field]: color.hex
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = {
        headline: values.headline,
        subheadline: values.subheadline,
        tagline: values.tagline,
        primaryButton: {
          text: values.primaryButtonText,
          link: values.primaryButtonLink
        },
        secondaryButton: {
          text: values.secondaryButtonText,
          link: values.secondaryButtonLink
        },
        backgroundImage: values.backgroundImage,
        stats: stats,
        featuredServices: [
          values.featuredService1,
          values.featuredService2,
          values.featuredService3
        ].filter(Boolean),
        ctaStyle: ctaStyle
      };

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/home/hero/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save hero data');
      }

      Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Services Content Added Successfully",
              showConfirmButton: false,
              timer: 3000
            });
      onClose();
    } catch (error) {
      console.error('Error saving hero data:', error);
      message.error('Failed to update hero section');
    }
  };

  return (
    <Modal
      title={<span className="text-xl font-bold text-gray-800">Edit Hero Section</span>}
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} className="px-6 h-10 rounded-lg border-gray-300 hover:bg-gray-100">
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={loading}
          style={{ backgroundColor: ctaStyle.primaryColor, borderColor: ctaStyle.primaryColor }}
          className="px-6 h-10 rounded-lg hover:opacity-90"
        >
          Save Changes
        </Button>,
      ]}
      width={900}
      className="rounded-lg overflow-hidden"
      bodyStyle={{ padding: '24px' }}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" className="space-y-6">
          <Card 
            title="Main Content" 
            bordered={false} 
            className="rounded-lg shadow-sm border-0"
            headStyle={{ 
              background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)',
              borderBottom: '1px solid #e8e8e8'
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <Form.Item
                name="headline"
                label={<span className="font-medium text-gray-700">Headline</span>}
                rules={[{ required: true, message: 'Please enter the headline' }]}
              >
                <Input 
                  size="large" 
                  placeholder="e.g., Building Dreams, Crafting Reality" 
                  className="rounded-lg hover:border-green-400 focus:border-green-400"
                />
              </Form.Item>

              <Form.Item
                name="subheadline"
                label={<span className="font-medium text-gray-700">Subheadline</span>}
                rules={[{ required: true, message: 'Please enter the subheadline' }]}
              >
                <Input 
                  size="large" 
                  placeholder="e.g., Premium Construction Services" 
                  className="rounded-lg hover:border-green-400 focus:border-green-400"
                />
              </Form.Item>

              <Form.Item
                name="tagline"
                label={<span className="font-medium text-gray-700">Tagline/Description</span>}
                rules={[{ required: true, message: 'Please enter the description' }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="e.g., Stech Builders delivers exceptional construction services with 15+ years of experience in residential and commercial projects." 
                  className="rounded-lg hover:border-green-400 focus:border-green-400"
                />
              </Form.Item>
            </div>
          </Card>

          <Card 
            title="Featured Services" 
            bordered={false} 
            className="rounded-lg shadow-sm border-0"
            headStyle={{ 
              background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)',
              borderBottom: '1px solid #e8e8e8'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item
                name="featuredService1"
                label={<span className="font-medium text-gray-700">Service 1</span>}
              >
                <Input 
                  placeholder="e.g., Residential Construction" 
                  className="rounded-lg hover:border-green-400 focus:border-green-400" 
                />
              </Form.Item>
              <Form.Item
                name="featuredService2"
                label={<span className="font-medium text-gray-700">Service 2</span>}
              >
                <Input 
                  placeholder="e.g., Commercial Projects" 
                  className="rounded-lg hover:border-green-400 focus:border-green-400" 
                />
              </Form.Item>
              <Form.Item
                name="featuredService3"
                label={<span className="font-medium text-gray-700">Service 3</span>}
              >
                <Input 
                  placeholder="e.g., Renovations" 
                  className="rounded-lg hover:border-green-400 focus:border-green-400" 
                />
              </Form.Item>
            </div>
          </Card>

          <Card 
            title="Call to Action Buttons" 
            bordered={false} 
            className="rounded-lg shadow-sm border-0"
            headStyle={{ 
              background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)',
              borderBottom: '1px solid #e8e8e8'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Primary Button</h4>
                <Form.Item
                  name="primaryButtonText"
                  label={<span className="font-medium text-gray-700">Button Text</span>}
                  rules={[{ required: true, message: 'Please enter button text' }]}
                >
                  <Input 
                    placeholder="e.g., Get Free Quote" 
                    className="rounded-lg hover:border-green-400 focus:border-green-400" 
                  />
                </Form.Item>
                <Form.Item
                  name="primaryButtonLink"
                  label={<span className="font-medium text-gray-700">Button Link</span>}
                  rules={[{ required: true, message: 'Please enter button link' }]}
                >
                  <Input 
                    placeholder="e.g., /contact" 
                    className="rounded-lg hover:border-green-400 focus:border-green-400" 
                  />
                </Form.Item>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Button Color:</span>
                  <div 
                    className="w-8 h-8 rounded-lg cursor-pointer border border-gray-300 hover:border-green-500 transition-all"
                    style={{ backgroundColor: ctaStyle.primaryColor }}
                    onClick={() => setColorPickerVisible('primary')}
                  />
                  {colorPickerVisible === 'primary' && (
                    <div className="absolute z-10">
                      <div className="p-2 bg-white rounded-lg shadow-xl">
                        <SketchPicker 
                          color={ctaStyle.primaryColor} 
                          onChangeComplete={(color) => handleColorChange(color, 'primaryColor')} 
                        />
                        <Button 
                          size="small" 
                          onClick={() => setColorPickerVisible(false)}
                          className="mt-2 w-full rounded-lg"
                          style={{ backgroundColor: ctaStyle.primaryColor, color: ctaStyle.textColor, borderColor: ctaStyle.primaryColor }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Secondary Button</h4>
                <Form.Item
                  name="secondaryButtonText"
                  label={<span className="font-medium text-gray-700">Button Text</span>}
                  rules={[{ required: true, message: 'Please enter button text' }]}
                >
                  <Input 
                    placeholder="e.g., View Projects" 
                    className="rounded-lg hover:border-green-400 focus:border-green-400" 
                  />
                </Form.Item>
                <Form.Item
                  name="secondaryButtonLink"
                  label={<span className="font-medium text-gray-700">Button Link</span>}
                  rules={[{ required: true, message: 'Please enter button link' }]}
                >
                  <Input 
                    placeholder="e.g., /projects" 
                    className="rounded-lg hover:border-green-400 focus:border-green-400" 
                  />
                </Form.Item>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Button Color:</span>
                  <div 
                    className="w-8 h-8 rounded-lg cursor-pointer border border-gray-300 hover:border-yellow-500 transition-all"
                    style={{ backgroundColor: ctaStyle.secondaryColor }}
                    onClick={() => setColorPickerVisible('secondary')}
                  />
                  {colorPickerVisible === 'secondary' && (
                    <div className="absolute z-10">
                      <div className="p-2 bg-white rounded-lg shadow-xl">
                        <SketchPicker 
                          color={ctaStyle.secondaryColor} 
                          onChangeComplete={(color) => handleColorChange(color, 'secondaryColor')} 
                        />
                        <Button 
                          size="small" 
                          onClick={() => setColorPickerVisible(false)}
                          className="mt-2 w-full rounded-lg"
                          style={{ backgroundColor: ctaStyle.secondaryColor, color: '#2c3e50', borderColor: ctaStyle.secondaryColor }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card 
            title="Background Image" 
            bordered={false} 
            className="rounded-lg shadow-sm border-0"
            headStyle={{ 
              background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)',
              borderBottom: '1px solid #e8e8e8'
            }}
          >
            <Form.Item
              name="backgroundImage"
              rules={[{ required: true, message: 'Please upload background image' }]}
            >
              <div className="flex flex-col gap-4">
                <Upload {...uploadProps}>
                  <Button 
                    icon={<UploadOutlined />} 
                    loading={imageLoading}
                    className="h-10 rounded-lg"
                    style={{ backgroundColor: ctaStyle.primaryColor, color: ctaStyle.textColor, borderColor: ctaStyle.primaryColor }}
                  >
                    Upload Construction Site Image
                  </Button>
                </Upload>
                {imageUrl && (
                  <div className="relative group">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: '#ff4d4f', color: 'white', borderColor: '#ff4d4f' }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </Form.Item>
          </Card>

          <Card 
            title="Company Statistics" 
            bordered={false} 
            className="rounded-lg shadow-sm border-0"
            headStyle={{ 
              background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)',
              borderBottom: '1px solid #e8e8e8'
            }}
          >
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Key Statistics</h4>
              <p className="text-gray-500 text-sm">
                Display impressive numbers that highlight your company's experience and success
              </p>
              
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Input
                      value={stat.value}
                      onChange={(e) => handleStatChange('value', e.target.value, index)}
                      placeholder="Value (e.g., 200+)"
                      className="flex-1 rounded-lg hover:border-green-400 focus:border-green-400"
                    />
                    <Input
                      value={stat.label}
                      onChange={(e) => handleStatChange('label', e.target.value, index)}
                      placeholder="Label (e.g., Projects Completed)"
                      className="flex-1 rounded-lg hover:border-green-400 focus:border-green-400"
                    />
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveStat(index)}
                      className="flex items-center justify-center rounded-lg"
                      style={{ backgroundColor: '#ff4d4f', color: 'white', borderColor: '#ff4d4f' }}
                    />
                  </div>
                ))}
                
                <div className="flex gap-3 items-center bg-gray-100 p-3 rounded-lg">
                  <Input
                    value={newStat.value}
                    onChange={(e) => setNewStat({...newStat, value: e.target.value})}
                    placeholder="Value (e.g., 200+)"
                    className="flex-1 rounded-lg hover:border-green-400 focus:border-green-400"
                  />
                  <Input
                    value={newStat.label}
                    onChange={(e) => setNewStat({...newStat, label: e.target.value})}
                    placeholder="Label (e.g., Projects Completed)"
                    className="flex-1 rounded-lg hover:border-green-400 focus:border-green-400"
                  />
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={handleAddStat}
                    className="flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: ctaStyle.primaryColor, color: ctaStyle.textColor, borderColor: ctaStyle.primaryColor }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Form>
      </Spin>
    </Modal>
  );
};

export default HeroModal;