import React,{useEffect} from "react"
import Hero from "./hero/Hero"
import Testimonal from "./testimonal/Testimonal"
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();

  // useEffect(() => {

  //   const token = localStorage.getItem('jwtToken');
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [navigate]);
  return (
    <>
    
      <Hero />      
    </>
  )
}

export default Home
