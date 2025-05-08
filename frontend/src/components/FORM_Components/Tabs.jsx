import React, { useState } from "react";
import FormsHome from "./FormsHome";
import MedicalReportsManagement from "./MedicalReportsManagement";
import WorkerRegistrationManagement from "./WorkerRegistrationManagement";
import ApplyNowManagement from "./ApplyNowManagement";
import AgentRegistrationManagement from "./AgentRegistrationManagement";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("forms-home");

  const renderContent = () => {
    switch (activeTab) {
      case "forms-home":
        return <FormsHome />;
      case "medical-reports":
        return <MedicalReportsManagement />;
      case "worker-registration":
        return <WorkerRegistrationManagement />;
      case "apply-now":
        return <ApplyNowManagement />;
      case "agent-registration":
        return <AgentRegistrationManagement />;
      default:
        return <FormsHome />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Tabs Navigation */}
      <div className="flex border-b">
        <TabButton
          label="Forms Home"
          active={activeTab === "forms-home"}
          onClick={() => setActiveTab("forms-home")}
        />
        <TabButton
          label="Medical Reports"
          active={activeTab === "medical-reports"}
          onClick={() => setActiveTab("medical-reports")}
        />
        <TabButton
          label="Worker Registration"
          active={activeTab === "worker-registration"}
          onClick={() => setActiveTab("worker-registration")}
        />
        <TabButton
          label="Apply Now"
          active={activeTab === "apply-now"}
          onClick={() => setActiveTab("apply-now")}
        />
        <TabButton
          label="Agent Registration"
          active={activeTab === "agent-registration"}
          onClick={() => setActiveTab("agent-registration")}
        />
      </div>

      {/* Tab Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

const TabButton = ({ label, active, onClick }) => (
  <button
    className={`py-2 px-4 focus:outline-none ${
      active
        ? "border-b-2 border-blue-500 text-blue-500"
        : "text-gray-600 hover:text-blue-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Tabs;
