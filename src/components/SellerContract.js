import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contract = () => {
  const [formData, setFormData] = useState({
    contractStartDate: '',
    contractEndDate: '',
    propertyType: '',
    city: '',
    rentAmount: '',
    name: '',
    address: '',
    email: '',
    securityDeposit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending the data to an API
  };

  const navigate = useNavigate();
  const handleContract = () => {
    // Add code to handle the contract action and navigate to another page.
    console.log("Contract button clicked");
    navigate('/');
  };

  return (
    <div className="text-primary">
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
          <label>Amount:</label>
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
          />
        </div>

        <button className="contract-button mx-3" type="button" onClick={handleContract}>
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
