import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/info.css";
import axios from "axios";
const Info = () => {
  const navigate = useNavigate();

  const [bio,setbio]=useState('');
  const [address,setaddress]=useState('');
  const [phone,setphone]=useState('');
  const [skills,setskills]=useState('');

  const ipChange1=(e)=>{
    setbio(e.target.value);
  }
  const ipChange2=(e)=>{
    setaddress(e.target.value);
  }
  const ipChange3=(e)=>{
    setphone(e.target.value);
  }
  const ipChange4=(e)=>{
    setskills(e.target.value);
  }
  const email=localStorage.getItem('userEmail');
  const handleChange=async()=>{
    try{
        const values={bio,address,phone,skills,email};
        await axios.post(`${import.meta.env.VITE_API_URL}/Info`,values);
        navigate('/Category');
    }
    catch(err){
        if(err) alert(err);
    }
  }
        useEffect(() => {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (!isLoggedIn) {
              navigate("/Login", { replace: true });
            }
            }, [navigate]);
  return (
    <div className="info-container">
      <form className="info-form">
        <h2 className="info-title">Personal Information</h2>

        <textarea name="bio"  placeholder="Short Bio" onChange={(e)=>ipChange1(e)} />

        <textarea name="address" placeholder="Address" onChange={(e)=>ipChange2(e)} />
        <input type="text" name="phone" placeholder="Phone Number"  onChange={(e)=>ipChange3(e)}/>

        <input type="text" name="skills" placeholder="Skills / Interests"  onChange={(e)=>ipChange4(e)}/>

        <button type="button" className="next-btn" onClick={() =>handleChange()}>
          Next →
        </button>
      </form>
    </div>
  );
};

export default Info;
