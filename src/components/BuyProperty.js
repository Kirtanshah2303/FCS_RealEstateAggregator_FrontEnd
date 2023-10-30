import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuyProperty = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState({
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
  const handleOnNewPropertyClick = () => {
    navigate('/mypropertiespage')
    // Handle form submission here (you can send data to the server or perform other actions)
    // After submitting, you can clear the form if needed
    setRowData({
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
  };

  const handleContractClick = () => {
    // Handle contract button click action, e.g., navigate to a contract page
    navigate('/sellpropertycontractbuyer');
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRowData({ ...rowData, [name]: value });
  };

 

  return (
    <div>
      <h1>Buy Property</h1>
      <div className="container rounded bg-white mt-5 mb-5">
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th>Type of Property</th>
              <th>Plot no</th>
              <th>Plot Name</th>
              <th>Society Name</th>
              <th>Near by Landmark</th>
              <th>Area</th>
              <th>BHK</th>
              <th>Parking</th>
              <th>Sale amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Typeofproperty"
                  value={rowData.propertyType}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Plotno"
                  value={rowData.plotno}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="plotname"
                  value={rowData.plotname}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="societyname"
                  value={rowData.societyName}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="nearbylandmark"
                  value={rowData.nearbylandmark}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Area"
                  value={rowData.Area}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="BHK"
                  value={rowData.bhk}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="parking"
                  value={rowData.parking}
                  onChange={handleInputChange}
                />
              </td>
             
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="saleamount"
                  value={rowData.saleamount}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button className="btn btn-primary" onClick={handleContractClick}>
                  Contract
                </button>
               
              </td>
            </tr>
          </tbody>
        </table>

        <div className="row mt-3 justify-content-end">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleOnNewPropertyClick}
            >
              My Properties
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BuyProperty;
