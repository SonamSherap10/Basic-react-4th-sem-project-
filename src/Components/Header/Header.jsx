import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import fayftLogo from '@images/FIX AT YOUR FINGERTIPS (1).png';

const Header = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const isLoggedIn =  localStorage.getItem('token') && localStorage.getItem('role');

  const handleSearch = () => {
    const jobName = document.getElementById("jobName").value;
    const province = document.getElementById("province").value;
    const district = document.getElementById("district").value;
    const city = document.getElementById("city").value;

    if (jobName.trim() !== "" && province.trim() === "" && district.trim() === "" && city.trim() === "") {
      navigate(`/Job/${jobName}`);
    } else {
      if (jobName.trim() === "" || province.trim() === "" || district.trim() === "" || city.trim() === "") {
        alert("Please fill out all the fields to perform a search.");
      } else {
        let url = `/Job/${jobName}/${province}/${district}/${city}`;
        navigate(url);
      }
    }
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert("Logged out successfully")
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
      <img src={fayftLogo} alt="fayft logo" />
      </div>
      <div className="search-bar">
        <input type="text" id="jobName" placeholder="Search" />
        <button type="button" className="search-but" onClick={handleSearch}>
          Search
        </button>
        <div className="filter">
          <button className="filter-btn" onClick={toggleFilter}>
            Filter
          </button>
        </div>
        <div className={`filter-options ${showFilter ? "show" : ""}`}>
          <select id="province" name="province">
            <option value="">Select Province</option>
            <option value="Koshi">Koshi</option>
            <option value="Madhes">Madhes</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Gandaki">Gandaki</option>
            <option value="Lumbini">Lumbini</option>
            <option value="Karnali">Karnali</option>
            <option value="Sudurpashchim">Sudurpashchim</option>
          </select>
          <input type="text" id="district" placeholder="Enter District" />
          <input type="text" id="city" placeholder="Enter City" />
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/aboutPage">About</a>
        </li>
        <li>
          <a href="/jobs">Services</a>
        </li>
      </ul>
      <button className="log-btn" id="log-btn" onClick={isLoggedIn ? logout : () => navigate('/login')}>
        {isLoggedIn ? 'Logout' : 'Login / Sign up'}
      </button>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Header;
