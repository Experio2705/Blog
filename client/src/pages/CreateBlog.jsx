import React from 'react'
import './css/create.css'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFolder,faHouse,faUpload,faMessage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const createBlog = () => {
  const navigate=useNavigate();
  const handleChange1=()=>{
    navigate('/Home');
  }
  const handleChange2=()=>{
    navigate('/Category');
  }
  const handleChange3=()=>{
    navigate('/Profile');
  }
  const handleChange4=()=>{
    navigate('/Contact');
  }
  const [image, setImage] = useState('');
  const [preview,setpreview] =useState('');
  const [title,settitle] =useState('');
  const [category,setcategory]=useState('');
  const [description,setdescription]=useState('');
  const [content,setcontent]=useState('');
  const userEmail=localStorage.getItem('userEmail');
  const userName=localStorage.getItem('userName');
  const handleImageChange = (e) => {
  const file = e.target.files[0];
    if (file) {
      setpreview(URL.createObjectURL(file));
      setImage(file);
    }
  };
  const inputChange1=(e)=>{
    settitle(e.target.value);
  }
  const inputChange2=(e)=>{
    setcategory(e.target.value);
  }
  const inputChange3=(e)=>{
    setdescription(e.target.value);
  }
  const publishChange=async()=>{
    try{
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("userEmail", userEmail);
    formData.append("image", image);
    formData.append("userName",userName);
      await axios.post(`${import.meta.env.VITE_API_URL}/CreateBlog`,formData);
      window.location.reload();
    }
    catch(err){
      if(err) alert(err);
      console.log(err);
    }
  }
  useEffect(() => {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (!isLoggedIn) {
              navigate("/Login", { replace: true });
            }
            }, [navigate]);
  return (
    <div className="createcard">
        <Navbar></Navbar>
          <div className="line" style={{height:"0.1%",backgroundColor:"grey",width:"100%",boxShadow:"4px 0px 20px rgba(0,0,0,1)"}}></div>
          <div className="create-main" >
            <p style={{fontSize:"4rem",fontWeight:"500"}}>Create New Blog</p>
            <p style={{fontSize:"1.5rem",color:"grey",marginBottom:"2%"}}>Share your thoughts and ideas with the community</p>
            <div className="create-form" style={{backgroundColor:"white",boxShadow:"4px 0px 20px rgba(0,0,0,0.5)",borderRadius:"10px",padding:"2%",fontFamily:"calibri",fontSize:"1.2rem"}}>
                <p style={{marginBottom:"1%"}}>Blog Title</p>
                <input onChange={(e)=>inputChange1(e)} type='text' className="create-input" placeholder='Enter an engaging title for your blog...'
                  style={{height:"50px",width:"97%",fontSize:"1.5rem",marginBottom:"3%"}}
                ></input>
                <p style={{marginBottom:"1%"}}>Category</p>
                <select onChange={(e)=>inputChange2(e)} className="create-input" style={{height:"50px",width:"99.5%",fontSize:"1.5rem",marginBottom:"3%",color:"grey"}}>
                    <option>Select a category...</option>
                    <option>Technology</option>
                    <option>Programming</option>
                    <option>Education</option>
                    <option>AI</option>
                    <option>Lifestyle</option>
                    <option>Science</option>
                    <option>Others</option>
                </select>
                <p style={{marginBottom:"1%"}}>Short Description</p>
                <textarea onChange={(e)=>inputChange3(e)} className="create-input" placeholder='Write a brief summary of your blog...'
                style={{height:"80px",width:"97%",fontSize:"1.5rem",paddingTop:"1%",
                marginBottom:"3%",resize:"none"}}></textarea>
                <p style={{marginBottom:"1%"}}>Cover Image</p>
                <div className="cover-upload" style={{marginBottom:"3%"}}>
                    <label className="upload-box">
                      {preview ? (
                      <img src={preview} alt="cover" className="preview-img" />
                        ) : (
                        <div className="upload-content">
                          <FontAwesomeIcon icon={faUpload} />
                          <p>Click to upload image</p>
                          <span>PNG, JPG, GIF up to 10MB</span>
                        </div>
                          )}
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                      </label>
                  </div>
                  <p style={{marginBottom:"1%"}}>Main Content</p>
                  <div className="ql-outer">
                    <div className="ql-inner">
                      <ReactQuill value={content} onChange={setcontent} theme="snow"  placeholder="Write a brief summary of your blog..." />
                        </div>
                    </div> 
                    <div className="final-button" >
                    <button className='final-but' onClick={()=>publishChange()}>Publish</button>
                  </div>
            </div>
          </div>
          <Footer></Footer>
    </div>
  )
}

export default createBlog