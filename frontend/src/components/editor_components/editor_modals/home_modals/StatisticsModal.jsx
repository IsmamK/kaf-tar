import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Divider,
  Space,
  Spin,
  Table,
  Select,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Globe, Award, Users, Shield, Trophy } from "lucide-react";
import Swal from "sweetalert2";

const { TextArea } = Input;

const iconComponents = {
  Globe: Globe,
  Award: Award,
  Users: Users,
  Shield: Shield,
  Trophy: Trophy,
};

const StatisticsModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Demo data structure
  const demoData = {
    heading: "Our Global Impact",
    subtitle: "Quantifying our commitment to excellence and service worldwide",
    stats: [
      {
        icon: "Globe",
        number: "50+",
        label: "Countries Served",
      },
      {
        icon: "Users",
        number: "10,000+",
        label: "Happy Clients",
      },
      {
        icon: "Award",
        number: "25+",
        label: "Industry Awards",
      },
      {
        icon: "Trophy",
        number: "#1",
        label: "Ranked Provider",
      },
    ],
  };

  // Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        // Simulating API fetch with demo data
        setTimeout(() => {
          // Store initial data for comparison
          setInitialData(demoData);

          // Prefill form with existing data
          form.setFieldsValue(demoData);
          setLoading(false);
        }, 500);

        // Actual API call would look like this:
        // const response = await fetch(`${apiUrl}/home/statistics/`);
        // if (!response.ok) throw new Error('Failed to fetch data');
        // const data = await response.json();
        // setInitialData(data);
        // form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load statistics data");
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

      // Only send changed fields if you want to optimize
      const payload = {
        ...initialData,
        ...values,
      };

      console.log("Submitting:", payload); // For demo purposes

      // Simulating API save
      setTimeout(() => {
        message.success("Statistics updated successfully");
        setSaving(false);
        onClose();
      }, 1000);

      // Actual API call would look like this:
      const response = await fetch(`${apiUrl}/home/statistics/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to save");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Statistics Content Added Successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
    } catch (error) {
      message.error("Failed to save changes");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Edit Statistics Section"
      open={isOpen}
      onCancel={onClose}
      width={800}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          disabled={saving}
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          loading={saving}
          className="bg-green-600 hover:bg-green-700 border-green-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>,
      ]}
      destroyOnClose
      className="rounded-lg overflow-hidden"
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <Form.Item
              name="heading"
              label={<span className="font-medium text-gray-800">Heading</span>}
              rules={[{ required: true, message: "Please enter a heading" }]}
            >
              <Input
                placeholder="Our Impact"
                className="hover:border-green-500 focus:border-green-500"
              />
            </Form.Item>

            <Form.Item
              name="subtitle"
              label={
                <span className="font-medium text-gray-800">Subtitle</span>
              }
              rules={[{ required: true, message: "Please enter a subtitle" }]}
            >
              <TextArea
                rows={3}
                placeholder="Quantifying our commitment to excellence..."
                className="hover:border-green-500 focus:border-green-500"
              />
            </Form.Item>
          </div>

          <Divider orientation="left" className="font-semibold text-gray-600">
            Statistics Items
          </Divider>

          <Form.List name="stats">
            {(fields, { add, remove }) => (
              <>
                <Table
                  dataSource={fields}
                  pagination={false}
                  rowKey="name"
                  columns={[
                    {
                      title: "Icon",
                      dataIndex: "icon",
                      width: 150,
                      render: (_, { name, ...restField }) => (
                        <Form.Item
                          {...restField}
                          name={[name, "icon"]}
                          rules={[
                            { required: true, message: "Please select icon" },
                          ]}
                          className="mb-0"
                        >
                          <Select
                            placeholder="Select icon"
                            className="hover:border-green-500"
                            dropdownClassName="[&_.ant-select-item]:hover:bg-green-50"
                          >
                            {Object.keys(iconComponents).map((iconName) => (
                              <Select.Option key={iconName} value={iconName}>
                                <div className="flex items-center gap-2">
                                  {React.createElement(
                                    iconComponents[iconName],
                                    {
                                      className: "w-4 h-4 text-green-600",
                                    }
                                  )}
                                  <span className="text-gray-700">
                                    {iconName}
                                  </span>
                                </div>
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      ),
                    },
                    {
                      title: "Number",
                      dataIndex: "number",
                      render: (_, { name, ...restField }) => (
                        <Form.Item
                          {...restField}
                          name={[name, "number"]}
                          rules={[
                            { required: true, message: "Please enter value" },
                          ]}
                          className="mb-0"
                        >
                          <Input
                            placeholder="50,000+"
                            className="hover:border-green-500 focus:border-green-500"
                          />
                        </Form.Item>
                      ),
                    },
                    {
                      title: "Label",
                      dataIndex: "label",
                      render: (_, { name, ...restField }) => (
                        <Form.Item
                          {...restField}
                          name={[name, "label"]}
                          rules={[
                            { required: true, message: "Please enter label" },
                          ]}
                          className="mb-0"
                        >
                          <Input
                            placeholder="Workers Exported"
                            className="hover:border-green-500 focus:border-green-500"
                          />
                        </Form.Item>
                      ),
                    },
                    {
                      title: "Action",
                      dataIndex: "action",
                      width: 80,
                      render: (_, { name }) => (
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined className="text-red-500" />}
                          onClick={() => remove(name)}
                          className="hover:bg-red-50"
                        />
                      ),
                    },
                  ]}
                  className="[&_.ant-table-thead_th]:bg-gray-100 [&_.ant-table-thead_th]:font-semibold"
                />
                <Button
                  type="dashed"
                  onClick={() => add({ icon: "Globe", number: "", label: "" })}
                  icon={<PlusOutlined className="text-green-600" />}
                  block
                  className="mt-4 border-green-400 text-green-600 hover:border-green-600 hover:text-green-700"
                >
                  Add Statistic
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Spin>
    </Modal>
  );
};

export default StatisticsModal;
