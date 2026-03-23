import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function PastContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const resp = await api.get("/contests?status=COMPLETED");
    setContests(resp.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Past Contests</h2>
      <p className="text-muted">View completed contests, winners, and certificates issued.</p>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {contests.length === 0 ? (
            <div className="col-12">No completed contests yet.</div>
          ) : (
            contests.map(c => (
              <div className="col-md-4 mb-3" key={c.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{c.title}</h5>
                    <p className="text-muted">Completed on {c.endsAt ? new Date(c.endsAt).toLocaleDateString() : "-"}</p>
                    <p>Certificates issued: {c.certificatesIssued ?? "-"}</p>
                    <button className="btn btn-outline-secondary btn-sm">View Winners</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}