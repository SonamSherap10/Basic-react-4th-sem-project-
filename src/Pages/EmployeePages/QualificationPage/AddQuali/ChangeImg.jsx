import React, { useState } from 'react';
import axios from 'axios';
import withAuth from "../../../../Components/Auth/withAuth";
import Header from "../../../../Components/Header/Header";
import Footer from "../../../../Components/footer/Footer";
import { useLocation, useNavigate } from 'react-router-dom';

const ChangeImg = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token')
  const imgName = useLocation().state.img

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('imgName', imgName); // Corrected line
      formData.append('image', image);
    
      const response = await axios.post('http://localhost:7878/user/updateQualifications', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token
        },
      });

      alert('Image uploaded successfully:');
      navigate("/updateQualifications")
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
      <input type="file" onChange={handleImageChange}  />
        <button onClick={handleSubmit} className="update-update-button">
          Submit
        </button>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(ChangeImg, "Employee");
