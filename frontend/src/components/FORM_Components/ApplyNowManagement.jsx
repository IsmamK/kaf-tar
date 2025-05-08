import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { Button } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const ApplyNowManagement = () => {
  const [formResponses, setFormResponses] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL; // API Base URL
  const [formFields, setFormFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingResponse, setDeletingResponse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [newField, setNewField] = useState({
    name: "",
    field_type: "text",
    required: false,
    options: [],
    priority: 0,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);

  
  // Fetch fields from the API
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${apiUrl}/form-fields/4/`);
        const sortedFields = response.data.sort((a, b) => a.priority - b.priority);
        setFormFields(sortedFields);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching form fields:", error);
        setErrorMessage("Failed to fetch form fields. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchFields();
  }, [apiUrl]);

  // Handle adding a new field
  const handleAddField = async () => {
    if (!newField.name) {
      alert("Field name is required.");
      return;
    }

    if (["select", "radio", "checkbox"].includes(newField.field_type) && newField.options.length === 0) {
      alert("Please provide at least one option for select/radio/checkbox fields.");
      return;
    }

    try {
      const payload = {
        ...newField,
        form: 4, // Updated form_id
      };

      const response = await axios.post(`${apiUrl}/form-fields/4/`, payload);
      setFormFields([...formFields, response.data]);
      setNewField({ name: "", field_type: "text", required: false, options: [], priority: 0 });
      alert("Field added successfully!");
    } catch (error) {
      console.error("Error adding field:", error.response?.data || error);
      alert("Failed to add the field. Please try again.");
    }
  };

  
  // Handle editing an existing field
  const handleEditField = (field) => {
    setEditingField(field);
    setEditModalOpen(true);
  };

    const handleDeleteResponse = (responseId) => {
      setDeletingResponse(responseId);
      setIsDeleteModalOpen(true);
    };
  
    const handleConfirmDelete = async () => {
      try {
        await axios.delete(`${apiUrl}/form_responses/${deletingResponse}/`);
        setFormResponses(formResponses.filter((response) => response.id !== deletingResponse));
        setIsDeleteModalOpen(false);
        alert("Form response deleted successfully!");
      } catch (error) {
        console.error("Error deleting form response:", error);
        alert("Failed to delete the form response. Please try again.");
      }
    };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.patch(`${apiUrl}/form-fields/4/${editingField.id}/`, editingField);
      setFormFields(formFields.map((field) => (field.id === editingField.id ? response.data : field)));
      setEditModalOpen(false);
      alert("Field updated successfully!");
    } catch (error) {
      console.error("Error updating field:", error);
      alert("Failed to update the field. Please try again.");
    }
  };

  // Handle deleting a field
  const handleDeleteField = async (fieldId) => {
    try {
      await axios.delete(`${apiUrl}/form-fields/4/${fieldId}/`);
      setFormFields(formFields.filter((field) => field.id !== fieldId));
      alert("Field deleted successfully!");
    } catch (error) {
      console.error("Error deleting field:", error);
      alert("Failed to delete the field. Please try again.");
    }
  };

  // Handle moving a field up or down
  const handleMoveField = async (fieldId, direction) => {
    const fieldIndex = formFields.findIndex((field) => field.id === fieldId);
  
    // Check if the field can be moved further
    if (
      (direction === "up" && fieldIndex === 0) ||
      (direction === "down" && fieldIndex === formFields.length - 1)
    ) {
      return; // Cannot move further
    }
  
    // Calculate the new index based on the direction
    const newIndex = direction === "up" ? fieldIndex - 1 : fieldIndex + 1;
  
    // Create a copy of the form fields
    const updatedFields = [...formFields];
  
    // Swap the fields in the array
    [updatedFields[fieldIndex], updatedFields[newIndex]] = [
      updatedFields[newIndex],
      updatedFields[fieldIndex],
    ];
  
    // Update priorities to reflect the new order
    updatedFields.forEach((field, index) => {
      field.priority = index; // Assign sequential priorities
    });
  
    try {
      // Update the backend with the new priorities
      await Promise.all(
        updatedFields.map((field) =>
          axios.patch(`${apiUrl}/form-fields/4/${field.id}/`, {
            priority: field.priority,
          })
        )
      );
  
      // Update the state with the new order
      setFormFields(updatedFields);
    } catch (error) {
      console.error("Error updating priority:", error);
      alert("Failed to update priority. Please try again.");
    }
  };
  // Fetch form responses
  useEffect(() => {
    const fetchFormResponses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/form_responses/?form_id=4`);
        const sortedResponses = (response.data || []).sort(
          (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
        );
        setFormResponses(sortedResponses);
      } catch (error) {
        console.error("Error fetching form responses:", error);
        setErrorMessage("Failed to fetch form responses. Please try again later.");
      }
    };

    fetchFormResponses();
  }, [apiUrl]);

  // Prepare CSV data
  const csvData = formResponses.map((response) => {
    const row = { "Submitted At": new Date(response.submitted_at).toLocaleString() };
    formFields.forEach((field) => {
      const fieldResponse = response.field_responses.find((fr) => fr.form_field.id === field.id);
      row[field.name] = fieldResponse
        ? field.field_type === "image"
          ? fieldResponse.file
          : fieldResponse.value || "N/A"
        : "N/A";
    });
    return row;
  });

  // Job Management Logic (Reused from your existing implementation)
  const [jobs, setJobs] = useState([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    city: "",
    country: "",
    industry: "",
    requirements: "",
    poster: null,
  });
  const [editingJobId, setEditingJobId] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${apiUrl}/jobs/`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setErrorMessage("Failed to fetch jobs. Please try again later.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(jobForm).forEach((key) => {
      if (key === "poster" && jobForm.poster && typeof jobForm.poster !== "string") {
        formData.append(key, jobForm.poster);
      } else if (key !== "poster") {
        formData.append(key, jobForm[key]);
      }
    });

    try {
      if (editingJobId) {
        await axios.patch(`${apiUrl}/jobs/${editingJobId}/`, formData);
      } else {
        await axios.post(`${apiUrl}/jobs/`, formData);
      }
      fetchJobs();
      setIsJobModalOpen(false);
      setEditingJobId(null);
      setJobForm({
        title: "",
        city: "",
        country: "",
        industry: "",
        requirements: "",
        poster: null,
      });
      alert(editingJobId ? "Job updated successfully!" : "Job created successfully!");
    } catch (error) {
      console.error("Error submitting job form:", error);
      alert("Failed to save the job. Please try again.");
    }
  };

  const handleEditJob = (job) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title,
      city: job.city,
      country: job.country,
      industry: job.industry,
      requirements: job.requirements,
      poster: job.poster,
    });
    setIsJobModalOpen(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`${apiUrl}/jobs/${jobId}/`);
        fetchJobs();
        alert("Job deleted successfully!");
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Apply Now Management</h1>
      {isLoading ? (
        <p>Loading form fields...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">Edit Form</h2>
          {/* Display Existing Fields */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Form Fields</h2>
            {formFields.length === 0 ? (
              <p>No fields available.</p>
            ) : (
              <ul>
                {formFields.map((field, index) => (
                  <li key={field.id} className="flex justify-between items-center mb-4 border-b pb-2">
                    <div>
                      <p className="font-bold">{field.name}</p>
                      <p className="text-sm text-gray-500">
                        Type: {field.field_type} | Priority: {field.priority} | Required: {field.required ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        icon={<ArrowUpOutlined />}
                        className="bg-gray-200 text-gray-700 py-1 px-2 rounded-md hover:bg-gray-300"
                        onClick={() => handleMoveField(field.id, "up")}
                        disabled={index === 0}
                      />
                      <Button
                        icon={<ArrowDownOutlined />}
                        className="bg-gray-200 text-gray-700 py-1 px-2 rounded-md hover:bg-gray-300"
                        onClick={() => handleMoveField(field.id, "down")}
                        disabled={index === formFields.length - 1}
                      />
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                        onClick={() => handleEditField(field)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                        onClick={() => handleDeleteField(field.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add New Field */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Add New Field</h2>
            {/* Form for adding a new field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Field Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-500"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Field Type</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-500"
                value={newField.field_type}
                onChange={(e) => setNewField({ ...newField, field_type: e.target.value })}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                {/* <option value="phone">Phone</option> */}
                <option value="image">Image</option>
                <option value="textarea">TextArea</option>
                <option value="select">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio (Choose one)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-500"
                value={newField.priority}
                onChange={(e) => setNewField({ ...newField, priority: parseInt(e.target.value) })}
              />
            </div>
            {["select", "radio", "checkbox"].includes(newField.field_type) && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                {newField.options.map((option, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...newField.options];
                        updatedOptions[index] = e.target.value;
                        setNewField({ ...newField, options: updatedOptions });
                      }}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                    <button
                      className="ml-2 bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600"
                      onClick={() => {
                        const updatedOptions = newField.options.filter((_, i) => i !== index);
                        setNewField({ ...newField, options: updatedOptions });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                  onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
                >
                  Add Option
                </button>
              </div>
            )}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                />
                <span className="ml-2">Required</span>
              </label>
            </div>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              onClick={handleAddField}
            >
              Add Field
            </button>
          </div>

          {/* Display Form Responses */}
          <h2 className="text-3xl font-bold my-4">Form Responses</h2>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            {formResponses.length === 0 ? (
              <p>No form responses available.</p>
            ) : (
              <>
                <CSVLink data={csvData} filename="form_responses.csv" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 inline-block">
                  Export to CSV
                </CSVLink>
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b">Submitted At</th>
                      {formFields.map((field) => (
                        <th key={field.id} className="py-2 px-4 border-b">
                          {field.name}
                        </th>
                      ))}
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formResponses.map((response) => (
                      <tr key={response.id}>
                        <td className="py-2 px-4 border-b">
                          {new Date(response.submitted_at).toLocaleString()}
                        </td>
                        {formFields.map((field) => {
                          const fieldResponse = response.field_responses.find((fr) => fr.form_field.id === field.id);
                          return (
                            <td key={field.id} className="py-2 px-4 border-b">
                              {fieldResponse ? (
                                field.field_type === "image" ? (
                                  <>
                                    <img
                                      src={fieldResponse.file}
                                      className="w-12 h-12 object-cover rounded-full mb-2"
                                    />
                                    <a
                                      href={fieldResponse.file}
                                      download
                                      className="text-blue-500 hover:underline"
                                    >
                                      Download
                                    </a>
                                  </>
                                ) : fieldResponse.value || "N/A"
                              ) : (
                                "N/A"
                              )}
                            </td>
                          );
                        })}
                        <td className="py-2 px-4 border-b">
                          <button
                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteResponse(response.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      )}

      {/* Job Management Section */}
      <div className="my-4">
        <h2 className="text-3xl font-bold mb-4">Job Management</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
          onClick={() => setIsJobModalOpen(true)}
        >
          Add New Job
        </button>

        <div className="bg-white shadow-md rounded-lg p-6">
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">City</th>
                  <th className="py-2 px-4 border-b">Country</th>
                  <th className="py-2 px-4 border-b">Industry</th>
                  <th className="py-2 px-4 border-b">Poster</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="py-2 px-4 border-b">{job.title}</td>
                    <td className="py-2 px-4 border-b">{job.city}</td>
                    <td className="py-2 px-4 border-b">{job.country}</td>
                    <td className="py-2 px-4 border-b">{job.industry}</td>
                    <td className="py-2 px-4 border-b">
                      <img src={job.poster} className="h-40" />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                        onClick={() => handleEditJob(job)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Job Modal */}
      {isJobModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto p-4">
    <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{editingJobId ? "Edit Job" : "Add Job"}</h2>
      <form onSubmit={handleJobSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={jobForm.title || ""}
            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={jobForm.city || ""}
            onChange={(e) => setJobForm({ ...jobForm, city: e.target.value })}
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={jobForm.country  || ""}
            onChange={(e) => setJobForm({ ...jobForm, country: e.target.value })}
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={jobForm.industry || ""}
            onChange={(e) => setJobForm({ ...jobForm, industry: e.target.value })}
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            value={jobForm.requirements || ""}
            onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
            // required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Poster</label>
          {editingJobId && jobForm.poster && typeof jobForm.poster === "string" && (
            <div className="mb-2">
              <img
                src={jobForm.poster || ""}
                alt="Current Poster"
                className="h-60 rounded-md object-cover w-full"
              />
              <p className="text-sm text-gray-500">Current poster</p>
            </div>
          )}
          <input
            type="file"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) =>
              setJobForm({ ...jobForm, poster: e.target.files[0] })
            }
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600 mr-2"
            onClick={() => {
              setIsJobModalOpen(false);
              setEditingJobId(null);
              setJobForm({
                title: "",
                city: "",
                country: "",
                industry: "",
                requirements: "",
                poster: null,
              });
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Field</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Field Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={editingField.name}
                onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Field Type</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={editingField.field_type}
                onChange={(e) => setEditingField({ ...editingField, field_type: e.target.value })}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                {/* <option value="phone">Phone</option> */}
                <option value="image">Image</option>
                <option value="textarea">TextArea</option>
                <option value="select">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio (Single Choice)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={editingField.priority}
                onChange={(e) => setEditingField({ ...editingField, priority: parseInt(e.target.value) })}
              />
            </div>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-4"
              onClick={handleSaveEdit}
            >
              Save Changes
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

{isDeleteModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to delete this form response?</p>
      <div className="flex justify-end">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mr-4"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={handleConfirmDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ApplyNowManagement;