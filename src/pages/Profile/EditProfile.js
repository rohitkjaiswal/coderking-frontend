import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { API_BASE } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", bio: "", profileImage: "", skills: [], badges: [] });

  useEffect(() => {
    async function loadProfile() {
      try {
        const resp = await api.get(`${API_BASE}/profile/${id}`);
        setForm(resp.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`${API_BASE}/profile/update`, form);
      navigate(`/profile/${id}`); // redirect back to profile
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="form-control"
          />
        </div>

         <div className="mb-3">
          <label className="form-label">Profile Image URL</label>
          <input
            type="text"
            name="profileImage"
            value={form.profileImage}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Badges (comma separated)</label>
          <input
            type="text"
            name="badges"
            value={form.badges}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}