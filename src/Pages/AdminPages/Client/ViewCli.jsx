import './ViewCli.css'
import withAuth from '../../../Components/Auth/withAuth'
import React from 'react'

const ViewCli = () => {
  return (
    <div>ViewCli</div>
  )
}

export default withAuth(ViewCli, "Admin")