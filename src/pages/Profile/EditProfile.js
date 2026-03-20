import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { API_BASE } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Camera, Code, Award, AlignLeft, ArrowLeft, Save } from 'lucide-react';

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    fullName: "", 
    bio: "", 
    profileImage: "", 
    skills: "", 
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const resp = await api.get(`${API_BASE}/profile/${id}`);
        const data = resp.data;
        // Convert arrays to comma-separated strings for the input fields
        setForm({
          ...data,
          skills: Array.isArray(data.skills) ? data.skills.join(', ') : data.skills,
          badges: Array.isArray(data.badges) ? data.badges.join(', ') : data.badges,
        });
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
    setLoading(true);
    
    // Convert strings back to arrays before sending to API
    const payload = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(s => s !== "")    };

    try {
      await api.put(`${API_BASE}/profile/update`, payload);
      navigate(`/profile/${id}`);
    } catch (err) {
      console.error("Update failed", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        {/* Header Action Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-link text-decoration-none text-muted p-0 d-flex align-items-center"
          >
            <ArrowLeft size={18} className="me-2" /> Back to Profile
          </button>
          <h4 className="fw-bold m-0">Account Settings</h4>
        </div>

        <div className="row g-4">
          {/* Left Side: Navigation Links (Modern UX) */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action active border-0 py-3">
                  <User size={18} className="me-3" /> Public Profile
                </button>
                <button className="list-group-item list-group-item-action border-0 py-3 text-muted">
                  <Award size={18} className="me-3" /> My Achievements
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="col-lg-9">
            <form onSubmit={handleSubmit} className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              
              {/* Profile Picture Section */}
              <div className="text-center mb-5 pb-4 border-bottom">
                <div className="position-relative d-inline-block">
                  <img
                    src={form.profileImage || '/default-avatar.png'}
                    alt="Preview"
                    className="rounded-circle border border-4 border-white shadow-sm mb-3"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle shadow-sm">
                    <Camera size={16} />
                  </div>
                </div>
                <div className="mt-2 mx-auto" style={{ maxWidth: '400px' }}>
                  <input
                    type="text"
                    name="profileImage"
                    value={form.profileImage}
                    onChange={handleChange}
                    className="form-control form-control-sm text-center bg-light border-0"
                    placeholder="Paste image URL here..."
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted"><User size={18}/></span>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="form-control border-start-0 ps-0 shadow-none"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted">Bio</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted align-items-start pt-2"><AlignLeft size={18}/></span>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      className="form-control border-start-0 ps-0 shadow-none"
                      rows="4"
                      placeholder="Tell the world about yourself..."
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted">Skills</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted"><Code size={18}/></span>
                    <input
                      type="text"
                      name="skills"
                      value={form.skills}
                      onChange={handleChange}
                      className="form-control border-start-0 ps-0 shadow-none"
                      placeholder="React, Node, Python..."
                    />
                  </div>
                  <small className="text-muted mt-1 d-block">Separate skills with commas</small>
                </div>

               
              </div>

              <div className="pt-4 border-top mt-2 d-flex justify-content-end">
                <button 
                  type="button" 
                  onClick={() => navigate(-1)} 
                  className="btn btn-light px-4 me-2 fw-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary px-5 fw-bold shadow-sm d-flex align-items-center"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : (
                    <Save size={18} className="me-2" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}