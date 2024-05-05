import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import fayftLogo from '@images/FIX AT YOUR FINGERTIPS (1).png';

const LoginPage = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:7878/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Login successful")
    
      localStorage.setItem('token', data.token);
      localStorage.setItem('role',data.role);
      
      setUserRole(data.role);
      navigate('/');

    } else {
      setError('Invalid email or password');
    }
  };

  const handleFP = ()=>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return; 
    }
    navigate("/forgot-password",{state:{email}, replace:true})
  }

  return (
  <>
   <button type='button' className='backk' onClick={()=>{
    setUserRole(localStorage.getItem('role')) 
    navigate("/")
  }}>Go Back</button>
    <div className="login-container">
    <img className='lago' src={fayftLogo} alt="fayftLogo" />
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" className='login' onClick={handleLogin}>Login</button>
        <button type="button" className="forgot-password" onClick={handleFP}>Forgot Password?</button>
      </form>
      <div className='sign-div'>
        <p>Don't have an account?</p>
        <button type="button" className='sign-btn' onClick={()=>navigate("/Sign-up")}>Sign-Up</button>
      </div>
    </div>
  </>
   
  );
};

export default LoginPage;
