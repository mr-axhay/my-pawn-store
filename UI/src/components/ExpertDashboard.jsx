import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpertDashboard = () => {
  const [requests, setRequests] = useState([]);

  // Fetch evaluation requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/evaluate");
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve
  const handleApprove = async (id) => {
    await axios.put(`http://localhost:3001/api/evaluate/${id}/approve`);
    fetchRequests();
  };

  // Reject
  const handleReject = async (id) => {
    await axios.put(`http://localhost:3001/api/evaluate/${id}/reject`);
    fetchRequests();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
      
      <h1 className="text-3xl font-bold mb-6">Expert Dashboard</h1>

      <div className="grid gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center"
          >
            {/* LEFT */}
            <div>
              <h2 className="text-xl font-semibold">
                Product ID: {req.productId}
              </h2>

              <p className="text-sm mt-2 text-gray-300">
                Requested On: {new Date(req.createdAt).toLocaleString()}
              </p>

              {/* Status */}
              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                  req.status === "pending"
                    ? "bg-yellow-500"
                    : req.status === "approved"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {req.status.toUpperCase()}
              </span>
            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={() => handleApprove(req._id)}
                className="bg-green-500 px-5 py-2 rounded-xl hover:bg-green-600 transition"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(req._id)}
                className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertDashboard;