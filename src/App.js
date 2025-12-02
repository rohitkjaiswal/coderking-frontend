import React from 'react';
import { BrowserRouter, Routes, Route,Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contests from './pages/Contests';
import ContestDetails from './pages/ContestDetails';
import Leaderboard from './pages/Leaderboard';
import Certificate from './pages/Certificate';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OrganizerPanel from './pages/OrganizerPanel';
import AdminDashboard from './pages/AdminDashboard';
import Forum from './pages/Forum';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile/UserProfile';
import EditProfile from './pages/Profile/EditProfile';
import CreateContest from './pages/CreateContest';
import UserManagement from './components/UserManagement';
import ManageContests from './pages/ManageContests';
import ApprovalsPage from './pages/ApprovalsPage';
// import AnalyticsPage from './pages/AnalyticsPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import RequestOrganizerAccess from './pages/RequestOrganizerAccess';
import CourseCard from './components/CourseCard';
import CourseLayout from './components/CourseLayout';
import PastContests from './pages/PastContests';

const user = localStorage.getItem('token'); // stub for auth check


function App() {
  const courseId=useParams();

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container-fluid my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          
          //route for demo components
          <Route path="/course" element={<CourseCard/>} />
         <Route path="/course/:courseId/video/:videoId" element={<CourseLayout />} />
         <Route path="/course/:courseId" element={<CourseLayout/>} />
          <Route path="/contests" element={<Contests />} />
         <Route path="/profile/:id" element={user ?<Profile />:<Login />} />
         <Route path="/profile/:id/edit" element={<EditProfile />} />
         <Route path="/profile/:id/requests" element={<RequestOrganizerAccess />} />

          <Route path="/contests/:id" element={<ContestDetails />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/certificate/:id" element={<Certificate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/organizer" element={<OrganizerPanel />} />
          <Route path="/organizer/create-contest" element={<CreateContest />} />
          <Route path="/admin" element={<AdminDashboard />} />
           <Route
            path="/admin/approvals"
            // element={
            //   // <ProtectedRoute roles={["ADMIN"]}>
            //   //   <ApprovalsPage />
            //   // </ProtectedRoute>
            //   // <ApprovalsPage />
            // }
          />
          <Route path='/admin/past-contests' element={<PastContests/>}></Route>
          <Route path="/admin/create-contest" element={<CreateContest />} />
          <Route path="/admin/manage-contests" element={<ManageContests />} />
          {/* <Route path="/admin/analytics" element={<AnalyticsPage />} /> */}
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
