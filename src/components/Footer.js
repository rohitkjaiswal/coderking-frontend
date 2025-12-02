import React from "react";

import footerbg from '../assets/footerbg.png'
export default function () {
  return (
    <footer >
      <section className="row g-2" >
        <div className="col-md-6" style={{height:'300px'}}>
            <section className="row g-2" style={{backgroundImage:`${footerbg}`}}>
                <h3 style={{color:'darkpink', fontWeight:'900'}} >important links</h3>
                <div className="col-md-6">
                  <li style={{listStyle:'none'}}>contasts</li>
                  <li style={{listStyle:'none'}}>profile</li>
                </div>
                <div className="col-md-6">
                   <li style={{listStyle:'none'}}>leaderboard</li>
                  <li style={{listStyle:'none'}}>About</li>
                </div>
            </section>
            
          </div>
          
           <div className="col-md-6" style={{height:'300px'}}>
            
            <section className="row g-2">
                <h3 style={{color:'darkpink', fontWeight:'900'}}>social media handles</h3>
                <div className="col-md-6">
                  <li style={{listStyle:'none'}}>contasts</li>
                  <li style={{listStyle:'none'}}>profile</li>
                </div>
                <div className="col-md-6">
                   <li style={{listStyle:'none'}}>leaderboard</li>
                  <li style={{listStyle:'none'}}>About</li>
                </div>
            </section>
           
            
          </div>
      </section>
       <p className="bg-secondary">All rights reserved coderking@com</p>
    </footer>
  );
}
