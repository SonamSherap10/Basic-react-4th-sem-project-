import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage/ClientLandingPage/HomePage';
import AdminHome from './Pages/HomePage/AdminLandingPage/AdminHome';
import EmployeeHome from './Pages/HomePage/EmployeeLandingPage/EmpHome';
import JobPage from './Pages/JobPage/JobPage';
import SingleJob from './Pages/SingleJob/SingleJob';
import BookingForm from './Components/BookingForm/BookingForm';
import LoginPage from './Pages/LoginPage/Login/LoginPage';
import ForgetPassword from './Pages/LoginPage/Authentication/ForgetPassword/ForgetPassword';
import ChangePassword from './Pages/LoginPage/Authentication/ChangePassword/ChangePassword';
import Register from './Pages/LoginPage/Register/Register';

const App = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Check if the user is logged in and get their role from localStorage
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ userRole === 'Admin' ? (<AdminHome />) : userRole === 'Employee' ? (<EmployeeHome /> ) : (<HomePage />) }/>
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/job/:searchOption" element={<SingleJob />} />
        <Route path="/job/:searchOption/:Province/:District/:City" element={<SingleJob />} />
        <Route path="/BookEmployee/:jobId" element={<BookingForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/Sign-up" element={<Register />} />
        {/* Redirect to login page if user is not logged in */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
