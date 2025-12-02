import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import img from "../assets/coding-backgroundpage.webp";
import { API_BASE } from "../config";
import api from '../utils/api'
import Footer from "./Footer";

export default function CourseLayout() {
  const { courseId, videoId } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [course, setCourse] = useState(null);
  const [watched, setWatched] = useState([]); // track watched video IDs
  const [loading, setLoading] = useState(true);

  // Fetch course only when courseId changes
  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        const resp = await api.get(`${API_BASE}/courses/${courseId}`);
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

  // Update current video when videoId or playlists change
  useEffect(() => {
    if (playlists.length > 0) {
      const selected =
        playlists.find((p) => p.pid === Number(videoId)) || playlists[0];
      setCurrentVideo(selected);
    }
  }, [videoId, playlists]);

  // Mark video as watched when it changes
  useEffect(() => {
    if (currentVideo && !watched.includes(currentVideo.pid)) {
      setWatched((prev) => [...prev, currentVideo.pid]);
    }
  }, [currentVideo]);

  // Calculate progress
  const progressPercent =
    playlists.length > 0 ? (watched.length / playlists.length) * 100 : 0;

  return (
    <>
      <section className="row">
        <h1 className="text-primary text-center fw-bold">
          {loading ? "Loading..." : course?.name}
        </h1>
        <div className="col-md-7 text-center">
          <div className="Card">
           
            <h5>{course?.creator}</h5>
            <p>{course?.details}</p>

            {/* Progress bar */}
            {playlists.length > 0 && (
              <div className="progress mt-3">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${progressPercent}%` }}
                >
                  {watched.length}/{playlists.length} watched
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-3 text-center">
          {course?.image && (
            <img src={course.image} className="img-fluid" alt="course" />
          )}
        </div>
      </section>

      <hr />

      <section className="row">
        {/* Playlist */}
        <div className="col-md-3 text-center">
          <div className="Card">
            <h3>Content</h3>
            <hr />
            {playlists.length === 0 ? (
              <p>No content available</p>
            ) : (
              playlists.map((p, i) => (
                <Link
                  key={p.pid}
                  to={`/course/${courseId}/video/${p.pid}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className={`Card border px-4 py-2 my-1 text-secondary playlist-btn ${
                      p.pid === Number(videoId) ? "active-playlist" : ""
                    }`}
                  >
                    <span>
                      {i + 1}. {p.name}
                    </span>
                    {watched.includes(p.pid) && (
                      <span className="badge bg-success ms-2">✓ Watched</span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Video Playback */}
        <div className="col-md-9 text-center bg-dark py-3">
          <div className="Card bg-dark text-light p-3">
            {currentVideo ? (
              <>
                <h4>{currentVideo.name}</h4>
                <iframe
                  width="100%"
                  height="480"
                  src={currentVideo.videoUrl}
                  title={currentVideo.name}
                  allowFullScreen
                  className="rounded"
                ></iframe>
              </>
            ) : (
              <p className="text-light">Select a video to play</p>
            )}
          </div>
        </div>
      </section>
      <small>All rights goes to Youtube@India</small>
      <hr></hr>
      <center><Footer/></center>
      
    </>
  );
}
