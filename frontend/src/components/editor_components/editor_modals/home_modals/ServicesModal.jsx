import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Button, message, Card, Divider, Space, Spin, Tag } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { TextArea } = Input;

// Color constants matching Stech Builders brand
const COLORS = {
  primary: '#2ecc71', // Vibrant green
  secondary: '#f1c40f', // Vibrant yellow
  dark: '#2c3e50', // Dark blue/black
  light: '#ecf0f1', // Light gray
  white: '#ffffff',
  black: '#000000'
};

// Emoji icons with color-coded backgrounds
const emojiIcons = {
  '🏠': { label: 'Residential', bg: '#e8f8f5' },
  '🏢': { label: 'Commercial', bg: '#fef9e7' },
  '🛠️': { label: 'Renovation', bg: '#fdedec' },
  '📊': { label: 'Management', bg: '#eaf2f8' },
  '🏗️': { label: 'Construction', bg: '#e8f8f5' },
  '🔨': { label: 'Carpentry', bg: '#fef9e7' },
  '⚡': { label: 'Electrical', bg: '#fdedec' },
  '🚿': { label: 'Plumbing', bg: '#eaf2f8' }
};

const ServicesModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/home/services/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        form.setFieldsValue({ services: data.services || [] });
        if (data.services?.length > 0) {
          setActiveService(0);
        }
      } catch (error) {
        message.error('Failed to load services data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();
      
      const response = await fetch(`${apiUrl}/home/services/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ services: values.services }),
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

  return (
    <Modal
      title={<span className="text-xl font-bold" style={{ color: COLORS.dark }}>Manage Construction Services</span>}
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={saving} className="rounded-lg px-6 h-10">
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSave}
          loading={saving}
          style={{ 
            backgroundColor: COLORS.primary, 
            borderColor: COLORS.primary,
            color: COLORS.white
          }}
          className="rounded-lg px-6 h-10 hover:opacity-90"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>,
      ]}
      destroyOnClose
      className="rounded-lg overflow-hidden"
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Divider orientation="left" className="font-semibold" style={{ color: COLORS.dark }}>
            Construction Services
          </Divider>

          <div className="flex gap-4">
            {/* Services List Sidebar */}
            <div className="w-1/4">
              <Form.List name="services">
                {(fields, { add, remove }) => (
                  <div className="space-y-2">
                    {fields.map(({ key, name, ...restField }) => {
                      const service = form.getFieldValue(['services', name]) || {};
                      const icon = service.icon || '🏠';
                      const iconData = emojiIcons[icon] || { label: '', bg: COLORS.light };
                      
                      return (
                        <Card
                          key={key}
                          onClick={() => setActiveService(name)}
                          className={`cursor-pointer transition-all ${
                            activeService === name 
                              ? 'border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-white' 
                              : 'hover:bg-gray-50'
                          }`}
                          size="small"
                          bodyStyle={{ padding: '12px' }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate flex items-center gap-2">
                              <span 
                                className="text-lg rounded-full w-8 h-8 flex items-center justify-center"
                                style={{ backgroundColor: iconData.bg }}
                              >
                                {icon}
                              </span>
                              <span className="font-medium" style={{ color: COLORS.dark }}>
                                {service.title || `Service ${name + 1}`}
                              </span>
                            </span>
                            <Button
                              type="text"
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (activeService === name) {
                                  setActiveService(null);
                                }
                                remove(name);
                              }}
                              style={{ color: '#ff4d4f' }}
                            />
                          </div>
                        </Card>
                      );
                    })}
                    <Button
                      type="dashed"
                      onClick={() => {
                        const newIndex = form.getFieldValue('services')?.length || 0;
                        add({
                          title: `New Service ${newIndex + 1}`,
                          icon: '🏠',
                          description: '',
                          features: []
                        });
                        setActiveService(newIndex);
                      }}
                      icon={<PlusOutlined />}
                      block
                      className="mt-2 rounded-lg h-10"
                      style={{ 
                        borderColor: COLORS.primary,
                        color: COLORS.primary
                      }}
                    >
                      Add Service
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>

            {/* Service Details */}
            <div className="flex-1">
              {activeService !== null ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="text-3xl rounded-full w-12 h-12 flex items-center justify-center"
                      style={{ 
                        backgroundColor: emojiIcons[form.getFieldValue(['services', activeService, 'icon']) || '🏠']?.bg || COLORS.light
                      }}
                    >
                      {form.getFieldValue(['services', activeService, 'icon']) || '🏠'}
                    </span>
                    <h3 
                      className="text-xl font-medium"
                      style={{ color: COLORS.dark }}
                    >
                      {form.getFieldValue(['services', activeService, 'title']) || `Service ${activeService + 1}`}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name={['services', activeService, 'title']}
                      label={<span className="font-medium" style={{ color: COLORS.dark }}>Service Title</span>}
                      rules={[{ required: true, message: 'Please enter service title' }]}
                    >
                      <Input 
                        placeholder="Residential Construction" 
                        className="rounded-lg hover:border-green-400 focus:border-green-400"
                      />
                    </Form.Item>

                    <Form.Item
                      name={['services', activeService, 'icon']}
                      label={<span className="font-medium" style={{ color: COLORS.dark }}>Icon (Emoji)</span>}
                      rules={[{ required: true, message: 'Please select an icon' }]}
                    >
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(emojiIcons).map(([emoji, { label, bg }]) => (
                          <button
                            key={emoji}
                            type="button"
                            className={`text-2xl p-2 rounded-lg transition-all ${
                              form.getFieldValue(['services', activeService, 'icon']) === emoji 
                                ? 'ring-2 ring-green-500' 
                                : 'hover:ring-1 hover:ring-gray-300'
                            }`}
                            onClick={() => form.setFieldsValue({
                              services: form.getFieldValue('services').map((service, idx) => 
                                idx === activeService ? {...service, icon: emoji} : service
                              )
                            })}
                            title={label}
                            style={{ backgroundColor: bg }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </Form.Item>

                    <Form.Item
                      name={['services', activeService, 'description']}
                      label={<span className="font-medium" style={{ color: COLORS.dark }}>Description</span>}
                      rules={[{ required: true, message: 'Please enter description' }]}
                      className="md:col-span-2"
                    >
                      <TextArea 
                        rows={3} 
                        placeholder="Custom home building and remodeling services tailored to your unique vision and lifestyle needs." 
                        className="rounded-lg hover:border-green-400 focus:border-green-400"
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="font-medium" style={{ color: COLORS.dark }}>Features</span>}
                      className="md:col-span-2"
                    >
                      <Form.List name={['services', activeService, 'features']}>
                        {(fields, { add, remove }) => (
                          <div className="space-y-3">
                            {fields.map(({ key, name, ...restField }) => (
                              <div key={key} className="flex items-start gap-2">
                                <Form.Item
                                  {...restField}
                                  name={[name]}
                                  rules={[{ required: true, message: 'Please enter feature text' }]}
                                  className="flex-grow mb-0"
                                >
                                  <Input 
                                    placeholder="Custom home design" 
                                    className="rounded-lg hover:border-green-400 focus:border-green-400"
                                  />
                                </Form.Item>
                                <Button
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(name)}
                                  className="mt-1 rounded-lg"
                                  style={{ color: '#ff4d4f' }}
                                />
                              </div>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => add('')}
                              icon={<PlusOutlined />}
                              block
                              className="rounded-lg h-10"
                              style={{ 
                                borderColor: COLORS.secondary,
                                color: COLORS.secondary
                              }}
                            >
                              Add Feature
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                </div>
              ) : (
                <div 
                  className="flex flex-col items-center justify-center h-64 rounded-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%)'
                  }}
                >
                  <p className="text-gray-500 mb-4">Select a service or add a new one</p>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      const newIndex = form.getFieldValue('services')?.length || 0;
                      form.setFieldsValue({
                        services: [
                          ...(form.getFieldValue('services') || []),
                          {
                            title: `New Service ${newIndex + 1}`,
                            icon: '🏠',
                            description: '',
                            features: []
                          }
                        ]
                      });
                      setActiveService(newIndex);
                    }}
                    style={{ 
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary
                    }}
                    className="rounded-lg"
                  >
                    Add New Service
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ServicesModal;