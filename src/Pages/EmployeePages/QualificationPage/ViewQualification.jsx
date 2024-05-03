import React, { useEffect, useState } from 'react';
import './ViewQualification.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewQualification = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [name, setName] = useState();

  const getImages = async () => {
    try {
      const response = await axios.get(`http://localhost:7878/global/viewQualifications/${empId}`);
      setImages(response.data.data);
      setName(response.data.message);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    getImages();
  }, [empId]);

  return (
    <>
       <header>  
        <button className='beck' onClick={()=>navigate("/")}>Go Back</button>
       <div className="showname"> {name} Qualifications</div>
       </header>
    <div className="image-container">
      {images.map((imageObj, index) => (
        <div key={index} className="image-group">
          {Object.keys(imageObj).map(key => {
            if (key !== 'userId') {
              return <img key={key} src={imageObj[key]} alt={`Qualification ${key}`} className="qualification-image" />;
            }
            return null;
          })}
        </div>
      ))}
    </div></>
 
  );
};

export default ViewQualification;
