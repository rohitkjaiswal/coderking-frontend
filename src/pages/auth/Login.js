import React, {useState} from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../config';

export default function Login(){
  const [form, setForm] = useState({email:'', password:''});
  const [error, setError] = useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const resp = await api.post('/auth/login', form);
      // store token (stub)
      localStorage.setItem('token', resp.data.token || 'demo-token');
      nav('/')
      console.log('Login successful');
    } catch(err){
      setError('Login failed');
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit} method='POST'>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}
