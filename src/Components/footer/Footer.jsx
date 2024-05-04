import React from 'react';
import './footer.css';
import fayftLogo from '@images/FIX AT YOUR FINGERTIPS (1).png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="containerz">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
<img className='imgg' src={fayftLogo} alt="fayft logo" />
            </a>
            <p className="footer-text">
              Search for cheapest home services all over Nepal.
            </p>
          </div>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Company</p>
            </li>
            <li>
              <a href="#" className="footer-link">Home</a>
            </li>
            <li>
              <a href="#" className="footer-link">About us</a>
            </li>
            <li>
              <a href="#" className="footer-link">Our Services</a>
            </li>
            <li>
              <a href="#" className="footer-link">Contact us</a>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Support</p>
            </li>
            <li>
              <a href="#" className="footer-link">Help center</a>
            </li>
            <li>
              <a href="#" className="footer-link">Terms & conditions</a>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Suggestion Box:</p>
            </li>
            <li>
              <input className="footer-input" type="text" placeholder="Full Name" />
            </li>
            <li>
              <textarea rows="3" placeholder="Type a message here" className="footer-textarea"></textarea>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <ul className="social-list">
            <li><a href="#" className="social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="#" className="social-link"><ion-icon name="logo-instagram"></ion-icon></a></li>
            <li><a href="#" className="social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
            <li><a href="#" className="social-link"><ion-icon name="logo-linkedin"></ion-icon></a></li>
            <li><a href="#" className="social-link"><ion-icon name="logo-skype"></ion-icon></a></li>
            <li><a href="#" className="social-link"><ion-icon name="mail-outline"></ion-icon></a></li>
          </ul>
          <p className="copyright">&copy; 2024 <a href="#">Fix at your Fingertips.</a>. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
