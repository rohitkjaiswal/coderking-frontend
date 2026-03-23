import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "./ManageContests.css";

export default function ManageContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const resp = await api.get("/contests");
      setContests(resp.data || []);
    } catch (err) {
      console.error("Failed to fetch", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (window.confirm("Are you sure? This action is permanent.")) {
      await api.delete(`/contests/${id}`);
      load();
    }
  };

  const publishResults = async (id) => {
    // Show a loading state or toast here
    await api.post(`/contests/${id}/publish-results`);
    alert("Results published successfully!");
    load();
  };

  return (
    <div className="manage-container mt-4 animate-fade-in">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold section-title mb-1">Manage Contests</h2>
          <p className="text-muted small">Control contest lifecycles and results distribution.</p>
        </div>
        <button className="btn btn-primary-custom" onClick={load}>
          Refresh Data
        </button>
      </header>

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Fetching latest contests...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table custom-table mb-0">
              <thead>
                <tr>
                  <th>Contest Details</th>
                  <th>Status</th>
                  <th>Participants</th>
                  <th>Timeline</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                      No contests found. Start by creating one!
                    </td>
                  </tr>
                ) : (
                  contests.map(c => (
                    <tr key={c.id} className="align-middle">
                      <td>
                        <div className="fw-bold text-secondary">{c.title}</div>
                        {/* <div className="extra-small text-muted">ID: <div id={c.id}></div></div> */}
                      </td>
                      <td>
                        <span className={`status-pill ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <div className="participant-count">
                          <i className="bi bi-people me-1"></i>
                          {c.participantCount ?? "0"}
                        </div>
                      </td>
                      <td className="small">
                        <div className="text-muted">Ends: {c.endsAt ? new Date(c.endsAt).toLocaleDateString() : "-"}</div>
                      </td>
                      <td className="text-end">
                        <button className="action-icon edit me-2" title="Edit">Edit</button>
                        <button className="action-icon publish me-2" onClick={() => publishResults(c.id)}>Publish</button>
                        <button className="action-icon delete" onClick={() => remove(c.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}