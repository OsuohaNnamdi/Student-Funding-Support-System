import React from 'react';

const ApplicationDetails = ({ application }) => {
  return (
    <div className='application-details'>
      <h2>{application.name}</h2>
      <p>Status: {application.status}</p>
      {application.status === 'Approved' && (
        <p>Payment Status: {application.paid ? 'Paid' : 'Pending'}</p>
      )}
      {application.status === 'Approved' && application.paid && (
        <a
          href={application.receiptUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='download-btn'
        >
          Download Receipt
        </a>
      )}
    </div>
  );
};

export default ApplicationDetails;
/*
.coursesCard {
  padding: 50px 0;
}
.coursesCard .items {
  background-color: #fff;
  padding: 30px;
  text-align: center;
}
.coursesCard .img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1eb2a6;
  padding: 15px;
}
.coursesCard img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.coursesCard .text {
  margin-left: 15px;
  text-align: left;
}
.coursesCard .text h1 {
  font-size: 30px;
  font-weight: 500;
  line-height: 45px;
}
.coursesCard .rate {
  margin: 20px 0;
  color: #1eb2a6;
}
.coursesCard .rate i {
  font-size: 13px;
  margin-right: 5px;
}
.coursesCard .details .dimg img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
}
.coursesCard .details .box {
  display: flex;
  align-items: center;
  color: grey;
}
.coursesCard .details span {
  color: #1eb2a6;
  font-weight: 500;
  font-size: 14px;
}
.coursesCard .price {
  margin: 30px 0;
  background-color: #f8f8f8;
  padding: 10px;
}
.coursesCard h3 {
  font-weight: 500;
  color: #1eb2a6;
}

.online {
    text-align: center;
  }
  .online .box {
    box-shadow: 0 5px 25px -2px rgb(0 0 0 / 6%);
    background-color: #fff;
    padding: 30px 20px;
    transition: 0.5s;
  }
  .online .img {
    width: 80px;
    height: 80px;
    margin: auto;
    position: relative;
  }
  .online img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .online h1 {
    font-weight: 500;
    font-size: 20px;
    margin: 20px 0;
    line-height: 30px;
  }
  .online span {
    background-color: #f8f8f8;
    padding: 5px 20px;
    font-weight: 500;
    font-size: 15px;
    color: #1eb2a6;
    border-radius: 5px;
  }
  .online .box .show {
    opacity: 0;
  }
  .online .box:hover {
    background-color: #1eb2a6;
    border-radius: 5px;
    cursor: pointer;
  }
  .online .box:hover .show {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
  }
  .online .box:hover h1 {
    color: #fff;
  }

  @media screen and (max-width: 768px) {
  }
  
*/