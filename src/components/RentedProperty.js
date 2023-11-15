import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getToken } from "../Utils/Common";
const RentedProperty = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [rowData, setRowData] = useState([]);

  const handleContractClick = (event, param) => {
    navigate('/view/rentContract/' + param);
};


  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        console.log("Inside fetchData")
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
        const response = await axios.get('http://192.168.2.251:8080/api/getDealDoneRentedProperties', {
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
    <div>
      <h1>Deal Done Property</h1>
      <div className="container rounded bg-white mt-5 mb-5">
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Type of Property</th>
              <th>Society Name</th>
              <th>City</th>
              <th>Landmark</th>
              
              <th>Years For Rent</th>
              <th>Property Area</th>
              <th>Parking</th>
              <th>Room Capacity</th>
              <th>Property Number</th>
              <th>Rent Amount</th>
              <th>Contract</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((data, index) => (
              <tr key={index}>
                <td>{data.propertyName}</td>
                <td>{data.typeOfProperty}</td>
                <td>{data.societyName}</td>
                <td>{data.city}</td>
                <td>{data.landMark}</td>
                <td>{data.yearsForRent}</td>
                <td>{data.propertyArea}</td>

                <td>{data.parking ? 'Yes' : 'No'}</td>
                
                <td>{data.roomCapacity}</td>
                
                <td>{data.propertyNumber}</td>
                
                <td>{data.rentAmount}</td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={event => handleContractClick(event, data.id)}
                  >Contract
                  </button>
                </td>
                {/* Add more table data cells for other properties */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentedProperty;
