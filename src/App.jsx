import HomePage from './Pages/HomePage/HomePage'
import JobPage from './Pages/JobPage/JobPage'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import SingleJob from './Pages/SingleJob/SingleJob'
import BookingForm from './Components/BookingForm/BookingForm'
import LoginPage from './Pages/LoginPage/LoginPage'
import ForgetPassword from './Pages/LoginPage/Authentication/ForgetPassword/ForgetPassword'
import ChangePassword from './Pages/LoginPage/Authentication/ChangePassword/ChangePassword'
function App() {

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/jobs' element={<JobPage/>}/>
      <Route path='/job/:searchOption' element={<SingleJob/>}/>
      <Route path='/job/:searchOption/:Province/:District/:City' element={<SingleJob/>}/>
      <Route path="/BookEmployee/:jobId" element={<BookingForm/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/forgot-password" element={<ForgetPassword/>} />
      <Route path="/change-password" element={<ChangePassword/>} />

     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
