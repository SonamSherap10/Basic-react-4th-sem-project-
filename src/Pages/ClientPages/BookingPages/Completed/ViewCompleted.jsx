import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../../Components/Header/Header";
import withAuth from "../../../../Components/Auth/withAuth";
import "../Bookings/Styles.css";
import { useNavigate } from 'react-router-dom';

const ViewCompleted = () => {
  const [completedRequests, setCompletedRequests] = useState([]);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7878/user/viewCompletedRequests', {
        headers: { Authorization: token },
      });
      setCompletedRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching completed requests:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRateWorker = (id) => {

    setSelectedBookingId(id);
    setShowRatingForm(true);

  };

  const handleSubmitRating = async () => {
    try {
      const ratingValue = document.getElementById('rating').value;
      const commentValue = document.getElementById('comment').value;
  
      const response = await axios.post(`http://localhost:7878/user/rateWorker/${selectedBookingId}`,
        { rating: parseInt(ratingValue), comment: commentValue },
        { headers: { Authorization: token } }
      );
  
      if (response.status === 200) {
        alert('Rating submitted successfully');
        setShowRatingForm(false);
      }
    } catch (error) {
      alert('You have already submitted a rating');
      setShowRatingForm(false);
    }
  };
  

  const handleInitiatePayment = async(id) => {
     const response =  await axios.post(`http://localhost:7878/payment/initiatePayment/${id}`
     ,null,{headers: {Authorization: token}})
    if(response.status ===200){
      alert("Payment Initiated Successfully")
      window.location.href = response.data.payment_url;
    }
  };


  return (
    <div>
      <Header />
      <h6 className='vcb'>All Completed Requests</h6>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Emp Id</th>
              <th>Job</th>
              <th>Job Description</th>
              <th>Work Day</th>
              <th>Province</th>
              <th>District</th>
              <th>City</th>
              <th>Address</th>
              <th>Status</th>
              <th>Wage Per Day</th>
              <th>Rate</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {completedRequests.map(request => (
              <tr key={request.id}>
                <td>{request.employeeId}</td>
                <td>{request.job}</td>
                <td>{request.jobDescription}</td>
                <td>{request.workDay.split('T')[0]}</td>
                <td>{request.province}</td>
                <td>{request.district}</td>
                <td>{request.city}</td>
                <td>{request.address}</td>
                <td>{request.isAccepted}</td>
                <td>{request.wagePerDay}</td>
                <td>
                  <button className='acc' onClick={() => handleRateWorker(request.id)}>Rate Worker</button>
                </td>
                <td>
                  <button className='acc' onClick={() => handleInitiatePayment(request.id)}>Initiate Payment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showRatingForm && (
        <div className="rating-form">
          <h3>Rate Worker</h3>
          <label>Rating:</label>
          <input type="number" id="rating" min="1" max="5" defaultValue="1" />
          <label>Comment:</label>
          <textarea id="comment" />
          <button onClick={handleSubmitRating}>Submit Rating</button>
        </div>
      )}
    </div>
  );
};

export default withAuth(ViewCompleted, "Client");
