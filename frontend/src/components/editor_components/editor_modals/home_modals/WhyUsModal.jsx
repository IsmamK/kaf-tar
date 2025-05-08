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
import {
  Target,
  RefreshCcw,
  Zap,
  PenTool,
  Layers,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

const { TextArea } = Input;

const iconComponents = {
  Target,
  RefreshCcw,
  Zap,
  PenTool,
  Layers,
  CheckCircle,
};

// Demo JSON data
const demoData = {
  heading: "Why Choose JG Alfalah?",
  subtitle:
    "Distinct advantages that set our HR solutions apart from conventional approaches",
  items: [
    {
      icon: "Target",
      title: "Precision Hiring",
      description:
        "Our targeted recruitment ensures perfect candidate matches for your specific needs",
    },
    {
      icon: "RefreshCcw",
      title: "Continuous Support",
      description:
        "24/7 assistance and regular follow-ups to ensure smooth operations",
    },
    {
      icon: "Zap",
      title: "Fast Turnaround",
      description:
        "Quick response times and efficient processing of all HR requirements",
    },
    {
      icon: "PenTool",
      title: "Custom Solutions",
      description:
        "Tailored HR strategies designed specifically for your business",
    },
  ],
};

const WhyUsModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        // Simulate API call with demo data
        await new Promise((resolve) => setTimeout(resolve, 800));
        setInitialData(demoData);
        form.setFieldsValue(demoData);

        // Actual API call would look like this:
        const response = await fetch(`${apiUrl}/home/why-us/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setInitialData(data);
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load why-us data");
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

      const payload = {
        ...initialData,
        ...values,
      };

      console.log("Payload to save:", payload); // For demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Actual API call would look like this:
      const response = await fetch(`${apiUrl}/home/why-us/`, {
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
        title: "Why Us Modal Content Added Successfully",
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
      title={
        <span className="text-green-700 font-bold">Edit Why Us Section</span>
      }
      open={isOpen}
      onCancel={onClose}
      width={900}
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
          className="bg-green-600 hover:bg-green-700 border-green-600"
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
              label={
                <span className="font-semibold text-gray-700">Heading</span>
              }
              rules={[{ required: true, message: "Please enter a heading" }]}
            >
              <Input
                placeholder="Why Choose JG Alfalah?"
                className="hover:border-green-500 focus:border-green-500"
              />
            </Form.Item>

            <Form.Item
              name="subtitle"
              label={
                <span className="font-semibold text-gray-700">Subtitle</span>
              }
              rules={[{ required: true, message: "Please enter a subtitle" }]}
            >
              <TextArea
                rows={3}
                placeholder="Distinct advantages that set our HR solutions apart"
                className="hover:border-green-500 focus:border-green-500"
              />
            </Form.Item>
          </div>

          <Divider orientation="left" className="font-semibold text-green-700">
            Why Us Items
          </Divider>

          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                <Table
                  dataSource={fields}
                  pagination={false}
                  rowKey="name"
                  columns={[
                    {
                      title: <span className="text-green-700">Icon</span>,
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
                      title: <span className="text-green-700">Title</span>,
                      dataIndex: "title",
                      render: (_, { name, ...restField }) => (
                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          rules={[
                            { required: true, message: "Please enter title" },
                          ]}
                          className="mb-0"
                        >
                          <Input
                            placeholder="Cost Effective"
                            className="hover:border-green-500 focus:border-green-500"
                          />
                        </Form.Item>
                      ),
                    },
                    {
                      title: (
                        <span className="text-green-700">Description</span>
                      ),
                      dataIndex: "description",
                      render: (_, { name, ...restField }) => (
                        <Form.Item
                          {...restField}
                          name={[name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter description",
                            },
                          ]}
                          className="mb-0"
                        >
                          <Input.TextArea
                            rows={2}
                            placeholder="Affordable services meeting global standards..."
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
                  className="border rounded-lg"
                />
                <Button
                  type="dashed"
                  onClick={() =>
                    add({ icon: "Target", title: "", description: "" })
                  }
                  icon={<PlusOutlined className="text-green-600" />}
                  block
                  className="mt-4 border-green-400 text-green-600 hover:bg-green-50 hover:border-green-500"
                >
                  Add Item
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Spin>
    </Modal>
  );
};

export default WhyUsModal;
