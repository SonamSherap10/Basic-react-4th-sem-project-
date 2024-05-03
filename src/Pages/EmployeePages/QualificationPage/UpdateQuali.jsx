import React, { useEffect, useState } from 'react';
import './UpdateQuali.css'
import Header from '../../../Components/Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateQuali = () => {
  const [images, setImages] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const getImages = async () => {
    try {
      const empId = token;
      const response = await axios.get(`http://localhost:7878/global/viewQualifications/${empId}`);
      setImages(response.data.data);
    } catch (error) {
      // console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleDelete = async(imageName) => {
   const response = await axios.post("http://localhost:7878/user/deleteQualifications",{imgName:`${imageName}`},
   {headers:{Authorization :`${token}` }} )
   if(response.status === 200 || 202){
    alert("Qualification Deleted Successfully")
   }
  };

  return (
    <>
      <Header />
      <header className='heads'>
        <button className='adds' onClick={() => navigate("/addQualifications")}>Add Qualification</button>
        <h1 className='yq'>Your Qualifications</h1>
      </header>
      <div className="update-card-container">
        {images.map((imageObj, index) => (
          <div key={index} className="update-card">
            {Object.keys(imageObj).map((key, idx) => {
              if (key !== 'userId') {
                return (
                  <div key={idx} className="update-card-content">
                    <img src={imageObj[key]} alt={`Qualification ${key}`} className="update-qualification-image" />
                    <div className="update-button-group">
                      <button className="update-update-button" onClick={() => navigate("/updateImg",{state:{img:key},replace:true})}>Update</button>
                      <button className="update-delete-button" onClick={() => handleDelete(key)}>Delete</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateQuali;
