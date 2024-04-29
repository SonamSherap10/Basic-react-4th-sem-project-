import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../Components/Header/Header';
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
    console.log(response.data.data)
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
                <h2 className="username">Name : {job.username}</h2>
                <p className="email">Email : {job.email}</p>
                <p className="job-title">Job-Title : {job.jobTitle}</p>
                <p className="phone-number">Phone.No : {job.phoneNumber}</p>
                <p className="location">
                  <span className="province">Province : {job.province}</span><br></br>
                  <span className="district">District : {job.district}</span><br></br> 
                  <span className="city">City : {job.city}</span>
                </p>
                <p className="wage">Wage : {job.Wage}</p>
                <p className="booking-status">Status : {job.bookingStatus}</p>
              </div>
              <button className="mb-10 ml-10vh inline-block px-10 py-10 text-2xl font-bold uppercase border-none rounded-md cursor-pointer text-yellow-500 bg-black shadow-md transition duration-300 hover:bg-gray-900" 
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