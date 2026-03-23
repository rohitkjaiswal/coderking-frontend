import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";  
import "./CourseCard.css";

export default function CourseCard() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const resp = await api.get("/courses");
        setCourses(resp.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // Fixed Filter Logic
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-page-wrapper mt-5">
      <div className="container">
        {/* Search Section */}
        <div className="search-container mb-5">
          <div className="search-glass">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search for a skill or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Section */}
        <section className="row g-4">
          {loading ? (
            <div className="text-center py-5 text-muted">Loading courses...</div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No courses found matching "{searchTerm}"</h4>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={course.cid}>
                <Link to={`/course/${course.cid}`} className="course-card-link">
                  <div className="modern-card">
                    <div className="card-badge">{course.catagory || "Programming"}</div>
                    
                    <div className="card-content">
                      <h3 className="course-title">{course.name}</h3>
                      <p className="instructor">By {course.creator}</p>
                      <p className="description-preview">{course.details}</p>
                    </div>

                    <div className="card-footer-ui">
                      <span className="learn-more">Get Started</span>
                      <div className="arrow-icon">→</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}