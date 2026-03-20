import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { API_BASE } from "../config";
import { Search, Calendar, Clock, Trophy, Filter, PlayCircle } from "lucide-react";

export default function Contests() {
  const [contests, setContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL"); // ALL, LIVE, UPCOMING, COMPLETED

  useEffect(() => {
    async function fetchContests() {
      try {
        const resp = await api.get(`${API_BASE}/contests`);
        setContests(resp.data);
      } catch (err) {
        console.error("Failed to fetch contests", err);
      }
    }
    fetchContests();
  }, []);

  const getStatus = (start, end) => {
    const now = new Date();
    if (new Date(end) < now) return "COMPLETED";
    if (new Date(start) <= now && new Date(end) >= now) return "LIVE";
    return "UPCOMING";
  };

  const filteredContests = contests
    .filter((c) => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((c) => {
      const status = getStatus(c.startsAt, c.endsAt);
      return activeTab === "ALL" || status === activeTab;
    });

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h1 className="fw-bold text-dark mb-2">Arena Contests</h1>
            <p className="text-muted">Compete with the best, solve challenges, and win rewards.</p>
          </div>
          
          {/* Search & Filter Bar */}
          <div className="col-lg-6">
            <div className="input-group shadow-sm rounded-3 overflow-hidden border-0">
              <span className="input-group-text bg-white border-0 ps-3">
                <Search size={18} className="text-muted" />
              </span>
              <input
                type="text"
                placeholder="Search for a contest..."
                className="form-control border-0 py-3 shadow-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
          {["ALL", "LIVE", "UPCOMING", "COMPLETED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn px-4 py-2 rounded-pill fw-semibold transition-all ${
                activeTab === tab 
                ? "btn-primary shadow-sm" 
                : "btn-white text-muted border border-light"
              }`}
              style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Contest Grid */}
        <div className="row g-4">
          {filteredContests.length > 0 ? (
            filteredContests.map((contest) => {
              const status = getStatus(contest.startsAt, contest.endsAt);
              const isLive = status === "LIVE";

              return (
                <div key={contest.id} className="col-md-6 col-xl-4">
                  <div className="card h-100 border-0 shadow-sm hover-shadow rounded-4 transition-all">
                    <div className="card-body p-4">
                      {/* Status & Reward Header */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className={`badge d-flex align-items-center gap-1 px-3 py-2 rounded-pill ${
                          isLive ? "bg-success bg-opacity-10 text-success" : 
                          status === "COMPLETED" ? "bg-secondary bg-opacity-10 text-secondary" : 
                          "bg-primary bg-opacity-10 text-primary"
                        }`}>
                          {isLive && <span className="spinner-grow spinner-grow-sm me-1" role="status" style={{width: '8px', height: '8px'}}></span>}
                          {status}
                        </span>
                        <div className="text-warning d-flex align-items-center small fw-bold">
                          <Trophy size={14} className="me-1" /> {contest.rewards || "Certificate"}
                        </div>
                      </div>

                      <h5 className="card-title fw-bold text-dark mb-3 line-clamp-1">
                        {contest.title}
                      </h5>

                      <div className="vstack gap-2 mb-4">
                        <div className="d-flex align-items-center text-muted small">
                          <Calendar size={14} className="me-2" />
                          <span>Starts: {new Date(contest.startsAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="d-flex align-items-center text-muted small">
                          <Clock size={14} className="me-2" />
                          <span>{new Date(contest.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        to={`/contests/${contest.id}`}
                        className={`btn w-100 py-2 fw-bold rounded-3 transition-all ${
                          isLive ? "btn-primary" : "btn-outline-secondary"
                        }`}
                      >
                        {isLive ? (
                          <span className="d-flex align-items-center justify-content-center">
                            <PlayCircle size={18} className="me-2" /> Join Now
                          </span>
                        ) : "View Details"}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <div className="text-muted opacity-50 mb-3">
                <Filter size={48} />
              </div>
              <h5>No contests match your criteria</h5>
              <button onClick={() => {setSearchTerm(""); setActiveTab("ALL")}} className="btn btn-link text-decoration-none p-0">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}