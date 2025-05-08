import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Tabs, Upload, Image, Card, Space, Spin, Collapse } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const IndustriesModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [expandedPanels, setExpandedPanels] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/home/industries/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        form.setFieldsValue(data);
        
        // Expand first panel by default if there are industries
        if (data.industries?.length > 0) {
          setExpandedPanels(['0']);
        }
      } catch (error) {
        message.error('Failed to load industries data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleImageUpload = async (file, fieldName, industryIndex) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', 'industries');

    try {
      const response = await fetch(`${apiUrl}/images/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const { image } = await response.json();
      const industries = form.getFieldValue('industries');
      industries[industryIndex][fieldName] = image;
      form.setFieldsValue({ industries });
      return image;
    } catch (error) {
      message.error('Image upload failed');
      console.error(error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();
      
      const response = await fetch(`${apiUrl}/home/industries/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      message.success('Industries updated successfully');
      onClose();
    } catch (error) {
      message.error('Failed to save changes');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const uploadProps = (fieldName, industryIndex) => ({
    name: 'image',
    showUploadList: false,
    beforeUpload: (file) => {
      handleImageUpload(file, fieldName, industryIndex);
      return false;
    },
  });

  const renderImagePreview = (url) => {
    if (!url) return null;
    return (
      <div className="mt-2">
        <Image 
          src={url} 
          width={120}
          height={80}
          className="object-cover rounded border"
          alt="Preview"
        />
      </div>
    );
  };

  return (
    <Modal
      title="Manage Industries Section"
      open={isOpen}
      onCancel={onClose}
      width={1200}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={saving}>
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSave}
          loading={saving}
          disabled={uploading}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>,
      ]}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            {/* Section Settings Tab */}
            <TabPane tab="Section Settings" key="1">
              <div className="grid grid-cols-1 gap-6">
                <Form.Item 
                  name="heading" 
                  label="Section Heading" 
                  rules={[{ required: true, message: 'Please enter a heading' }]}
                >
                  <Input placeholder="Industries We Serve" />
                </Form.Item>

                <Form.Item 
                  name="subtitle" 
                  label="Section Subtitle"
                  rules={[{ required: true, message: 'Please enter a subtitle' }]}
                >
                  <TextArea rows={3} placeholder="Specialized workforce solutions tailored to your industry requirements" />
                </Form.Item>
              </div>
            </TabPane>

            {/* Industries Management Tab */}
            <TabPane tab="Manage Industries" key="2">
              <Form.List name="industries">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    <Collapse 
                      activeKey={expandedPanels}
                      onChange={setExpandedPanels}
                      accordion={false}
                      className="bg-white"
                    >
                      {fields.map(({ key, name, ...restField }) => (
                        <Panel
                          key={key}
                          header={
                            <span className="font-medium">
                              {form.getFieldValue(['industries', name, 'title']) || `Industry ${name + 1}`}
                            </span>
                          }
                          extra={
                            <DeleteOutlined 
                              onClick={(e) => {
                                e.stopPropagation();
                                remove(name);
                              }}
                              className="text-red-500 hover:text-red-700"
                            />
                          }
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div>
                              <Form.Item
                                {...restField}
                                name={[name, 'title']}
                                label="Industry Title"
                                rules={[{ required: true, message: 'Please enter title' }]}
                              >
                                <Input placeholder="Plantation" />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, 'image']}
                                label="Industry Image"
                                rules={[{ required: true, message: 'Please provide image URL' }]}
                              >
                                <div>
                                  <Space.Compact className="w-full">
                                    <Input placeholder="https://example.com/industry.jpg" />
                                    <Upload {...uploadProps('image', name)}>
                                      <Button icon={<UploadOutlined />} loading={uploading}>
                                        Upload
                                      </Button>
                                    </Upload>
                                  </Space.Compact>
                                  {renderImagePreview(form.getFieldValue(['industries', name, 'image']))}
                                </div>
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, 'stats']}
                                label="Industry Statistic"
                                rules={[{ required: true, message: 'Please enter statistic' }]}
                              >
                                <Input placeholder="50+ plantations served across Southeast Asia" />
                              </Form.Item>
                            </div>

                            {/* Right Column */}
                            <div>
                              <Form.Item
                                {...restField}
                                name={[name, 'description']}
                                label="Description"
                                rules={[{ required: true, message: 'Please enter description' }]}
                              >
                                <TextArea rows={4} placeholder="Specialized workforce for agricultural estates..." />
                              </Form.Item>

                              <Form.Item
                                label="Highlights"
                              >
                                <Form.List name={[name, 'highlights']}>
                                  {(hFields, { add: hAdd, remove: hRemove }) => (
                                    <div className="space-y-3">
                                      {hFields.map(({ key: hKey, name: hName, ...hRestField }) => (
                                        <div key={hKey} className="flex items-start gap-2">
                                          <Form.Item
                                            {...hRestField}
                                            name={[hName]}
                                            rules={[{ required: true, message: 'Please enter highlight' }]}
                                            className="flex-grow mb-0"
                                          >
                                            <Input placeholder="15,000+ seasonal workers placed annually" />
                                          </Form.Item>
                                          <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => hRemove(hName)}
                                            className="mt-1"
                                          />
                                        </div>
                                      ))}
                                      <Button
                                        type="dashed"
                                        onClick={() => hAdd()}
                                        icon={<PlusOutlined />}
                                        block
                                        disabled={uploading}
                                      >
                                        Add Highlight
                                      </Button>
                                    </div>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </div>
                          </div>
                        </Panel>
                      ))}
                    </Collapse>

                    <Button
                      type="dashed"
                      onClick={() => {
                        const newIndex = fields.length;
                        add({
                          title: '',
                          image: '',
                          description: '',
                          highlights: [],
                          stats: ''
                        });
                        setExpandedPanels([...expandedPanels, newIndex.toString()]);
                      }}
                      icon={<PlusOutlined />}
                      block
                      className="mt-4"
                      disabled={uploading}
                    >
                      Add New Industry
                    </Button>
                  </div>
                )}
              </Form.List>
            </TabPane>

            {/* Preview Tab */}
            <TabPane tab="Preview" key="3">
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-2xl font-bold mb-4">
                  {form.getFieldValue('heading') || 'Industries We Serve'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {form.getFieldValue('subtitle') || 'Specialized workforce solutions...'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {form.getFieldValue('industries')?.map((industry, index) => (
                    <Card key={index} title={industry.title} className="mb-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3">
                          {industry.image && (
                            <Image
                              src={industry.image}
                              width="100%"
                              height={120}
                              className="object-cover rounded"
                              alt={industry.title}
                            />
                          )}
                          <p className="mt-2 text-sm font-medium">
                            {industry.stats}
                          </p>
                        </div>
                        <div className="md:w-2/3">
                          <p className="text-gray-700 mb-3">{industry.description}</p>
                          <ul className="space-y-1">
                            {industry.highlights?.map((highlight, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Form>
      </Spin>
    </Modal>
  );
};

export default IndustriesModal;