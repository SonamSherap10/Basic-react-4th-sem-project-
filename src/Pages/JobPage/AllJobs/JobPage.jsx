import { useEffect, useState } from "react"
import "./JobPage.css"
import axios from "axios"
import Header from "../../../Components/Header/Header"
import { useNavigate } from "react-router-dom"

const JobPage = () => {
const [jobs, SetJobs] = useState([])
const navigate = useNavigate();

const FetchData = async ()=>{
  const response  = await axios.get("http://localhost:7878/global/viewAll")
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
<div className="card" key={job.id}>
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
    <button className="book"
     onClick={()=>navigate(`/BookEmployee/${job.id}`,{ state:{name: job.username, wage:job.Wage,id:job.id},replace:true })} >Book</button>
    </div>
    </div>
    )
  })
}

   </>
  )
}

export default JobPage