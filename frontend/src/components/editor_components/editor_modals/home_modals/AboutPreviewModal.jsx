import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, message, Upload, Spin, Card } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { SketchPicker } from "react-color";
import Swal from "sweetalert2";

const { TextArea } = Input;

const AboutPreviewModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [buttonColor, setButtonColor] = useState("#2ecc71");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isOpen && !initialized) {
      fetchAboutData();
      setInitialized(true);
    }
  }, [isOpen, initialized]);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/home/about-preview/`);

      if (!response.ok) {
        // If no data exists, initialize with default values
        if (response.status === 404) {
          initializeWithDefaults();
          return;
        }
        throw new Error("Failed to fetch about data");
      }

      const data = await response.json();

      // Check if data exists and has the expected structure
      if (data) {
        form.setFieldsValue({
          title: data.title || "",
          summary: data.summary || "",
          mission: data.mission || "",
          buttonText: data.button?.text || "Learn More",
          buttonLink: data.button?.link || "/about",
          image: data.image || "",
        });

        setButtonColor(data.button?.color || "#2ecc71");
        setImageUrl(data.image || "");
      } else {
        initializeWithDefaults();
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
      message.error("Failed to load about section data. Using default values.");
      initializeWithDefaults();
    } finally {
      setLoading(false);
    }
  };

  const initializeWithDefaults = () => {
    form.setFieldsValue({
      title: "Who We Are",
      summary:
        "Founded in 2005, Stech Builders has been delivering exceptional construction services for over 15 years.",
      mission: "Building sustainable futures through innovative construction",
      buttonText: "Learn More",
      buttonLink: "/about",
      image: "",
    });
    setButtonColor("#2ecc71");
    setImageUrl("");
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "about_images");

    try {
      setImageLoading(true);

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/images/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const newImageUrl = `${data.image}`;

      form.setFieldsValue({ image: newImageUrl });
      setImageUrl(newImageUrl);
      return newImageUrl;
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Image upload failed");
      return null;
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = () => {
    form.setFieldsValue({ image: "" });
    setImageUrl("");
  };

  const uploadProps = {
    name: "image",
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        onSuccess(imageUrl, file);
      } else {
        onError(new Error("Upload failed"));
      }
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return Upload.LIST_IGNORE;
      }
      return isImage && isLt5M;
    },
  };

  const handleColorChange = (color) => {
    setButtonColor(color.hex);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = {
        title: values.title,
        summary: values.summary,
        mission: values.mission,
        button: {
          text: values.buttonText,
          link: values.buttonLink,
          color: buttonColor,
        },
        image: values.image,
      };

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/home/about-preview/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      console.log(response);

      //   if (!response.ok) {
      //     // If PATCH fails, try PUT as fallback
      //     const putResponse = await fetch(`${apiUrl}/home/about-preview/`, {
      //       method: 'PUT',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(updatedData),
      //     });

      //     if (!putResponse.ok) {
      //       throw new Error('Failed to save about data');
      //     }
      //   }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "About Previews Content Added Successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
    } catch (error) {
      console.error("Error saving about data:", error);
      message.error("Failed to update about section");
    }
  };

  return (
    <Modal
      title={
        <span className="text-xl font-bold text-gray-800">
          Edit About Section
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="back"
          onClick={onClose}
          className="px-6 h-10 rounded-lg border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{ backgroundColor: buttonColor, borderColor: buttonColor }}
          className="px-6 h-10 rounded-lg hover:opacity-90"
        >
          Save Changes
        </Button>,
      ]}
      width={800}
      className="rounded-lg overflow-hidden"
      styles={{ body: { padding: "24px" } }}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" className="space-y-6">
          <Card
            title="Content"
            bordered={false}
            className="rounded-lg shadow-sm border-0"
            headStyle={{
              background: "linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)",
              borderBottom: "1px solid #e8e8e8",
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <Form.Item
                name="title"
                label={
                  <span className="font-medium text-gray-700">
                    Title/Heading
                  </span>
                }
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input
                  size="large"
                  placeholder="e.g., Who We Are"
                  className="rounded-lg hover:border-green-400 focus:border-green-400"
                />
              </Form.Item>

              <Form.Item
                name="summary"
                label={
                  <span className="font-medium text-gray-700">
                    Short Paragraph
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter the summary" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="e.g., Founded in 2005, Stech Builders has been delivering exceptional construction services for over 15 years. We specialize in both residential and commercial projects, with a focus on quality craftsmanship and sustainable building practices."
                  className="rounded-lg hover:border-green-400 focus:border-green-400"
                />
              </Form.Item>

              <Form.Item
                name="mission"
                label={
                  <span className="font-medium text-gray-700">
                    Mission/Tagline
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter the mission statement",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="e.g., Building sustainable futures through innovative construction"
                  className="rounded-lg hover:border-green-400 focus:border-green-400"
                />
              </Form.Item>
            </div>
          </Card>

          <Card
            title="Call to Action"
            bordered={false}
            className="rounded-lg shadow-sm border-0"
            headStyle={{
              background: "linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)",
              borderBottom: "1px solid #e8e8e8",
            }}
          >
            <div className="space-y-4">
              <Form.Item
                name="buttonText"
                label={
                  <span className="font-medium text-gray-700">Button Text</span>
                }
                rules={[
                  { required: true, message: "Please enter button text" },
                ]}
              >
                <Input
                  placeholder="e.g., Learn More"
                  className="rounded-lg hover:border-green-400 focus:border-green-400"
                />
              </Form.Item>
              <Form.Item
                name="buttonLink"
                label={
                  <span className="font-medium text-gray-700">Button Link</span>
                }
                rules={[
                  { required: true, message: "Please enter button link" },
                ]}
              >
                <Input
                  placeholder="e.g., /about"
                  className="rounded-lg hover:border-green-400 focus:border-green-400"
                />
              </Form.Item>
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Button Color:</span>
                <div
                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-300 hover:border-green-500 transition-all"
                  style={{ backgroundColor: buttonColor }}
                  onClick={() => setColorPickerVisible(true)}
                />
                {colorPickerVisible && (
                  <div className="absolute z-10">
                    <div className="p-2 bg-white rounded-lg shadow-xl">
                      <SketchPicker
                        color={buttonColor}
                        onChangeComplete={handleColorChange}
                      />
                      <Button
                        size="small"
                        onClick={() => setColorPickerVisible(false)}
                        className="mt-2 w-full rounded-lg"
                        style={{
                          backgroundColor: buttonColor,
                          color: "#ffffff",
                          borderColor: buttonColor,
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card
            title="Visual Element"
            bordered={false}
            className="rounded-lg shadow-sm border-0"
            headStyle={{
              background: "linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)",
              borderBottom: "1px solid #e8e8e8",
            }}
          >
            <Form.Item
              name="image"
              label={
                <span className="font-medium text-gray-700">
                  About Section Image
                </span>
              }
            >
              <div className="flex flex-col gap-4">
                <Upload {...uploadProps}>
                  <Button
                    icon={<UploadOutlined />}
                    loading={imageLoading}
                    className="h-10 rounded-lg"
                    style={{
                      backgroundColor: buttonColor,
                      color: "#ffffff",
                      borderColor: buttonColor,
                    }}
                  >
                    Upload Image
                  </Button>
                </Upload>
                {imageUrl && (
                  <div className="relative group">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundColor: "#ff4d4f",
                        color: "white",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </Form.Item>
          </Card>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AboutPreviewModal;
