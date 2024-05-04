import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/footer/Footer'; 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="home-containerz">
      <Header />
      <div className="sidebarz">
        <ul>
          <li>
            <button onClick={() => navigate('/user-booking-requests')}>View Booking Requests</button>
          </li>
          <li>
            <button onClick={() => navigate('/booked-workers')}>View Booked Workers</button>
          </li>
          <li>
            <button onClick={() => navigate('/completed-requests')}>View Completed Requests</button>
          </li>
        </ul>
      </div>
    </div>
      <Footer/>
      </>
  );
};

export default HomePage;
