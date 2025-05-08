import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Select, Upload, ColorPicker, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const CoreValuesModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Emoji options for values
  const emojiOptions = [
    '🔐', '🏆', '👥', '🚀', '📝', '💡', '🌍', '⚖️', '🤝', '🌟',
    '🛠️', '🌐', '🔒', '📋', '👨‍💼', '👩‍💼', '🏢', '💎', '✨', '🔄'
  ];

  // Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/about/core-values/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error('Failed to load core values data');
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
      
      const response = await fetch(`${apiUrl}/about/core-values/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      message.success('Core values updated successfully');
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
      title="Edit Core Values"
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
      <Form form={form} layout="vertical" className="space-y-6">
        {/* Main Content Section */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-4">Header Content</h3>
          
          <Form.Item 
            name="title" 
            label="Main Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Our Core Values" />
          </Form.Item>

          <Form.Item 
            name="subtitle" 
            label="Subtitle"
            rules={[{ required: true, message: 'Please enter the subtitle' }]}
          >
            <Input placeholder="STECH DNA" />
          </Form.Item>
        </div>

        <Divider />

        {/* Values Section */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-4">Core Values</h3>
          <Form.List name="values">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="border rounded p-4 bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Value {name + 1}</h4>
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
                          <Select placeholder="Select emoji" className="w-full">
                            {emojiOptions.map(emoji => (
                              <Select.Option key={emoji} value={emoji}>
                                <span className="text-xl">{emoji}</span>
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="md:col-span-5">
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          label="Title"
                          rules={[{ required: true, message: 'Please enter title' }]}
                        >
                          <Input placeholder="Integrity" />
                        </Form.Item>
                      </div>

                      <div className="md:col-span-5">
                        <Form.Item
                          {...restField}
                          name={[name, 'color']}
                          label="Color"
                          rules={[{ required: true, message: 'Please select color' }]}
                        >
                          <ColorPicker format="hex" />
                        </Form.Item>
                      </div>
                    </div>

                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="Description"
                      rules={[{ required: true, message: 'Please enter description' }]}
                    >
                      <TextArea rows={3} placeholder="Upholding honesty and ethical standards..." />
                    </Form.Item>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add({
                    icon: '🔐',
                    title: '',
                    description: '',
                    color: '#F15A24'
                  })}
                  icon={<PlusOutlined />}
                  block
                  className="mt-2"
                >
                  Add Core Value
                </Button>
              </div>
            )}
          </Form.List>
        </div>

       

        {/* Color Scheme Section */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-4">Color Scheme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name={['colors', 'primary']} label="Primary Color">
              <ColorPicker format="hex" />
            </Form.Item>
            <Form.Item name={['colors', 'primaryLight']} label="Primary Light">
              <ColorPicker format="hex" />
            </Form.Item>
            <Form.Item name={['colors', 'secondary']} label="Secondary Color">
              <ColorPicker format="hex" />
            </Form.Item>
            <Form.Item name={['colors', 'secondaryLight']} label="Secondary Light">
              <ColorPicker format="hex" />
            </Form.Item>
            <Form.Item name={['colors', 'lightGray']} label="Light Gray">
              <ColorPicker format="hex" />
            </Form.Item>
            <Form.Item name={['colors', 'darkGray']} label="Dark Gray">
              <ColorPicker format="hex" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CoreValuesModal;