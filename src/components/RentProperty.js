import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getToken } from "../Utils/Common";

const NonRentedProperty = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [rowData, setRowData] = useState([]);

  const handleOnRentClick = () => {
    navigate('/rent');
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setRowData({ ...rowData, [name]: value });
  // };

  const handleContractClick = () => {
    navigate('/rentContract');
  };

  const handleDeleteClick = async (event, param) => {
    console.log("param is --> " + param)
    try {
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
         await axios.delete('http://localhost:8080/api/sell/deleteUnSoldProperty/' + param, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        window.location.reload(false);

    } catch (error) {
        console.error("Error Deleting data:", error);
    }
};

  const handleOnNewPropertyClick = () => {
    navigate('/addNewRentedProperty');
  };

  
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
        const response = await axios.get('http://localhost:8080/api/getNonRentedProperties', {
          headers: {
            "Authorization": "Bearer " + token
          }
        });
        // Update the rowData state with the fetched data
        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);



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
              <th>Delete</th>
              <th>Contract</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((data, index) => (
              <tr key={index}>
                <td>{data.typeOfProperty}</td>
                <td>{data.propertyNumber}</td>
                <td>{data.propertyName}</td>
                <td>{data.societyName}</td>
                <td>{data.landMark}</td>
                <td>{data.propertyArea}</td>
                <td>{data.roomCapacity}</td>
                <td>{data.parking}</td>
                <td>{data.sellAmount}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={event => handleContractClick(event, data.id)}
                  >Contract
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={event => handleDeleteClick(event, data.id)}
                  > Delete
                  </button>
                </td>
                {/* Add more table data cells for other properties */}
              </tr>
            ))}
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
