import React, { useEffect, useState } from "react"
import { NavLink,Link } from "react-router-dom"
import api from "../utils/api"  
import { API_BASE } from "../config";

export default function  CourseCard(){
  const [courses , setCourses]=useState([]);
  const [serchTerm, setSearchTerm] =useState("");
  //   const cources=[
  //       {
  //           name:'AI & ML',
  //           img:'',
  //           description:'This is the fantastic course',
  //           Domain:'AI'
  //       },
  //         {
  //           name:'AI & ML',
  //           img:'',
  //           description:'This is the fantastic course',
  //           Domain:'AI'
  //       },
  //         {
  //           name:'AI & ML',
  //           img:'',
  //           description:'This is the fantastic course',
  //           Domain:'AI'
  //       }
  //   ]

    useEffect(()=>{
      async function fetchCourses() {
        const resp=await api.get(`${API_BASE}/courses`);
           setCourses(resp.data);
      }
      fetchCourses();
    },[]);

    //filter logic
     const filteredCourse=courses
     .filter((course)=>{
      course.name.toLowerCase().includes(serchTerm.toLowerCase());
     })

    return (
      <>
      <div className="container mt-3">
        {/* filter form control*/}
        <div className="mb-3 gap-3 d-flex">
          <input
          type="text"
          className="form-control"
          placeholder="Search by name...."
          value={serchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </div>
      
          <section className="row">
            {courses.map((course,i)=>
            
            <div className="col-md-3 p-2" style={{height:'250px'}} key={courses.cid}>
                <Link to={`/course/${course.cid}`} style={{textDecoration:'none'}}>
                <div className="card text-center p-2">
                    <h2>{course.name}</h2>
                    {/* <img src={course.img}/> */}
                    <p>{course.creator}</p>
                    <p>{course.details}</p>
                    <p>{course.catagory}</p>
                </div> </Link>
            </div>
            )}
          </section>
          </div>
          </>
    )
}