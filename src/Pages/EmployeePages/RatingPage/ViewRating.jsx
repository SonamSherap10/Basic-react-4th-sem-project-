import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewRating.css';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/footer/Footer';
import { useParams } from 'react-router-dom';

const ViewRating = () => {
  const [ratingData, setRatingData] = useState(null);
  const {id} = useParams()
  console.log(id)
  if(id){
   var token = id
  }else{
    var token = localStorage.getItem('token')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:7878/global/viewRating/${token}`);
        setRatingData(response.data.data); 
      } catch (error) {
        console.error('Error fetching rating data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      <Header />
      <div className="rating-table-container">
        <h5 className='vr'>View Rating :</h5>
        {ratingData && (
          <table className="rating-table">
            <tbody>
              <tr>
                <th>Total Rating</th>
                <td>{ratingData.rating}</td>
              </tr>
              <tr>
                <th>Average Rating</th>
                <td>{ratingData.overallRating}</td>
              </tr>
              <tr>
                <th>Jobs Completed</th>
                <td>{ratingData.completedJobs}</td>
              </tr>
              <tr>
                <th>Verified At</th>
                <td>{new Date(ratingData.createdAt).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewRating;
