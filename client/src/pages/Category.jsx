import React from 'react'
import './css/category.css'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect } from 'react';
import { faUser, faFolder,faMessage,faAddressCard, faHome, faCircleUser,faEnvelope, faLocationDot, faCircleDot,faMagnifyingGlass,faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Category = () => {
  const navigate=useNavigate();
  const [search,setsearch]=useState('');
  const [select,setselect]=useState('');
  const [data,setdata]=useState([]);
  const inputChange1=(e)=>{
    setsearch(e.target.value);
  }
  const inputChange2=(e)=>{
    setselect(e.target.value);
  }
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        navigate("/Login", { replace: true });
      }
      }, [navigate]);
  
  useEffect(() => {
      fetchData();
    }, [search, select]);
  const fetchData = async () => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/Category?search=${search}&select=${select}`);
      const data = res.data;
      setdata(data);
    }
    catch(err) {console.log(err);
    }
};
const handleChange1=()=>{
  navigate('/Profile');
}
const handleChange2=()=>{
  navigate('/Category');
}
const handleChange3=()=>{
  navigate('/About');
}
const handleChange4=()=>{
  navigate('/Contact');
}
const handleChange=(id)=>{
  localStorage.setItem('fetchId',id);
  console.log(id);
  navigate('/Home');
}

console.log(data);
  return (
      <div className='about-us-outer' style={{fontFamily:"sans-serif"}}>
          <Navbar></Navbar>
          <div className="line" style={{height:"0.3%"}}></div>
          <div className='profile-slogan' >
              <p style={{fontSize:"3rem",padding:"2% 2% 0% 2%"}}>Browse Blogs</p>
              <p style={{fontSize:"1.5rem",padding:"0% 2% 2% 2%",color:"#545254"}}>Discover amazing articles from your community</p>
            </div>
          <div className="line" style={{height:"0.3%"}}></div>
          <div className="all-blogs">
            <div className="search">
              <div className="search-container">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type='search' onChange={(e)=>inputChange1(e)} className='search-bar' placeholder='Search blogs by the title '></input>
              </div>
              <select onChange={(e)=>inputChange2(e)} className="select" >
                    <option>Select a category...</option>
                    <option>Technology</option>
                    <option>Programming</option>
                    <option>Education</option>
                    <option>AI</option>
                    <option>Lifestyle</option>
                    <option>Science</option>
                    <option>Others</option>
                </select>
            </div>
          </div>
          {data.length>0 ? (
            <div className="data">
                {data.map((items)=>(
                  <div className="card" onClick={()=>handleChange(items.id)} key={items.id}>
                    <img src={`${import.meta.env.VITE_API_URL}/${items.image}`} alt={items.title} className='card-img'></img>
                    <div className="data-content" key={items.id}>
                      <div className="cat-like">
                        <p style={{color:"blueviolet",marginBottom:"10px"}}>{items.category}</p>
                        <p className='catlike' style={{color:"black",marginBottom:"10px"}}>Likes: {items.likes}</p>
                      </div>
                      <h3 className='title' style={{marginBottom:"15px"}}>{items.title}</h3>
                      <p style={{marginBottom:"15px"}}>{items.description}</p>
                      <div className="line" style={{height:"2px",marginBottom:"15px"}}></div>
                      <div className="flex">
                        <p>{items.username}</p>
                        <p>{new Date(items.created_at).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>
                ))}
                </div>   
                ):(
                  <div className="data-absent">
                    <p style={{fontSize:"5.4rem",marginBottom:""}}><FontAwesomeIcon icon={faFaceFrown} style={{color: "#3a5a92",}} /></p>
                    <h1 style={{color:"grey"}}>No Blogs Found</h1>
                    <p style={{color:"#c4c4c4"}}>Try adjusting your search or filter section </p>
                  </div>
              )
            }
      
      <Footer></Footer>
    </div>
  )
}

export default Category