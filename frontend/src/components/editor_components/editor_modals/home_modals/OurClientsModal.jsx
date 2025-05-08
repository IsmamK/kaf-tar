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
  Upload,
  Image,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

const { TextArea } = Input;

// Color constants
const COLORS = {
  primary: "#2ecc71", // Vibrant green
  primaryDark: "#27ae60", // Darker green
  secondary: "#f39c12", // Yellow/orange
  accent: "#e74c3c", // Vibrant red
  textDark: "#2c3e50", // Dark blue/black
  textLight: "#ecf0f1", // Light gray
  backgroundLight: "#ffffff",
  backgroundDark: "#34495e", // Dark slate
  border: "#bdc3c7", // Light gray border
  highlight: "#3498db", // Bright blue
};

const OurClientsModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/home/our-clients/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load clients data");
        console.error(error);
        // Set demo data if API fails
        form.setFieldsValue({
          title: "Trusted By Global Leaders",
          clients: [
            {
              logo: "https://logo.clearbit.com/google.com",
              link: "https://google.com",
            },
            {
              logo: "https://logo.clearbit.com/microsoft.com",
              link: "https://microsoft.com",
            },
            {
              logo: "https://logo.clearbit.com/apple.com",
              link: "https://apple.com",
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleImageUpload = async (file, index) => {
    setUploading(true);
    setUploadingIndex(index);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "clients");

    try {
      const response = await fetch(`${apiUrl}/images/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();

      const clients = form.getFieldValue("clients") || [];
      clients[index] = { ...clients[index], logo: url };
      form.setFieldsValue({ clients });

      return url;
    } catch (error) {
      message.error("Image upload failed");
      console.error(error);
      return null;
    } finally {
      setUploading(false);
      setUploadingIndex(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();

      const response = await fetch(`${apiUrl}/home/our-clients/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Our Clients Content Added Successfully",
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

  const uploadProps = (index) => ({
    name: "image",
    showUploadList: false,
    beforeUpload: (file) => {
      handleImageUpload(file, index);
      return false;
    },
  });

  const renderLogoPreview = (url) => {
    if (!url) return null;
    return (
      <div className="mt-2">
        <Image
          src={url}
          width={100}
          height={60}
          className="object-contain rounded border"
          alt="Logo preview"
          style={{ borderColor: COLORS.border }}
        />
      </div>
    );
  };

  return (
    <Modal
      title={
        <span className="font-bold" style={{ color: COLORS.primaryDark }}>
          Edit Our Clients Section
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      width={800}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          disabled={saving}
          style={{ borderColor: COLORS.border }}
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
          }}
          className="hover:opacity-90"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>,
      ]}
      destroyOnClose
      className="rounded-lg overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" className="p-6">
          <Form.Item
            name="title"
            label={
              <span
                className="font-semibold"
                style={{ color: COLORS.textDark }}
              >
                Section Title
              </span>
            }
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input
              placeholder="Trusted By Global Leaders"
              className="rounded-lg border-gray-300 hover:border-green-500 focus:border-green-500"
            />
          </Form.Item>

          <Divider
            orientation="left"
            className="font-semibold"
            style={{ color: COLORS.primaryDark, borderColor: COLORS.border }}
          >
            Client Logos
          </Divider>

          <Form.List name="clients">
            {(fields, { add, remove }) => (
              <div className="space-y-6">
                {fields.map(({ key, name, ...restField }, index) => (
                  <div
                    key={key}
                    className="border-b pb-4"
                    style={{ borderColor: COLORS.border }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, "logo"]}
                        label={
                          <span
                            className="font-medium"
                            style={{ color: COLORS.textDark }}
                          >
                            Logo URL
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please provide logo URL",
                          },
                        ]}
                      >
                        <div>
                          <Space.Compact className="w-full">
                            <Input
                              placeholder="https://example.com/logo.png"
                              className="rounded-l-lg"
                              style={{ borderColor: COLORS.border }}
                            />
                            <Upload {...uploadProps(index)}>
                              <Button
                                icon={<UploadOutlined />}
                                loading={uploading && uploadingIndex === index}
                                style={{
                                  backgroundColor: COLORS.secondary,
                                  borderColor: COLORS.secondary,
                                  color: "white",
                                }}
                                className="hover:opacity-90 rounded-r-lg"
                              >
                                Upload
                              </Button>
                            </Upload>
                          </Space.Compact>
                          {renderLogoPreview(
                            form.getFieldValue(["clients", index, "logo"])
                          )}
                        </div>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "link"]}
                        label={
                          <span
                            className="font-medium"
                            style={{ color: COLORS.textDark }}
                          >
                            Client Website (optional)
                          </span>
                        }
                      >
                        <Input
                          placeholder="https://client-website.com"
                          className="rounded-lg"
                          style={{ borderColor: COLORS.border }}
                        />
                      </Form.Item>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        style={{ color: COLORS.accent }}
                        className="hover:bg-red-50"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({ logo: "", link: "" })}
                  icon={<PlusOutlined />}
                  block
                  disabled={uploading}
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primaryDark,
                  }}
                  className="hover:border-green-600 hover:text-green-600"
                >
                  Add Client
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Spin>
    </Modal>
  );
};

export default OurClientsModal;
