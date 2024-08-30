import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/scholarship');
  };

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO LASU SCHOOL FEES FUNDING PROGRAM' title='Outstanding Expertise in Online Funding' />
            <p>Far, far away, behind the world of educational funding, far from the realms of financial aid and student support, there exists a program called 'Welcome to LASU's School Fee Funding Program</p>
            <div className='button'>
              <button className='primary-btn' onClick={handleClick}>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
                VIEW SCHOLARSHIPS <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
