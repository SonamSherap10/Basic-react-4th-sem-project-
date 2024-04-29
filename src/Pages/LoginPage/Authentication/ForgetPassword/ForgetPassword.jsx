import React, { useEffect, useState } from 'react';
import './ForgetPassword.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [responseFetched, setResponseFetched] = useState(false);
  const [responseMessage, setResponseMessage] = useState("Please Wait");
  const email = useLocation().state.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const isOk = await axios.post("http://localhost:7878/auth/forgotPassword", {
          email: email
        });
        if (isOk.status === 200) {
          setResponseMessage("We have sent OTP to your email address");
        }
        setResponseFetched(true);
      } catch (error) {
        console.error("Error:", error);
        setResponseMessage("Something went wrong");
      }
    };

    if (!responseFetched) {
      fetchResponse();
    }
  }, [email, responseFetched]);


  const handleChange = async (e) => {
    e.preventDefault();
    const otp = parseInt(document.getElementById('otp').value);
    
    try {
      const verify = await axios.post("http://localhost:7878/auth/otpCheck", {
        email: email,
        otp: otp
      });
      
      if (verify.status === 200) {
        alert('OTP verified successfully.');
        navigate('/change-password', { state: { email: email },replace: true });
      } else {
        document.getElementById('error').innerHTML = verify.data.message;
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById('error').innerHTML = "Something went wrong";
    }
  }
  

  return (
    <>
      <div className="forget-password-container">
        <h2 className="forget-password-heading" id="headd">{responseMessage}</h2>
        <div className="error-message-container">
          <span className="error-message" id="error"></span>
        </div>
        <form className="otp-form" id="otp-form">
          <label htmlFor="otp" className="otp-label">Enter OTP:</label>
          <input type="text" id="otp" name="otp" className="otp-input" required />
          <button type="submit" className="submit-button" onClick={handleChange}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
