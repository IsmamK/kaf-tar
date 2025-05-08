import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Tabs,
  Select,
  Space,
  Spin,
  Collapse,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPlaneDeparture,
  faFileAlt,
  faUserCheck,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

// Icon options for select
const iconOptions = [
  { value: "user-check", label: "User Check", icon: faUserCheck },
  { value: "file-alt", label: "Document", icon: faFileAlt },
  { value: "check-circle", label: "Checkmark", icon: faCheckCircle },
  { value: "hospital", label: "Medical", icon: faHospital },
  { value: "plane-departure", label: "Travel", icon: faPlaneDeparture },
];

const TimelineModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [expandedPanels, setExpandedPanels] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/home/timeline/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        // Set form values directly with the object structure
        form.setFieldsValue(data);

        // Expand first panel by default if there are processes
        if (data.processes && Object.keys(data.processes).length > 0) {
          setExpandedPanels([Object.keys(data.processes)[0]]);
        }
      } catch (error) {
        message.error("Failed to load timeline data");
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

      const response = await fetch(`${apiUrl}/home/timeline/`, {
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
        title: "TimeLine Content Added Successfully",
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

  const renderProcesses = () => {
    const processes = form.getFieldValue("processes") || {};
    const processKeys = Object.keys(processes);

    return (
      <div className="space-y-4">
        <Collapse
          activeKey={expandedPanels}
          onChange={setExpandedPanels}
          accordion={false}
          className="bg-white"
        >
          {processKeys.map((processKey, index) => (
            <Panel
              key={processKey}
              header={
                <span className="font-medium">
                  {processes[processKey]?.title || `Process ${index + 1}`}
                </span>
              }
              extra={
                <DeleteOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    const newProcesses = { ...processes };
                    delete newProcesses[processKey];
                    form.setFieldsValue({ processes: newProcesses });
                    setExpandedPanels(
                      expandedPanels.filter((key) => key !== processKey)
                    );
                  }}
                  className="text-red-500 hover:text-red-700"
                />
              }
            >
              <div className="grid grid-cols-1 gap-6">
                <Form.Item
                  name={["processes", processKey, "title"]}
                  label="Process Title"
                  rules={[{ required: true, message: "Please enter title" }]}
                >
                  <Input placeholder="Recruitment Process" />
                </Form.Item>

                <Form.Item label="Process Steps">
                  <Form.List name={["processes", processKey, "steps"]}>
                    {(sFields, { add: sAdd, remove: sRemove }) => (
                      <div className="space-y-4">
                        {sFields.map(({ key, name, ...restField }) => (
                          <div key={key} className="border rounded p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Form.Item
                                {...restField}
                                name={[name, "title"]}
                                label="Step Title"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter title",
                                  },
                                ]}
                              >
                                <Input placeholder="Client Requirement" />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, "icon"]}
                                label="Step Icon"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select icon",
                                  },
                                ]}
                              >
                                <Select placeholder="Select icon">
                                  {iconOptions.map((option) => (
                                    <Select.Option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon
                                          icon={option.icon}
                                          className="mr-2"
                                        />
                                        {option.label}
                                      </div>
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>

                            <Form.Item
                              {...restField}
                              name={[name, "description"]}
                              label="Description"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter description",
                                },
                              ]}
                            >
                              <TextArea
                                rows={2}
                                placeholder="We analyze your specific workforce needs and requirements"
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "details"]}
                              label="Additional Details (optional)"
                            >
                              <TextArea
                                rows={2}
                                placeholder="Detailed analysis of job roles, skills required..."
                              />
                            </Form.Item>

                            <div className="flex justify-end">
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => sRemove(name)}
                              >
                                Remove Step
                              </Button>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="dashed"
                          onClick={() =>
                            sAdd({
                              title: "",
                              icon: "user-check",
                              description: "",
                              details: "",
                            })
                          }
                          icon={<PlusOutlined />}
                          block
                        >
                          Add Step
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </div>
            </Panel>
          ))}
        </Collapse>

        <Button
          type="dashed"
          onClick={() => {
            const newProcessKey = `process-${Date.now()}`;
            form.setFieldsValue({
              processes: {
                ...form.getFieldValue("processes"),
                [newProcessKey]: {
                  title: "New Process",
                  steps: [],
                },
              },
            });
            setExpandedPanels([...expandedPanels, newProcessKey]);
          }}
          icon={<PlusOutlined />}
          block
          className="mt-4"
        >
          Add New Process
        </Button>
      </div>
    );
  };

  return (
    <Modal
      title="Manage Timeline Section"
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={saving}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} loading={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>,
      ]}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            {/* Section Settings Tab */}
            <TabPane tab="Section Settings" key="1">
              <div className="grid grid-cols-1 gap-6">
                <Form.Item
                  name="heading"
                  label="Section Heading"
                  rules={[
                    { required: true, message: "Please enter a heading" },
                  ]}
                >
                  <Input placeholder="Our Streamlined Process" />
                </Form.Item>

                <Form.Item
                  name="subtitle"
                  label="Section Subtitle"
                  rules={[
                    { required: true, message: "Please enter a subtitle" },
                  ]}
                >
                  <TextArea
                    rows={3}
                    placeholder="Transparent workflow from initial contact to successful deployment"
                  />
                </Form.Item>
              </div>
            </TabPane>

            {/* Processes Management Tab */}
            <TabPane tab="Manage Processes" key="2">
              <Form.Item noStyle shouldUpdate>
                {renderProcesses}
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Spin>
    </Modal>
  );
};

export default TimelineModal;
