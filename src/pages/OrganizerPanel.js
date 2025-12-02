import React from "react";
import { Link } from "react-router-dom";
import PastContests from "./PastContests";

export default function OrganizerPanel() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Organizer Panel</h2>
      <p className="text-muted">Create contests, manage participants, publish results and generate certificates.</p>

      <div className="card p-4 shadow-sm rounded-3 mb-3">
        <h5>Approvals</h5>
        <p>Admin-only: review and approve organizer requests.</p>
        <Link to="/admin/approvals" className="btn btn-outline-primary">📝 Manage Approvals</Link>
      </div>

      <div className="card p-4 shadow-sm rounded-3 mb-3">
        <h5>Contest Management</h5>
        <p>Create new contests or manage existing ones.</p>
        <Link to="/admin/create-contest" className="btn btn-success me-2">➕ Create Contest</Link>
        <Link to="/admin/manage-contests" className="btn btn-warning">⚙️ Manage Contests</Link>
      </div>

      <div className="card p-4 shadow-sm rounded-3">
        <h5>Past Contests</h5>
        <p>View completed contests, winners, and certificates.</p>
        <Link to="/admin/past-contests" className="btn btn-outline-secondary">📜 View Past Contests</Link>
        <PastContests/>
      </div>
    </div>
  );
}