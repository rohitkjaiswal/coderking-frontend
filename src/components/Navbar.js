import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import styles from './Hovers.css';

export default function Navbar() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Try multiple possible keys
        const id =
          decoded.userId ||
          decoded.id ||
          decoded.uid ||
          decoded.sub || // often used in Spring JWT
          null;

        setUserId(id);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">CoderKing</Link>
          {/* {userId && (
            <Link className="nav-link text-white" to={`/profile/${userId}`}>
              Profile
            </Link>
          )} */}
            {/* <Link className="nav-link text-white" to="/organizer/create-contest">
              Create Contest
            </Link>    */}
          
          

        </span>
        
          <span style={{display:'flex', }}>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>
        {userId && (
            <Link className="nav-link text-white my-2" to={`/profile/${userId}`}>
              Profile
            </Link>
          )}
        </span>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/contests">Contests</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
            <li className="nav-item text-secondary hoverCss">Cources</li>
            <div className='cources' >
              <ul className='me-auto mb-2 mb-lg-9'>
            <li className="nav-item text-secondary">Programming Language</li>
            <li className="nav-item text-secondary">Web tech</li>
            <li className="nav-item text-secondary">Frontend Developer</li>
            <li className="nav-item text-secondary">Backend developer</li>
              </ul>
            </div>
            <li className="nav-item text-muted"><NavLink className="nav-link" to="/forum">Forum</NavLink></li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {!userId ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        
      </div>
      
    </nav>
  );
}