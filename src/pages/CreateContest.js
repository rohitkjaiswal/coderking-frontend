import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function CreateContest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "UPCOMING",
    startsAt: "",
    endsAt: "",
    rewards: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/contests`, form);
      alert("Contest created successfully!");
      navigate("/organizer/manage-contests");
    } catch (err) {
      alert("Error creating contest");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">➕ Create Contest</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm rounded-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter contest title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Describe the contest"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="UPCOMING">Upcoming</option>
            <option value="LIVE">Live</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Starts At</label>
            <input
              type="datetime-local"
              name="startsAt"
              value={form.startsAt}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Ends At</label>
            <input
              type="datetime-local"
              name="endsAt"
              value={form.endsAt}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Rewards</label>
          <input
            type="text"
            name="rewards"
            value={form.rewards}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. Certificates, Cash Prize"
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">
          🚀 Create Contest
        </button>
      </form>
    </div>
  );
}