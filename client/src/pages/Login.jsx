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
    const [message, setMessage] = useState({ text: '', type: '' });
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
        const checkmail=/^[a-zA-Z0-9.]{5,}@gmail\.com$/;
        const checkpass=/^[a-zA-Z0-9@./$%&*()]{8,}$/;
        if(!checkmail.test(email) && !checkpass.test(password)){
            setMessage({text:'Invalid Mail format and Pass>=8',type:'error'});
            return;
        }
        else if(!checkmail.test(email)){
            setMessage({text:'Invalid Mail format',type:'error'});
            return;
        }
        else if(!checkpass.test(password)){
            setMessage({text:'Password Greater than 8 Charachters',type:'error'});
            return;
        }
        try{
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/Login`,{
                email,
                password
            });
        
        if(res.data.message){
            setMessage({text:res.data.message,type:'error'});
        }
        else{
            localStorage.setItem("userEmail",res.data.email)
            localStorage.setItem("userName",res.data.username)
            localStorage.setItem("isLoggedIn", "true");
            setMessage({text:'Successfully Registered !',type:'success'});
            if (res.data.needsInfo) {
                 navigate("/Info", { replace: true });
            } else {
                 navigate("/Category", { replace: true });
            }
            }
        }
        catch(err){
            console.log(err);
            setMessage({text:err,type:'error'});
        }
    }
    setTimeout(()=>{
        setMessage({text:'',type:''});
    },5000);
  return (
    <div className="page">
        {message.text &&(<div className={`error-box ${message.type}`}>{message.text}</div>)}
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
