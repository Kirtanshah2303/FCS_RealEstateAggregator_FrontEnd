import React, { useEffect } from 'react';
import axios from '../api/axios';
import { getToken } from '../Utils/Common';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const token = getToken();
  useEffect(async () => {
    try {
      console.log("Inside fetchData")
      // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
      const response = await axios.get('http://192.168.2.251:8080/api/admin/getTheAdminValidation', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    } catch (error) {
      navigate("/")
      alert("You are not admin!")
      console.error('Error fetching data:', error);
    }
  })

  const handleButtonClickreport = (action) => {
    navigate('/mypropertiespage');
    // Define logic for the "Report" button click action
  };
  
  const handleButtonClickview = (action) => {
    navigate('/viewuseradmin');
    // Define logic for the "View User" button click action
  };
  
  const handleButtonClickdelete = (action) => {
    navigate('/sellpropertyadmin');
    // Define logic for the "Delete Property" button click action
  };

  const handleHomeClick = () => {
    navigate('/');
  };
  const handleButtonClickdeleterented = () => {
    navigate('/deletepropertyadmin');
  };

  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have been assigned an Admin role.</p>
      <div className="d-flex justify-content-center mt-3">
      <button className="btn btn-secondary mx-3" onClick={() => handleHomeClick()}>
          Home
        </button>
        <button className="btn btn-primary mx-3" onClick={() => handleButtonClickreport()}>
          Report
        </button>
        <button className="btn btn-danger mx-3" onClick={() => handleButtonClickdelete()}>
          Delete Sell Property
        </button>
        <button className="btn btn-info mx-3" onClick={() => handleButtonClickview()}>
          View User
        </button>
        
        <button className="btn btn-success mx-3" onClick={() => handleButtonClickdeleterented()}>
          Delete Rented Property
        </button>
       
      </div>
    </section>
  );
};

export default Admin;
