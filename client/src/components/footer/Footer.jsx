import * as React from 'react';
import "./footer.css";
import BusinessIcon from '@mui/icons-material/Business';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  
  return (
   <>
   <footer className="footer">
      <div className="footer-left">
        <div className="logo"> <img alt="Seez" src="https://seez.co/wp-content/uploads/2021/04/seez-logo-white.svg" /> 
        </div>
        <div className="contact-info">
          <h4 style={{color:"white"}}><BusinessIcon sx={{ mr: 1 }} />Gate Avenue, DIFC, Dubai UAE</h4>
          <p style={{color:"white"}}><LocalPhoneIcon sx={{ mr: 1 }} />+971 4 447 3679</p>
          <p style={{color:"white"}}><EmailIcon sx={{ mr: 1 }} />help@seez.co</p>
          <p style={{color:"white"}}><FacebookIcon sx={{ mr: 2 }} /> <PlayCircleIcon sx={{ mr: 2 }} /> <LinkedInIcon sx={{ mr: 3 }} /> <InstagramIcon sx={{ mr: 4 }} /></p>
        </div>
      </div>

      <div className="footer-right">
      <div className="contact-info">
      <h3 style={{color:"white", marginLeft:"10px"}}> About Us</h3>
          <p style={{color:"white"}}>About Us</p>
        </div>
        <div className="contact-info">
        <h3 style={{color:"white", marginLeft:"26px"}}> Resources</h3>
          <p style={{color:"white"}}>Press Kit</p>
          <p style={{color:"white"}}>Privacy Ploicy</p>
          <p style={{color:"white"}}>Terms & conditions</p>
        </div>
        <div className="contact-info">
        <h3 style={{color:"white", marginLeft:"18px"}}> Follow Us</h3>
          <p style={{color:"white"}}>Get in touch</p>
          <p style={{color:"white"}}>Report a bug</p>
          <p style={{color:"white"}}>Become a dealer</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">© 2023 Seez. All rights reserved.</div>
      </div>
    </footer>
   </>
  );
}