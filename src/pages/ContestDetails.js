import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { API_BASE } from "../config";
import { jwtDecode } from "jwt-decode";

export default function ContestDetail() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [participants, setParticipants] = useState([]);

  const currentUserId = (() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId || null;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    async function fetchContest() {
      try {
        const resp = await api.get(`${API_BASE}/contests/${id}`);
        setContest(resp.data);
      } catch (err) {
        console.error("Contest fetch failed:", err.response?.data || err.message);
      }
    }

    async function fetchParticipants() {
      try {
        const resp = await api.get(`${API_BASE}/user/contest/${id}/participants`);
        setParticipants(resp.data);
      } catch (err) {
        console.error("Participants fetch failed:", err.response?.data || err.message);
      }
    }

    fetchContest();
    fetchParticipants();
  }, [id]);


  const joinContest = async (id,currentUserId ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // decode if you want to inspect payload, but not needed for backend
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);

      // backend will infer userId from JWT, so no query param needed
      await api.post(`${API_BASE}/user/contest/${id}/join`,{userId: currentUserId}
        //,{
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },  
     // }
    )
    .then(resp=>console.log("joined :",resp.data));

      // refresh participants list
      const resp = await api.get(`${API_BASE}/user/contest/${id}/participants`);
      setParticipants(resp.data);
    } catch (err) {
      console.error("Join failed:", err.response?.data || err.message);
    }
  };

   // Assign medal colors for top 3
  const getMedalColor = (rank) => {
    if (rank === 1) return "#FFD700"; // Gold
    if (rank === 2) return "#C0C0C0"; // Silver
    if (rank === 3) return "#CD7F32"; // Bronze
    return "#4e73df"; // Default blue
  };


  if (!contest) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{contest.title}</h2>
      <p>{contest.description}</p>
      <p><strong>Rewards:</strong> {contest.rewards}</p>
      <p className="text-success">Starts: {new Date(contest.startsAt).toLocaleString()} </p>
     { (new Date(contest.startsAt)>new Date()) ?
      <button className="btn btn-success mb-3" onClick={() => joinContest(id,currentUserId)}>
        🚀 Join Contest
      </button>
      
:<>
      <h4>Participants</h4>
      <ul className="list-group">
        {participants.map((p,i) => (
          <Link to={`/profile/${p.user.id}`} className="border" style={{textDecoration:'none'}}>

          <li key={i} className="list-group-item btn btn-outline-secondary text-start" >

            <span className="text">{p.rank ?? i+1}   </span>

            <span  className="text-end px-5 " >{p.user.name}</span>
            {/* Score: {p.user.score} — Rank: {p.rank ?? } */}
             
          </li>
        </Link>
        ))}
      </ul>

    

      <Link to={`/contests/${id}/leaderboard`} className="btn btn-outline-primary mt-3">
        View Leaderboard
      </Link>
      </>
}
    </div>
  );
}