import "./App.css"
import Header from "./components/common/header/Header"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import About from "./components/about/About"
import AdminDashboard from "./components/Admin/AdminDashboard"
import Dashboard from "./components/Dashboard/Dashboard"
import Home from "./components/home/Home"
import Pricing from "./components/pricing/Pricing"
import RegisterStudent from "./components/Auth/RegisterStudent"
import Login from "./components/Auth/Login"
import AppliedScholarships from "./components/AppliedScholarship/AppliedScholarships"
import AddScholarshipForm from "./components/Admin/AddScholarshipForm"
import FundsTable from "./components/Admin/FundsTable"
import ScholarShip from "./components/Scholarship/Scholarship"
import SponsorshipTable from "./components/Admin/SponsorshipTable"
import FundsForm from "./components/Admin/FundsForm"




function App() {

  return (
    <>
      <BrowserRouter>

        <Header />

        
        <Routes>

          <Route exact path='/' element={<Home/>} />
          <Route exact path='/sponsors' element={<SponsorshipTable/>} />
          <Route exact path='/addfunds' element={<FundsForm/>} />
          <Route exact path='/funds' element={<FundsTable/>} />
          <Route exact path='/scholarship' element={<ScholarShip/>} />
          <Route exact path='/forms' element={<AddScholarshipForm/>} />
          <Route exact path='/applications' element={<AppliedScholarships/>} />
          <Route exact path='/register' element={<RegisterStudent/>} />
          <Route exact path='/dashboard' element={<Dashboard/>} />
          <Route exact path='/admin' element={<AdminDashboard/>} />
          <Route path='/about' element={<About />} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/pricing' element={<Pricing />} />


          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
 {/* <Route exact path='/scholarship' element={<ScholarShip/>} /> */}