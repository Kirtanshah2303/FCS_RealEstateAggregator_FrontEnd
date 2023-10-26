import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewRentedProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
    rent: '',
    owner: '',
    propertyImage: null,
    propertyName: '',
    propertyType: '',
    societyName: '',
    city: '',
    rentAmount: '',
    yearsOfRent: '',
    propertyArea: '',
    landmark: '',
    parking: '',
    roomCapacity: '',
    propertyNumber: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData({ ...formData, propertyImage: imageFile });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to an API or perform other actions.
    console.log(formData);
    navigate('/rentContract');
    
  };

  const handleContract = () => {
    // Add code to handle the contract action and navigate to another page.
    console.log('Contract button clicked');
    // You can use react-router to navigate to another page.
  };
 const navigate =useNavigate();
  const handleContractClick = () => {
    navigate('/rentContract');
  };

  return (
    <div className="property-form-container">
      <h3 style={{ fontSize: '25px', color: 'blue', textAlign: 'center', fontWeight: '500' }}>
        Non-Rented Property Information
      </h3>
      <form onSubmit={handleSubmit}>

        <div className="input-field">
          <label htmlFor="propertyName">Property Name</label>
          <input type="text" name="propertyName" value={formData.propertyName} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="propertyType">Type of Property</label>
          <input type="text" name="propertyType" value={formData.propertyType} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="societyName">Society Name</label>
          <input type="text" name="societyName" value={formData.societyName} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="city">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="rentAmount">Rent Amount</label>
          <input type="text" name="rentAmount" value={formData.rentAmount} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="yearsOfRent">Years of Rent</label>
          <input type="text" name="yearsOfRent" value={formData.yearsOfRent} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="propertyArea">Property Area</label>
          <input type="text" name="propertyArea" value={formData.propertyArea} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="landmark">Landmark</label>
          <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="parking">Parking</label>
          <input type="text" name="parking" value={formData.parking} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="roomCapacity">Room Capacity</label>
          <input type="text" name="roomCapacity" value={formData.roomCapacity} onChange={handleInputChange} />
        </div>

        <div className="input-field">
          <label htmlFor="propertyNumber">Property Number</label>
          <input type="text" name="propertyNumber" value={formData.propertyNumber} onChange={handleInputChange} />
        </div>

        <button className="submit-button" type="submit" onClick={handleContractClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewRentedProperty;
