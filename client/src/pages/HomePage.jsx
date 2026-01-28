import React from 'react'
import './css/HomePage.css'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
    const navigate=useNavigate();
    const handleChange=()=>{
        navigate('/Login');
    }
  return (
    <div>
        <div className="homepage-back">
            <div className="homepage-in">
                <div className="navbar">
                    <div className="navbar-first">
                        <div className="logo"></div>
                        <div className="logo-name">Blog</div>
                    </div>
                    <div className="butt">
                        <button className="but" onClick={()=>handleChange()}>Sign In</button>
                    </div>
                </div>
                <div className="sentence">
                    <div className="sentence-in">
                        <p className='sent'>Publish your passions, your way</p>
                        <div className="create" onClick={()=>handleChange()}><button className='create-in'>Create Your Blog</button></div>
                    </div>
                </div>
                <div className="footer">
                    <p className='foot-name'>Blog - A chance to express yourself.</p>
                    <p className='foot-content'>Created by Aryan</p>
                    <p className='foot-content'>Contact : aryanshinde2705@gmail.com</p>
                    <p className='foot-content'>Copyright@2006-2029</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage