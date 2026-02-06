import React from 'react'
import './css/homepage.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePen,faUserGroup,faArrowTrendUp,faPen,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'
const HomePage = () => {
    const navigate=useNavigate();
    const handleChange=()=>{
        navigate('/Login');
    }
  return (
        <div className="homepage-back">
            <div className="homepage-in">
                <div className="navbar">
                    <div className="navbar-first">
                        <div className="logo"></div>
                        <div className="homepage-logo-name">Blog</div>
                    </div>
                    <div className="butt">
                        <button className="but" onClick={()=>handleChange()}>Sign In</button>
                    </div>
                </div>
                <div className="sentence1">
                    <div className="sentence-in">
                        <p className='sent'>Publish your passions, </p>
                        <p className='sent1'>your way</p>
                        <p className='sent2' style={{marginTop:"2%"}}>Create beautiful blogs, share your knowledge, and connect with a</p>
                        <p className='sent2'>community of passionate writers and readers.</p>
                        <div className="create" ><button onClick={()=>handleChange()} className='create-in'>Create Your Blog</button></div>
                        <div className="stats">
                            <div className="stat1">
                                <p className='stat-no'>10+</p>
                                <p className='stat-cont'>Blogs Created</p>
                            </div>
                            <div className="stat1">
                                <p className='stat-no'>150+</p>
                                <p className='stat-cont'>Monthly Readers</p>
                            </div>
                            <div className="stat1">
                                <p className='stat-no'>25+</p>
                                <p className='stat-cont'>Active Writers</p>
                            </div>                                                       
                        </div>
                    </div>
                </div>
            </div>
                <div className="why">
                    <p className='why1'>Why Choose Our Platform?</p>
                    <p className='why2'>Everything you need to create, share, and grow your blog</p>
                    <div className="why-cards">
                        <div className="why-card-1">
                            <p ><FontAwesomeIcon className='why-card-sym' icon={faSquarePen} style={{color: "#6040bf",}} /></p>
                            <p className='why-card-title'>Simple Writing Experience</p>
                            <p className='why-card-cont'>Write and publish blogs effortlessly with our clean editor. Add images, format text, and share your ideas in seconds — no technical skills needed. </p>
                        </div>
                        <div className="why-card-1">
                            <p ><FontAwesomeIcon className='why-card-sym' icon={faUserGroup} style={{color: "#6040bf",}}/></p>
                            <p className='why-card-title'>Connect With Readers</p>
                            <p className='why-card-cont'>Join a community of writers and readers. Share thoughts, discover perspectives, and interact through comments and discussions.</p>
                        </div>
                        <div className="why-card-1">
                            <p ><FontAwesomeIcon className='why-card-sym' icon={faArrowTrendUp} style={{color: "#6040bf",}}/></p>
                            <p className='why-card-title'>See Your Impact</p>
                            <p className='why-card-cont'>Track likes, shares, and saves on your posts. Understand what people enjoy and improve your writing through real engagement.</p>
                        </div>
                    </div>
                </div>
                <div className="ready">
                    <p className='ready-title'>Ready to start your blogging journey?</p>
                    <p className='ready-cont'>Join our community of passionate writers and share your unique perspective with the world.</p>
                    <button className='ready-but' onClick={()=>handleChange()}><FontAwesomeIcon icon={faPen} /> Get Started Now <FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            <Footer></Footer>
        </div>
  )
}

export default HomePage