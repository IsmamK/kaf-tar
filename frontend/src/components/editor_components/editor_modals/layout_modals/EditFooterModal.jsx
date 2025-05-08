import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Upload,
  message,
  Divider,
  Spin,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

const { Option } = Select;

// Color constants
const COLORS = {
  primary: "#2ecc71", // Vibrant green
  primaryDark: "#27ae60", // Darker green
  secondary: "#f39c12", // Yellow/orange
  textDark: "#2c3e50", // Dark blue/black
  textLight: "#ecf0f1", // Light gray
  backgroundLight: "#ffffff",
  backgroundDark: "#34495e", // Dark slate
  border: "#bdc3c7", // Light gray border
};

// Sample JSON data structure
const sampleFooterData = {
  logo: {
    url: "https://example.com/logo.png",
    alt: "Company Logo",
  },
  socials: [
    {
      icon: "facebook",
      link: "https://facebook.com/company",
      iconImage: "https://example.com/facebook-icon.png",
    },
    {
      icon: "linkedin",
      link: "https://linkedin.com/company",
      iconImage: "https://example.com/linkedin-icon.png",
    },
  ],
  addresses: [
    {
      heading: "Headquarters",
      detail: "123 Business Ave, Suite 100\nNew York, NY 10001",
      email: "info@company.com",
      phoneNumber: "+1 (555) 123-4567",
    },
    {
      heading: "Regional Office",
      detail: "456 Corporate Blvd\nKuala Lumpur, Malaysia",
      email: "asia@company.com",
      phoneNumber: "+60 3-1234 5678",
    },
  ],
  copyText: "© 2023 Company Name. All rights reserved.",
  backgroundImage: "https://example.com/footer-bg.jpg",
};

const FooterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(sampleFooterData);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFooterData = async () => {
      if (isOpen && !initialLoad) {
        try {
          setLoading(true);
          const response = await fetch(`${apiUrl}/layout/footer/`);
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
          } else {
            throw new Error("Failed to fetch footer data");
          }
        } catch (error) {
          console.error("Error fetching footer data:", error);
          message.error("Failed to load footer data. Using sample data.");
          setFormData(sampleFooterData);
        } finally {
          setLoading(false);
          setInitialLoad(true);
        }
      }
    };

    fetchFooterData();
  }, [isOpen, initialLoad, apiUrl]);

  const handleInputChange = (e, field, index = null, subField = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      if (subField) {
        const updatedArray = [...formData[field]];
        updatedArray[index][subField] = value;
        setFormData({ ...formData, [field]: updatedArray });
      } else {
        const updatedArray = [...formData[field]];
        updatedArray[index][name] = value;
        setFormData({ ...formData, [field]: updatedArray });
      }
    } else if (subField) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSocial = () => {
    setFormData({
      ...formData,
      socials: [...formData.socials, { icon: "", link: "", iconImage: "" }],
    });
  };

  const handleRemoveSocial = (index) => {
    const updatedSocials = [...formData.socials];
    updatedSocials.splice(index, 1);
    setFormData({ ...formData, socials: updatedSocials });
  };

  const handleAddAddress = () => {
    setFormData({
      ...formData,
      addresses: [
        ...formData.addresses,
        { heading: "", detail: "", email: "", phoneNumber: "" },
      ],
    });
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses.splice(index, 1);
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const handleImageUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", "footer");

      const response = await fetch(`${apiUrl}/images/`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.image) {
        onSuccess(result.image);
        return result.image;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      onError(error);
      message.error("Image upload failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (info) => {
    if (info.file.status === "done") {
      const imageUrl = info.file.response;
      setFormData({
        ...formData,
        logo: {
          ...formData.logo,
          url: imageUrl,
        },
      });
    }
  };

  const handleBgUpload = async (info) => {
    if (info.file.status === "done") {
      setFormData({
        ...formData,
        backgroundImage: info.file.response,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/layout/footer/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Our Clients Content Added Successfully",
          showConfirmButton: false,
          timer: 3000,
        });
        onClose(true);
      } else {
        throw new Error("Failed to update footer");
      }
    } catch (error) {
      console.error("Error updating footer:", error);
      message.error("Failed to update footer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <span className="font-bold" style={{ color: COLORS.primaryDark }}>
          Edit Footer Content
        </span>
      }
      visible={isOpen}
      onCancel={() => onClose(false)}
      width={800}
      footer={[
        <Button
          key="back"
          onClick={() => onClose(false)}
          style={{ borderColor: COLORS.border }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          style={{
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primaryDark,
          }}
          className="hover:opacity-90"
        >
          Save Changes
        </Button>,
      ]}
      bodyStyle={{ backgroundColor: COLORS.backgroundLight }}
    >
      <Spin spinning={loading}>
        <div className="space-y-6">
          {/* Logo Section */}
          <div className="border-b pb-4" style={{ borderColor: COLORS.border }}>
            <h3 className="font-medium mb-2" style={{ color: COLORS.textDark }}>
              Logo
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Upload
                  customRequest={handleImageUpload}
                  onChange={handleLogoUpload}
                  showUploadList={false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    style={{
                      backgroundColor: COLORS.secondary,
                      borderColor: COLORS.secondary,
                      color: "white",
                    }}
                    className="hover:opacity-90"
                  >
                    Upload Logo
                  </Button>
                </Upload>
                {formData.logo.url && (
                  <div className="mt-2">
                    <img
                      src={formData.logo.url}
                      alt="Current logo"
                      className="h-16 object-contain border rounded"
                      style={{ borderColor: COLORS.border }}
                    />
                  </div>
                )}
              </div>
              <Input
                placeholder="Logo Alt Text"
                value={formData.logo.alt}
                onChange={(e) => handleInputChange(e, "logo", null, "alt")}
                className="rounded-lg"
                style={{ borderColor: COLORS.border }}
              />
            </div>
          </div>

          {/* Background Image */}
          <div className="border-b pb-4" style={{ borderColor: COLORS.border }}>
            <h3 className="font-medium mb-2" style={{ color: COLORS.textDark }}>
              Background Image
            </h3>
            <Upload
              customRequest={handleImageUpload}
              onChange={handleBgUpload}
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                style={{
                  backgroundColor: COLORS.secondary,
                  borderColor: COLORS.secondary,
                  color: "white",
                }}
                className="hover:opacity-90"
              >
                Upload Background
              </Button>
            </Upload>
            {formData.backgroundImage && (
              <div className="mt-2 border rounded overflow-hidden">
                <img
                  src={formData.backgroundImage}
                  alt="Current background"
                  className="h-20 w-full object-cover"
                  style={{ borderColor: COLORS.border }}
                />
              </div>
            )}
          </div>

          {/* Socials Section */}
          <div className="border-b pb-4" style={{ borderColor: COLORS.border }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium" style={{ color: COLORS.textDark }}>
                Social Links
              </h3>
              <Button
                type="dashed"
                onClick={handleAddSocial}
                icon={<PlusOutlined />}
                style={{
                  borderColor: COLORS.primary,
                  color: COLORS.primaryDark,
                }}
                className="hover:border-green-600 hover:text-green-600"
              >
                Add Social
              </Button>
            </div>
            {formData.socials.map((social, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 mb-3">
                <Select
                  placeholder="Select Icon"
                  value={social.icon}
                  onChange={(value) => {
                    const updatedSocials = [...formData.socials];
                    updatedSocials[index].icon = value;
                    setFormData({ ...formData, socials: updatedSocials });
                  }}
                  className="rounded-lg"
                  style={{ borderColor: COLORS.border }}
                >
                  <Option value="facebook">Facebook</Option>
                  <Option value="twitter">Twitter</Option>
                  <Option value="instagram">Instagram</Option>
                  <Option value="linkedin">LinkedIn</Option>
                  <Option value="youtube">YouTube</Option>
                </Select>
                <Input
                  placeholder="Link URL"
                  value={social.link}
                  onChange={(e) =>
                    handleInputChange(e, "socials", index, "link")
                  }
                  className="rounded-lg"
                  style={{ borderColor: COLORS.border }}
                />
                <div className="flex gap-2">
                  <Upload
                    customRequest={handleImageUpload}
                    onChange={(info) => {
                      if (info.file.status === "done") {
                        const updatedSocials = [...formData.socials];
                        updatedSocials[index].iconImage = info.file.response;
                        setFormData({ ...formData, socials: updatedSocials });
                      }
                    }}
                    showUploadList={false}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        backgroundColor: COLORS.secondary,
                        borderColor: COLORS.secondary,
                        color: "white",
                      }}
                      className="hover:opacity-90"
                    >
                      Icon
                    </Button>
                  </Upload>
                  <Button
                    danger
                    onClick={() => handleRemoveSocial(index)}
                    icon={<DeleteOutlined />}
                    className="hover:bg-red-50"
                    style={{ color: COLORS.accent }}
                  >
                    Remove
                  </Button>
                </div>
                {social.iconImage && (
                  <div
                    className="col-span-3 mt-2 border rounded p-1"
                    style={{ borderColor: COLORS.border }}
                  >
                    <img
                      src={social.iconImage}
                      alt="Social icon"
                      className="h-8"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Addresses Section */}
          <div className="border-b pb-4" style={{ borderColor: COLORS.border }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium" style={{ color: COLORS.textDark }}>
                Office Addresses
              </h3>
              <Button
                type="dashed"
                onClick={handleAddAddress}
                icon={<PlusOutlined />}
                style={{
                  borderColor: COLORS.primary,
                  color: COLORS.primaryDark,
                }}
                className="hover:border-green-600 hover:text-green-600"
              >
                Add Address
              </Button>
            </div>
            {formData.addresses.map((address, index) => (
              <div
                key={index}
                className="space-y-2 mb-4 p-4 border rounded-lg"
                style={{
                  borderColor: COLORS.border,
                  backgroundColor: "#f8f9fa",
                }}
              >
                <Input
                  placeholder="Heading (e.g., Malaysia Office)"
                  value={address.heading}
                  onChange={(e) =>
                    handleInputChange(e, "addresses", index, "heading")
                  }
                  className="rounded-lg"
                  style={{ borderColor: COLORS.border }}
                />
                <Input.TextArea
                  placeholder="Address Details"
                  value={address.detail}
                  onChange={(e) =>
                    handleInputChange(e, "addresses", index, "detail")
                  }
                  rows={3}
                  className="rounded-lg"
                  style={{ borderColor: COLORS.border }}
                />
                <Input
                  placeholder="Email"
                  value={address.email}
                  onChange={(e) =>
                    handleInputChange(e, "addresses", index, "email")
                  }
                  className="rounded-lg"
                  style={{ borderColor: COLORS.border }}
                />
                <Input
                  placeholder="Phone Number"
                  value={address.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(e, "addresses", index, "phoneNumber")
                  }
                  className="rounded-lg"
                  style={{ borderColor: COLORS.border }}
                />
                <Button
                  danger
                  onClick={() => handleRemoveAddress(index)}
                  className="mt-2"
                  icon={<DeleteOutlined />}
                  style={{ color: COLORS.accent }}
                >
                  Remove Address
                </Button>
              </div>
            ))}
          </div>

          {/* Copyright Text */}
          <div>
            <h3 className="font-medium mb-2" style={{ color: COLORS.textDark }}>
              Copyright Text
            </h3>
            <Input.TextArea
              value={formData.copyText}
              onChange={(e) => handleInputChange(e, "copyText")}
              rows={3}
              className="rounded-lg"
              style={{ borderColor: COLORS.border }}
            />
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default FooterModal;
