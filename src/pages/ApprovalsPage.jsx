import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function ApprovalsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const resp = await api.get("/users/pending-organizers");
    setRequests(resp.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await api.put(`/users/${id}/approve-organizer`);
    await load();
  };

  const reject = async (id) => {
    await api.put(`/users/${id}/reject-organizer`);
    await load();
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Organizer Approval Panel</h2>
      <p className="text-muted">Review and approve pending organizer requests.</p>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped shadow-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Requested At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr><td colSpan={5}>No pending requests.</td></tr>
            ) : (
              requests.map(req => (
                <tr key={req.id}>
                  <td>{req.name}</td>
                  <td>{req.email}</td>
                  <td>{req.role}</td>
                  <td>{req.requestedAt ? new Date(req.requestedAt).toLocaleString() : "-"}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => approve(req.id)}>✅ Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => reject(req.id)}>❌ Reject</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}