import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await api.post('/auth/login', form);
      localStorage.setItem('token', resp.data.token || 'demo-token');
      nav('/');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center bg-white">
      <div className="container-fluid h-100">
        <div className="row h-100">
          
          {/* Left Side: Branding (Hidden on Mobile) */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center text-white" 
               style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', minHeight: '100vh' }}>
            <div className="p-5 text-center" style={{ maxWidth: '500px' }}>
              <div className="bg-white bg-opacity-10 p-4 rounded-circle d-inline-block mb-4">
                <ShieldCheck size={54} />
              </div>
              <h1 className="fw-bold mb-3">Welcome Back.</h1>
              <p className="lead opacity-75">
                Log in to resume your challenges, check your rank on the leaderboard, and claim your contest rewards.
              </p>
              
              <div className="mt-5 pt-4 border-top border-white border-opacity-20 text-start">
                <p className="small fw-bold text-uppercase opacity-50 mb-3 tracking-wider">Upcoming Highlights</p>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="bg-white bg-opacity-20 p-1 rounded-circle"><ArrowRight size={14}/></div>
                  <span className="small">Winter Hackathon 2026 starts in 3 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center py-5">
            <div className="w-100 px-4" style={{ maxWidth: '420px' }}>
              
              <div className="mb-5">
                <h2 className="fw-bold text-dark mb-2">Log in to your account</h2>
                <p className="text-muted">Enter your credentials to access the Arena.</p>
              </div>

              {error && (
                <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4 py-3">
                  <AlertCircle className="me-2" size={18}/>
                  <small className="fw-medium">{error}</small>
                </div>
              )}

              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-uppercase text-muted mb-2">Email Address</label>
                  <div className="input-group rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0 text-muted px-3">
                      <Mail size={18}/>
                    </span>
                    <input 
                      type="email" 
                      className="form-control form-control-lg bg-light border-0 shadow-none fs-6" 
                      placeholder="name@company.com"
                      required
                      value={form.email} 
                      onChange={e => setForm({...form, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label small fw-bold text-uppercase text-muted mb-2">Password</label>
                    <Link to="/forgot-password" size={12} className="text-primary text-decoration-none x-small fw-bold">Forgot?</Link>
                  </div>
                  <div className="input-group rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0 text-muted px-3">
                      <Lock size={18}/>
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control form-control-lg bg-light border-0 shadow-none fs-6" 
                      placeholder="••••••••"
                      required
                      value={form.password} 
                      onChange={e => setForm({...form, password: e.target.value})} 
                    />
                    <button 
                      type="button" 
                      className="input-group-text bg-light border-0 text-muted px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input shadow-none" id="remember" />
                    <label className="form-check-label small text-muted" htmlFor="remember">Keep me logged in</label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary btn-lg w-100 fw-bold shadow-sm py-3 rounded-3 d-flex align-items-center justify-content-center border-0"
                  style={{ backgroundColor: '#4f46e5' }}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : (
                    <>Sign In <LogIn className="ms-2" size={18}/></>
                  )}
                </button>
              </form>

              <p className="text-center text-muted small mt-5">
                Don't have an account yet? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create an account</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}