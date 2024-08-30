import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);

  const nav = useNavigate();

  const userType = localStorage.getItem("TYPE");
  const userSPONSORType = localStorage.getItem("TYPES");
  const userStudentType = localStorage.getItem("TYPESS");

  console.log(userStudentType);
  const logOut = () => {
    localStorage.clear();
    nav("/");
    window.location.reload();
  };

  const renderLinks = () => {
    if (userStudentType) {
      return (
        <>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/scholarship'>Scholarships</Link>
          </li>
          <li>
            <Link to='/applications'>Applications</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link onClick={logOut}>Log out</Link>
          </li>
        </>
      );
    } else if (userSPONSORType) {
      return (
        <>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/pricing'>Pricing</Link>
          </li>
          <li>
            <Link to='/scholarship'>Scholarships</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link onClick={logOut}>Log out</Link>
          </li>
        </>
      );
    } else if (userType) {
      return (
        <>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/admin'>Verify Application</Link>
          </li>
          <li>
            <Link to='/forms'>Tuition Fund</Link>
          </li>
          <li>
            <Link to='/funds'>Payment</Link>
          </li>
          <li>
            <Link to='/sponsors'>Sponsors</Link>
          </li>
          <li>
            <Link to='/addfunds'>Add Funds</Link>
          </li>
          <li>
            <Link onClick={logOut}>Log out</Link>
          </li>
        </>
        
      );
    } else {
      return (
        <>
          <li>
              <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            {renderLinks()}
          </ul>
          <div className='start'>
            <div className='button'>SCHOOL FEES FUNDING</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
