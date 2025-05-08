import React, { useEffect, useState } from "react";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [messagesPerPage] = useState(10); // Number of messages per page
  const apiUrl = import.meta.env.VITE_API_URL; // Adjust as needed

  // Fetch all messages from the backend API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${apiUrl}/contact-messages/`);
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data); // Assuming your API returns all the messages
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Calculate total pages
  const totalMessages = messages.length;
  const totalPages = Math.ceil(totalMessages / messagesPerPage);

  // Sort messages so the latest appear first
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
  );

  // Get the current page's messages
  const currentMessages = sortedMessages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg">
        <div className="spinner-border text-primary" role="status"></div> Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Messages</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white text-left">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No messages found.
                </td>
              </tr>
            ) : (
              currentMessages.map((message) => (
                <tr
                  key={message.id}
                  className="hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <td className="px-6 py-4 text-gray-700">{message.name}</td>
                  <td className="px-6 py-4 text-gray-700">{message.email}</td>
                  <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{message.message}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(message.submitted_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="text-gray-700 font-bold">
          Page {currentPage} of {totalPages}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MessagesList;
