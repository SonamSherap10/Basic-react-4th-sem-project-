import './Style.css'
import React, { useEffect, useState } from 'react'
import withAuth from '../../../Components/Auth/withAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UnverifiedEmp = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7878/admin/viewUnverifiedEmployee", { headers: { Authorization: token }});
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const verify = async (id, value) => {
    try {
      const response = await axios.post(`http://localhost:7878/admin/verifyEmployee/${id}`, { value }, { headers: { Authorization: token }});
      if (response.status === 200) {
        alert('Verified')
        fetchData();
      }else if(response.status === 201){
        fetchData();
        alert("Deleted due to failed Verification");
      }
    } catch (error) {
      console.error('Error verifying employee:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <body>
      <header>
        <button className='back' onClick={() => navigate("/")}>Go Back</button>
        <h1>View Unverified Employees</h1>
      </header>
      <main className="table-container">
        <table>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Province</th>
              <th>City</th>
              <th>Job Title</th>
              <th>Description</th>
              <th>Wage</th>
              <th>Action</th>
              <th>Verify</th>
              <th>Unverify</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td><img src={employee.profilePicture} alt="Profile" className="pp" /></td>
                <td>{employee.username}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.province}</td>
                <td>{employee.city}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.description}</td>
                <td>{employee.wage}</td>
                <td><button className="button-view-qualifications"onClick={() => navigate(`/viewQualification/${employee.id}`)} >View Qualifications</button></td>
                <td><button className="button-approve" onClick={() => verify(employee.id, "ok")}>Approve</button></td>
                <td><button className="button-delete" onClick={() => verify(employee.id, "notOk")}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </body>
    </>
  )
}

export default withAuth(UnverifiedEmp, "Admin");
