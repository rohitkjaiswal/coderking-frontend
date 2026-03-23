import React, { use, useContext, useEffect, useState } from 'react';
import api from '../../utils/api';
import { API_BASE } from '../../config';
import { useParams, Link } from 'react-router-dom';
import { Edit3, Award, Zap, Code, User, MessageSquare, MapPin } from 'lucide-react';
import useAuthContext from '../../context/AuthContext';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

const {user} =useAuthContext();

  useEffect(() => {
    async function fetchProfile() {
       if (!id) return;
      try {
        const resp = await api.get(`${API_BASE}/profile/${id}`);
        setProfile(resp.data);
      } catch (err) {
        setError("Failed to load profile");
      }
    }
    fetchProfile();
  }, [id]);

  if (error) return <div className="container mt-5 alert alert-danger border-0 shadow-sm">{error}</div>;
  if (!profile) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  const skills = Array.isArray(profile.skills) ? profile.skills : JSON.parse(profile.skills || "[]");
  const badges = Array.isArray(profile.badges) ? profile.badges : JSON.parse(profile.badges || "[]");

  return (
    <div className="pb-5" style={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      {/* Top Decorative Banner */}
      <div style={{ height: '160px', background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)' }}></div>

      <div className="container" style={{ marginTop: '-75px' }}>
        <div className="row g-4">
          
          {/* Left Column: Essential Info */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 text-center p-4 mb-4">
              <div className="position-relative d-inline-block mx-auto mb-3">
                <img
                  src={profile.profileImage || '/default-avatar.png'}
                  alt="Profile"
                  className="rounded-circle border border-4 border-white shadow-sm"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle" style={{ width: '20px', height: '20px' }}></span>
              </div>
              
              <h3 className="fw-bold mb-1 text-dark">{profile.fullName}</h3>
              <p className="text-muted small mb-3">
                <MapPin size={14} className="me-1" /> {profile.location || "Global Citizen"}
              </p>
              {id == user.id && (
                <div className="d-grid gap-2">
                  <Link to={`/profile/${id}/edit`} className="btn btn-primary btn-sm rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center shadow-sm">
                    <Edit3 size={16} className="me-2" /> Edit Profile
                  </Link>
                </div>
              )}

              {id==user.id && (
              <div className="d-grid gap-2">
                <Link to={`/profile/${id}/edit`} className="btn btn-primary btn-sm rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center shadow-sm">
                  <Edit3 size={16} className="me-2" /> Edit Profile
                </Link>
                <Link to={`/profile/${id}/requests`} className="btn btn-outline-secondary btn-sm rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center">
                  <MessageSquare size={16} className="me-2" /> View Requests
                </Link>
              </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h6 className="fw-bold text-uppercase small text-muted mb-4">Performance</h6>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="fw-bold m-0">{profile.xp}</h4>
                  <small className="text-muted">Total Experience (XP)</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="fw-bold m-0">{profile.totalContests}</h4>
                  <small className="text-muted">Contests Joined</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Experience */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center">
                <User size={20} className="me-2 text-primary" /> About Me
              </h5>
              <p className="text-secondary leading-relaxed">
                {profile.bio || "This user hasn't written a bio yet. Stay tuned for more updates on their coding journey!"}
              </p>
            </div>

            <div className="row g-4">
              {/* Skills Section */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                  <h5 className="fw-bold mb-3 d-flex align-items-center">
                    <Code size={20} className="me-2 text-primary" /> Technical Skills
                  </h5>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {skills.length ? skills.map((skill, idx) => (
                      <span key={idx} className="badge bg-light text-dark border px-3 py-2 fw-medium rounded-pill">
                        {skill}
                      </span>
                    )) : <span className="text-muted small">No skills listed</span>}
                  </div>
                </div>
              </div>

              {/* Badges Section */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                  <h5 className="fw-bold mb-3 d-flex align-items-center">
                    <Award size={20} className="me-2 text-warning" /> Achievements
                  </h5>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {badges.length ? badges.map((badge, idx) => (
                      <span key={idx} className="badge bg-warning bg-opacity-10 text-warning-emphasis border border-warning border-opacity-25 px-3 py-2 fw-medium rounded-pill">
                        🏆 {badge}
                      </span>
                    )) : <span className="text-muted small">Earn badges by winning contests</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 bg-white border-start border-4 border-primary">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold m-0">Join a New Contest</h6>
                  <small className="text-muted">Ready to increase your XP and earn new badges?</small>
                </div>
                <Link to="/contests" className="btn btn-primary btn-sm px-4 rounded-pill">Explore</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}