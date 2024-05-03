import React, { useState } from 'react';
import Header from '../../../../Components/Header/Header';
import Footer from '../../../../Components/footer/Footer';
import axios from 'axios';

const AddQualification = () => {
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (event) => {
    setImageFiles([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();

      imageFiles.forEach((file) => {
        formData.append('Qualifications', file);
      });

      const response = await axios.post('http://localhost:7878/global/addQualifications', formData, {
        headers: {
          Authorization: token
        }
      });
      
      if (response.status === 200) {
        alert('Images uploaded successfully:');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h2>Add Qualification</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} multiple />
          <button type="submit">Upload Images</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddQualification;
