import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../Components/Header/Header';
import './ViewClient.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const ViewCl = () => {
  const [client, setClient] = useState(null); 
  const id = useLocation().state.id;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
 
  console.log(id)
  const getClient = async () => { 
    try {
      const response = await axios.get(`http://localhost:7878/user/viewClient/${id}`, { headers: { Authorization: token } }); // Remove string interpolation from token
      setClient(response.data.data);
    } catch (error) {
       alert("Client not found. He may have been removed");
       navigate("/")
    }
  };

  useEffect(() => {
    getClient();
  }, [id]); 

  return (
    <>
      <Header />
      <div className="client-cards">
        {client && ( 
          <div className="card">
            <div className="card-body">
              <img src={client.profilePicture} alt="Profile" className="ppp" />
              <h5 className="card-title">Username: {client.username}</h5>
              <p className="card-text">Email: {client.email}</p>
              <p className="card-text">Phone Number: {client.phoneNumber}</p>
              <p className="card-text">Province: {client.province}</p>
              <p className="card-text">District: {client.district}</p>
              <p className="card-text">City: {client.city}</p>
              <p className="card-text">Joined At: {client.createdAt.split('T')[0]}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewCl;
