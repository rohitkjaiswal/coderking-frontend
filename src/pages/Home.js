import React from "react";
import { Link } from "react-router-dom";
import bg_img from "../assets/coding-backgroundpage.webp";
import img1 from "../assets/girlwithbag.jpg";
import Footer from "../components/Footer";
import FreeCourcesData from "../localData/FreeCourcesData";
import TrendingCources from "../localData/TrendingCources";

export default function Home() {
  return (
    <div className="text-center container-fluid p-0">
      <header
        className="py-5 d-flex flex-column justify-content-center align-items-center container-fluid"
        style={{
          height: "100vh",
          backgroundImage: `url(${bg_img})`,
          backgroundSize: "cover",
          backgroundBlendMode: "darken",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <h1
          className="text-danger"
          style={{ fontSize: "72px", fontStyle: "oblique", fontWeight: "800" }}
        >
          CoderKing
        </h1>
        <h1 className="lead text-primary" style={{ fontWeight: "500" }}>
          Join live coding contests, climb leaderboards, and earn certificates.
        </h1>
        <span className="mb-4 text-secondary">
          For coders of all levels — from beginners to pros.
          <br />
          <Link to="/contests" className="btn btn-primary me-2"  target="_blank">
            View Contests
          </Link>
          <Link to="/register" className="btn btn-outline-secondary">
            Get Started
          </Link>
        </span>
      </header>

      <section className="row g-3 my-3">
        <div className="col-md-6">
          
          <div className="card p-3" style={{height:'300px',display:'flex', justifyContent:'center',border:'none'}}>
            <h1 style={{color:'orange',fontWeight:'700'}}>Upcoming Contests</h1>
            <a src="http://localhost:3000/contests">
              here
              <img src=""></img>
            </a>
            <p>
              Automated statuses: upcoming → live → completed. Subscribe to
              notifications.
            </p>
            <Link to="/contests" className="btn btn-outline-secondary">
              See contests
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          
          <div className="card p-3" style={{height:'300px',display:'flex', justifyContent:'center', border:'none'}}>
            <h1 style={{color:'darkred',fontWeight:'700'}}>Leaderboard</h1>
            <p>Track wins, participation points and badges.</p>
            <Link to="/leaderboard" className="btn btn-outline-secondary">
              Open leaderboard
            </Link>
          </div>
        </div>
      </section>
        
      <section className="row g-2 " >
        <div className="col-md-6">
          <div  className="card p-3" style={{height:'500px',display:'flex', justifyContent:'center',border:'none'}}>
            <h3 style={{fontWeight:'800',color:'blue'}}>Hey coders</h3>
            <p>This is a free resource prowider website. where you can get multiple free resources . just you shuld be will to learn or eager to learn more . just get sign up in single click then take up to yourself under sea of resources . but use these cources only for eduactional purpose</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-2" style={{height:'500px', border:'none'}} >
            <img src={img1}></img>
          </div>
        </div>
      </section>
      <section className="row mt-3 p-2">
        <h1 align='left' style={{color:'orange', fontWeight:'800'}}>Popular free cources</h1>

        {FreeCourcesData.map((course)=>(
        <div className="col-md-3" >
          <div className="card p-2" style={{height:'350px'}}>
            <img src={course.img_src} style={{height:'250px'}}/>
            <h5 className="card-tittle mt-2">{course.name}</h5>
             <p>By : {course.creator}</p>
          </div>
        </div>
         ))}
      </section>

      <section className="row mt-3 p-2">
        <h1 align='left' style={{color:'orange', fontWeight:'800'}}>Trending  cources</h1>

        {TrendingCources.map((course)=>(
        <div className="col-md-3 wrap-2" >
          <div className="card p-2" style={{height:'350px'}}>
            <img src={course.img_src} style={{height:'250px'}}/>
            <h5 className="card-tittle mt-2">{course.name}</h5>
             <p>By : {course.creator}</p>
          </div>
        </div>
         ))}
      </section>

      <hr></hr>
      <Footer/>
    </div>
  );
}
