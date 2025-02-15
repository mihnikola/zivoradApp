import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetReservation from './components/GetReservations'
import AddReservation from './components/AddReservation'
import AddEmployer from './components/AddEmployer'
import AddService from './components/AddService'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import VerifyEmail from './components/VerifyEmail'
import NavMenu from './components/NavMenu'

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {token && <NavMenu />}
      <Routes>
        <Route path="/reservations" element={<GetReservation />} />
        <Route path="/addReservation" element={<AddReservation />} />
        <Route path="/addEmployer" element={<AddEmployer />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify/:id" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
