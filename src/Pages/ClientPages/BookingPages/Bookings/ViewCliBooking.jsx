import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../../Components/Header/Header';
import withAuth from '../../../../Components/Auth/withAuth';
import './Styles.css';
import { useNavigate } from 'react-router-dom';

const ViewCliBooking = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7878/user/viewRequests', {
          headers: { Authorization: token },
        });
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchData();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      const response = await axios.post(`http://localhost:7878/user/cancelBooking/${id}`, { status: 'cancel' }, {
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        alert(`Booking has been cancelled`);
        navigate("/")   
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div>
      <Header />
      <h2>View Client Bookings</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Job Description</th>
              <th>Work Day</th>
              <th>Province</th>
              <th>District</th>
              <th>City</th>
              <th>Address</th>
              <th>Status</th>
              <th>Wage Per Day</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.job}</td>
                <td>{booking.jobDescription}</td>
                <td>{booking.workDay.split('T')[0]}</td>
                <td>{booking.province}</td>
                <td>{booking.district}</td>
                <td>{booking.city}</td>
                <td>{booking.address}</td>
                <td>{booking.isAccepted}</td>
                <td>{booking.wagePerDay}</td>
                <td>
                  <button className='acc' onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuth(ViewCliBooking, "Client");
