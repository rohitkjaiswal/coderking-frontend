import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">👑 Admin Dashboard</h2>
      <p className="text-muted">
        Manage organizers, contests, users, and view analytics — all from one place.
      </p>

      {/* Organizer Approvals */}
      <div className="card p-4 shadow-sm rounded-3 mb-3">
        <h5>Organizer Approvals</h5>
        <p>Review and approve pending organizer requests.</p>
        <Link to="/admin/approvals" className="btn btn-outline-primary">
          📝 Manage Approvals
        </Link>
      </div>

      {/* Contest Management */}
      <div className="card p-4 shadow-sm rounded-3 mb-3">
        <h5>Contest Management</h5>
        <p>Create new contests or manage existing ones.</p>
        <Link to="/admin/create-contest" className="btn btn-success me-2">
          ➕ Create Contest
        </Link>
        <Link to="/admin/manage-contests" className="btn btn-warning">
          ⚙️ Manage Contests
        </Link>
      </div>

      {/* User Management */}
      <div className="card p-4 shadow-sm rounded-3 mb-3">
        <h5>User Management</h5>
        <p>View all users, assign roles, or remove accounts.</p>
        <Link to="/admin/users" className="btn btn-outline-dark">
          👥 Manage Users
        </Link>
      </div>

      {/* Analytics */}
      <div className="card p-4 shadow-sm rounded-3 mb-3">
        <h5>Analytics</h5>
        <p>Track participation, certificates, and leaderboard stats.</p>
        <Link to="/admin/analytics" className="btn btn-info">
          📊 View Analytics
        </Link>
      </div>

      {/* Organization Info */}
      <div className="card p-4 shadow-sm rounded-3">
        <h5>Organization Info</h5>
        <p>Organization: CoderKing Official</p>
        <p>Status: Verified</p>
        <p>Total Contests Organized: 12</p>
        <p>Certificates Issued: 350+</p>
      </div>
    </div>
  );
}