import React from 'react'
import './css/contact.css'
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFolder,faMessage,faAddressCard,faHeart, faHome,faEnvelope,faLink } from '@fortawesome/free-solid-svg-icons';
const Contact = () => {
  const [name,setname]=useState('');
  const [surname,setsurname]=useState('');
  const [email,setemail]=useState('');
  const [phone,setphone]=useState('');
  const [subject,setsubject]=useState('');
  const [message,setmessage]=useState('');

  const navigate=useNavigate();
  const handleChange1=()=>{
    navigate('/Category');
  }
  const handleChange2=()=>{
    navigate('/About');
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

  const ipchange1=(e)=>{
    setname(e.target.value);
  }
  const ipchange2=(e)=>{
    setsurname(e.target.value);
  }
  const ipchange3=(e)=>{
    setemail(e.target.value);
  }
  const ipchange4=(e)=>{
    setphone(e.target.value);
  }
  const ipchange5=(e)=>{
    setsubject(e.target.value);
  }
  const ipchange6=(e)=>{
    setmessage(e.target.value);
  }
  const username=localStorage.getItem('userName');
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        navigate("/Login", { replace: true });
      }
      }, [navigate]);
  
  const handleChange=async()=>{
    try{
      const values={username,name,surname,email,phone,subject,message};
      await axios.post(`${import.meta.env.VITE_API_URL}/Contact`,values);
      window.location.reload();
    }
    catch(err){
      if(err) {
        alert(err);
        console.log(err);
      }
    }
  }
  return (
    <div className='contact-us-outer'>
        <Navbar></Navbar>
         <div className="contact-us">
            <div className="contact-left">
              <p style={{fontSize:"4rem",color:"white",marginBottom:"2%"}}>Contact Us</p>
              <p style={{fontSize:"1.2rem",color:"white",marginBottom:"12%",width:"70%"}}>Not sure what you need? The team at blog will happy to listen to you and implement the suggestions that hadn't considered</p>
              <p style={{color:"white",fontSize:"1.1rem",marginBottom:"1%"}}><FontAwesomeIcon icon={faEnvelope} />aryanshinde2705@gmail.com</p>
              <p style={{color:"white",fontSize:"1.1rem"}}><FontAwesomeIcon icon={faLink} />www.linkedin.com/in/aryanshinde2705</p>
            </div>
            <div className="contact-right" style={{fontFamily:"sans-serif"}}>
              <p style={{fontSize:"2rem"}}>We'd love to hear from you!</p>
              <p style={{fontSize:"2rem",marginBottom:"2%"}}>Let's get in touch</p>
              <div className="contact-name">
                <div className="contact-ip">
                  <p className='contact-words' style={{color:"grey"}}>Name</p>
                  <input onChange={(e)=>ipchange1(e)} type="text" className="input1"></input>
                </div>
                <div className="contact-ip">
                  <p className='contact-words' style={{color:"grey"}}>Surname</p>
                  <input onChange={(e)=>ipchange2(e)} type="text" className="input1"></input>
                </div>
              </div>
              <div className="contact-name">
                <div className="contact-ip">
                  <p className='contact-words' style={{color:"grey"}}>Email</p>
                  <input onChange={(e)=>ipchange3(e)} type="mail" placeholder="xyz@gmail.com" className="input1"></input>
                </div>
                <div className="contact-ip">
                  <p className='contact-words' style={{color:"grey"}}>Phone number</p>
                  <input onChange={(e)=>ipchange4(e)} type="phone" className="input1"></input>
                </div>
              </div>
              <p className='contact-words' style={{color:"grey"}}>Subject</p>
              <input onChange={(e)=>ipchange5(e)} type="text" className="input" style={{height:"8%",width:"95%",marginBottom:"3%"}}></input>
              <p className='contact-words' style={{color:"grey"}}>Your Message</p>
              <textarea onChange={(e)=>ipchange6(e)} className="input" style={{height:"20%",width:"92%",resize:"none",padding:"2%",marginBottom:"4px"}}></textarea>
              <button onClick={()=>handleChange()} className="but"style={{height:"7%",width:"25%",borderRadius:"10px",backgroundColor:"blueviolet",color:"white",fontSize:"1rem"}}>Send Message</button>
            </div>
         </div>
    </div>
  )
}

export default Contact