import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message, Collapse, Select, Upload, Divider, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { TextArea } = Input;

const About2Modal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Emoji options for key points
  const emojiOptions = [
    '🤝', '🌍', '📊', '💼', '👥', '🔍', '📈', '🔄', '🏆', '🌟',
    '💡', '🛠️', '🌐', '⚖️', '🔒', '📋', '👨‍💼', '👩‍💼', '🏢', '💎'
  ];

  // Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/about/about2`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error('Failed to load about data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  // Handle image upload
  const handleImageUpload = async (file) => {
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', 'about');

      const response = await fetch(`${apiUrl}/upload/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      form.setFieldsValue({ imageUrl: data.image });
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
      
      const response = await fetch(`${apiUrl}/about/about2/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      message.success('About section updated successfully');
      onClose();
    } catch (error) {
      message.error('Failed to save changes');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Edit About Section"
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
        >
          Save Changes
        </Button>,
      ]}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" className="space-y-4">
          {/* Main Content Section */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-3">Main Content</h3>
            
            <Form.Item 
              name="title" 
              label="Title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input placeholder="Empowering Global Workforce from Bangladesh" />
            </Form.Item>

            <Form.Item 
              name="description" 
              label="Description"
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <TextArea rows={4} placeholder="At Stech HR, we go beyond recruitment..." />
            </Form.Item>
          </div>

          <Divider />

          {/* Image Upload Section */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-3">Featured Image</h3>
            <Form.Item name="imageUrl" label="Upload Image">
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={handleImageUpload}
                disabled={imageUploading}
                className="w-full"
              >
                {form.getFieldValue('imageUrl') ? (
                  <div className="relative w-full h-40">
                    <img 
                      src={form.getFieldValue('imageUrl')} 
                      alt="About section" 
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Button 
                        icon={<UploadOutlined />} 
                        type="text" 
                        className="text-white hover:text-white"
                      >
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4">
                    <UploadOutlined className="text-2xl mb-2" />
                    <p className="text-sm">Click to upload</p>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <Divider />

          {/* Key Points Section */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-3">Key Points</h3>
            <Form.List name="keyPoints">
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="border rounded p-4 bg-white">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Key Point {name + 1}</h4>
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-2">
                          <Form.Item
                            {...restField}
                            name={[name, 'icon']}
                            label="Icon"
                            rules={[{ required: true, message: 'Please select an icon' }]}
                          >
                            <Select 
                              placeholder="Select emoji" 
                              className="w-full"
                              dropdownClassName="emoji-dropdown"
                            >
                              {emojiOptions.map(emoji => (
                                <Select.Option key={emoji} value={emoji}>
                                  <span className="text-xl">{emoji}</span>
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>

                        <div className="md:col-span-10 space-y-4">
                          <Form.Item
                            {...restField}
                            name={[name, 'title']}
                            label="Title"
                            rules={[{ required: true, message: 'Please enter title' }]}
                          >
                            <Input placeholder="Trusted Recruitment Partner" />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'description']}
                            label="Description"
                            rules={[{ required: true, message: 'Please enter description' }]}
                          >
                            <TextArea rows={2} placeholder="Reliable manpower solutions..." />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="dashed"
                    onClick={() => add({
                      icon: '🤝',
                      title: '',
                      description: ''
                    })}
                    icon={<PlusOutlined />}
                    block
                    className="mt-2"
                  >
                    Add Key Point
                  </Button>
                </div>
              )}
            </Form.List>
          </div>

          <Divider />

          {/* Button Section */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-3">Call to Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item 
                name="buttonLabel" 
                label="Button Text"
                rules={[{ required: true, message: 'Please enter button label' }]}
              >
                <Input placeholder="Partner with Stech HR" />
              </Form.Item>

              <Form.Item 
                name="buttonLink" 
                label="Button Link"
                rules={[{ required: true, message: 'Please enter button link' }]}
              >
                <Input placeholder="/about" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default About2Modal;