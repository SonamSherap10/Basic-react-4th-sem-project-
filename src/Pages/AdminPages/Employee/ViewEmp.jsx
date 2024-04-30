import './ViewEmp.css'
import withAuth from '../../../Components/Auth/withAuth'
import React from 'react'

const ViewEmp = () => {
  return (
    <div>ViewEmp</div>
  )
}

export default withAuth(ViewEmp,"Admin")