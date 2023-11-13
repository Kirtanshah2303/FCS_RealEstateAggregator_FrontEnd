import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getToken } from "../Utils/Common";

const Viewpage = () => {

  // const navigate = useNavigate();
  const token = getToken();
  const [rowData, setRowData] = useState([]);

  // Define functions for handling contract creation and property deletion
 
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        console.log("Inside fetchData")
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
        const response = await axios.get('http://localhost:8080/api/getNotRentedProperties', {
          headers: {
            "Authorization": "Bearer " + token
          }
        });
        console.log(response.data)
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
    <div className="saleContainer">
      <div className="header">
        <h2>View Page Details</h2>
      </div>

      <div className="row">
        <div className="leftcolumn">
          <div className="card">
            <h3 style={{ color: 'blue', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              Property Details
            </h3>
            <div className="container rounded bg-white mt-5 mb-5">
              <table className="table table-sm table-dark">
                <thead>
                  <tr>
                    <th>Property No</th>
                    <th>Property Name</th>
                    <th>Land Mark</th>
                    <th>City</th>
                    <th>Pincode</th>
                    <th>Parking</th>
                    <th>Created Date</th>
                    <th>Room Capacity</th>
                    <th>Rent Amount</th>
                    <th>Type of Property</th>
                    <th>Lessee Name</th>
                    {/* <th>Contract</th>
                    <th>Delete</th> */}
                  </tr>
                </thead>

                <tbody>
                  {rowData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.propertyNumber}</td>
                      <td>{data.propertyName}</td>
                      <td>{data.landMark}</td>
                      <td>{data.city}</td>
                      <td>{data.pincode}</td>
                      <td>{data.parking ? 'Yes' : 'No'}</td>
                      <td>{data.createdDate}</td>
                      <td>{data.roomCapacity}</td>
                      <td>{data.rentAmount}</td>
                      <td>{data.typeOfProperty}</td>
                      <td>{data.lesseeName}</td>
                      {/* <td>
                        <button
                          className="btn btn-primary"
                          onClick={(event) => handleContractClick(event, data.id)}
                        >
                          Contract
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={(event) => handleDeleteClick(event, data.id)}
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Viewpage;
