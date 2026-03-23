
import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600&display=swap');

  :root {
    --nav-bg: rgba(10, 11, 16, 0.92);
    --nav-border: rgba(255,255,255,0.07);
    --nav-text: #c9cdd8;
    --nav-hover: #ffffff;
    --nav-accent: #f97316;
    --nav-surface: #13161d;
    --nav-surface2: #1c1f2a;
    --nav-muted: #5a6070;
  }

  .ck-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    font-family: 'Outfit', sans-serif;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--nav-border);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    height: 60px;
    display: flex;
    align-items: center;
  }

  .ck-nav-inner {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 28px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── Brand ── */
  .ck-brand {
    font-family: 'JetBrains Mono', monospace;
    font-size: 17px;
    font-weight: 600;
    color: #fff !important;
    text-decoration: none;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 7px;
    margin-right: 12px;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .ck-brand:hover { opacity: 0.85; color: #fff; }

  .ck-brand-crown {
    font-size: 16px;
    filter: drop-shadow(0 0 6px rgba(249,115,22,0.7));
  }

  /* ── Nav Links ── */
  .ck-links {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
  }

  .ck-link {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--nav-text) !important;
    text-decoration: none !important;
    padding: 6px 12px;
    border-radius: 8px;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
  }
  .ck-link:hover {
    color: var(--nav-hover) !important;
    background: rgba(255,255,255,0.06);
  }
  .ck-link.active {
    color: #fff !important;
    background: rgba(255,255,255,0.08);
  }

  /* ── Courses Dropdown ── */
  .ck-dropdown {
    position: relative;
  }

  .ck-dropdown-trigger {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--nav-text);
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.15s, background 0.15s;
    user-select: none;
    white-space: nowrap;
    background: none;
    border: none;
    font-family: 'Outfit', sans-serif;
  }
  .ck-dropdown-trigger:hover,
  .ck-dropdown.open .ck-dropdown-trigger {
    color: #fff;
    background: rgba(255,255,255,0.06);
  }

  .ck-chevron {
    width: 14px; height: 14px;
    transition: transform 0.2s;
    color: var(--nav-muted);
  }
  .ck-dropdown.open .ck-chevron {
    transform: rotate(180deg);
    color: var(--nav-text);
  }

  .ck-dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    background: var(--nav-surface);
    border: 1px solid var(--nav-border);
    border-radius: 14px;
    padding: 8px;
    min-width: 220px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: opacity 0.18s, transform 0.18s;
    z-index: 100;
  }
  .ck-dropdown.open .ck-dropdown-menu {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }

  .ck-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--nav-text);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
  }
  .ck-dropdown-item:hover {
    background: rgba(255,255,255,0.06);
    color: #fff;
    text-decoration: none;
  }

  .ck-dropdown-icon {
    width: 28px; height: 28px;
    border-radius: 7px;
    background: var(--nav-surface2);
    border: 1px solid var(--nav-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }

  .ck-dropdown-label { line-height: 1.2; }
  .ck-dropdown-sub {
    display: block;
    font-size: 11px;
    font-weight: 400;
    color: var(--nav-muted);
    margin-top: 1px;
  }

  /* ── Right Section ── */
  .ck-right {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    flex-shrink: 0;
  }

  /* ── Profile Pill ── */
  .ck-profile {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px 5px 6px;
    background: var(--nav-surface);
    border: 1px solid var(--nav-border);
    border-radius: 99px;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
  }
  .ck-profile:hover {
    border-color: rgba(255,255,255,0.14);
    background: var(--nav-surface2);
  }

  .ck-avatar {
    width: 26px; height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--nav-accent), #fb923c);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }

  .ck-profile-name {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Auth Buttons ── */
  .ck-btn-login {
    font-size: 13px;
    font-weight: 500;
    color: var(--nav-text) !important;
    text-decoration: none !important;
    padding: 7px 14px;
    border-radius: 8px;
    transition: color 0.15s, background 0.15s;
    font-family: 'Outfit', sans-serif;
  }
  .ck-btn-login:hover {
    color: #fff !important;
    background: rgba(255,255,255,0.06);
  }

  .ck-btn-register {
    font-size: 13px;
    font-weight: 600;
    color: #fff !important;
    text-decoration: none !important;
    padding: 7px 16px;
    background: var(--nav-accent);
    border-radius: 8px;
    transition: background 0.15s, box-shadow 0.15s, transform 0.15s;
    font-family: 'Outfit', sans-serif;
    white-space: nowrap;
  }
  .ck-btn-register:hover {
    background: #ea6c0a;
    box-shadow: 0 4px 16px rgba(249,115,22,0.35);
    transform: translateY(-1px);
    color: #fff !important;
  }

  .ck-btn-logout {
    font-size: 13px;
    font-weight: 600;
    color: #f87171 !important;
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.18);
    border-radius: 8px;
    padding: 6px 14px;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    transition: background 0.15s, border-color 0.15s;
    text-decoration: none;
  }
  .ck-btn-logout:hover {
    background: rgba(239,68,68,0.15);
    border-color: rgba(239,68,68,0.3);
  }

  /* ── Create Contest Tag ── */
  .ck-create-link {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--nav-accent) !important;
    text-decoration: none !important;
    padding: 5px 12px;
    background: rgba(249,115,22,0.1);
    border: 1px solid rgba(249,115,22,0.2);
    border-radius: 7px;
    transition: background 0.15s, border-color 0.15s;
    white-space: nowrap;
  }
  .ck-create-link:hover {
    background: rgba(249,115,22,0.18);
    border-color: rgba(249,115,22,0.35);
  }

  /* ── Mobile Toggle ── */
  .ck-toggler {
    display: none;
    background: none;
    border: 1px solid var(--nav-border);
    border-radius: 8px;
    padding: 6px 9px;
    cursor: pointer;
    margin-left: 8px;
    flex-direction: column;
    gap: 4px;
  }
  .ck-toggler-bar {
    width: 18px; height: 2px;
    background: var(--nav-text);
    border-radius: 2px;
    transition: all 0.2s;
  }

  /* ── Mobile Menu ── */
  .ck-mobile-menu {
    display: none;
    position: fixed;
    top: 60px; left: 0; right: 0;
    background: var(--nav-surface);
    border-bottom: 1px solid var(--nav-border);
    padding: 16px 20px 24px;
    flex-direction: column;
    gap: 4px;
    z-index: 999;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .ck-mobile-menu.open { display: flex; }

  .ck-mobile-link {
    font-size: 14px;
    font-weight: 500;
    color: var(--nav-text);
    text-decoration: none;
    padding: 10px 12px;
    border-radius: 8px;
    transition: background 0.15s, color 0.15s;
  }
  .ck-mobile-link:hover,
  .ck-mobile-link.active {
    background: rgba(255,255,255,0.06);
    color: #fff;
    text-decoration: none;
  }

  .ck-mobile-divider {
    height: 1px;
    background: var(--nav-border);
    margin: 8px 0;
  }

  .ck-mobile-section-label {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--nav-muted);
    padding: 4px 12px;
    margin-top: 4px;
  }

  /* ── Responsive show/hide ── */
  @media (max-width: 900px) {
    .ck-links { display: none; }
    .ck-toggler { display: flex; }
  }
  @media (max-width: 480px) {
    .ck-nav-inner { padding: 0 16px; }
    .ck-right .ck-btn-login { display: none; }
  }
`;

const courseItems = [
  { icon: "⌨️", label: "Programming Languages", sub: "Python, C++, Java & more", to: "/courses/programming" },
  { icon: "🌐", label: "Web Technologies",       sub: "HTML, CSS, JS fundamentals",  to: "/courses/web-tech"     },
  { icon: "🎨", label: "Frontend Development",   sub: "React, Vue, Tailwind",        to: "/courses/frontend"     },
  { icon: "⚙️", label: "Backend Development",    sub: "Node, Spring, Django",        to: "/courses/backend"      },
];

export default function Navbar() {
  const [userId, setUserId]       = useState(null);
  const [userName, setUserName]   = useState(null);
  const [userRole, setUserRole]   = useState(null);
  const [dropOpen, setDropOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id   = decoded.userId || decoded.id || decoded.uid || decoded.sub || null;
        const name = decoded.name   || decoded.username || decoded.email || null;
        const role = decoded.role   || decoded.authorities || null;
        setUserId(id);
        setUserName(name);
        setUserRole(role);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const initials = userName
    ? userName.slice(0, 2).toUpperCase()
    : "CK";

  return (
    <>
      <style>{STYLES}</style>

      <nav className="ck-nav">
        <div className="ck-nav-inner">

          {/* Brand */}
          <Link to="/" className="ck-brand">
            <span className="ck-brand-crown">👑</span>
            CoderKing
          </Link>

          {/* Desktop Nav Links */}
          <div className="ck-links">
            <NavLink to="/contests"    className={({isActive}) => `ck-link${isActive ? " active" : ""}`}>Contests</NavLink>
            <NavLink to="/leaderboard" className={({isActive}) => `ck-link${isActive ? " active" : ""}`}>Leaderboard</NavLink>

            {/* Courses Dropdown */}
            <div className={`ck-dropdown${dropOpen ? " open" : ""}`} ref={dropRef}>
              <button className="ck-dropdown-trigger" onClick={() => setDropOpen(o => !o)}>
                Courses
                <svg className="ck-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="ck-dropdown-menu">
                {courseItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="ck-dropdown-item"
                    onClick={() => setDropOpen(false)}
                  >
                    <div className="ck-dropdown-icon">{item.icon}</div>
                    <div className="ck-dropdown-label">
                      {item.label}
                      <span className="ck-dropdown-sub">{item.sub}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/forum" className={({isActive}) => `ck-link${isActive ? " active" : ""}`}>Forum</NavLink>

            {/* Create Contest — organizer only */}
            {userId && userRole === 'ORGANIZER' && (
              <Link to="/organizer/create-contest" className="ck-create-link">
                + Create Contest
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="ck-right">
            {!userId ? (
              <>
                <NavLink to="/login"    className="ck-btn-login">Log in</NavLink>
                <NavLink to="/register" className="ck-btn-register">Get Started</NavLink>
              </>
            ) : (
              <>
                <Link to={`/profile/${userId}`} className="ck-profile">
                  <div className="ck-avatar">{initials}</div>
                  {userName && <span className="ck-profile-name">{userName}</span>}
                </Link>
                <button className="ck-btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}

            {/* Mobile Toggle */}
            <button className="ck-toggler" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
              <span className="ck-toggler-bar" />
              <span className="ck-toggler-bar" />
              <span className="ck-toggler-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`ck-mobile-menu${mobileOpen ? " open" : ""}`}>
        <NavLink to="/contests"    className={({isActive}) => `ck-mobile-link${isActive?" active":""}`} onClick={() => setMobileOpen(false)}>🏆 Contests</NavLink>
        <NavLink to="/leaderboard" className={({isActive}) => `ck-mobile-link${isActive?" active":""}`} onClick={() => setMobileOpen(false)}>📊 Leaderboard</NavLink>
        <NavLink to="/forum"       className={({isActive}) => `ck-mobile-link${isActive?" active":""}`} onClick={() => setMobileOpen(false)}>💬 Forum</NavLink>

        <div className="ck-mobile-divider" />
        <div className="ck-mobile-section-label">Courses</div>

        {courseItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="ck-mobile-link" onClick={() => setMobileOpen(false)}>
            {item.icon} {item.label}
          </NavLink>
        ))}

        {userId && userRole === 'ORGANIZER' && (
          <>
            <div className="ck-mobile-divider" />
            <NavLink to="/organizer/create-contest" className="ck-mobile-link" onClick={() => setMobileOpen(false)}>
              ➕ Create Contest
            </NavLink>
          </>
        )}

        <div className="ck-mobile-divider" />

        {!userId ? (
          <>
            <NavLink to="/login"    className="ck-mobile-link" onClick={() => setMobileOpen(false)}>Log in</NavLink>
            <NavLink to="/register" className="ck-mobile-link" onClick={() => setMobileOpen(false)}>Get Started</NavLink>
          </>
        ) : (
          <>
            <NavLink to={`/profile/${userId}`} className="ck-mobile-link" onClick={() => setMobileOpen(false)}>
              👤 {userName || "Profile"}
            </NavLink>
            <button className="ck-btn-logout" style={{margin:"4px 0", textAlign:"left", width:"100%"}} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}