import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: null, msg: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      await api.post('/auth/register', form);
      setStatus({ type: 'success', msg: 'Account created! Redirecting to login...' });
      setTimeout(() => nav('/login'), 2000);
    } catch (err) {
      setLoading(false);
      setStatus({ type: 'error', msg: err.response?.data?.message || 'Registration failed. Please try again.' });
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center bg-white">
      <div className="container-fluid h-100">
        <div className="row h-100">
          
          {/* Left Side: Branding/Marketing (Hidden on Mobile) */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center text-white" 
               style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)', minHeight: '100vh' }}>
            <div className="p-5 text-center" style={{ maxWidth: '500px' }}>
              <div className="bg-white bg-opacity-10 p-3 rounded-4 d-inline-block mb-4">
                <CheckCircle2 size={48} />
              </div>
              <h1 className="fw-bold mb-3">Join the Arena.</h1>
              <p className="lead opacity-75">
                Create an account to compete in global coding contests, track your progress, and earn industry-recognized badges.
              </p>
              <div className="mt-5 d-flex flex-column gap-3 text-start bg-black bg-opacity-10 p-4 rounded-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-circle"><ArrowRight size={16}/></div>
                  <span>Real-time Global Leaderboards</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-circle"><ArrowRight size={16}/></div>
                  <span>Win Exclusive Swag & Rewards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center py-5">
            <div className="w-100 px-4" style={{ maxWidth: '450px' }}>
              
              <div className="text-center mb-5">
                <h2 className="fw-bold text-dark">Create your account</h2>
                <p className="text-muted">Start your journey into the coding arena today.</p>
              </div>

              {status.msg && (
                <div className={`alert ${status.type === 'success' ? 'alert-success border-success' : 'alert-danger border-danger'} border-0 shadow-sm d-flex align-items-center mb-4`}>
                  {status.type === 'success' ? <CheckCircle2 className="me-2" size={18}/> : <AlertCircle className="me-2" size={18}/>}
                  <small className="fw-medium">{status.msg}</small>
                </div>
              )}

              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-uppercase text-muted">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 text-muted"><User size={18}/></span>
                    <input 
                      type="text"
                      className="form-control form-control-lg bg-light border-0 shadow-none fs-6" 
                      placeholder="John Doe"
                      required
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 text-muted"><Mail size={18}/></span>
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
                  <label className="form-label small fw-bold text-uppercase text-muted">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 text-muted"><Lock size={18}/></span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control form-control-lg bg-light border-0 shadow-none fs-6" 
                      placeholder="password"
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
                  <div className="form-text x-small mt-2">Must be at least 8 characters.</div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary btn-lg w-100 fw-bold shadow-sm py-3 mb-4 rounded-3 d-flex align-items-center justify-content-center"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : (
                    <>Sign Up <ArrowRight className="ms-2" size={18}/></>
                  )}
                </button>
              </form>

              <p className="text-center text-muted small mt-4">
                Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Log in here</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}