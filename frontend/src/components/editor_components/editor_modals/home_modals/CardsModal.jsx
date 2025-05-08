import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Button, message, Card, Select, Divider, Space, Spin, Image } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { Option } = Select;
const { TextArea } = Input;

// Color constants
const COLORS = {
  primary: '#2ecc71',       // Vibrant green
  primaryDark: '#27ae60',    // Darker green
  secondary: '#f39c12',      // Yellow/orange
  textDark: '#2c3e50',       // Dark blue/black
  textLight: '#ecf0f1',      // Light gray
  backgroundLight: '#ffffff',
  backgroundDark: '#34495e', // Dark slate
  border: '#bdc3c7'          // Light gray border
};

const CardsModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeCountry, setActiveCountry] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/home/cards/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        form.setFieldsValue(data);
        if (data.countries?.length > 0) {
          setActiveCountry(0);
        }
      } catch (error) {
        message.error('Failed to load country cards data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleImageUpload = async (file, fieldName, countryIndex) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', 'country-card-image');

    try {
      const response = await fetch(`${apiUrl}/images/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const { image } = await response.json();
      const countries = form.getFieldValue('countries');
      countries[countryIndex][fieldName] = image;
      form.setFieldsValue({ countries });
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
      
      const response = await fetch(`${apiUrl}/home/cards/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Services Content Added Successfully",
              showConfirmButton: false,
              timer: 3000
            });
      onClose();
    } catch (error) {
      message.error('Failed to save changes');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const uploadProps = (fieldName, countryIndex) => ({
    name: 'image',
    showUploadList: false,
    beforeUpload: (file) => {
      handleImageUpload(file, fieldName, countryIndex);
      return false;
    },
  });

  const renderImagePreview = (url) => {
    if (!url) return null;
    return (
      <div className="mt-2">
        <Image 
          src={url} 
          width={100} 
          height={60} 
          className="object-cover rounded border" 
          style={{ borderColor: COLORS.border }}
          alt="Preview" 
        />
      </div>
    );
  };

  return (
    <Modal
      title={<span style={{ color: COLORS.textDark }}>Manage Global Network Cards</span>}
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button 
          key="cancel" 
          onClick={onClose} 
          disabled={saving}
          style={{ 
            color: COLORS.textDark,
            borderColor: COLORS.border
          }}
        >
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSave}
          loading={saving}
          disabled={uploading}
          style={{ 
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primaryDark,
            color: 'white'
          }}
          className="hover:opacity-90"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>,
      ]}
      destroyOnClose
      style={{ borderRadius: '12px' }}
      bodyStyle={{ padding: '24px' }}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Form.Item 
              name="heading" 
              label={<span style={{ color: COLORS.textDark }}>Main Heading</span>}
              rules={[{ required: true, message: 'Please enter a heading' }]}
            >
              <Input 
                placeholder="Our Global Network" 
                style={{ 
                  borderColor: COLORS.border,
                  borderRadius: '6px'
                }}
              />
            </Form.Item>
            <Form.Item 
              name="subheading" 
              label={<span style={{ color: COLORS.textDark }}>Subheading</span>}
              rules={[{ required: true, message: 'Please enter a subheading' }]}
            >
              <Input 
                placeholder="Trusted Recruitment Across Borders" 
                style={{ 
                  borderColor: COLORS.border,
                  borderRadius: '6px'
                }}
              />
            </Form.Item>
          </div>

          <Divider 
            orientation="left" 
            style={{ 
              color: COLORS.textDark,
              fontWeight: '600',
              borderColor: COLORS.border
            }}
          >
            Countries
          </Divider>

          <div className="flex gap-4">
            {/* Country List Sidebar */}
            <div className="w-1/4">
              <Form.List name="countries">
                {(fields, { add, remove }) => (
                  <div className="space-y-2">
                    {fields.map(({ key, name, ...restField }) => {
                      const countryName = form.getFieldValue(['countries', name, 'name']) || `Country ${name + 1}`;
                      return (
                        <Card
                          key={key}
                          onClick={() => setActiveCountry(name)}
                          className={`cursor-pointer transition-all ${
                            activeCountry === name 
                              ? 'border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white' 
                              : 'hover:bg-gray-50'
                          }`}
                          size="small"
                          bodyStyle={{ padding: '12px' }}
                        >
                          <div className="flex justify-between items-center">
                            <span 
                              className="truncate font-medium" 
                              style={{ color: COLORS.textDark }}
                            >
                              {countryName}
                            </span>
                            <Button
                              type="text"
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (activeCountry === name) {
                                  setActiveCountry(null);
                                }
                                remove(name);
                              }}
                            />
                          </div>
                        </Card>
                      );
                    })}
                    <Button
                      type="dashed"
                      onClick={() => {
                        const newIndex = form.getFieldValue('countries')?.length || 0;
                        add();
                        setActiveCountry(newIndex);
                      }}
                      icon={<PlusOutlined />}
                      block
                      className="mt-2"
                      disabled={uploading}
                      style={{ 
                        color: COLORS.primary,
                        borderColor: COLORS.primary,
                        borderRadius: '6px'
                      }}
                    >
                      Add Country
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>

            {/* Country Details */}
            <div className="flex-1">
              {activeCountry !== null ? (
                <div className="space-y-4">
                  <h3 
                    className="text-lg font-medium"
                    style={{ color: COLORS.textDark }}
                  >
                    {form.getFieldValue(['countries', activeCountry, 'name']) || `Country ${activeCountry + 1}`}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name={['countries', activeCountry, 'name']}
                      label={<span style={{ color: COLORS.textDark }}>Country Name</span>}
                      rules={[{ required: true, message: 'Please enter country name' }]}
                    >
                      <Input 
                        placeholder="Saudi Arabia" 
                        style={{ 
                          borderColor: COLORS.border,
                          borderRadius: '6px'
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name={['countries', activeCountry, 'workersPlaced']}
                      label={<span style={{ color: COLORS.textDark }}>Workers Placed</span>}
                      rules={[{ required: true, message: 'Please enter workers placed' }]}
                    >
                      <Input 
                        placeholder="50,000+" 
                        style={{ 
                          borderColor: COLORS.border,
                          borderRadius: '6px'
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name={['countries', activeCountry, 'flag']}
                      label={<span style={{ color: COLORS.textDark }}>Country Flag</span>}
                      rules={[{ required: true, message: 'Please provide flag image' }]}
                    >
                      <div>
                        <Space.Compact className="w-full">
                          <Input 
                            placeholder="https://flagcdn.com/sa.svg" 
                            style={{ 
                              borderColor: COLORS.border,
                              borderRadius: '6px 0 0 6px'
                            }}
                          />
                          <Upload {...uploadProps('flag', activeCountry)}>
                            <Button 
                              icon={<UploadOutlined />} 
                              loading={uploading}
                              style={{ 
                                backgroundColor: COLORS.secondary,
                                color: 'white',
                                borderColor: COLORS.secondary,
                                borderRadius: '0 6px 6px 0'
                              }}
                            >
                              Upload
                            </Button>
                          </Upload>
                        </Space.Compact>
                        {renderImagePreview(form.getFieldValue(['countries', activeCountry, 'flag']))}
                      </div>
                    </Form.Item>

                    <Form.Item
                      name={['countries', activeCountry, 'imageSrc']}
                      label={<span style={{ color: COLORS.textDark }}>Country Image</span>}
                      rules={[{ required: true, message: 'Please provide country image' }]}
                    >
                      <div>
                        <Space.Compact className="w-full">
                          <Input 
                            placeholder="https://example.com/image.jpg" 
                            style={{ 
                              borderColor: COLORS.border,
                              borderRadius: '6px 0 0 6px'
                            }}
                          />
                          <Upload {...uploadProps('imageSrc', activeCountry)}>
                            <Button 
                              icon={<UploadOutlined />} 
                              loading={uploading}
                              style={{ 
                                backgroundColor: COLORS.secondary,
                                color: 'white',
                                borderColor: COLORS.secondary,
                                borderRadius: '0 6px 6px 0'
                              }}
                            >
                              Upload
                            </Button>
                          </Upload>
                        </Space.Compact>
                        {renderImagePreview(form.getFieldValue(['countries', activeCountry, 'imageSrc']))}
                      </div>
                    </Form.Item>

                    <Form.Item
                      name={['countries', activeCountry, 'keyIndustries']}
                      label={<span style={{ color: COLORS.textDark }}>Key Industries</span>}
                      rules={[{ required: true, message: 'Please select at least one industry', type: 'array' }]}
                      className="md:col-span-2"
                    >
                      <Select
                        mode="tags"
                        tokenSeparators={[',']}
                        placeholder="Oil & Gas, Construction, Healthcare"
                        className="w-full"
                        style={{ 
                          borderColor: COLORS.border,
                          borderRadius: '6px'
                        }}
                      >
                        {['Oil & Gas', 'Construction', 'Healthcare', 'Hospitality', 'Retail', 'Engineering', 'Domestic Work', 'Manufacturing', 'Electronics', 'Plantation'].map(industry => (
                          <Option key={industry} value={industry}>{industry}</Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label={<span style={{ color: COLORS.textDark }}>Highlights</span>}
                      className="md:col-span-2"
                    >
                      <Form.List name={['countries', activeCountry, 'highlights']}>
                        {(hFields, { add: hAdd, remove: hRemove }) => (
                          <div className="space-y-3">
                            {hFields.map(({ key, name: hName, ...hRestField }) => (
                              <div key={key} className="flex items-start gap-2">
                                <Form.Item
                                  {...hRestField}
                                  name={[hName]}
                                  rules={[{ required: true, message: 'Please enter highlight text' }]}
                                  className="flex-grow mb-0"
                                >
                                  <TextArea 
                                    rows={2} 
                                    placeholder="Primary destination for workers" 
                                    style={{ 
                                      borderColor: COLORS.border,
                                      borderRadius: '6px'
                                    }}
                                  />
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
                              style={{ 
                                color: COLORS.primary,
                                borderColor: COLORS.primary,
                                borderRadius: '6px'
                              }}
                            >
                              Add Highlight
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                </div>
              ) : (
                <div 
                  className="flex items-center justify-center h-64 rounded"
                  style={{ 
                    backgroundColor: COLORS.backgroundLight,
                    border: `1px dashed ${COLORS.border}`
                  }}
                >
                  <p style={{ color: COLORS.textDark }}>Select a country or add a new one</p>
                </div>
              )}
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CardsModal;