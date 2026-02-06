import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './css/Home.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft ,faCircle ,faCircleUser,faBookmark as bookmark} from '@fortawesome/free-solid-svg-icons'
import { faHeart,faBookmark,faShareFromSquare,faUser } from "@fortawesome/free-regular-svg-icons";

import axios from 'axios'
const Home = () => {
  const navigate=useNavigate();
  const [content1,setcontent]=useState(false);
  const [data,setdata]=useState({});
  const usermail=localStorage.getItem('userEmail');
  console.log(usermail);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/Login", { replace: true });
    }
    }, [navigate]);
  const id=localStorage.getItem('fetchId');
  const userEmail=localStorage.getItem('userEmail')
  const userName=localStorage.getItem('userName');
  console.log(userEmail);
  console.log(id);
  useEffect(()=>{
    const fetchData =async () => {
      try{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/Home?id=${id}`);
      const data = res.data;
      setdata(data);
      }
        catch(err){
        console.log(err);
      }
    }
    if(id){
      fetchData();
    }
  },[id]);
  console.log(data);
  const handleChange=()=>{
    navigate('/Category');
  }
  const [liked,setliked]=useState(false);
  const [copied,setCopied]=useState(false);
  const [saved,setSaved]=useState(false);
  const handleLike=async()=>{
    try{
      const values={id,userEmail};
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/Home/Like`,values);
      setliked(res.data.liked);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
  if (!data.likedby || !userEmail) return;

  const likedUsers = data.likedby.split(",");
  setliked(likedUsers.includes(userEmail));
  }, [data.likedby, userEmail]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };
  useEffect(() => {
    setCopied(false);
  }, [id]);

  const handleSave=async()=>{
    const values={
      blog_id:data.id,
      blog_title:data.title,
      userEmail};
        try{
          const res=await axios.post(`${import.meta.env.VITE_API_URL}/Home/Save`,values)
          setSaved(res.data.saved);
        }
        catch(err){
          console.log(err);
        }
  }
  useEffect(() => {
    if (!data.id || !userEmail) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/Home/SavedStatus`, {
        params: { blog_id: data.id, userEmail }
      })
      .then(res => setSaved(res.data.saved))
      .catch(console.log);
  }, [data.id, userEmail]);

  return (
    <div className='Home' style={{fontFamily:"sans-serif"}}>
      <Navbar></Navbar>
      <div className="heading">
        <p className='back-to-cat' onClick={()=>handleChange()}><FontAwesomeIcon className='icon' icon={faArrowLeft} style={{marginRight:"1%"}}/>Back to Blogs</p>
        <div className="heading-cat-date">
          <p className='heading-cat'>{data.category}</p>
          <p className='heading-date'><FontAwesomeIcon icon={faCircle} size="2xs" style={{marginRight:"4px"}}/>{new Date(data.created_at).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</p>
        </div>
        <div className="heading-title">
          <p>{data.title}</p>
        </div>
        <div className="heading-desc">
          <p>{data.description}</p>
        </div>
        <div className="blog-name">
          <p><FontAwesomeIcon style={{marginRight:"5px"}}icon={faUser} />{data.username}</p>
        </div>
      </div>
      <div className="home-blog">
        <div className="home-inside">
          <img src={`${import.meta.env.VITE_API_URL}/${data.image}`} alt={data.title} className='home-img'></img>
            <div className="home-content">
              <div className="heading-cat-date">
                <p className='heading-cat'>{data.category}</p>
                <p className='heading-date' style={{color:"grey"}}><FontAwesomeIcon icon={faCircle} size="2xs" style={{marginRight:"4px"}}/>{new Date(data.created_at).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</p>
              </div>
              <p className='desc'>{data.description}</p>
              <div className="triple-line" ></div>
              <div className="sentence" dangerouslySetInnerHTML={{ __html: data.content }}></div>
              <div className="triple-line" ></div>
              <div className="written-by">
                <p style={{color:"grey",fontSize:"1.2rem",marginBottom:"5px"}}>Written By</p>
                <div className="name-user">
                  <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"3rem",color:"#472f8e"}}/>
                  <p style={{fontSize:"1.3rem"}}>{data.username}</p>
                </div>
              </div>
              <div className="home-handle">
                <button className='like' onClick={()=>handleLike()}><FontAwesomeIcon  icon={faHeart}/>{liked ? " Unlike" : " Like"}</button>
                <button className='share' onClick={()=>handleShare()}>
                  {copied? ( "Copied"):(<><FontAwesomeIcon icon={faShareFromSquare} /> Share</>)}</button>
                <button className='save' onClick={()=>handleSave()}>
                  {saved ?(<><FontAwesomeIcon  icon={bookmark} />Unsave</>):(<><FontAwesomeIcon  icon={faBookmark} />Save</>)}</button>
              </div>
            </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home