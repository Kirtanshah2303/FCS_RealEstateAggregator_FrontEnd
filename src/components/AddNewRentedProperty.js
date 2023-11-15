import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserSession } from "../Utils/Common";
import axios from 'axios';

const AddNewRentedProperty = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    typeOfProperty: '',
    societyName: '',
    landMark: '',
    city: '',
    pin_code: '',
    rentAmount: '',
    yearsForRent: '',
    propertyArea: '',
    parking: 'false',
    roomCapacity: '',
    propertyNumber: ''
  });
  const token = getToken();
  const navigate =useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [formErrors, setFormErrors] = useState({});
  const [errMsg, setErrMsg] = useState('');
  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    // Handle form submission here, e.g., send data to an API or perform other actions.
    const errors = {};
    // Validate rentAmount (digits max 15) and should be greater than 0
    const rentAmount = parseInt(formData.rentAmount, 10);
     // Validate rentAmount (digits max 15)
     if (!/^\d{1,15}$/.test(formData.rentAmount) || rentAmount <= 0) {
      errors.rentAmount = 'Rent Amount must be a maximum of 15 digits and greater than 0.';
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

    // Validate propertyNumber (alphanumeric max 10)
    if (!/^[a-zA-Z0-9]{1,10}$/.test(formData.propertyNumber)) {
      errors.propertyNumber = 'Property Number must be a maximum of 10 alphanumeric characters.';
    }

    // Validate pincode (digits exactly 6)
    if (!/^\d{6}$/.test(formData.pin_code)) {
      errors.pin_code = 'Pincode must be exactly 6 digits.';
    }

    if (formData.typeOfProperty.trim() === '') {
      errors.typeOfProperty = 'Type of Property is required';
    }
    
    if (formData.propertyName.trim() === '') {
      errors.propertyName = 'Plot Name is required';
    }
    if (formData.societyName.trim() === '') {
      errors.societyName = 'Society Name is required';
    }
    
    if (formData.city.trim() === '') {
      errors.city = 'City is required';
    }
    
    if (formData.rentAmount.trim() === '') {
      errors.rentAmount = 'Rent Amount is required';
    }
    if (formData.yearsForRent.trim() === '') {
      errors.yearsForRent = 'Years of Rent is required';
    }
    if (formData.propertyArea.trim() === '') {
      errors.propertyArea = 'Property Area is required';
    }
    if (formData.landMark.trim() === '') {
      errors.landMark = 'Landmark is required';
    }
    if (formData.pin_code.trim() === '') {
      errors.pin_code = 'Pincode is required';
    }
    if (formData.parking.trim() === '') {
      errors.parking = 'Parking is required';
    }
    if (formData.roomCapacity.trim() === '') {
      errors.roomCapacity = 'Room Capacity is required';
    }
    if (formData.propertyNumber.trim() === '') {
      errors.propertyNumber = 'Property Number is required';
    }

    console.log("Inside handle submit");
    if (Object.keys(errors).length > 0) {

      setFormErrors(errors);
    } else {
      console.log("Inside axios");
      axios
        .post('http://192.168.2.251:8080/api/enter1', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          console.log(response);
          console.log('Testing printing id of the property-->' + response.data.id);
          navigate('/rentContract/' + response.data.id);
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 401) {
            removeUserSession();
          }
          if(error.response.status === 400){
            setErrMsg("Address Verification Failed");
            console.log("Address Verification Failed");
          }
        });
    }
    
  };
  const errorStyle = {
    color: 'red',
    fontSize: '15px',
  };

  return (
    <div className="property-form-container">
      <a className="navbar-brand" href="/">
            HOME
          </a>
      <h3 style={{ fontSize: '25px', color: 'blue', textAlign: 'center', fontWeight: '500' }}>
        Non-Rented Property Information
      </h3>

      <form onSubmit={handleSubmit}>

        <div className="input-field">
          <label htmlFor="propertyName">Property Name</label>
          <input type="text" name="propertyName" required value={formData.propertyName} onChange={handleInputChange} />
          {formErrors.propertyName && <span style={errorStyle} className="error">{formErrors.propertyName}</span>}
        </div>

        <div className="input-field">
          <label htmlFor="typeOfProperty">Type of Property</label>
          <input type="text" name="typeOfProperty" required  value={formData.typeOfProperty} onChange={handleInputChange} />
          {formErrors.typeOfProperty && <span style={errorStyle} className="error">{formErrors.typeOfProperty}</span>}
        </div>

        <div className="input-field">
          <label htmlFor="societyName">Society Name</label>
          <input type="text" name="societyName" required value={formData.societyName} onChange={handleInputChange} />
          {formErrors.societyName && <span style={errorStyle} className="error">{formErrors.societyName}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="landMark">Landmark</label>
          <input type="text" name="landMark" required value={formData.landMark} onChange={handleInputChange} />
          {formErrors.landMark && <span style={errorStyle} className="error">{formErrors.landMark}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="city">City</label>
          <input type="text" name="city" required value={formData.city} onChange={handleInputChange} />
          {formErrors.city && <span style={errorStyle} className="error">{formErrors.city}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="pin_code">Pincode</label>
          <input type="text" name="pin_code" required value={formData.pin_code} onChange={handleInputChange} />
          {formErrors.pin_code && <span style={errorStyle} className="error">{formErrors.pin_code}</span>}
        </div>


        <div className="input-field">
          <label htmlFor="rentAmount">Rent Amount</label>
          <input type="text" name="rentAmount" required value={formData.rentAmount} onChange={handleInputChange} />
          {formErrors.rentAmount && <span style={errorStyle} className="error">{formErrors.rentAmount}</span>}
        </div>

        <div className="input-field">
          <label htmlFor="yearsForRent">Years For Rent</label>
          <input type="text" name="yearsForRent" required  value={formData.yearsForRent} onChange={handleInputChange} />
          {formErrors.yearsForRent && <span style={errorStyle} className="error">{formErrors.yearsForRent}</span>}
        </div>

        <div className="input-field">
          <label htmlFor="propertyArea">Property Area</label>
          <input type="text" name="propertyArea" required value={formData.propertyArea} onChange={handleInputChange} />
          {formErrors.propertyArea && <span style={errorStyle} className="error">{formErrors.propertyArea}</span>}
        </div>

        

        <div className="input-field">
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

        <div className="input-field">
          <label htmlFor="roomCapacity">Room Capacity</label>
          <input type="text" name="roomCapacity" required value={formData.roomCapacity} onChange={handleInputChange} />
          {formErrors.roomCapacity && <span style={errorStyle} className="error">{formErrors.roomCapacity}</span>}
        </div>

        <div className="input-field">
          <label htmlFor="propertyNumber">Property Number</label>
          <input type="text" name="propertyNumber" required value={formData.propertyNumber} onChange={handleInputChange} />
          {formErrors.propertyNumber && <span style={errorStyle} className="error">{formErrors.propertyNumber}</span>}
        </div>
        <button className='submit-button' type="submit">Submit</button>
        <span style={errorStyle} className="error">{errMsg}</span>
      </form>
    </div>
  );
};

export default AddNewRentedProperty;
