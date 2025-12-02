import React, { useEffect, useState } from "react";
import api from "../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Leaderboard() {
  const [data, setData] = useState([]);

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
    ];
  }

  // Assign medal colors for top 3
  const getMedalColor = (rank) => {
    if (rank === 1) return "#FFD700"; // Gold
    if (rank === 2) return "#C0C0C0"; // Silver
    if (rank === 3) return "#CD7F32"; // Bronze
    return "#4e73df"; // Default blue
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4 text-center">🏆 Contest Leaderboard</h2>

      {/* Chart Section */}
      <div className="card shadow-sm p-3 mb-4">
        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="points"
                radius={[8, 8, 0, 0]}
                fill="#4e73df"
              >
                {data.map((entry, index) => (
                  <cell key={`cell-${index}`} fill={getMedalColor(index + 1)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Detailed Rankings</h5>
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={d.name}>
                  <td>
                    <span
                      className="badge fs-6"
                      style={{
                        backgroundColor: getMedalColor(i + 1),
                        color: i < 3 ? "#000" : "#fff",
                      }}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td>{d.name}</td>
                  <td className="fw-bold">{d.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}