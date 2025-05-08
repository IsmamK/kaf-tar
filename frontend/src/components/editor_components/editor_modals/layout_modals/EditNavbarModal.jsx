import React, { useState } from "react";
import { Modal, Button, Upload, message, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

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
  background: "#ffffff",
  cardBg: "#f8fff8", // Very light green
};

const NavbarModal = ({ isOpen, onClose }) => {
  const [logo, setLogo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", "logo");

      const response = await fetch(`${apiUrl}/images/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setLogo(data.image);
      message.success("Logo uploaded successfully");
    } catch (error) {
      message.error("Logo upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!logo) {
      message.error("Please upload a logo first");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/layout/navbar/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logo }),
      });

      if (!response.ok) throw new Error("Failed to save logo");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Our Clients Content Added Successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
    } catch (error) {
      message.error("Failed to save logo");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title={
        <span
          style={{
            color: colors.primary,
            fontSize: "1.25rem",
            fontWeight: 600,
          }}
        >
          Update Navbar Logo
        </span>
      }
      open={isOpen}
      onCancel={onClose}
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
          disabled={!logo || uploading}
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
          }}
          className={`hover:bg-${colors.primaryHover} hover:border-${colors.primaryHover}`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>,
      ]}
      centered
      bodyStyle={{ background: colors.background }}
    >
      <div className="flex flex-col items-center space-y-6">
        {logo && (
          <div className="text-center">
            <h4 className="mb-2 font-medium" style={{ color: colors.accent }}>
              New Logo Preview
            </h4>
            <div
              className="border rounded-lg p-2"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
            >
              <Image
                src={logo}
                alt="Logo preview"
                className="max-h-32 object-contain mx-auto"
                preview={false}
              />
            </div>
          </div>
        )}

        <Upload
          name="logo"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              message.error("You can only upload image files!");
              return false;
            }

            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              message.error("Image must be smaller than 2MB!");
              return false;
            }

            handleUpload(file);
            return false;
          }}
          disabled={uploading}
          className="w-full"
        >
          <div
            className="flex flex-col items-center justify-center p-4"
            style={{
              border: `2px dashed ${colors.primary}`,
              borderRadius: "8px",
              backgroundColor: uploading ? colors.cardBg : "transparent",
              transition: "all 0.3s ease",
            }}
          >
            <UploadOutlined
              className="text-2xl mb-2"
              style={{ color: uploading ? colors.primary : colors.accent }}
            />
            <p
              className="text-sm font-medium"
              style={{ color: uploading ? colors.primary : colors.accent }}
            >
              {logo ? "Change Logo" : "Upload Logo"}
            </p>
            {uploading && (
              <p className="text-xs mt-1" style={{ color: colors.primary }}>
                Uploading...
              </p>
            )}
          </div>
        </Upload>

        <div className="text-center text-sm" style={{ color: colors.primary }}>
          <p>Recommended size: 200px × 60px</p>
          <p>Formats: PNG, JPG, SVG (max 2MB)</p>
        </div>
      </div>
    </Modal>
  );
};

export default NavbarModal;
