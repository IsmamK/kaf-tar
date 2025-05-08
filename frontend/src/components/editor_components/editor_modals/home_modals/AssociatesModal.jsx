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

// Color scheme
const colors = {
  primary: "#38a169", // Vibrant green
  primaryHover: "#2f855a", // Darker green
  secondary: "#f6e05e", // Yellow
  secondaryHover: "#ecc94b", // Darker yellow
  accent: "#2d3748", // Dark gray/black
  text: "#2d3748", // Dark gray/black
  lightText: "#f7fafc", // Very light gray/white
  border: "#e2e8f0", // Light gray
  danger: "#e53e3e", // Red
  background: "#f8fff8", // Very light green
};

const AssociatesModal = ({ isOpen, onClose }) => {
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
        const response = await fetch(`${apiUrl}/home/associates/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load associates data");
        console.error(error);
        // Fallback to demo data
        form.setFieldsValue({
          title: "Our Valued Partners",
          associates: [
            {
              logo: "https://via.placeholder.com/150x60?text=Partner+1",
              link: "https://partner1.com",
            },
            {
              logo: "https://via.placeholder.com/150x60?text=Partner+2",
              link: "https://partner2.com",
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
    formData.append("category", "associates");

    try {
      const response = await fetch(`${apiUrl}/images/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();

      const associates = form.getFieldValue("associates") || [];
      associates[index] = { ...associates[index], logo: url };
      form.setFieldsValue({ associates });

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

      const response = await fetch(`${apiUrl}/home/associates/`, {
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
        title: "Associates Content Added Successfully",
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
          style={{ borderColor: colors.border }}
          alt="Logo preview"
        />
      </div>
    );
  };

  return (
    <Modal
      title={
        <span style={{ color: colors.primary, fontSize: "1.25rem" }}>
          Edit Associates Section
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
          style={{
            borderColor: colors.accent,
            color: colors.accent,
          }}
          className="hover:border-gray-700 hover:text-gray-700"
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
            backgroundColor: colors.primary,
            borderColor: colors.primary,
          }}
          className={`hover:bg-${colors.primaryHover} hover:border-${colors.primaryHover}`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>,
      ]}
      destroyOnClose
      bodyStyle={{ background: colors.background }}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label={
              <span style={{ color: colors.accent, fontWeight: "500" }}>
                Section Title
              </span>
            }
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input
              placeholder="Our Valued Associates"
              style={{ borderColor: colors.border }}
            />
          </Form.Item>

          <Divider
            orientation="left"
            style={{
              color: colors.primary,
              borderColor: colors.border,
              fontWeight: "600",
            }}
          >
            Associate Logos
          </Divider>

          <Form.List name="associates">
            {(fields, { add, remove }) => (
              <div className="space-y-6">
                {fields.map(({ key, name, ...restField }, index) => (
                  <div
                    key={key}
                    className="border-b pb-4"
                    style={{ borderColor: colors.border }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, "logo"]}
                        label={
                          <span style={{ color: colors.accent }}>Logo URL</span>
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
                              style={{ borderColor: colors.border }}
                            />
                            <Upload {...uploadProps(index)}>
                              <Button
                                icon={<UploadOutlined />}
                                loading={uploading && uploadingIndex === index}
                                style={{
                                  backgroundColor: colors.secondary,
                                  color: colors.accent,
                                  borderColor: colors.secondary,
                                }}
                                className={`hover:bg-${colors.secondaryHover} hover:border-${colors.secondaryHover}`}
                              >
                                Upload
                              </Button>
                            </Upload>
                          </Space.Compact>
                          {renderLogoPreview(
                            form.getFieldValue(["associates", index, "logo"])
                          )}
                        </div>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "link"]}
                        label={
                          <span style={{ color: colors.accent }}>
                            Associate Website (optional)
                          </span>
                        }
                      >
                        <Input
                          placeholder="https://associate-website.com"
                          style={{ borderColor: colors.border }}
                        />
                      </Form.Item>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        style={{ color: colors.danger }}
                        className="hover:text-red-700"
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
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                  className="hover:border-green-600 hover:text-green-600"
                >
                  Add Associate
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AssociatesModal;
