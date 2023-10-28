import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contract = () => {
  const [formData, setFormData] = useState({
    
    propertyType: '',
    city: '',
    rentAmount: '',
    name: '',
    address: '',
    email: '',
    
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
    // You can use react-router to navigate to another page.
    console.log("hello they clicked a button");
    navigate('/rentProperty');
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

       

        <button className="contract-button mx-3" type="button" onClick={handleContract}>
         Sumbit
        </button>
      </form>
    </div>
  );
};

export default Contract;
