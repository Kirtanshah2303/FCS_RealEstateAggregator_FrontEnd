import React, { useState } from 'react';
const PropertyForm = () => {
    const [formData, setFormData] = useState({
      plotNo: '',
      plotName: '',
      societyName: '',
      nearByLandmark: '',
      area: '',
      bhk: '',
      parking: 'No',
      maintenance: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., send data to an API or perform other actions.
        console.log(formData);
      };

      return (
        <div className='property-form-container'>
          <h1>Property Information Form</h1>
          <form onSubmit={handleSubmit}>
            <div className='input-field'>
              <label htmlFor="plotNo">Plot No</label>
              <input
                type="text"
                name="plotNo"
                value={formData.plotNo}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'>
              <label htmlFor="plotName">Plot Name</label>
              <input
                type="text"
                name="plotName"
                value={formData.plotName}
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
              <label htmlFor="nearByLandmark">Near By Landmark</label>
              <input
                type="text"
                name="nearByLandmark"
                value={formData.nearByLandmark}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'> 
              <label htmlFor="area">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
              />
            </div>
    
            <div className='input-field'>
              <label htmlFor="bhk">BHK</label>
              <input
                type="text"
                name="bhk"
                value={formData.bhk}
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
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
    
            <div className='input-field'>
              <label htmlFor="maintenance">Maintenance</label>
              <input
                type="text"
                name="maintenance"
                value={formData.maintenance}
                onChange={handleInputChange}
              />
            </div>
            <div className='input-field'>
              <label htmlFor="extraFacilities">Extra Facilities</label>
              <input
                type="text"
                name="extraFacilities"
                value={formData.extraFacilities}
                onChange={handleInputChange}
              />
            </div>
            <div className='input-field'>
              <label htmlFor="propertyDocumnet">Property Document</label>
              <input
                className='file-input'
                type="file"
                name="propertyDocumnet"
                value={formData.propertyDocumnet}
                onChange={handleInputChange}
              />
            </div>
            <div className='input-field'>
              <label htmlFor="saleAmount">Sale Amount</label>
              <input
                type="text"
                name="saleAmount"
                value={formData.saleAmount}
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