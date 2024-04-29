import React from 'react';
import './ChangePassword.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {
  const email = useLocation().state.email;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:7878/auth/changePassword", {
        email: email,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      });

      if (response.status === 200) {
        alert('Password changed successfully.');
        navigate('/login'); 
      } else {
        alert('Failed to change password. Please try again later.');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-title">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-inputt"
            required
          />
        </div>
        <button type="submit" className="submit-button">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
