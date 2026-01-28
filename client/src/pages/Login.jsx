import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'
const Login = () => {
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
            const res=await axios.post("http://localhost:8800/Login",{
                email,
                password
            });
        
        if(res.data.message){
            alert(res.data.message);
        }
        else{
            navigate('/Home');
        }
    }
        catch(err){
            console.log(err);
            alert(err);
        }
    }

    return (
        <div>
            <div className="login-back">
                <div className="login-front">
                    <div className="login">
                        <h1>Login</h1>
                    </div>
                    <div className="email" >
                        <h3>Email :</h3>
                        <input type="text"  placeholder="Enter your mail" onChange={(e)=>inputChange1(e)}
                        style={{background:"transparent",
                            color:"white", 
                            border:"2px solid white", 
                            borderRadius:"5px",
                            width:"70%"}}></input>
                    </div>
                    <div className="email" >
                        <h3>Password :</h3>
                        <input type="password"  placeholder="Enter your mail" onChange={(e)=>inputChange2(e)}
                        style={{background:"transparent",
                            color:"white", 
                            border:"2px solid white", 
                            borderRadius:"5px",
                            width:"62%"}}></input>
                    </div>
                    <div className="login-but">
                        <button onClick={()=>handleChange1()} 
                            style={{fontSize:"1rem", backgroundColor:"rgba(186, 39, 39, 0.8)",
                                color:"white", height:"120%", width:"30%",borderRadius:"5px"
                            }}>Login</button>
                    </div>
                    <div className="register-but">
                        <p style={{fontSize:"1rem", marginRight:"6%"}}>If new ,register here </p>
                        <button onClick={()=>handleChange2()} className='reg'
                            style={{fontSize:"1rem", backgroundColor:"rgba(39, 131, 215, 0.8)",
                                color:"white", height:"100%", width:"30%",borderRadius:"5px"
                            }}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login