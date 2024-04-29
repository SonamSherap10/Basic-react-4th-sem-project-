import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './BookingForm.css'
import Header from "../Header/Header";
import axios from "axios";
import withAuth from "../Auth/withAuth";

const BookingForm = () => {
  const id = useLocation().state.id;
  const name = useLocation().state.name;
  const wage = useLocation().state.wage;
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      const response = await axios.post(
        `http://localhost:7878/user/bookProfessionals/${id}`,
        {
          wagePerDay: wage,
          jobDescription: data.description,
          WorkDay: data.workDate,
          address: data.homeAddress,
        }
      );

      if (response.status === 201) {
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h3>Book-Worker: {name}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="description">Job Description:</label>
            <input
              type="text"
              id="description"
              className="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="workDate">Work Date (dd/mm/yy):</label>
            <input
              type="text"
              id="workDate"
              className="workDate"
              placeholder="dd/mm/yy"
              value={workDate}
              onChange={(e) => setWorkDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="homeAddress">Home Address:</label>
            <input
              type="text"
              id="homeAddress"
              className="homeAddress"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="wage">Wage Per Day: {wage}</label>
            <br />
          </div>
          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </>
  );
};

export default withAuth(BookingForm ,'Client') 
