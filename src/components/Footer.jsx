import React from 'react';

const Footer = () => {
  return (
    <div className='footer' style={{
      backgroundColor: "#8cb0d4",
      padding: "20px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
      fontFamily: "'Arial', sans-serif",
      borderTop: "2px solid #fff",
      bottom:"0"
    }}>
      <p style={{ margin: "5px 0", fontSize: "14px" }}>Contact us: <a href="mailto:info@zoyo.com" style={{ color: "white", textDecoration: "underline" }}>info@zoyo.com</a> | +1 (234) 567-890</p>
      <div style={{ marginTop: "10px" }}>
        <a href="https://www.facebook.com/zoyo" style={{ color: "white", margin: "0 10px", textDecoration: "none" }}>Facebook</a>
        <a href="https://www.instagram.com/zoyo" style={{ color: "white", margin: "0 10px", textDecoration: "none" }}>Instagram</a>
        <a href="https://www.twitter.com/zoyo" style={{ color: "white", margin: "0 10px", textDecoration: "none" }}>Twitter</a>
      </div>
      <p style={{ marginTop: "10px", fontSize: "12px" }}>© {new Date().getFullYear()} Zoyo. All rights reserved.</p>
    </div>
  );
}

export default Footer;
