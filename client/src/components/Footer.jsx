import React from 'react'
import './compcss/footer.css'
const Footer = () => {
  return (
        <div className="footer-main">
        <div className='footer-upper' style={{display:"flex",alignItems:"center",justifyContent:"center", height:"91px"}}>
            <div className="footer-logo"></div>
            <div className="footer-logo-name" style={{fontSize:"1.5rem",marginRight:"30%",display:"flex",alignItems:"center",width:"80px",color:"white"}}>blog</div>
                <div className="footer-contact-in" style={{marginRight:"15%"}}>
                    <a className='linked' href='https://www.linkedin.com/in/aryanshinde2705' style={{textDecoration:"none",fontSize:"1rem",marginRight:"4%"}}>Linkedin</a>
                    <a className='git' href='github.com/Experio2705' style={{textDecoration:"none",fontSize:"1rem",marginRight:"4%"}}>GitHub</a>
                    <a className='insta' href='' style={{textDecoration:"none",fontSize:"1rem",marginRight:"4%"}}>Instagram</a>
                </div>
            <p style={{color:"grey",marginLeft:"10%"}}>@2026 blog. All rights reserved.</p>
        </div>
      </div>     
  )
}

export default Footer
