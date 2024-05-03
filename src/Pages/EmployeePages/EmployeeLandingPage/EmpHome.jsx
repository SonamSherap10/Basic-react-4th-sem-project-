import React, { useState } from 'react';
import './EmpHome.css';
import withAuth from '../../../Components/Auth/withAuth';
import Footer from '../../../Components/footer/Footer';
import Header from '../../../Components/Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmpHome = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBookingRequests, setShowBookingRequests] = useState(false);
  const [showBookedRequests, setShowBookedRequests] = useState(false);
  const [bookings , setBookings] = useState([])
  const [booked , setBooked] = useState([])


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getBookings = async() =>{
    const token = localStorage.getItem('token');
    const response  = await axios.get("http://localhost:7878/user/viewBookings",{headers:{Authorization :`${token}`}})
    if(response.statusCode != 200){
      console.log("No bookings Found")
    }
    console.log(response.data.data);
     setBookings(response.data.data)
  }

  const getBooked = async()=>{
    const token = localStorage.getItem('token');
    const response  = await axios.get("http://localhost:7878/user/viewBookedRequests",{headers:{Authorization :`${token}`}})
     setBooked(response.data.data)
     if(response.status === 404){
      console.log("You Havent been booked")
     }
  }

  const handleViewBookingRequests = () => {
    setShowBookingRequests(true);
    setShowBookedRequests(false);
    getBookings()
  };

  const handleViewBookedRequests = () => {
    setShowBookedRequests(true);
    setShowBookingRequests(false); // Ensure only one view is active at a time
    getBooked()
  };

const handleReq = async(id, status)=>{
  const token = localStorage.getItem('token');
  if(status === "Decline"){
    alert('Declined Successfully')
  }
  await axios.post(`http://localhost:7878/user/settleBooking/${id}`,{willAccept:status},{headers:{Authorization :`${token}`}})
  alert("Request accepted Successfully")
    navigate("/")
}

const handleCompleted = async(id, status) =>{
   const token = localStorage.getItem('token');
   const res = await axios.post(`http://localhost:7878/user/requestCompletion/${id}`,{status},{headers:{Authorization :`${token}`}})
   console.log(res.data)
   if(res.status === 200 || 202){
    alert("Request Settled Successfully");
    navigate("/");
   }
}


  const bookingRequestsTable = (
    <table>
      <thead>
        <tr>
          <th>Client id</th>
          <th>Job Description</th>
          <th>Work Day</th>
          <th>Wage</th>
          <th>Province</th>
          <th>District</th>
          <th>City</th>
          <th>Address</th>
          <th>Accept</th>
          <th>Decline</th>
        </tr>
      </thead>
      <tbody>
      {bookings.map(request => (
          <tr key={request.id}>
            <td>{request.customerId}</td>
            <td>{request.jobDescription}</td>
            <td>{request.workDay.split('T')[0]}</td>
            <td>{request.wagePerDay}</td>
            <td>{request.province}</td>
            <td>{request.district}</td>
            <td>{request.city}</td>
            <td>{request.address}</td>
            <td><button className='acc' onClick={()=>handleReq(request.id,"Accept")}>Accept</button></td>
            <td><button className='acc'onClick={()=>handleReq(request.id,"Decline")}>Decline</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const bookedRequestsTable = (
    <table>
      <thead>
        <tr>
          <th>Client id</th>
          <th>Wage</th>
          <th>Province</th>
          <th>District</th>
          <th>City</th>
          <th>Address</th>
          <th>Work Day</th>
          <th>Job Description</th>
          <th>Accepted Status</th>
          <th>Work Status</th>
          <th>Drop Work</th>
        </tr>
      </thead>
      <tbody>
        {booked.map(request => (
          <tr key={request.id}>
            <td>{request.customerId}</td>
            <td>{request.wagePerDay}</td>
            <td>{request.province}</td>
            <td>{request.district}</td>
            <td>{request.city}</td>
            <td>{request.address}</td>
            <td>{request.workDay.split('T')[0]}</td>
            <td>{request.jobDescription}</td>
            <td>{request.isAccepted}</td>
            <td><button className='acc' onClick={()=>handleCompleted(request.id,"Done")}>Completed</button> </td>
            <td><button className='acc' onClick={()=>handleCompleted(request.id,"Drop")}>Cancel</button> </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <Header />
      <img src="./public/images/hamburbur.png" className="toggle-sidebar" onClick={toggleSidebar} />
      <body>
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <a id='vbr' onClick={handleViewBookingRequests}>View Booking Requests</a>
          <a onClick={handleViewBookedRequests}>View Booked Requests</a>
          <a href="/viewRating/:empId">View Rating</a>
          <a href="/updateQualifications">Your Qualifications</a>
        </div>
        <div className="main-content">
          <h1 className='wlc'>Welcome to your dashboard</h1>
          {showBookingRequests && bookingRequestsTable}
          {showBookedRequests && bookedRequestsTable}
        </div>
      </body>
      <Footer />
    </>
  );
};

export default withAuth(EmpHome, "Employee");
