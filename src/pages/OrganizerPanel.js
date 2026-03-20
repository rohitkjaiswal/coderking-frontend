// import React from "react";
// import { Link } from "react-router-dom";
// import PastContests from "./PastContests";

// export default function OrganizerPanel() {
//   return (
//     <div className="container mt-4">
//       <h2 className="fw-bold mb-3">Organizer Panel</h2>
//       <p className="text-muted">Create contests, manage participants, publish results and generate certificates.</p>

//       <div className="card p-4 shadow-sm rounded-3 mb-3">
//         <h5>Approvals</h5>
//         <p>Admin-only: review and approve organizer requests.</p>
//         <Link to="/admin/approvals" className="btn btn-outline-primary">📝 Manage Approvals</Link>
//       </div>
//       <div className="card p-4 shadow-sm rounded-3 mb-3">
//         <h5>Contest Management</h5>
//         <p>Create new contests or manage existing ones.</p>
//         <span className="d-flex">
//         <Link to="/admin/create-contest" className="btn w-50 btn-success me-2 my-2">➕ Create Contest</Link>
//         <Link to="/admin/manage-contests" className="w-50 btn btn-warning me-2 my-2">⚙️ Manage Contests</Link>
//         </span>
//       </div>

//       <div className="card p-4 shadow-sm rounded-3">
//         <PastContests/>
//                 <Link to="/admin/past-contests" className="text-end text-decoration-none">📜 View All Past Contests</Link>

//       </div>
//     </div>
//   );
// }


//codes by cloud 
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PastContests from "./PastContests";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  .op-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

  .op-wrap {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f5f6f8;
    min-height: 100vh;
    color: #1a1d23;
    padding: 40px 48px 64px;
  }

  /* ── Page Header ── */
  .op-page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 36px;
    padding-bottom: 28px;
    border-bottom: 1px solid #e3e6eb;
    animation: op-rise 0.4s ease both;
  }

  .op-page-title {
    font-size: 22px;
    font-weight: 700;
    color: #1a1d23;
    letter-spacing: -0.3px;
  }

  .op-page-sub {
    font-size: 13.5px;
    color: #8a909e;
    margin-top: 4px;
    font-weight: 400;
  }

  .op-live-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #fff;
    border: 1px solid #e3e6eb;
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 12.5px;
    font-weight: 500;
    color: #3d4250;
  }

  .op-live-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 2px rgba(34,197,94,0.2);
  }

  /* ── Stat Cards ── */
  .op-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 28px;
    animation: op-rise 0.4s 0.05s ease both;
  }

  .op-stat {
    background: #fff;
    border: 1px solid #e3e6eb;
    border-radius: 12px;
    padding: 20px 22px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .op-stat:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }

  .op-stat-icon {
    width: 42px; height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .op-stat-icon.blue   { background: #eff6ff; }
  .op-stat-icon.green  { background: #f0fdf4; }
  .op-stat-icon.amber  { background: #fffbeb; }
  .op-stat-icon.red    { background: #fff1f2; }

  .op-stat-num {
    font-size: 22px;
    font-weight: 700;
    color: #1a1d23;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .op-stat-lbl {
    font-size: 12px;
    color: #8a909e;
    font-weight: 500;
    margin-top: 3px;
  }

  /* ── Main Grid ── */
  .op-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }

  /* ── Section Cards ── */
  .op-card {
    background: #fff;
    border: 1px solid #e3e6eb;
    border-radius: 14px;
    padding: 26px 28px;
    transition: box-shadow 0.2s;
    animation: op-rise 0.4s ease both;
  }
  .op-card:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .op-card-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .op-card-icon {
    width: 36px; height: 36px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    background: #f5f6f8;
    border: 1px solid #e3e6eb;
    flex-shrink: 0;
  }

  .op-card-title {
    font-size: 14.5px;
    font-weight: 700;
    color: #1a1d23;
  }

  .op-card-desc {
    font-size: 13px;
    color: #8a909e;
    line-height: 1.6;
    margin-bottom: 20px;
    padding-left: 48px;
  }

  .op-card-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding-left: 48px;
  }

  /* ── Buttons ── */
  .op-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: none;
    transition: all 0.15s ease;
    cursor: pointer;
    border: none;
    white-space: nowrap;
    letter-spacing: -0.1px;
  }

  .op-btn-primary {
    background: #2563eb;
    color: #fff;
  }
  .op-btn-primary:hover {
    background: #1d4ed8;
    box-shadow: 0 4px 12px rgba(37,99,235,0.3);
    transform: translateY(-1px);
  }

  .op-btn-ghost {
    background: #f5f6f8;
    color: #3d4250;
    border: 1px solid #e3e6eb;
  }
  .op-btn-ghost:hover {
    background: #eef0f4;
    border-color: #d1d5db;
    transform: translateY(-1px);
  }

  .op-btn-success {
    background: #16a34a;
    color: #fff;
  }
  .op-btn-success:hover {
    background: #15803d;
    box-shadow: 0 4px 12px rgba(22,163,74,0.3);
    transform: translateY(-1px);
  }

  .op-btn-warning {
    background: #f59e0b;
    color: #fff;
  }
  .op-btn-warning:hover {
    background: #d97706;
    box-shadow: 0 4px 12px rgba(245,158,11,0.3);
    transform: translateY(-1px);
  }

  /* ── Alert Strip ── */
  .op-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 8px;
    padding: 9px 13px;
    margin-left: 48px;
    margin-bottom: 14px;
    margin-top: -6px;
    font-size: 12.5px;
    color: #92400e;
    font-weight: 500;
  }

  /* ── Past Contests Card ── */
  .op-past-card {
    background: #fff;
    border: 1px solid #e3e6eb;
    border-radius: 14px;
    padding: 26px 28px;
    animation: op-rise 0.4s 0.18s ease both;
    transition: box-shadow 0.2s;
  }
  .op-past-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.06); }

  .op-past-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .op-past-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .op-past-title {
    font-size: 14.5px;
    font-weight: 700;
    color: #1a1d23;
  }

  .op-past-tag {
    font-size: 11.5px;
    font-weight: 600;
    color: #6b7280;
    background: #f5f6f8;
    border: 1px solid #e3e6eb;
    border-radius: 6px;
    padding: 2px 9px;
  }

  .op-view-all {
    font-size: 13px;
    font-weight: 600;
    color: #2563eb;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: gap 0.15s;
  }
  .op-view-all:hover { gap: 7px; color: #1d4ed8; }

  /* ── Animation ── */
  @keyframes op-rise {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .op-wrap { padding: 24px 20px 48px; }
    .op-stats { grid-template-columns: repeat(2, 1fr); }
    .op-grid  { grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .op-stats { grid-template-columns: 1fr 1fr; }
    .op-page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
  }
`;

const stats = [
  { icon: "🏆", label: "Total Contests",     value: "38",    cls: "blue"  },
  { icon: "👥", label: "Participants",        value: "2,847", cls: "green" },
  { icon: "📜", label: "Certificates Issued", value: "1,204", cls: "amber" },
  { icon: "⏳", label: "Pending Approvals",   value: "7",     cls: "red"   },
];

const cards = [
  {
    icon: "📝",
    title: "Approvals",
    desc: "Review and approve pending organizer access requests.",
    delay: "0.08s",
    alert: "7 requests awaiting your review",
    actions: [
      { to: "/admin/approvals", label: "Manage Approvals", cls: "op-btn-primary" },
    ],
  },
  {
    icon: "⚙️",
    title: "Contest Management",
    desc: "Create new contests or configure and manage existing ones.",
    delay: "0.12s",
    actions: [
      { to: "/admin/create-contest",  label: "Create Contest", cls: "op-btn-success" },
      { to: "/admin/manage-contests", label: "Manage",         cls: "op-btn-ghost"   },
    ],
  },
  {
    icon: "🎖️",
    title: "Certificates",
    desc: "Generate and distribute certificates to winners and participants.",
    delay: "0.14s",
    actions: [
      { to: "/admin/certificates/generate", label: "Generate Certificates", cls: "op-btn-primary" },
      { to: "/admin/certificates/issued",   label: "View Issued",           cls: "op-btn-ghost"   },
    ],
  },
  {
    icon: "👥",
    title: "Participants",
    desc: "Browse registrations, manage teams, and export participant data.",
    delay: "0.16s",
    actions: [
      { to: "/admin/participants",        label: "View Participants", cls: "op-btn-ghost" },
      { to: "/admin/participants/export", label: "Export CSV",        cls: "op-btn-ghost" },
    ],
  },
];

export default function OrganizerPanel() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="op-wrap">

        {/* Header */}
        <header className="op-page-header">
          <div>
            <h1 className="op-page-title">Organizer Panel</h1>
            <p className="op-page-sub">Create contests · Manage participants · Publish results · Generate certificates</p>
          </div>
          <div className="op-live-badge">
            <div className="op-live-dot" />
            System Active
          </div>
        </header>

        {/* Stats */}
        <div className="op-stats">
          {stats.map((s) => (
            <div className="op-stat" key={s.label}>
              <div className={`op-stat-icon ${s.cls}`}>{s.icon}</div>
              <div>
                <div className="op-stat-num">{s.value}</div>
                <div className="op-stat-lbl">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="op-grid">
          {cards.map((c) => (
            <div className="op-card" key={c.title} style={{ animationDelay: c.delay }}>
              <div className="op-card-head">
                <div className="op-card-icon">{c.icon}</div>
                <span className="op-card-title">{c.title}</span>
              </div>
              <p className="op-card-desc">{c.desc}</p>
              {c.alert && (
                <div className="op-alert">⚠️ {c.alert}</div>
              )}
              <div className="op-card-actions">
                {c.actions.map((a) => (
                  <Link key={a.label} to={a.to} className={`op-btn ${a.cls}`}>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Past Contests */}
        <div className="op-past-card">
          <div className="op-past-head">
            <div className="op-past-left">
              <span className="op-past-title">Past Contests</span>
              <span className="op-past-tag">Recent</span>
            </div>
            <Link to="/admin/past-contests" className="op-view-all">
              View All →
            </Link>
          </div>
          <PastContests />
        </div>

      </div>
    </>
  );
}