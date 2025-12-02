import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const resp = await api.get("/api/users");
      setUsers(resp.data);
    }
    fetchUsers();
  }, []);

  const updateRole = async (id, newRole) => {
    await api.put(`/api/users/${id}/role`, { role: newRole });
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    alert(`Role updated to ${newRole}`);
  };

  const deleteUser = async (id) => {
    await api.delete(`/api/users/${id}`);
    setUsers(users.filter(u => u.id !== id));
    alert("User deleted!");
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">👥 User Management</h2>
      <p className="text-muted">View all users, assign roles, or remove accounts.</p>

      <table className="table table-striped shadow-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => updateRole(user.id, "ORGANIZER")}
                >
                  Promote to Organizer
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => updateRole(user.id, "USER")}
                >
                  Demote to User
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}