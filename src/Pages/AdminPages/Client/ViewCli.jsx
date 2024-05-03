import './ViewCli.css';
import withAuth from '../../../Components/Auth/withAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ViewClient = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const deleteClient = async (id) => {
    try {
      await axios.delete(`http://localhost:7878/admin/delete/${id}`, { headers: { Authorization: `${token}` } });
      alert("Client Deleted");
      getClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get(`http://localhost:7878/admin/view/Clients`, { headers: { Authorization: `${token}` } });
      setClients(response.data.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <header>
        <Link to="/" className="back">Go Back</Link>
      </header>
      <div className="client-cards">
        {clients.map(client => (
          <div key={client.id} className="card">
            <div className="card-body">
              <img src={client.profilePicture} alt="Profile" className="ppp" />
              <h5 className="card-title">UserName: {client.username}</h5>
              <p className="card-text">User Id: {client.id}</p>
              <p className="card-text">Email: {client.email}</p>
              <p className="card-text">Phone Number: {client.phoneNumber}</p>
              <p className="card-text">Province: {client.province}</p>
              <p className="card-text">District: {client.district}</p>
              <p className="card-text">Joined At: {client.createdAt.split('T')[0]}</p>
              <div className="btn-group" role="group" aria-label="Client Actions">
                <button type="button" className="btn btn-danger" onClick={() => deleteClient(client.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default withAuth(ViewClient, "Admin");
