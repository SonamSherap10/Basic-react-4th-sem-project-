import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../../Components/Header/Header";
import withAuth from "../../../../Components/Auth/withAuth";

const ViewCliBooked = () => {
  const [bookedWorkers, setBookedWorkers] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7878/user/viewBookedWorkers', {
        headers: { Authorization: token },
      });
      setBookedWorkers(response.data.data);
    } catch (error) {
      console.error('Error fetching booked workers:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      console.log(id)
      const response = await axios.post(`http://localhost:7878/user/cancelBooking/${id}`, { status: 'cancel' }, {
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        alert(`Booking has been cancelled`);
        fetchData();
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div>
      <Header />
      <h2>View Booked Workers</h2>
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
            {bookedWorkers.map(worker => (
              <tr key={worker.id}>
                <td>{worker.job}</td>
                <td>{worker.jobDescription}</td>
                <td>{worker.workDay.split('T')[0]}</td>
                <td>{worker.province}</td>
                <td>{worker.district}</td>
                <td>{worker.city}</td>
                <td>{worker.address}</td>
                <td>{worker.isAccepted}</td>
                <td>{worker.wagePerDay}</td>
                <td>
                  <button className='acc' onClick={() => handleCancelBooking(worker.id)}>Cancel Booking</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuth(ViewCliBooked, "Client");
