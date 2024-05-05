import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';

const SingleJob = () => {
  const navigate = useNavigate();
  const  {searchOption,Province,District,City} = useParams();
  const [jobs, SetJobs] = useState([])

  const FetchData = async ()=>{
    const response  = await axios.get("http://localhost:7878/global/viewProfessionals/" + searchOption ,{
      params:{
        province :Province,
        district : District,
        city : City
      }
    })
    SetJobs(response.data.data)
  }
  
  useEffect(()=>{
    FetchData()
  },[])
  
  

  return (
    <>
    <Header/>
    {
      jobs.map((job)=>{
        return(
          <div className="body">
          <div className="card">
                <div className="profile-picture">
                <img src={`${job.profilePicture}`} alt="Profile Picture"/>
              </div>
              <div className="card-content">
                  <p className="username">Name : {job.username}</p>
                  <p className="email">Email : {job.email}</p>
                  <p className="job-title">Job-Title : {job.jobTitle}</p>
                  <p className="phone-number">Phone.No : {job.phoneNumber}</p>
                  <p className="province">Province : {job.province}</p>
                  <p className="district">District : {job.district}</p>
                  <p className="city">City : {job.city}</p>
                  <p className="wage">Wage : {job.Wage}</p>
                  <p className="booking-status">Status : {job.bookingStatus}</p>
                <div>
                <button className='vqr' onClick={()=>navigate(`/viewQualification/${job.id}`)}>View Qualifications</button>
                <button className='vqr'onClick={()=>navigate(`/viewRating/${job.id}`)}>View Rating</button>
                  </div> 
              </div>
              <button className="book" 
              onClick={()=>navigate(`/BookEmployee/${job.id}`,{ state:{name: job.username,wage:job.Wage,id:job.id},replace:true })} >Book</button>
              </div>
              </div>
        )
      })
    }
    </>
        )
 
}

export default SingleJob