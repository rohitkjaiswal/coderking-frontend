import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from '../utils/api';
import Footer from "./Footer";
import "./CourseLayout.css";

export default function CourseLayout() {
  const { courseId, videoId } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [course, setCourse] = useState(null);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        const resp = await api.get(`/courses/${courseId}`);
        setCourse(resp.data);
        setPlaylists(resp.data.playlists || []);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (playlists.length > 0) {
      const selected = playlists.find((p) => p.pid === Number(videoId)) || playlists[0];
      setCurrentVideo(selected);
    }
  }, [videoId, playlists]);

  const toggleWatched = (id) => {
    setWatched(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const progressPercent = playlists.length > 0 ? (watched.length / playlists.length) * 100 : 0;

  return (
    <div className="course-player-container">
      {/* Header Section */}
      <header className="course-header p-4 glass-card mb-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb small text-uppercase">
                  <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
                  <li className="breadcrumb-item active text-primary">{course?.name}</li>
                </ol>
              </nav>
              <h1 className="display-6 fw-bold text-light">{loading ? "Loading Course..." : course?.name}</h1>
              <p className="text-muted mb-0">Instructed by <span className="text-white fw-bold">{course?.creator}</span></p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
               <div className="progress-container">
                  <div className="d-flex justify-content-between mb-1 small">
                    <span>Course Progress</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="progress custom-progress">
                    <div className="progress-bar bg-primary-accent" style={{ width: `${progressPercent}%` }}></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid pb-5">
        <div className="row g-4">
          {/* Sidebar Playlist - Hidden on small screens or moved to bottom */}
          <aside className="col-lg-3 order-2 order-lg-1">
            <div className="playlist-card glass-card h-100">
              <div className="p-3 border-bottom border-secondary border-opacity-25">
                <h5 className="mb-0 fw-bold">Course Content</h5>
                <small className="text-muted">{playlists.length} Lessons</small>
              </div>
              <div className="playlist-scroll">
                {playlists.map((p, i) => (
                  <Link
                    key={p.pid}
                    to={`/course/${courseId}/video/${p.pid}`}
                    className={`playlist-item ${p.pid === Number(videoId) ? "active" : ""}`}
                  >
                    <div className="d-flex align-items-center">
                      <span className="lesson-number me-3">{i + 1}</span>
                      <div className="flex-grow-1">
                        <div className="lesson-title">{p.name}</div>
                        {watched.includes(p.pid) && <span className="status-badge">Completed</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Video Playback Area */}
          <main className="col-lg-9 order-1 order-lg-2">
            <div className="video-viewport glass-card">
              {currentVideo ? (
                <>
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={currentVideo.videoUrl}
                      title={currentVideo.name}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="video-details p-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <h3 className="fw-bold text-light mb-2">{currentVideo.name}</h3>
                      <button 
                        className={`btn btn-sm ${watched.includes(currentVideo.pid) ? 'btn-success' : 'btn-outline-primary'}`}
                        onClick={() => toggleWatched(currentVideo.pid)}
                      >
                        {watched.includes(currentVideo.pid) ? '✓ Completed' : 'Mark as Done'}
                      </button>
                    </div>
                    <p className="text-muted mt-3">{course?.details}</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary"></div>
                  <p className="mt-3">Preparing your lesson...</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}