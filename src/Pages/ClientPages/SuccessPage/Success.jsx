import React, { useEffect } from 'react'
import withAuth from '../../../Components/Auth/withAuth'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const Success = () => {
  const {pidx} = useParams()
 const verify = async()=>{
   const response = await axios.post('http://localhost:7878/payment/verifyPayment',{params:{
    pidx
   }})
   if(response.status === 200) {
     alert("Payment Verified.Thank you")
     window.location.href('/')   
 }
 }
 useEffect(()=>{
   verify()
 },[])
  return (
    <></>
  )
}

export default withAuth(Success,"Client")