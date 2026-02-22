import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock ,faEnvelope,faArrowRight,faUser} from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showOtpField,setShowOtpField]=useState(false);
    const [otp,setOtp]=useState();
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
    const inputChange4=(e)=>{
        setOtp(e.target.value)
    }
    const handleChange=async()=>{
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
        const user ={
            username:username,
            email:email,
            password:password
        };
        const value ={email};
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/Register`,user);
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/set-otp`,value);
            setShowOtpField(true);
            setMessage({text:res.data.message,type:'success'});
        }
        catch(err){
            console.log(err);
            setMessage({text:err,type:'error'});
        }
    }
    const verifychange=async()=>{
        const value={email,otp}
        try{
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`,value);
            if(res.data.message=='verified'){
                navigate('/Login'); 
            }
            else if(res.data.message=='expired'){
                setMessage({text:'Otp Expired !',type:'error'});
            }
            else{
                setMessage({text:'Invalid Otp !',type:'error'});
            }
        }
        catch(err){
            console.log(err);
            setMessage({text:err,type:'error'});
        }
    }
    useEffect(()=>{
        if(message.text){
            const timer=setTimeout(()=>{
                setMessage({text:'',type:''});
            },5000);
            return ()=>clearTimeout(timer);
        }
    },[message])
  return (
        <div className="page">
        {message.text &&(<div className={`error-box ${message.type}`}>{message.text}</div>)}
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
                <input  className='login-give'  type="email" placeholder="you@example.com" onChange={(e)=>inputChange2(e)}/>
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
        {showOtpField && (
            <div className="verifybutton" style={{display:'flex',justifyContent:'space-around'}}>
                <div className="login-input" style={{width:'50%'}}>
                    <div className="input-wrap">
                        <FontAwesomeIcon icon={faLock} className="input-icon"/>
                        <input className='login-give' style={{height:"40px"}} type="number" placeholder="Enter Otp" onChange={(e)=>inputChange4(e)}/>
                </div>
            </div>
            <div className="login-but" style={{width:'50%'}}>
                <button className='loggin' style={{width:"50%"}} onClick={()=>verifychange()}>Verify<FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",marginLeft:"4%"}} /></button>
            </div>                
            </div>)}
        <div className="privacy">
            <p>By continuing, you agree to ouy Terms of Services and Privacy Policy</p>
        </div>
        </div>
    </div>
  )
}

export default Register