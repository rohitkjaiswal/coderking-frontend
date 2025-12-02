// import React, { useEffect, useState } from "react";
// import api from "../utils/api";

// export default function RequestOrganizerAccess() {
//   const [status, setStatus] = useState(null); // "NONE" | "PENDING" | "APPROVED"
//   const [message, setMessage] = useState("");

//   const load = async () => {
//     const resp = await api.get("/users/organizer-request-status");
//     setStatus(resp.data.status); // expect "NONE" | "PENDING" | "APPROVED"
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const requestAccess = async () => {
//     try {
//       await api.post("/users/request-organizer");
//       setMessage("Request submitted. An admin will review your application.");
//       await load();
//     } catch (e) {
//       setMessage("Failed to submit request.");
//     }
//   };

//   return (
//     <div className="container mt-4" style={{ maxWidth: 640 }}>
//       <h2 className="fw-bold mb-3">Request Organizer Access</h2>
//       <p className="text-muted">Apply to become an organizer to create and manage contests.</p>

//       {status === "APPROVED" && <div className="alert alert-success">You are already approved as an organizer.</div>}
//       {status === "PENDING" && <div className="alert alert-info">Your request is pending approval.</div>}
//       {message && <div className="alert alert-secondary">{message}</div>}

//       {status === "NONE" && (
//         <button className="btn btn-primary" onClick={requestAccess}>
//           Request Access
//         </button>
//       )}
//     </div>
//   );
// }