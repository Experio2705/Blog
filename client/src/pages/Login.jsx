import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock ,faEnvelope,faArrowRight} from '@fortawesome/free-solid-svg-icons'

export default function Login(){
  const [remember,setRemember]=useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const handleChange2=()=>{
        navigate('/Register');
    }
    const inputChange1=(e)=>{
        setEmail(e.target.value);
        console.log(e.target.value);
    }
    const inputChange2=(e)=>{
        setPassword(e.target.value);
        console.log(e.target.value);
    }
    const handleChange1=async()=>{
        try{
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/Login`,{
                email,
                password
            });
        
        if(res.data.message){
            alert(res.data.message);
        }
        else{
            localStorage.setItem("userEmail",res.data.email)
            localStorage.setItem("userName",res.data.username)
            localStorage.setItem("isLoggedIn", "true");

            if (res.data.needsInfo) {
                 navigate("/Info", { replace: true });
            } else {
                 navigate("/Category", { replace: true });
            }
            }
        }
        catch(err){
            console.log(err);
            alert(err);
        }
    }
  return (
    <div className="page">
        <div className="login-card">
            <div className="login-content">
                <div className="login-logo"></div>
                <p className='logo-wel'>Welcome Back</p>
                <p className='logo-cont'>Continue your blogging journey</p>
                </div>
            <div className="login-input">
                 <p className='login-ask'>Email Address</p>
                <div className="input-wrap">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon"/>
                <input  className='login-give'  type="text" placeholder="you@example.com" onChange={(e)=>inputChange1(e)}/>
            </div>
        </div>     
        <div className="login-input">
            <p className='login-ask'>Password</p>
            <div className="input-wrap">
            <FontAwesomeIcon icon={faLock} className="input-icon"/>
            <input  className='login-give'  type="password" placeholder="*********" onChange={(e)=>inputChange2(e)}/>
        </div>
        </div>
        <div className="login-but">
            <button className='loggin' onClick={()=>handleChange1()}>Login<FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",marginLeft:"4%"}} /></button>
        </div>
        <div className="login-reg">
            <p>Don't have an account?</p>
            <p className='log-reg' style={{marginLeft:"2%"}} onClick={()=>handleChange2()}>Register</p>
        </div>
        <div className="privacy">
            <p>By continuing, you agree to ouy Terms of Services and Privacy Policy</p>
        </div>
        </div>
    </div>

  );
}
