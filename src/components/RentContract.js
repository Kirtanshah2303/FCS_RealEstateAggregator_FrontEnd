import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import {getToken } from "../Utils/Common";

const Contract = () => {
  const [formData, setFormData] = useState({
    monthlyRentDate: '',
    securityDepositAmount: ''
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
    axios.post(`http://localhost:8080/api/createRentalContract/${params.id}`, formData,{
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
        console.error("Testtt-----------"+JSON.stringify(error));

        if(error.message = "Request failed with status code 403"){
          alert("Contract is already created for this property!!");
        }

        
      });
  };
 

  return (
    <div className="text-primary">
      <h2>Property Rental Contract Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Monthly Rent Due Date</label>
          <input
            type="date"
            name="monthlyRentDate"
            value={formData.monthlyRentDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Security Deposite Amount</label>
          <input
            type="text"
            name="securityDepositAmount"
            value={formData.securityDepositAmount}
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
