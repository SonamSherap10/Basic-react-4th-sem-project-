import React from 'react';
import './HomePage.css';
import Header from "../../../Components/Header/Header"

const HomePage = () => {
  return (
    <div className="home-container">
   <Header/>
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h2>Fix at Your Fingertips</h2>
            <p className="subtitle">Connecting you with skilled professionals for all your needs</p>
          </div>
        </section>

        <section className="features-section">
          <div className="feature">
            <h3>Easy Navigation</h3>
            <p>The website boasts a user-friendly interface that ensures seamless navigation, allowing users to quickly find the services they require.</p>
          </div>
          <div className="feature">
            <h3>Diverse Service Categories</h3>
            <p>Fix at Your Fingertips offers a wide array of service categories to cater to diverse needs. From plumbing and electrical work to tutoring and event planning, users can easily find professionals skilled in their required field.</p>
          </div>
          <div className="feature">
            <h3>Comprehensive Profiles</h3>
            <p>Each professional listed on the platform has a detailed profile showcasing their expertise, qualifications, experience, and customer reviews. This empowers users to make informed decisions when selecting a service provider.</p>
          </div>
          <div className="feature">
            <h3>Convenient Booking System</h3>
            <p>Fix at Your Fingertips simplifies the process of booking services by providing an integrated booking system. Users can schedule appointments with preferred professionals directly through the platform, saving time and effort.</p>
          </div>
          <div className="feature">
            <h3>Secure Payment Options</h3>
            <p>The website ensures secure payment transactions, offering multiple payment options to facilitate seamless transactions between users and service providers.</p>
          </div>
          <div className="feature">
            <h3>Feedback and Rating System</h3>
            <p>Users can provide feedback and ratings based on their experience with service providers, fostering transparency and accountability within the community.</p>
          </div>
          <div className="feature">
            <h3>Responsive Customer Support</h3>
            <p>Fix at Your Fingertips prioritizes customer satisfaction and offers responsive customer support to address any queries or concerns promptly.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-container">
          <p>&copy; 2024 Fix at Your Fingertips. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
