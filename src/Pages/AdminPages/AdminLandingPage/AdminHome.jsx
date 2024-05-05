import React, { useEffect, useState } from 'react';
import withAuth from '../../../Components/Auth/withAuth';
import './AdminHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AdminHome = () => {
  const [Bookings, setBookings] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:7878/admin/viewBookings", { headers: { Authorization: `${token}` } })
    setBookings(response.data.data)
  }


  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:7878/admin/deleteBooking/${id}`, { headers: { Authorization: `${token}` } });
      alert("Booking has been Deleted")
      getData();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert("Logged out successfully");
    navigate('/login');
  };

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <body>
        <header>
          <nav>
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                <img src="/images/hamburbur.png" alt="Button Image" />
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <a href='/viewUnverifiedWorkers'>View Unverified Workers</a>
                  </li>
                  <li>
                    <a href="/ViewEmployees">View Employees</a>
                  </li>
                  <li>
                    <a href="/ViewClients">View Clients</a>
                  </li>
                </ul>
              )}
            </div>
          </nav>
          <img className='lpp' src='./public/images/FIX AT YOUR FINGERTIPS (1).png'/>
          <h1>Fix at Your Fingertips</h1>
          <h3 className='wla'>Welcome Admin</h3>
          <button className="log" id="log" onClick={logout}>
            Log Out
          </button>
        </header>
        <h1 >Booking Details</h1>
        <main>
          <div className="table-container"> <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Emp-ID</th>
                <th>Cli-ID</th>
                <th>Job</th>
                <th>Job Description</th>
                <th>Work Day</th>
                <th>Address</th>
                <th>Is Accepted</th>
                <th>Work Status</th>
                <th>Wage</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Completed In</th>
                <th>Requested At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.employeeId}</td>
                  <td>{booking.customerId}</td>
                  <td>{booking.job}</td>
                  <td>{booking.jobDescription}</td>
                  <td>{booking.workDay ? booking.workDay.split('T')[0] : 'NA'}</td>
                  <td>{booking.address}</td>
                  <td>{booking.isAccepted}</td>
                  <td>{booking.workStatus}</td>
                  <td>{booking.wagePerDay}</td>
                  <td>{booking.rating}</td>
                  <td>{booking.comment}</td>
                  <td>
                    {booking.completedIn ? booking.completedIn.split('T')[0] : 'NA'}
                  </td>
                  <td>{booking.createdAt.split('T')[0]}</td>
                  <td><button className='dlt' onClick={() => handleDelete(booking.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </main>

      </body>
    </>
  );
};

export default withAuth(AdminHome, 'Admin');
