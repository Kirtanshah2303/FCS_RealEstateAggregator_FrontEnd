import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import {getToken } from "../Utils/Common";

const Contract = () => {
  const [formData, setFormData] = useState({
    propertyType: '',
    city: '',
    rentAmount: '',
    name: '',
    address: '',
    email: '',
    securityDeposit: '',
  });
   // Get ID from URL
   const params = useParams();

   const token = getToken();
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending the data to an API
   console.log("Form Data:"+formData);
    // Handle form submission, e.g., sending the data to an API
    axios.get('http://localhost:8080/api/getContractDetails/'+params.id,{
      headers:{
        "Authorization" : "Bearer "+ token
      }
    })
      .then((response) => {
        // Handle success, you may want to navigate or show a success message
        console.log(response);
        navigate('/rentProperty');
      })
      .catch((error) => {
        // Handle errors, show an error message, etc.
        console.error(error);
      });
  };
 

  return (
    <div className="text-primary">
      <h2>Property Rental Contract Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      
        <div>
          <label>Property Type:</label>
          <input
            type="text"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Rent Amount:</label>
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
          />
        </div>

       

        <button className="contract-button mx-3" type="submit">
         Sumbit
        </button>
      </form>
    </div>
  );
};

export default Contract;
