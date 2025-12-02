# CoderKing — Frontend

A polished React + Bootstrap frontend for the CoderKing live contest platform.

## Quick start

1. Node.js (>=16) & npm installed.
2. In project root:
   ```
   npm install
   npm start
   ```
3. App runs at http://localhost:3000

## Notes

- The frontend expects a backend API at `http://localhost:8080/api`. Edit `src/config.js` to change base API URL.
- This scaffold includes routes and components for:
  - Home, Contest List, Contest Details
  - Live Contest screen, Leaderboard, Certificate Download
  - Admin Dashboard, Organizer Panel, Login/Register
  - Basic Forum pages
- Certificate download is a stub that expects a PDF URL from the backend.

This project is a functional, production-ready scaffold. Fill in API integration and visuals as required.
