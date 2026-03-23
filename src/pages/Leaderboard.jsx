import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, Cell, CartesianGrid 
} from "recharts";
import { Trophy, Medal, Search, TrendingUp, User } from "lucide-react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/leaderboard")
      .then((r) => setData(r.data))
      .catch(() => setData(sample()));
  }, []);

  function sample() {
    return [
      { name: "Alice", points: 240 },
      { name: "Bob", points: 190 },
      { name: "Charlie", points: 120 },
      { name: "David", points: 100 },
      { name: "Eve", points: 95 },
      { name: "Frank", points: 80 },
    ];
  }

  const getMedalColor = (rank) => {
    if (rank === 1) return "#FFD700"; // Gold
    if (rank === 2) return "#94a3b8"; // Silver (Modern Slate)
    if (rank === 3) return "#b45309"; // Bronze
    return "#e2e8f0"; // Default light gray
  };

  const filteredData = data.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-dark d-flex align-items-center justify-content-center gap-3">
            <Trophy className="text-warning" size={40} /> Global Leaderboard
          </h1>
          <p className="text-muted">Top performers across all active contests</p>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="row g-4 mb-5 align-items-end justify-content-center">
          {data.slice(0, 3).map((player, index) => (
            <div key={player.name} className={`col-md-4 col-lg-3 order-${index === 0 ? 2 : index === 1 ? 1 : 3}`}>
              <div className={`card border-0 shadow-sm text-center p-4 rounded-4 ${index === 0 ? 'border-top border-4 border-warning bg-white mb-3' : 'bg-light'}`} 
                   style={{ transform: index === 0 ? 'scale(1.1)' : 'scale(1)' }}>
                <div className="mb-2">
                  <Medal size={index === 0 ? 48 : 32} color={getMedalColor(index + 1)} />
                </div>
                <h5 className="fw-bold mb-1">{player.name}</h5>
                <div className="badge bg-dark rounded-pill px-3">{player.points} PTS</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Chart Section */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0 d-flex align-items-center">
                  <TrendingUp className="me-2 text-primary" size={20} /> Performance Overview
                </h5>
              </div>
              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <BarChart data={data.slice(0, 10)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Bar dataKey="points" radius={[6, 6, 0, 0]} barSize={40}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getMedalColor(index + 1)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
              <div className="p-4 border-bottom bg-white sticky-top">
                <div className="input-group input-group-sm bg-light rounded-pill px-3 py-1">
                  <Search size={16} className="text-muted mt-1 me-2" />
                  <input 
                    type="text" 
                    className="form-control border-0 bg-transparent shadow-none" 
                    placeholder="Find a player..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="table-responsive" style={{ maxHeight: '400px' }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr className="small text-uppercase text-muted">
                      <th className="ps-4 py-3">Rank</th>
                      <th className="py-3">User</th>
                      <th className="text-end pe-4 py-3">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((d, i) => (
                      <tr key={d.name}>
                        <td className="ps-4 py-3 fw-bold text-secondary">
                          #{data.findIndex(item => item.name === d.name) + 1}
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2">
                              <User size={14} className="text-primary" />
                            </div>
                            <span className="fw-semibold">{d.name}</span>
                          </div>
                        </td>
                        <td className="text-end pe-4 py-3 fw-bold text-primary">
                          {d.points.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .table-hover tbody tr:hover {
          background-color: #f8fafc;
          transition: background-color 0.2s ease;
        }
      `}</style>
    </div>
  );
}