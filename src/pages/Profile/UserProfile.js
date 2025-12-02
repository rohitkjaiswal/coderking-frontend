import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { API_BASE } from '../../config';
import { useParams, Link } from 'react-router-dom';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams(); // must match route definition

  useEffect(() => {
    async function fetchProfile() {
      if (!id) return;
      try {
        const resp = await api.get(`${API_BASE}/profile/${id}`);
        setProfile(resp.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    }
    fetchProfile();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!profile) return <div className="text-center mt-5">Loading...</div>;

  const skills = Array.isArray(profile.skills)
    ? profile.skills
    : JSON.parse(profile.skills || "[]");

  const badges = Array.isArray(profile.badges)
    ? profile.badges
    : JSON.parse(profile.badges || "[]");

  return (
    <div className="container mt-5">
  <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
    <div className="row g-0">
      {/* Profile Image Section */}
      <div className="col-md-4 bg-light d-flex align-items-center justify-content-center p-3">
        <img
          src={profile.profileImage || '/default-avatar.png'}
          alt="Profile"
          className="img-fluid rounded-circle border border-3 border-white shadow"
          style={{ width: "180px", height: "180px", objectFit: "cover" }}
        />
      </div>

      {/* Profile Details Section */}
      <div className="col-md-8">
        <div className="card-body p-4">
          <h2 className="card-title fw-bold mb-1">{profile.fullName}</h2>
          <p className="text-muted mb-3">{profile.bio || "No bio available"}</p>

          {/* Stats */}
          <div className="d-flex gap-3 mb-4">
            <div className="badge bg-primary fs-6 px-3 py-2 shadow-sm">
              ⭐ XP: {profile.xp}
            </div>
            <div className="badge bg-success fs-6 px-3 py-2 shadow-sm">
              🏆 Contests: {profile.totalContests}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-3">
            <h6 className="fw-semibold">Skills</h6>
            {skills.length ? (
              <div className="d-flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="badge bg-secondary rounded-pill px-3 py-2">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted">No skills added</p>
            )}
          </div>

          {/* Badges */}
          <div className="mb-3">
            <h6 className="fw-semibold">Badges</h6>
            {badges.length ? (
              <div className="d-flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <span key={idx} className="badge bg-warning text-dark rounded-pill px-3 py-2">
                    {badge}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted">No badges earned</p>
            )}
          </div>

          {/* Edit Profile Button */}
          <Link
            to={`/profile/${id}/edit`}
            className="btn btn-gradient mt-4 px-4 py-2 fw-semibold"
            style={{
              background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
              border: "none",
              color: "#333",
              borderRadius: "30px",
              transition: "0.3s ease"
            }}
          >
            ✏️ Edit Profile
          </Link>
          <Link
            to={`/profile/${id}/requests`}
            className="btn btn-gradient mt-4 px-4 py-2 fw-semibold"
            style={{
              background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
              border: "none",
              color: "#333",
              borderRadius: "30px",
              transition: "0.3s ease"
            }}
          >
            ✏️ Edit Requests
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}