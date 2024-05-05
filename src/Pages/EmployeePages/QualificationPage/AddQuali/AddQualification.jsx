import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import "./styles.css"

const AddQualification = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate()
  const handleFileChange = (event) => {
    setImageFiles(Array.from(event.target.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();
      imageFiles.forEach((file, index) => {
        formData.append(`Qualifications`, file); // Append each file directly without modification
      });
      
      const response = await axios.post('http://localhost:7878/user/addQualifications', formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data' // Set content type to multipart form data
        }
      });

      if (response.status === 200) {
        alert('Images uploaded successfully');
        navigate("/")
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h5 className='adquali'>Add Qualifications (you can enter only upto 15-images intotal)</h5>
        <form className='frm' onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} multiple />
          <button className='sbm' type="submit">Upload Images</button>
        </form>
      </div>
    </>
  );
};

export default AddQualification;
