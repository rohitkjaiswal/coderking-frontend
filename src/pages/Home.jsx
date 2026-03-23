
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bg_img from "../assets/coding-backgroundpage.webp";
import img1 from "../assets/girlwithbag.jpg";
import Footer from "../components/Footer";
import FreeCourcesData from "../localData/FreeCourcesData";
import TrendingCources from "../localData/TrendingCources";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');

  :root {
    --bg: #0f172a;
    --surface: #13161d;
    --surface2: #1a1e28;
    --border: rgba(255,255,255,0.07);
    --text: #eaedf5;
    --muted: #6b7280;
    --soft: #9ca3af;
    --accent: #f97316;
    --accent2: #3b82f6;
    --accent3: #10b981;
    --red: #ef4444;
  }

  .ck-root {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ─── Hero ─── */
  .ck-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 24px;
    overflow: hidden;
  }

  .ck-hero-bg {
    position: absolute;
    inset: 0;
    background-image: url(${bg_img});
    background-size: cover;
    background-position: center;
    opacity: 0.12;
    z-index: 0;
  }

  .ck-hero-glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 50% -10%, rgba(249,115,22,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 80% 80%, rgba(59,130,246,0.1) 0%, transparent 60%);
    z-index: 0;
    pointer-events: none;
  }

  .ck-hero-content {
    position: relative;
    z-index: 1;
    max-width: 760px;
    animation: ck-rise 0.7s cubic-bezier(0.16,1,0.3,1) both;
  }

  .ck-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(249,115,22,0.1);
    border: 1px solid rgba(249,115,22,0.25);
    border-radius: 99px;
    padding: 5px 14px;
    font-size: 12px;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .ck-tag-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: ck-blink 1.8s infinite;
  }

  @keyframes ck-blink {
    0%,100% { opacity:1; } 50% { opacity:0.3; }
  }

  .ck-hero-title {
    font-size: clamp(52px, 8vw, 88px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -2px;
    margin-bottom: 6px;
    background: linear-gradient(135deg, #fff 40%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ck-hero-sub {
    font-size: clamp(16px, 2.5vw, 22px);
    font-weight: 400;
    color: var(--soft);
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .ck-hero-note {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 36px;
  }

  .ck-hero-btns {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 56px;
  }

  .ck-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: var(--accent);
    color: #fff;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    font-family: 'Outfit', sans-serif;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  .ck-btn-primary:hover {
    background: #ea6c0a;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(249,115,22,0.35);
  }

  .ck-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    font-family: 'Outfit', sans-serif;
    transition: all 0.2s;
  }
  .ck-btn-outline:hover {
    background: var(--surface2);
    border-color: rgba(255,255,255,0.15);
    transform: translateY(-2px);
    color: var(--text);
  }

  /* Hero stats */
  .ck-hero-stats {
    display: flex;
    gap: 40px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .ck-hstat {
    text-align: center;
  }
  .ck-hstat-num {
    font-size: 28px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -1px;
    line-height: 1;
  }
  .ck-hstat-lbl {
    font-size: 12px;
    color: var(--muted);
    font-weight: 500;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .ck-hstat-sep {
    width: 1px;
    background: var(--border);
    align-self: stretch;
  }

  /* ─── Section base ─── */
  .ck-section {
    padding: 80px 48px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .ck-section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }

  .ck-section-title {
    font-size: clamp(26px, 3.5vw, 36px);
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--text);
    margin-bottom: 8px;
    line-height: 1.15;
  }

  .ck-section-desc {
    font-size: 15px;
    color: var(--muted);
    font-weight: 400;
    max-width: 520px;
    line-height: 1.7;
  }

  /* ─── Feature Cards (Contests + Leaderboard) ─── */
  .ck-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 0 48px 80px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .ck-feat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
    animation: ck-rise 0.5s ease both;
  }
  .ck-feat-card:hover {
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-3px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }

  .ck-feat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--card-accent, var(--accent)), transparent);
    opacity: 0.6;
  }

  .ck-feat-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.1em;
    margin-bottom: 20px;
  }

  .ck-feat-icon {
    font-size: 32px;
    margin-bottom: 16px;
    display: block;
  }

  .ck-feat-title {
    font-size: 22px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.4px;
    margin-bottom: 10px;
  }

  .ck-feat-desc {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 28px;
  }

  .ck-feat-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--card-accent, var(--accent));
    text-decoration: none;
    transition: gap 0.15s;
  }
  .ck-feat-link:hover { gap: 10px; }

  /* ─── About Strip ─── */
  .ck-about {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .ck-about-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .ck-about-text {}

  .ck-about-body {
    font-size: 15px;
    color: var(--soft);
    line-height: 1.8;
    margin-top: 20px;
    margin-bottom: 32px;
  }

  .ck-about-img {
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--border);
    position: relative;
  }
  .ck-about-img img {
    width: 100%;
    height: 380px;
    object-fit: cover;
    display: block;
    filter: brightness(0.85) saturate(0.9);
    transition: filter 0.3s;
  }
  .ck-about-img:hover img { filter: brightness(0.95) saturate(1); }

  /* ─── Course Sections ─── */
  .ck-courses-wrap {
    padding: 0 48px 80px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .ck-courses-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .ck-course-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .ck-course-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
    cursor: pointer;
    animation: ck-rise 0.4s ease both;
  }
  .ck-course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.35);
    border-color: rgba(255,255,255,0.12);
  }

  .ck-course-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
    filter: brightness(0.8) saturate(0.85);
    transition: filter 0.3s;
  }
  .ck-course-card:hover .ck-course-img { filter: brightness(0.95) saturate(1); }

  .ck-course-body {
    padding: 14px 16px 16px;
  }

  .ck-course-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 5px;
    line-height: 1.4;
  }

  .ck-course-creator {
    font-size: 12px;
    color: var(--muted);
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .ck-course-creator::before {
    content: '';
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--surface2);
    border: 1px solid var(--border);
    flex-shrink: 0;
  }

  .ck-free-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent3);
    background: rgba(16,185,129,0.1);
    border: 1px solid rgba(16,185,129,0.2);
    border-radius: 5px;
    padding: 2px 7px;
    margin-bottom: 8px;
  }

  .ck-trending-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(249,115,22,0.1);
    border: 1px solid rgba(249,115,22,0.2);
    border-radius: 5px;
    padding: 2px 7px;
    margin-bottom: 8px;
  }

  /* ─── Divider ─── */
  .ck-hr {
    border: none;
    border-top: 1px solid var(--border);
    max-width: 1200px;
    margin: 0 auto 0;
  }

  /* ─── Animations ─── */
  @keyframes ck-rise {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── Responsive ─── */
  @media (max-width: 1024px) {
    .ck-course-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .ck-features { grid-template-columns: 1fr; padding: 0 20px 48px; }
    .ck-about-inner { grid-template-columns: 1fr; gap: 36px; }
    .ck-section, .ck-courses-wrap { padding-left: 20px; padding-right: 20px; }
    .ck-features { padding-left: 20px; padding-right: 20px; }
  }
  @media (max-width: 560px) {
    .ck-course-grid { grid-template-columns: 1fr 1fr; }
    .ck-hero-stats { gap: 24px; }
  }
`;

export default function Home() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="ck-root">

        {/* ── Hero ── */}
        <header className="ck-hero">
          <div className="ck-hero-bg" />
          <div className="ck-hero-glow" />
          <div className="ck-hero-content">
            <div className="ck-tag">
              <div className="ck-tag-dot" />
              Live Contests Running Now
            </div>
            <h1 className="ck-hero-title">Coder<span>KING</span></h1>
            <p className="ck-hero-sub">
              Join live coding contests, climb leaderboards,<br />and earn certificates.
            </p>
            <p className="ck-hero-note">For coders of all levels — from beginners to pros.</p>
            <div className="ck-hero-btns">
              <Link to="/contests" className="ck-btn-primary">
                View Contests →
              </Link>
              <Link to="/register" className="ck-btn-outline">
                Get Started
              </Link>
            </div>
            <div className="ck-hero-stats">
              <div className="ck-hstat">
                <div className="ck-hstat-num">12K+</div>
                <div className="ck-hstat-lbl">Coders</div>
              </div>
              <div className="ck-hstat-sep" />
              <div className="ck-hstat">
                <div className="ck-hstat-num">340+</div>
                <div className="ck-hstat-lbl">Contests</div>
              </div>
              <div className="ck-hstat-sep" />
              <div className="ck-hstat">
                <div className="ck-hstat-num">8K+</div>
                <div className="ck-hstat-lbl">Certificates</div>
              </div>
              <div className="ck-hstat-sep" />
              <div className="ck-hstat">
                <div className="ck-hstat-num">Free</div>
                <div className="ck-hstat-lbl">Resources</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Feature Cards ── */}
        <div className="ck-features">
          <div className="ck-feat-card" style={{"--card-accent": "#f97316", animationDelay: "0.05s"}}>
            <div className="ck-feat-num">01 / CONTESTS</div>
            <span className="ck-feat-icon">🏆</span>
            <h2 className="ck-feat-title">Upcoming Contests</h2>
            <p className="ck-feat-desc">
              Automated statuses — upcoming, live, and completed — updated in real time.
              Subscribe to notifications and never miss a round.
            </p>
            <Link to="/contests" className="ck-feat-link">
              Browse contests →
            </Link>
          </div>
          <div className="ck-feat-card" style={{"--card-accent": "#3b82f6", animationDelay: "0.1s"}}>
            <div className="ck-feat-num">02 / RANKINGS</div>
            <span className="ck-feat-icon">📊</span>
            <h2 className="ck-feat-title">Leaderboard</h2>
            <p className="ck-feat-desc">
              Track wins, participation points, and badges. See where you stand
              among thousands of coders worldwide.
            </p>
            <Link to="/leaderboard" className="ck-feat-link" style={{color: "#3b82f6"}}>
              Open leaderboard →
            </Link>
          </div>
        </div>

        {/* ── About Strip ── */}
        <div className="ck-about">
          <div className="ck-about-inner">
            <div className="ck-about-text">
              <div className="ck-section-label">About CoderKing</div>
              <h2 className="ck-section-title">Hey Coders 👋</h2>
              <p className="ck-about-body">
                CoderKing is a free resource platform for learners at every level.
                Whether you're just starting out or pushing your limits, you'll find
                a sea of courses, challenges, and tools here — completely free.
                Sign up in a single click and dive in. Use these resources for
                educational purposes and grow at your own pace.
              </p>
              <Link to="/register" className="ck-btn-primary" style={{display:"inline-flex"}}>
                Join for Free →
              </Link>
            </div>
            <div className="ck-about-img">
              <img src={img1} alt="Coder" />
            </div>
          </div>
        </div>

        {/* ── Free Courses ── */}
        <div className="ck-courses-wrap" style={{paddingTop: "80px"}}>
          <div className="ck-courses-head">
            <div>
              <div className="ck-section-label">Free Resources</div>
              <h2 className="ck-section-title" style={{marginBottom: 0}}>Popular Free Courses</h2>
            </div>
            <Link to="/course" className="ck-feat-link" style={{fontSize: "13px", padding: "9px 18px"}}>
              View All →
            </Link>
          </div>
          <div className="ck-course-grid">
            {FreeCourcesData.map((course, i) => (
              <div className="ck-course-card" key={i} style={{animationDelay: `${0.05 * i}s`}}>
                <img src={course.img_src} alt={course.name} className="ck-course-img" />
                <div className="ck-course-body">
                  <div className="ck-free-badge">Free</div>
                  <div className="ck-course-name">{course.name}
                  </div>
                  <div className="ck-course-creator">{course.creator}</div>
                  
                </div>
              
              </div>
            ))}
          </div>
        </div>

        {/* ── Trending Courses ── */}
        <div className="ck-courses-wrap" style={{paddingTop: "0"}}>
          <div className="ck-courses-head">
            <div>
              <div className="ck-section-label">What's Hot</div>
              <h2 className="ck-section-title" style={{marginBottom: 0}}>Trending Courses</h2>
            </div>
            <Link to="/course" className="ck-feat-link" style={{fontSize: "13px", padding: "9px 18px"}}>
              View All →
            </Link>
          </div>
          <div className="ck-course-grid">
            {TrendingCources.map((course, i) => (
              <div className="ck-course-card" key={i} style={{animationDelay: `${0.05 * i}s`}}>
                <img src={course.img_src} alt={course.name} className="ck-course-img" />
                <div className="ck-course-body">
                  <div className="ck-trending-badge">🔥 Trending</div>
                  <div className="ck-course-name">{course.name}</div>
                  <div className="ck-course-creator">{course.creator}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="ck-hr" />
        <Footer />
      </div>
    </>
  );
}