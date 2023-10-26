import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NonRentedProperty = () => {
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
    parking: '', // Added "Parking" field
    roomCapacity: '', // Added "Room Capacity" field
    propertyNumber: '', // Added "Property Number" field
  });

  const handleOnRentClick = () => {
    navigate('/rent');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRowData({ ...rowData, [name]: value });
  };

  const handleContractClick = () => {
    navigate('/rentContract');
  };

  const handleDeleteClick = () => {
    // Add your delete logic here
  };

  const handleOnNewPropertyClick = () => {
    // Handle form submission here (you can send data to the server or perform other actions)
    navigate('/addNewRentedProperty');

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

  return (
    <div>
      <h1>Rent Property</h1>
      <div className="container rounded bg-white mt-5 mb-5">
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Type of Property</th>
              <th>Society Name</th>
              <th>City</th>
              <th>Rent Amount</th>
              <th>Years of Rent</th>
              <th>Property Area</th>
              <th>Landmark</th>
              <th>Parking</th>
              <th>Room Capacity</th>
              <th>Property Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="propertyName"
                  value={rowData.propertyName}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="propertyType"
                  value={rowData.propertyType}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="societyName"
                  value={rowData.societyName}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={rowData.city}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="rentAmount"
                  value={rowData.rentAmount}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="yearsOfRent"
                  value={rowData.yearsOfRent}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="propertyArea"
                  value={rowData.propertyArea}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="landmark"
                  value={rowData.landmark}
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
                  name="roomCapacity"
                  value={rowData.roomCapacity}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="propertyNumber"
                  value={rowData.propertyNumber}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={handleContractClick}
                >
                  Contract
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteClick}
                >
                  Delete
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
              Add New Rented Property
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={handleOnRentClick}>
              Rent Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonRentedProperty;
