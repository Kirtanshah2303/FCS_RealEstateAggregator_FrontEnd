import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Contract = (props) => {
  const [formData, setFormData] = useState({
    dueDatePayment: '',
    firstInstallmentDate: '',
    firstInstallmentAmount: '',
    // city: '',
    // rentAmount: '',
    // name: '',
    // address: '',
    // email: '',
    // securityDeposit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:"+formData);
    // Handle form submission, e.g., sending the data to an API
    axios.post(`http://localhost:8080/api/createContract/${props.id}`, formData)
      .then((response) => {
        // Handle success, you may want to navigate or show a success message
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        // Handle errors, show an error message, etc.
        console.error(error);
      });
  };

  
  // const handleContract = () => {
  //   // Add code to handle the contract action and navigate to another page.
  //   console.log("Contract button clicked");
  //   navigate('/');
  // };

  return (
    <div className="text-primary">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Due Date of Payment:</label>
          <input
            type="date"
            name="dueDatePayment"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>First Installment Date:</label>
          <input
            type="date"
            name="firstInstallmentDate"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Installment Amount:</label>
          <input
            type="text"
            name="firstInstallmentAmount"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      

        <button className="contract-button mx-3" type="submit">
         Submit
        </button>
      </form>
    </div>
  );
};

const sellercontract = () => {
  return (
    <div>
      <h1>Seller Contract</h1>
      <Contract />
    </div>
  );
};

export default sellercontract;
