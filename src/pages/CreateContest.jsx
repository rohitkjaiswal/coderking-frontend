import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Trophy, AlignLeft, Type, Clock, Rocket, ArrowLeft } from "lucide-react";
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
      // Using a more professional toast/notification would be better than alert
      alert("🚀 Contest Published Successfully!");
      navigate("/organizer/manage-contests");
    } catch (err) {
      alert("Error creating contest. Please check your details.");
      console.error(err);
    }
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container">
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-link text-decoration-none text-muted p-0 me-3"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="fw-bold m-0">Create New Contest</h2>
        </div>

        <div className="row g-4">
          {/* Form Side */}
          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4 p-md-5 rounded-4">
              <section className="mb-4">
                <h5 className="text-primary fw-bold mb-4">1. General Information</h5>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold d-flex align-items-center">
                    <Type size={18} className="me-2 text-muted" /> Contest Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-control form-control-lg border-2 shadow-none"
                    placeholder="e.g. Winter Coding Sprint 2024"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold d-flex align-items-center">
                    <AlignLeft size={18} className="me-2 text-muted" /> Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control border-2 shadow-none"
                    rows="5"
                    placeholder="Provide details about rules, eligibility, and language requirements..."
                    required
                  />
                </div>
              </section>

              <hr className="my-5 opacity-10" />

              <section className="mb-4">
                <h5 className="text-primary fw-bold mb-4">2. Schedule & Rewards</h5>
                
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <Clock size={18} className="me-2 text-muted" /> Starts At
                    </label>
                    <input
                      type="datetime-local"
                      name="startsAt"
                      value={form.startsAt}
                      onChange={handleChange}
                      className="form-control border-2 shadow-none"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <Calendar size={18} className="me-2 text-muted" /> Ends At
                    </label>
                    <input
                      type="datetime-local"
                      name="endsAt"
                      value={form.endsAt}
                      onChange={handleChange}
                      className="form-control border-2 shadow-none"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold d-flex align-items-center">
                    <Trophy size={18} className="me-2 text-muted" /> Rewards
                  </label>
                  <input
                    type="text"
                    name="rewards"
                    value={form.rewards}
                    onChange={handleChange}
                    className="form-control border-2 shadow-none"
                    placeholder="e.g. $500 Amazon Voucher, Digital Certificate"
                  />
                </div>
              </section>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center"
                style={{ transition: 'all 0.3s' }}
              >
                <Rocket className="me-2" size={20} /> Launch Contest
              </button>
            </form>
          </div>

          {/* Preview Side (Interactive) */}
          <div className="col-lg-5">
            <div className="sticky-top" style={{ top: '2rem' }}>
              <p className="text-muted fw-bold small text-uppercase mb-3">Live Preview</p>
              <div className="card border-0 shadow-lg overflow-hidden rounded-4 text-white" 
                   style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge bg-success px-3 py-2 rounded-pill">
                      {form.status}
                    </span>
                    <Trophy className="text-warning" size={32} />
                  </div>
                  
                  <h3 className="fw-bold mb-2">
                    {form.title || "Contest Title Appears Here"}
                  </h3>
                  
                  <p className="text-light opacity-75 mb-4" style={{ fontSize: '0.9rem', minHeight: '60px' }}>
                    {form.description || "Start typing your description to see it come to life here. This is how users will view your event."}
                  </p>

                  <div className="bg-white bg-opacity-10 rounded-3 p-3 mb-3">
                    <div className="row g-0">
                      <div className="col-6 border-end border-secondary border-opacity-25">
                        <small className="d-block text-uppercase opacity-50 mb-1" style={{ fontSize: '0.7rem' }}>Start Date</small>
                        <span className="small">{form.startsAt ? new Date(form.startsAt).toLocaleDateString() : '-- -- --'}</span>
                      </div>
                      <div className="col-6 ps-3">
                        <small className="d-block text-uppercase opacity-50 mb-1" style={{ fontSize: '0.7rem' }}>Reward</small>
                        <span className="small text-truncate d-block">{form.rewards || "TBD"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn btn-light w-100 fw-bold disabled opacity-50 py-2">
                    Register Now
                  </button>
                </div>
              </div>
              
              <div className="mt-4 p-3 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-25">
                <small className="text-primary d-block fw-bold mb-1">💡 Pro-tip</small>
                <small className="text-muted">High-quality descriptions with clear rules usually get 40% more participation.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}