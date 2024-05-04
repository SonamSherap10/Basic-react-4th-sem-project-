import { useLocation, useNavigate } from "react-router-dom";
import './BookingForm.css'
import Header from "../../../Components/Header/Header";
import axios from "axios";
import withAuth from "../../../Components/Auth/withAuth";

const BookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, wage } = state;
    const token = localStorage.getItem("token");

    const description = document.getElementById("description").value;
    const workDate = document.getElementById("workDate").value;
    const homeAddress = document.getElementById("homeAddress").value;

  
  const currentDate = new Date();
  const selectedWorkDate = new Date(workDate);

  if (selectedWorkDate < currentDate) {
    alert("Work date cannot be less than the current date.");
    return;
  }

    try {
      const response = await axios.post(
        `http://localhost:7878/user/bookProfessionals/${id}`,
        {
          wagePerDay: wage,
          jobDescription: description,
          WorkDay: workDate,
          address: homeAddress,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert('Booking created successfully.Waiting for employee to verify')
        navigate("/");
      }
    } catch (error) {
      alert('You have already booked the employee');
      }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h3>Book-Worker: {state.name}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="description">Job Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              className="description"
            />
          </div>
          <div>
            <label htmlFor="workDate">Work Date (Enter in correct format):</label>
            <input
              type="date"
              id="workDate"
              name="workDate"
              className="workDate"
              placeholder="yy-mm-dd"
            />
          </div>

          <div>
            <label htmlFor="homeAddress">Home Address:</label>
            <input
              type="text"
              id="homeAddress"
              name="homeAddress"
              className="homeAddress"
            />
          </div>
          <div>
            <label className="wage">Wage Per Day: {state.wage}</label>
            <br />
          </div>
          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </>
  );
};

export default withAuth(BookingForm, 'Client');
