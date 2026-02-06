import React from 'react'
import './compcss/navbar.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFolder,faMessage,faAddressCard } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
    const navigate=useNavigate();
    const handleChange1=()=>{
        navigate('/Category');
    }
    const handleChange2=()=>{
        navigate('/About');
    }
    const handleChange3=()=>{
        navigate('/Contact');
    }
    const handleChange4=()=>{
        navigate('/Profile');
    }
    const handleChange5=()=>{
        navigate('/CreateBlog');
        console.log("pressed");
    }
  return (
            <div className="home-navbar-top" >
                <div className="home-logo" style={{marginRight:"27%"}}>
                    <div className="home-logo-sym"></div>
                    <div className="home-logo-name" style={{fontSize:"2.4rem",
                        display:"flex",justifyContent:"center",alignItems:"center",
                        marginLeft:"2%", fontFamily:"ui-sans-serif",fontWeight:"600"
                    }}>blog</div>
                </div>
                <div className="home-buttons" style={{marginRight:"11%",width:"40%"}}>
                    <button className='home-but1' style={{marginRight:"3%"}}onClick={()=>handleChange4()}><FontAwesomeIcon icon={faUser} />Profile</button>
                    <button className='home-but1' style={{marginRight:"3%"}} onClick={()=>handleChange1()}><FontAwesomeIcon icon={faFolder} />Browse</button>
                    <button className='home-but1' style={{marginRight:"3%"}} onClick={()=>handleChange2()}><FontAwesomeIcon icon={faAddressCard} />About</button>
                    <button className='home-but1'  onClick={()=>handleChange3()}><FontAwesomeIcon icon={faMessage} />Contact</button>
                </div>
                <div className="home-create">
                    <button className='home-but2' onClick={()=>handleChange5()}>Create</button>
                </div>
            </div>
        
  )
}

export default Navbar