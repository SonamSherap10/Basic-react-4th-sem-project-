import './ViewEmp.css';
import withAuth from '../../../Components/Auth/withAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ViewEmp = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:7878/admin/delete/${id}`, { headers: { Authorization: `${token}` } });
      alert("User Deleted");
      getEmployees();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:7878/admin/view/Employees`, { headers: { Authorization: `${token}` } });
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <header>
        <Link to="/" className="back">Go Back</Link>
      </header>
      <div className="employee-cards">
        {employees.map(employee => (
          <div key={employee.id} className="ecard">
            <img src={employee.profilePicture} alt="Employee Profile Picture" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{employee.username}</h5>
              <p className="card-text">User Id: {employee.id}</p>
              <p className="card-text">Email: {employee.email}</p>
              <p className="card-text">Phone Number: {employee.phoneNumber}</p>
              <p className="card-text">Province: {employee.province}</p>
              <p className="card-text">City: {employee.city}</p>
              <p className="card-text">Job Title: {employee.jobTitle}</p>
              <p className="card-text">Description: {employee.description}</p>
              <p className="card-text">Wage: Rs {employee.Wage} </p>
              <div className="btn-group" role="group" aria-label="Employee Actions">
                <button type="button" className="btn btn-primary" onClick={() => navigate(`/viewQualification/${employee.id}`)}>View Qualifications</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteUser(employee.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default withAuth(ViewEmp, "Admin");
