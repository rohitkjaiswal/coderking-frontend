import React, {useState} from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', password:''});
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      await api.post('https://coderking-backend-production.up.railway.app/api/auth/register', form);
      setMsg('Registration successful. Please login.');
      setTimeout(()=>nav('/login'), 1200);
    } catch(e){ setMsg('Registration failed'); }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        {msg && <div className="alert alert-info">{msg}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}
