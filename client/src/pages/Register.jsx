import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
            await axios.post("http://localhost:8800/Register",user);
            navigate('/Login');
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
                        <h1>Register</h1>
                    </div>
                    <div className="email" >
                        <h3>Username :</h3>
                        <input type="text"  placeholder="Enter your username" onChange={(e)=>inputChange1(e)}
                        style={{background:"transparent",
                            color:"white", 
                            border:"2px solid white", 
                            borderRadius:"5px",
                            width:"61%"}}></input>
                    </div>
                    <div className="email" >
                        <h3>Email :</h3>
                        <input type="text"  placeholder="Enter your mail" onChange={(e)=>inputChange2(e)}
                        style={{background:"transparent",
                            color:"white", 
                            border:"2px solid white", 
                            borderRadius:"5px",
                            width:"70%"}}></input>
                    </div>
                    <div className="email" >
                        <h3>Password :</h3>
                        <input type="text"  placeholder="Enter your password" onChange={(e)=>inputChange3(e)}
                        style={{background:"transparent",
                            color:"white", 
                            border:"2px solid white", 
                            borderRadius:"5px",
                            width:"62%"}}></input>
                    </div>
                    <div className="login-but">
                        <button onClick={()=>handleChange()} className='reg'
                            style={{fontSize:"1rem", backgroundColor:"rgba(186, 39, 39, 0.8)",
                                color:"white", height:"120%", width:"30%",borderRadius:"5px"
                            }}>Register</button>
                    </div>
                </div>
            </div>
        </div>      
  )
}

export default Register