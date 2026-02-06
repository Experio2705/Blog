import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock ,faEnvelope,faArrowRight,faUser} from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigate=useNavigate();
    const inputChange1=(e)=>{
        setUsername(e.target.value);
    }
    const inputChange2=(e)=>{
        setEmail(e.target.value);
    }
    const inputChange3=(e)=>{
        setPassword(e.target.value);
    }
    const handleChange=async()=>{
        const user ={
            username:username,
            email:email,
            password:password
        };
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/Register`,user);
            navigate('/Login');
        }
        catch(err){
            console.log(err);
            alert(err);
        }
    }
  return (
        <div className="page">
        <div className="login-card register-card" >
            <div className="login-content">
                <div className="login-logo"></div>
                <p className='logo-wel'>Get Started</p>
                <p className='logo-cont'>Create your account to begin</p>
                </div>
                        <div className="login-input">
                 <p className='login-ask'>Username</p>
                <div className="input-wrap">
                <FontAwesomeIcon icon={faUser} className="input-icon"/>
                <input  className='login-give'  type="text" placeholder="you@example.com" onChange={(e)=>inputChange1(e)}/>
                </div>
        </div> 
            <div className="login-input">
                 <p className='login-ask'>Email Address</p>
                <div className="input-wrap">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon"/>
                <input  className='login-give'  type="text" placeholder="you@example.com" onChange={(e)=>inputChange2(e)}/>
                </div>
        </div>     
        <div className="login-input">
            <p className='login-ask'>Password</p>
            <div className="input-wrap">
            <FontAwesomeIcon icon={faLock} className="input-icon"/>
            <input  className='login-give'  type="password" placeholder="*********" onChange={(e)=>inputChange3(e)}/>
        </div>
        </div>
        <div className="login-but">
            <button className='loggin' onClick={()=>handleChange()}>Register<FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",marginLeft:"4%"}} /></button>
        </div>
        <div className="privacy">
            <p>By continuing, you agree to ouy Terms of Services and Privacy Policy</p>
        </div>
        </div>
    </div>
  )
}

export default Register