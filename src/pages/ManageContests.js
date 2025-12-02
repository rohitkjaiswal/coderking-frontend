import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function ManageContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const resp = await api.get("/contests");
    setContests(resp.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await api.delete(`/contests/${id}`);
    await load();
  };

  const publishResults = async (id) => {
    await api.post(`/contests/${id}/publish-results`);
    await load();
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Manage Contests</h2>
      <p className="text-muted">Edit, delete, or publish results for ongoing contests.</p>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped shadow-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Starts</th>
              <th>Ends</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.length === 0 ? (
              <tr><td colSpan={6}>No contests found.</td></tr>
            ) : (
              contests.map(c => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>
                    <span className={`badge text-bg-${c.status === "LIVE" ? "success" : c.status === "UPCOMING" ? "primary" : "secondary"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>{c.participantCount ?? "-"}</td>
                  <td>{c.startsAt ? new Date(c.startsAt).toLocaleString() : "-"}</td>
                  <td>{c.endsAt ? new Date(c.endsAt).toLocaleString() : "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-danger me-2" onClick={() => remove(c.id)}>Delete</button>
                    <button className="btn btn-sm btn-outline-dark me-2" onClick={() => publishResults(c.id)}>Publish Results</button>
                    {/* You can add Edit navigation here */}
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