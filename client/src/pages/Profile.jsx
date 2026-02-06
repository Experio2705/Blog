import React from 'react'
import './css/profile.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFolder,faMessage,faAddressCard, faHome, faCircleUser,faEnvelope, faLocationDot, faCircleDot ,faFaceFrown,faBookmark} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
const Profile = () => {
    const navigate=useNavigate();
    const handleChange1=()=>{
      navigate('/Category');
    }
    const handleChange3=()=>{
      navigate('/Contact');
    }
    const handleChange5 = () => {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/HomePage',{replace:true});
    };

    const handleChange4=()=>{
      navigate('/Profile');
    }
    const handleChange2=()=>{
      navigate('/About');
    }
    const useremail=localStorage.getItem('userEmail');
    const [data,setdata]=useState([]);
    const [saved,setSaved]=useState([]);
      useEffect(() => {
          const isLoggedIn = localStorage.getItem("isLoggedIn");
          if (!isLoggedIn) {
            navigate("/Login", { replace: true });
          }
          }, [navigate]);
      
    useEffect(() => {
      const fetchProfile = async () => {
          try {
            const values = { useremail };
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/Profile`,values);
            if (res.data.length > 0) {
                setdata(res.data); 
                console.log(res.data);
              }
            }
            catch (err) {
              console.log(err);
              }
          };
      fetchProfile();
      }, []);
    useEffect(() => {
      const fetchProfile = async () => {
          try {
            const values = { useremail };
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/Saved`,values);
            if (res.data.length > 0) {
                setSaved(res.data); 
                console.log(res.data);
              }
            }
            catch (err) {
              console.log(err);
              }
          };
      fetchProfile();
      }, []);
  const count=data.length;
  console.log(count);
  const handleId1=(id)=>{
    localStorage.setItem('fetchId',id);
    console.log("Profile:",id);
    navigate('/Home');
  }
  const handleId2=(id)=>{
    localStorage.setItem('fetchId',id);
    console.log(id);
    navigate('/Home');
  }
  const blogs = data.filter(item => item.id !== null);
  return (
    <div className='about-us-outer' style={{fontFamily:"sans-serif"}}>
            <div className="home-navbar-top" >
                <div className="home-logo" style={{marginRight:"27%"}}>
                    <div className="home-logo-sym"></div>
                    <div className="home-logo-name" style={{fontSize:"2.4rem",
                        display:"flex",justifyContent:"center",alignItems:"center",
                        marginLeft:"2%", fontFamily:"ui-sans-serif",fontWeight:"600"
                    }}>blog</div>
                </div>
                <div className="home-buttons" style={{marginRight:"11%",width:"40%"}}>
                    <button className='home-but1' style={{marginRight:"3%"}}onClick={()=>handleChange4()}><FontAwesomeIcon icon={faUser} />Profile</button>
                    <button className='home-but1' style={{marginRight:"3%"}} onClick={()=>handleChange1()}><FontAwesomeIcon icon={faFolder} />Category</button>
                    <button className='home-but1' style={{marginRight:"3%"}} onClick={()=>handleChange2()}><FontAwesomeIcon icon={faAddressCard} />About</button>
                    <button className='home-but1'  onClick={()=>handleChange3()}><FontAwesomeIcon icon={faMessage} />Contact</button>
                </div>
                <div className="home-create">
                    <button className='home-but2' onClick={()=>handleChange5()}>Log Out</button>
                </div>
            </div>
          <div className="line" style={{height:"0.3%"}}></div>
          <div className='profile-slogan' >
              <p style={{fontSize:"3rem",padding:"2% 5% 0% 5%"}}>Profile</p>
              <p style={{fontSize:"1.5rem",padding:"0% 5% 2% 5%",color:"#545254"}}>Learning, building, and growing every day.</p>
            </div>
          <div className="line" style={{height:"0.3%"}}></div>
            {data.length>0 && (
              <div className="profile" >
                <div className="profile-content">
                  <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "9.5rem", color: "#053357" }}/>
                  <div className="profile-name">
                      <p style={{ marginTop: "60px", fontSize: "1.6rem" }}>{data[0].username}</p>
                      <p style={{ fontSize: "1.2rem", color: "#444446" }}>{data[0].email}</p>
                    </div>
                  </div>
                <div className="profile-info" style={{ color: "#053357" }}>
                    <p style={{ fontSize: "1.4rem" }}>Bio</p>
                    <p style={{ fontSize: "1.1rem", marginBottom: "2%" }}>{data[0].bio}</p>
                    <div className="profile-info-more">
                        <p style={{ marginRight: "10px" }}><FontAwesomeIcon icon={faEnvelope} /> {data[0].email}</p>
                        <p><FontAwesomeIcon icon={faLocationDot} /> {data[0].address}</p>
                      </div>
                  </div>
              </div>
            )}
    {blogs.length>0 ?(
        <div className="recent-actvity">
          <p style={{fontSize:"1.6rem",marginBottom:"2%"}}>Recent Activity</p>
          {blogs.map((items)=>(
            <div className="profile-title" style={{display:"flex"}} key={items.id}>
              <p style={{fontSize:"1.1rem",marginRight:"1%"}}><FontAwesomeIcon icon={faCircleDot} style={{color: "#174fb0",}} />Published a new blog</p>
              <p className='prof-title' onClick={()=>handleId1(items.id)} style={{fontSize:"1.1rem"}}>"{items.title}"</p>
              <div className="line" style={{height:"10px", backgroundColor:"grey",marginBottom:"4%"}}></div>
            </div>
              ))}
          </div>
        ):(
        <div className="data-absent" style={{margin:"0% 5% 2% 5%",height:"30%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"10px"}}>
          <p style={{fontSize:"5.4rem",marginBottom:""}}><FontAwesomeIcon icon={faFaceFrown} style={{color: "#3a5a92",}} /></p>
          <h1 style={{color:"grey"}}>No Blogs Published</h1>
          <p style={{color:"grey"}}>create blogs to display</p>
          </div>
          )
      }
      {saved.length>0 ?(
        <div className="recent-actvity">
          <p style={{fontSize:"1.6rem",marginBottom:"2%"}}>Saved Blogs</p>
          {saved.map((item)=>(
            <div className="profile-title" style={{display:"flex"}} key={item.id}>
              <p style={{fontSize:"1.1rem",marginRight:"1%"}}><FontAwesomeIcon icon={faCircleDot} style={{color: "#174fb0",}} />Saved a blog </p>
              <p className='prof-title' onClick={()=>handleId2(item.blog_id)} style={{fontSize:"1.1rem",width:"84%"}}>"{item.blog_title}"</p>
              <p style={{marginLeft:"0%"}}><FontAwesomeIcon icon={faBookmark} style={{color: "#174fb0",}} /></p>
              <div className="line" style={{height:"10px", backgroundColor:"grey",marginBottom:"4%"}}></div>
            </div>
              ))}
          </div>
        ):(
        <div className="data-absent" style={{margin:"0% 5% 2% 5%",height:"30%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"10px"}}>
          <p style={{fontSize:"5.4rem",marginBottom:""}}><FontAwesomeIcon icon={faFaceFrown} style={{color: "#3a5a92",}} /></p>
          <h1 style={{color:"grey"}}>No Blogs Saved</h1>
          <p style={{color:"grey"}}>Save blogs to display</p>
          </div>
          )
      }
    <Footer></Footer>
    </div>
  )
}

export default Profile

