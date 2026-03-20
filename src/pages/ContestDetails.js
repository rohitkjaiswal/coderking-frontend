import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { API_BASE } from "../config";
import { jwtDecode } from "jwt-decode";
import { 
  Trophy, Calendar, Users, Clock, 
  ChevronRight, Award, Info, Rocket 
} from "lucide-react";

export default function ContestDetail() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = (() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId || null;
    } catch { return null; }
  })();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contestRes, participantsRes] = await Promise.all([
          api.get(`${API_BASE}/contests/${id}`),
          api.get(`${API_BASE}/user/contest/${id}/participants`)
        ]);
        setContest(contestRes.data);
        setParticipants(participantsRes.data);
      } catch (err) {
        console.error("Data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const joinContest = async () => {
    try {
      await api.post(`${API_BASE}/user/contest/${id}/join`, { userId: currentUserId });
      const resp = await api.get(`${API_BASE}/user/contest/${id}/participants`);
      setParticipants(resp.data);
      alert("Success! You have been registered.");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  const isUpcoming = new Date(contest.startsAt) > new Date();

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/contests" className="text-decoration-none">Contests</Link></li>
            <li className="breadcrumb-item active">{contest.title}</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Main Content Column */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className={`badge rounded-pill ${isUpcoming ? 'bg-primary' : 'bg-success'} px-3 py-2`}>
                    {isUpcoming ? 'Upcoming' : 'Live Now'}
                  </span>
                  <span className="text-muted small d-flex align-items-center">
                    <Users size={14} className="me-1" /> {participants.length} Joined
                  </span>
                </div>

                <h1 className="fw-bold text-dark mb-4">{contest.title}</h1>
                
                <h5 className="fw-bold d-flex align-items-center mb-3">
                  <Info size={20} className="me-2 text-primary" /> About Contest
                </h5>
                <p className="text-secondary leading-relaxed mb-5" style={{ whiteSpace: 'pre-line' }}>
                  {contest.description}
                </p>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-3 rounded-3 bg-light border-start border-4 border-warning">
                      <div className="d-flex align-items-center text-warning fw-bold mb-1">
                        <Trophy size={18} className="me-2" /> Prize Pool
                      </div>
                      <span className="text-dark fw-semibold">{contest.rewards || "Exclussive Badges"}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 rounded-3 bg-light border-start border-4 border-primary">
                      <div className="d-flex align-items-center text-primary fw-bold mb-1">
                        <Calendar size={18} className="me-2" /> Schedule
                      </div>
                      <span className="text-dark fw-semibold small">
                        {new Date(contest.startsAt).toLocaleDateString()} at {new Date(contest.startsAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants/Leaderboard Section */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold m-0">Top Participants</h5>
                <Link to={`/contests/${id}/leaderboard`} className="btn btn-link text-decoration-none fw-bold p-0">
                  Full Leaderboard <ChevronRight size={18} />
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 border-0">Rank</th>
                      <th className="border-0">Coder</th>
                      <th className="text-end pe-4 border-0">Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.length > 0 ? (
                      participants.slice(0, 10).map((p, i) => (
                        <tr key={i}>
                          <td className="ps-4">
                            {i < 3 ? (
                              <Award size={22} color={i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : "#CD7F32"} />
                            ) : (
                              <span className="fw-bold text-muted ms-1">#{i + 1}</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold me-3" style={{width: '35px', height: '35px', fontSize: '0.8rem'}}>
                                {p.user.fullName?.charAt(0) || "U"}
                              </div>
                              <span className="fw-semibold">{p.user.fullName || p.user.name}</span>
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <Link to={`/profile/${p.user.id}`} className="btn btn-sm btn-outline-light text-dark border shadow-sm px-3">View</Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-5 text-muted">No participants yet. Be the first!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Quick Actions */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '2rem' }}>
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <div className="text-center mb-4">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                    <Clock size={40} className="text-primary" />
                  </div>
                  <h5 className="fw-bold text-dark">Timeline</h5>
                  <p className="text-muted small">Registration is currently open for this event.</p>
                </div>

                <div className="vstack gap-3 mb-4">
                  <div className="d-flex justify-content-between align-items-center p-2 rounded-3 border">
                    <span className="small text-muted">Duration</span>
                    <span className="fw-bold small">2 Hours</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-2 rounded-3 border">
                    <span className="small text-muted">Format</span>
                    <span className="fw-bold small">Coding Challenges</span>
                  </div>
                </div>

                {isUpcoming ? (
                  <button 
                    className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center"
                    onClick={joinContest}
                  >
                    <Rocket size={18} className="me-2" /> Secure My Spot
                  </button>
                ) : (
                  <button className="btn btn-success w-100 py-3 fw-bold rounded-3 shadow-sm" disabled>
                    Contest is Live
                  </button>
                )}
                <p className="text-center text-muted x-small mt-3 mb-0" style={{ fontSize: '0.75rem' }}>
                  By joining, you agree to the contest rules and fair play policy.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}