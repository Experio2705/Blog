import React from 'react'
import './css/about.css'
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFolder,faMessage,faAddressCard,faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
const About = () => {
  const navigate=useNavigate();
    const handleChange1=()=>{
      navigate('/Category');
    }
    const handleChange3=()=>{
      navigate('/Profile');
    }
    const handleChange4=()=>{
      navigate('/CreateBlog');
    }
    const handleChange5=()=>{
      navigate('/Home');
    }
    const handleChange2=()=>{
      navigate('/Contact');
    }
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        navigate("/Login", { replace: true });
      }
      }, [navigate]);
  
  return (
      <div className='about-us-outer' style={{fontFamily:"sans-serif"}}>
          <Navbar></Navbar>
          <div className="line" style={{height:"0.3%"}}></div>
          <div className="about-motive">
            <div className="about-motive-content" style={{textAlign:"center"}}>
              <p className='about-motive-content1' style={{fontSize:"3rem"}}>Empowering Students to Share Their Stories</p>
              <p style={{fontSize:"1.2rem"}}>StudentBlog is a platform built by students, for students. We believe every</p>
              <p style={{fontSize:"1.2rem"}}>student has unique insights and experiences worth sharing with the world.</p>
            </div>
          </div>
          <div className="about-mission" style={{display:"flex",padding:"4%"}}>
            <div className="about-mission-left" style={{fontFamily:"sans-serif"}}>
              <p style={{fontSize:"2.5rem",marginBottom:"6%"}}>Our Mission</p>
              <p style={{fontSize:"1.1rem" ,marginBottom:"4%"}}>We're on a mission to create a vibrant community where students from all backgrounds can share their knowledge, experiences, and perspectives through blogging.</p>
              <p style={{fontSize:"1.1rem" ,marginBottom:"4%"}}>Whether you're passionate about technology, education, lifestyle, or AI, StudentBlog provides you with the tools and audience to make your voice heard.</p>
              <p><FontAwesomeIcon icon={faHeart} style={{color: "#ff0000",}} /> Made with love by Aryan, for students</p>
            </div>
            <div className="about-mission-right"></div>
          </div>
          <div className="about-myself" style={{padding:"0% 4% 4% 4%",display:"flex"}}>
            <div className="about-myself-left" style={{fontFamily:"sans-serif"}}>
              <p style={{fontSize:"2.5rem",marginBottom:"2%"}}>About me</p>
              <p style={{fontSize:"1.1rem" ,marginBottom:"2%"}}>I am a motivated learner and aspiring software developer with a strong interest in web development and modern technologies. This blog serves as a platform where I share my knowledge, projects, and experiences as I continue to grow in the field of technology.</p>
              <p style={{fontSize:"1.1rem" ,marginBottom:"4%"}}>I enjoy working with front-end and back-end tools, learning new concepts, and applying them through practical projects. I believe in continuous learning and improving my skills through hands-on development and problem-solving.</p>
              <p>Through this blog, my goal is to create clear, informative, and beginner-friendly content while documenting my professional and technical journey.</p>
            </div>
            <div className="about-myself-right"></div>
          </div>
                    <div className="about-motive">
            <div className="about-motive-content" style={{textAlign:"center"}}>
              <p style={{fontSize:"3rem"}}>Ready to Share Your Story?</p>
              <p style={{fontSize:"1.2rem"}}>Join thousands of students who are already sharing their knowledge</p>
              <p style={{fontSize:"1.2rem",marginBottom:"4%"}}>and experiences on StudentBlog.</p>
              <button onClick={()=>handleChange4()} className='about-button' >Start Writing Today</button>
            </div>
          </div>
        </div>
  )
}

export default About