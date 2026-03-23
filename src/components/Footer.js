import React from "react";
import footerbg from '../assets/footerbg.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-wrapper text-light">
      <div className="container pt-5">
        <div className="row g-4">
          
          {/* Column 1: Brand & About */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h2 className="brand-logo mb-3">CODER<span>KING</span></h2>
            <p className="text-secondary small-text">
              Elevating the coding community through competitive challenges and real-time leaderboards. Join the elite.
            </p>
            <div className="newsletter-box mt-4">
              <label className="small mb-2 fw-bold text-uppercase">Stay Updated</label>
              <div className="input-group custom-input-group">
                <input type="email" className="form-control" placeholder="Email Address" />
                <button className="btn btn-primary-custom" type="button">Join</button>
              </div>
            </div>
          </div>

          {/* Column 2: Links with Background Card */}
          <div className="col-lg-4 col-md-6">
            <div className="glass-card p-4 h-100" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url(${footerbg})` }}>
              <h5 className="section-title">Important Links</h5>
              <div className="row mt-3">
                <div className="col-6">
                  <ul className="list-unstyled footer-nav">
                    <li><a href="#contests">Contests</a></li>
                    <li><a href="#profile">Profile</a></li>
                    <li><a href="#help">Help Center</a></li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul className="list-unstyled footer-nav">
                    <li><a href="#ranks">Leaderboard</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#careers">Careers</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="col-lg-4 col-md-6">
            <div className="glass-card p-4 h-100">
              <h5 className="section-title">Connect With Us</h5>
              <div className="social-grid mt-3">
                <a href="#" className="social-tag">Twitter</a>
                <a href="#" className="social-tag">Discord</a>
                <a href="#" className="social-tag">GitHub</a>
                <a href="#" className="social-tag">LinkedIn</a>
              </div>
              <p className="mt-4 small text-secondary">
                Questions? <br/>
                <span className="text-light">support@coderking.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom mt-5 py-4 border-top border-secondary border-opacity-25">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="mb-0 small text-secondary">© {new Date().getFullYear()} CoderKing. Built for developers.</p>
            <div className="footer-legal-links">
              <a href="#" className="mx-2 small text-secondary text-decoration-none">Privacy</a>
              <a href="#" className="mx-2 small text-secondary text-decoration-none">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}