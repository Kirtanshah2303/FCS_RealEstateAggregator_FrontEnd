import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { getToken, removeUserSession } from "../Utils/Common";
const PropertyForm = () => {
  const [formData, setFormData] = useState({
    typeOfProperty: '',
    propertyNumber: '',
    propertyName: '',
    societyName: '',
    landMark: '',
    propertyArea: '',
    roomCapacity: '',
    parking: false,
    sellAmount: ''
  });

  const token = getToken();
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to an API or perform other actions.
    const errors = {};

     // Validate propertyNumber (alphanumeric max 10)
     if (!/^[a-zA-Z]{1,15}$/.test(formData.typeOfProperty)) {
      errors.typeOfProperty = 'Property must be a string for e.g ("bungalow, flat")';
    }

     // Validate propertyNumber (alphanumeric max 10)
     if (!/^[a-zA-Z0-9]{1,10}$/.test(formData.propertyNumber)) {
      errors.propertyNumber = 'Property Number must be a maximum of 10 alphanumeric characters.';
    }
     // Validate propertyNumber (alphanumeric max 10)
     if (!/^[a-zA-Z0-9]{1,50}$/.test(formData.propertyName)) {
      errors.propertyName = 'No Special Character and cannot exceeds 50 alphanumeric characters';
    }
     // Validate propertyNumber (alphanumeric max 10)
     if (!/^[a-zA-Z0-9]{1,50}$/.test(formData.societyName)) {
      errors.societyName = 'No Special Character and cannot exceeds 50 alphanumeric characters';
    }
     // Validate address (max 30 alphanumeric characters)
     if (!/^[a-zA-Z0-9\s]{1,30}$/.test(formData.landMark)) {
      errors.landMark = 'Address must be a maximum of 30 alphanumeric characters.';
    }
    // Validate propertyArea (digits max 5)
    if (!/^\d{1,5}$/.test(formData.propertyArea)) {
      errors.propertyArea = 'Property Area must be a maximum of 5 digits.';
    }

    // Validate roomCapacity (digits max 3)
    if (!/^\d{1,3}$/.test(formData.roomCapacity)) {
      errors.roomCapacity = 'Room Capacity must be a maximum of 3 digits.';
    }
    // Validate rentAmount (digits max 10) and should be greater than 0
    const sellAmount = parseInt(formData.sellAmount, 10);
     // Validate rentAmount (digits max 15)
     if (!/^\d{1,10}$/.test(formData.sellAmount) || sellAmount <= 0) {
      errors.sellAmount = 'Aukat ke Bahar';
    }

   

    if (formData.typeOfProperty.trim() === '') {
      errors.typeOfProperty = 'Type of Property is required';
    }
    if (formData.propertyNumber.trim() === '') {
      errors.propertyNumber = 'Plot No is required';
    }
    if (formData.propertyName.trim() === '') {
      errors.propertyName = 'Plot Name is required';
    }
    if (formData.societyName.trim() === '') {
      errors.societyName = 'Society Name is required';
    }
    if (formData.landMark.trim() === '') {
      errors.landMark = 'Landmark is required';
    }
    if (formData.propertyArea.trim() === '') {
      errors.propertyArea = 'Property Area is required';
    }
    if (formData.roomCapacity.trim() === '') {
      errors.roomCapacity = 'Room Capacity is required';
    }
    if (formData.sellAmount.trim() === '') {
      errors.sellAmount = 'Sell Amount is required';
    }


    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      axios
        .post('http://localhost:8080/api/sell/enter', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          console.log(response);
          console.log('Testing printing id of the property-->' + response.data.id);
          navigate('/sellerContract/' + response.data.id);
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 401) {
            removeUserSession();
          }
        });
    }
  };
  const errorStyle = {
    color: 'red',
    fontSize: '15px',
  };
  return (
    <div className='property-form-container'>
      <h3 style={{ fontSize: '25px', color: 'blue', textAlign: 'center', fontWeight: '500' }}>Property Information Form</h3>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <label htmlFor="typeOfProperty">Type of Property</label>
          <input
            type="text"
            name="typeOfProperty"
            placeholder='Bungalow, flat ...'
            value={formData.typeOfProperty}
            onChange={handleInputChange}
            required
          />{formErrors.typeOfProperty && <span style={errorStyle} className="error">{formErrors.typeOfProperty}</span>}
        </div>
        <div className='input-field'>
          <label htmlFor="plotNo">Plot No</label>
          <input
            type="text"
            name="propertyNumber"
            value={formData.propertyNumber}
            onChange={handleInputChange}
            required
          /> {formErrors.propertyNumber && <span style={errorStyle} className="error">{formErrors.propertyNumber}</span>}
        </div>

        <div className='input-field'>
          <label htmlFor="propertyName">Plot Name</label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleInputChange}
            required
          />{formErrors.propertyName && <span style={errorStyle} className="error">{formErrors.propertyName}</span>}
        </div>

        <div className='input-field'>
          <label htmlFor="societyName">Society Name</label>
          <input
            type="text"
            name="societyName"
            value={formData.societyName}
            onChange={handleInputChange}
            required
          />{formErrors.societyName && <span style={errorStyle} className="error">{formErrors.societyName}</span>}
        </div>

        <div className='input-field'>
          <label htmlFor="landMark">Near By Landmark</label>
          <input
            type="text"
            name="landMark"
            value={formData.landMark}
            onChange={handleInputChange}
            required
          />{formErrors.landMark && <span style={errorStyle} className="error">{formErrors.landMark}</span>}
        </div>

        <div className='input-field'>
          <label htmlFor="propertyArea">Area</label>
          <input
            type="text"
            name="propertyArea"
            value={formData.propertyArea}
            onChange={handleInputChange}
            required
          />{formErrors.propertyArea && <span style={errorStyle} className="error">{formErrors.propertyArea}</span>}
        </div>

        <div className='input-field'>
          <label htmlFor="roomCapacity">BHK</label>
          <input
            type="text"
            name="roomCapacity"
            value={formData.roomCapacity}
            onChange={handleInputChange}
            required
          />{formErrors.roomCapacity && <span style={errorStyle} className="error">{formErrors.roomCapacity}</span>}
        </div>

        <div className='input-field'>
          <label htmlFor="parking">Parking</label>
          <select
            className='parking-input'
            name="parking"
            value={formData.parking}
            onChange={handleInputChange}
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div className='input-field'>
          <label htmlFor="sellAmount">Sale Amount</label>
          <input
            type="text"
            name="sellAmount"
            value={formData.sellAmount}
            onChange={handleInputChange}
            required
          />{formErrors.sellAmount && <span style={errorStyle} className="error">{formErrors.sellAmount}</span>}
        </div>

        <button className='submit-button' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PropertyForm