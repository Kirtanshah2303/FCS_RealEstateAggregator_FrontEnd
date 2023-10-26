import React, { useState } from 'react';
import axios  from 'axios';
import {getToken, removeUserSession } from "../Utils/Common";
const PropertyForm = () => {
    const [formData, setFormData] = useState({
      propertyNumber: '',
      propertyName: '',
      societyName: '',
      landMark: '',
      propertyArea: '',
      roomCapacity: '',
      parking: false,
      typeOfProperty: ''
      // maintenance: '',
    });

    const token = getToken();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., send data to an API or perform other actions.
        axios.post("http://localhost:8080/api/sell/enter", formData,{
          headers:{
            "Authorization" : "Bearer "+token
          }
        }).then((response) => {
          console.log(response);
          console.log("Testing printing id of the property-->"+response.data.id);
        }).catch((error) => {
          console.log(error.response.status)
          if(error.response.status === 401){
            removeUserSession()
          }
        });
        console.log(formData);
      };

      return (
        <div className='property-form-container'>
          <h3 style={{fontSize: '25px', color: 'blue', textAlign:'center', fontWeight:'500' }}>Property Information Form</h3>
          <form onSubmit={handleSubmit}>
          <div className='input-field'>
              <label htmlFor="typeOfProperty">Type of Property</label>
              <input
                type="text"
                name="typeOfProperty"
                value={formData.typeOfProperty}
                onChange={handleInputChange}
              />
            </div>
            <div className='input-field'>
              <label htmlFor="plotNo">Plot No</label>
              <input
                type="text"
                name="propertyNumber"
                value={formData.propertyNumber}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'>
              <label htmlFor="propertyName">Plot Name</label>
              <input
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'>
              <label htmlFor="societyName">Society Name</label>
              <input
                type="text"
                name="societyName"
                value={formData.societyName}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'>
              <label htmlFor="landMark">Near By Landmark</label>
              <input
                type="text"
                name="landMark"
                value={formData.landMark}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'> 
              <label htmlFor="propertyArea">Area</label>
              <input
                type="text"
                name="propertyArea"
                value={formData.propertyArea}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'>
              <label htmlFor="roomCapacity">BHK</label>
              <input
                type="text"
                name="roomCapacity"
                value={formData.roomCapacity}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'>
              <label htmlFor="parking">Parking</label>
              <select
                className='parking-input'
                name="parking"
                value={formData.parking}
                onChange={handleInputChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
    
            {/* <div className='input-field'>
              <label htmlFor="maintenance">Maintenance</label>
              <input
                type="text"
                name="maintenance"
                value={formData.maintenance}
                onChange={handleInputChange}
              />
            </div> */}
            {/* <div className='input-field'>
              <label htmlFor="extraFacilities">Extra Facilities</label>
              <input
                type="text"
                name="extraFacilities"
                value={formData.extraFacilities}
                onChange={handleInputChange}
              />
            </div> */}
            {/* <div className='input-field'>
              <label htmlFor="propertyDocumnet">Property Document</label>
              <input
                className='file-input'
                type="file"
                name="propertyDocumnet"
                value={formData.propertyDocumnet}
                onChange={handleInputChange}
              />
            </div> */}
            <div className='input-field'>
              <label htmlFor="sellAmount">Sale Amount</label>
              <input
                type="text"
                name="sellAmount"
                value={formData.sellAmount}
                onChange={handleInputChange}
              />
            </div>
    
            <button className='submit-button' type="submit">Submit</button>
          </form>
        </div>
      );
    };

// const addProperty =() =>{
//     return(
//         <div className="propertyContainer">
//             <h1>Here, You can add Property</h1>
//         </div>
//     )
// }

export default PropertyForm