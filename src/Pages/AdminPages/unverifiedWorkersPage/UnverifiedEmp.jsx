import './Style.css'
import React from 'react'
import withAuth from '../../../Components/Auth/withAuth'
const UnverifiedEmp = () => {
  return (
    <div>UnverifiedEmp</div>
  )
}

export default withAuth(UnverifiedEmp ,"Admin")