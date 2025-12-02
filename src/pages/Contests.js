import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { API_BASE } from "../config";

export default function Contests() {
  const [contests, setContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");


  useEffect(() => {
    async function fetchContests() {
      const resp = await api.get(`${API_BASE}/contests`);
      setContests(resp.data);
    }
    fetchContests();
  }, []);


  // Filtering logic
  const filteredContests = contests
    .filter((contest) =>
      contest.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((contest) => {
      if (!filterDate) return true;
      const start = new Date(contest.startsAt);
      return start.toLocaleDateString() === new Date(filterDate).toLocaleDateString();
    })
    .sort((a, b) => {
      const now = new Date();
      const startA = new Date(a.startsAt);
      const endA = new Date(a.endsAt);
      const startB = new Date(b.startsAt);
      const endB = new Date(b.endsAt);

      const statusA =
        endA < now
          ? "COMPLETED"
          : startA <= now && endA >= now

           ? "Live"
          : "Upcoming";

      const statusB =
        endB < now
          ? "COMPLETED"
          : startB <= now && endB >= now
          ? "Live"
          : "Upcoming";

      const order = { Upcoming: 0, Live: 1, Completed: 2 };
      return order[statusA] - order[statusB];
    });





  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Contests</h2>

      {/* Filter controls */}
      <div className="mb-3 d-flex gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredContests.map((contest) => {
          const now = new Date();
          const start = new Date(contest.startsAt);
          const end = new Date(contest.endsAt);

          let status = "";
          let textColor = "";

          if (end < now) {
            status = "COMPLETED";
            textColor = "text-danger";
          } else if (start <= now && end >= now) {
            status = "Live";
            textColor = "text-success";
          } else {
            status = "Upcoming";
            textColor = "text-secondary";
          }

          return (
            <div key={contest.id} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{contest.title}</h5>
                  <p className={textColor}>{status}</p>
                  <p>
                    Starts: {start.toLocaleString()} <br />
                    Ends: {end.toLocaleString()}
                  </p>
{status === "Live" ? (
                    <Link
                      to={`/contests/${contest.id}`}
                      className="btn btn-primary mt-2"
                    >
                      Join Contest
                    </Link>
                  ) : (
                    <Link
                      to={`/contests/${contest.id}`}
                      className="btn btn-outline-secondary mt-2"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




