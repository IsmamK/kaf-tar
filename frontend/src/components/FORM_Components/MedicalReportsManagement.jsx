import { useState, useEffect } from "react";
import axios from "axios";

const MedicalReportsManagement = () => {
  const [passportNumber, setPassportNumber] = useState("");
  const [medicalReport, setMedicalReport] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch reports
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/medical-reports/`);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setMessage("Failed to fetch reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    setMedicalReport(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passportNumber || !medicalReport) {
      setMessage("Please provide a passport number and upload a medical report.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("passport_number", passportNumber);
    formData.append("medical_report", medicalReport);

    try {
      // Check if a report exists for the given passport number
      await axios.get(`${apiUrl}/medical-reports/${passportNumber}/`);
      // If found, update the report
      await axios.put(`${apiUrl}/medical-reports/${passportNumber}/`, formData);
      setMessage("Medical report updated successfully.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If not found, create a new report
        try {
          await axios.post(`${apiUrl}/medical-reports/`, formData);
          setMessage("Medical report uploaded successfully.");
        } catch (createError) {
          setMessage("Error uploading the report. Please try again.");
        }
      } else {
        setMessage("Error updating the report. Please try again.");
      }
    } finally {
      setPassportNumber("");
      setMedicalReport(null);
      setLoading(false);
      fetchReports(); // Refresh the reports
    }
  };

  // Handle report selection
  const handleSelectReport = (id) => {
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((reportId) => reportId !== id) : [...prev, id]
    );
  };

  // Handle deleting reports
  const handleDeleteReports = async (idsToDelete = selectedReports) => {
    if (idsToDelete.length === 0) {
      setMessage("No reports selected for deletion.");
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        idsToDelete.map((id) => axios.delete(`${apiUrl}/medical-reports/${id}/`))
      );
      setMessage("Selected reports deleted successfully.");
      setSelectedReports([]);
      fetchReports(); // Refresh reports
    } catch (error) {
      setMessage("Error deleting reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Medical Reports Management</h2>

      {/* Feedback Message */}
      {message && <p className="text-green-500 mb-4 font-bold">{message}</p>}

      {/* Upload Section */}
      <div className="p-6 bg-green-50 border rounded-md shadow-md mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="passportNumber" className="block text-lg font-semibold mb-2">
              Passport Number:
            </label>
            <input
              type="text"
              id="passportNumber"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              className="p-2 border rounded-md w-full"
              placeholder="Enter passport number"
            />
          </div>
          <div>
            <label htmlFor="medicalReport" className="block text-lg font-semibold mb-2">
              Upload Medical Report:
            </label>
            <input
              type="file"
              id="medicalReport"
              onChange={handleFileChange}
              className="p-2 border rounded-md w-full"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-green-500 text-white rounded-md ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Report"}
          </button>
        </form>
      </div>

      {/* Reports Table */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Existing Reports</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Select</th>
                <th className="border px-4 py-2">Passport Number</th>
                <th className="border px-4 py-2">Report</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.passport_number}>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.passport_number)}
                      onChange={() => handleSelectReport(report.passport_number)}
                    />
                  </td>
                  <td className="border px-4 py-2">{report.passport_number}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={report.medical_report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Report
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDeleteReports([report.passport_number])}
                      className="bg-red-500 text-white px-2 py-1 rounded"
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

      {/* Delete Multiple */}
      <button
        onClick={() => handleDeleteReports()}
        disabled={selectedReports.length === 0}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Delete Selected
      </button>
    </div>
  );
};

export default MedicalReportsManagement;
