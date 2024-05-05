import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fayftLogo from '@images/FIX AT YOUR FINGERTIPS (1).png';

const Register = () => {
  const navigate = useNavigate();
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  const handleEmployeeSubmit = async (event) => {
    event.preventDefault();
    const empUsername = document.getElementById("empUsername").value;
    const empEmail = document.getElementById("empEmail").value;
    const empPassword = document.getElementById("empPassword").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const description = document.getElementById("Description").value;
    const phoneNumber = parseInt(
      document.getElementById("phoneNumber").value,
      10
    );
    const empProvince = document.getElementById("empProvince").value;
    const empDistrict = document.getElementById("empDistrict").value;
    const empCity = document.getElementById("empCity").value;
    const wage = document.getElementById("wage").value;
    const empProfilePic = document.getElementById("empProfilePicture").files[0];

    if (
      !empUsername ||
      !empEmail ||
      !empPassword ||
      !jobTitle ||
      !phoneNumber ||
      !description ||
      !empProvince ||
      !empDistrict ||
      !empCity ||
      !wage ||
      !empProfilePic
    ) {
      alert("Please fill out all fields.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(empEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (isNaN(wage) || wage < 100 || wage > 900) {
      alert("Wage must be between 100 and 900.");
      return;
    }

    const formData = new FormData();
    formData.append("username", empUsername);
    formData.append("email", empEmail);
    formData.append("Password", empPassword);
    formData.append("jobTitle", jobTitle);
    formData.append("description", description);
    formData.append("phoneNumber", phoneNumber);
    formData.append("province", empProvince);
    formData.append("district", empDistrict);
    formData.append("city", empCity); // Corrected typo from 'dity' to 'city'
    formData.append("Wage", wage);
    formData.append("ProfilePicture", empProfilePic);
    formData.append("role", "Employee");

    const response = await axios.post(
      "http://localhost:7878/auth/register",
      formData
    );
    if ( response.status === 200) {
      alert("Registration successful. Please login to continue.");
      navigate("/login");
    } else {
      alert("Registration failed. Please try again later.");
      console.log("err",response);
    }
  };

  const handleClientSubmit = async (event) => {
    event.preventDefault();
    const cliUsername = document.getElementById("cliUsername").value;
    const cliEmail = document.getElementById("cliEmail").value;
    const cliPassword = document.getElementById("cliPassword").value;
    const cliPhoneNumber = document.getElementById("cliPhoneNumber").value;
    const cliProvince = document.getElementById("cliProvince").value;
    const cliDistrict = document.getElementById("cliDistrict").value;
    const cliCity = document.getElementById("cliCity").value;
    const cliProfilePic = document.getElementById("cliProfilePicture").files[0];
    if (
      !cliUsername ||
      !cliEmail ||
      !cliPassword ||
      !cliPhoneNumber ||
      !cliProvince ||
      !cliDistrict ||
      !cliCity ||
      !cliProfilePic
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cliEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number format (10 digits)
    if (!/^\d{10}$/.test(cliPhoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const formData = new FormData();
    formData.append("username", cliUsername);
    formData.append("email", cliEmail);
    formData.append("Password", cliPassword);
    formData.append("phoneNumber", cliPhoneNumber);
    formData.append("province", cliProvince);
    formData.append("district", cliDistrict);
    formData.append("city", cliCity); 
    formData.append("ProfilePicture", cliProfilePic);
    formData.append("role", "Client");


    const response = await axios.post(
      "http://localhost:7878/auth/register",
      formData
    );
    if ( response.status === 200) {
      alert("Registration successful. Please login to continue.");
      navigate("/login");
    } else {
      alert("Registration failed. Please try again later.");
      console.log("err",response);
    }
  };

  const handleEmployeeClick = () => {
    setShowEmployeeForm(true);
    setShowClientForm(false);
  };

  const handleClientClick = () => {
    setShowClientForm(true);
    setShowEmployeeForm(false);
  };

  return (
    <div className="register-container">
      <img className="lgr" src={fayftLogo} alt="" />
      <h3 className="rgs">Register</h3>
      <div className="register-buttons">
        <button className="sub" onClick={handleEmployeeClick}>Register as Employee</button>
        <button className="sub" onClick={handleClientClick}>Register as Client</button>
      </div>
      {showEmployeeForm && (
        <form className="employee-form" onSubmit={handleEmployeeSubmit}>
          <h3>Employee Registration Form :</h3> <br />
          <label htmlFor="empUsername">Username:</label>
          <input type="text" id="empUsername" name="empUsername" />
          <br />
          <br />
          <label htmlFor="empEmail">Email:</label>
          <input type="email" id="empEmail" name="empEmail" />
          <br />
          <br />
          <label htmlFor="empPassword">Password:</label>
          <input type="password" id="empPassword" name="empPassword" />
          <br />
          <br />
          <label htmlFor="jobTitle">Job Title:</label>
          <input type="text" id="jobTitle" name="jobTitle" />
          <br />
          <br />
          <label>Description:</label>
          <input type="text" id="Description" name="Description" />
          <br />
          <br />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" />
          <br />
          <br />
          <label htmlFor="empProvince">Province:</label>
          <select id="empProvince"className="empProvince" name="empProvince">
            <option value="Koshi">Koshi</option>
            <option value="Madhes">Madhes</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Gandaki">Gandaki</option>
            <option value="Lumbini">Lumbini</option>
            <option value="Karnali">Karnali</option>
            <option value="Sudurpashchim">Sudurpashchim</option>
          </select>
          <br />
          <br />
          <label htmlFor="empDistrict">District:</label>
          <input type="text" id="empDistrict" name="empDistrict" />
          <br />
          <br />
          <label htmlFor="empCity">City:</label>
          <input type="text" id="empCity" name="empCity" />
          <br />
          <br />
          <label htmlFor="wage">Wage (Must be between 100 and 900):</label>
          <input type="number" id="wage" name="wage" />
          <br />
          <br />
          <label htmlFor="empProfilePicture">Profile Picture:</label>
          <input
            type="file"
            id="empProfilePicture"
            name="empProfilePicture"
            accept="image/*"
          />
          <br />
          <br />
          <button className="sub" type="submit">Register as Employee</button>
        </form>
      )}
      {showClientForm && (
        <form className="client-form" onSubmit={handleClientSubmit}>
          <h3>Client Registration Form :</h3>
          <br />
          <label htmlFor="cliUsername">Username:</label>
          <input type="text" id="cliUsername" name="cliUsername" />
          <br />
          <br />
          <label htmlFor="cliEmail">Email:</label>
          <input type="email" id="cliEmail" name="cliEmail" />
          <br />
          <br />
          <label htmlFor="cliPassword">Password:</label>
          <input type="password" id="cliPassword" name="cliPassword" />
          <br />
          <br />
          <label htmlFor="cliPhoneNumber">Phone Number:</label>
          <input type="tel" id="cliPhoneNumber" name="cliPhoneNumber" />
          <br />
          <br />
          <label htmlFor="cliProvince">Province:</label>
          <select id="cliProvince"className="empProvince" name="cliProvince">
            <option value="Koshi">Koshi</option>
            <option value="Madhes">Madhes</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Gandaki">Gandaki</option>
            <option value="Lumbini">Lumbini</option>
            <option value="Karnali">Karnali</option>
            <option value="Sudurpashchim">Sudurpashchim</option>
          </select>
          <br />
          <br />
          <label htmlFor="cliDistrict">District:</label>
          <input type="text" id="cliDistrict" name="cliDistrict" />
          <br />
          <br />
          <label htmlFor="cliCity">City:</label>
          <input type="text" id="cliCity" name="cliCity" />
          <br />
          <br />
          <label htmlFor="cliProfilePicture">Profile Picture:</label>
          <input
            type="file"
            id="cliProfilePicture"
            name="cliProfilePicture"
            accept="image/*"
          />
          <br />
          <br />
          <button className="sub" type="submit">Register as Client</button>
        </form>
      )}
    </div>
  );
};

export default Register;
