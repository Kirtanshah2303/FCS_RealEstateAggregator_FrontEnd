import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getToken } from '../Utils/Common';

const DealDoneProperty = () => {
  const navigate = useNavigate();
  const token = getToken(); // Get the token

  const [rowData, setRowData] = useState([]);

  const handleContractClick = (event, param) => {
    navigate('/view/sellerContract/' + param);
  };



  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
        const response = await axios.get('http://192.168.2.251:8080/api/sell/getDealDoneProperties', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        // Update the rowData state with the fetched data
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Deal Done  Property</h1>
      <div className="container rounded bg-white mt-5 mb-5">
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th>Type of Property</th>
              <th>Plot No</th>
              <th>Plot Name</th>
              <th>Society Name</th>
              <th>Near By Landmark</th>
              <th>Area</th>
              <th>BHK</th>
              <th>Parking</th>
              <th>Sale Amount</th>
              <th>Due Amount</th>
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
                <td>{data.parking ? 'Yes' : 'No'}</td>
                <td>{data.sellAmount}</td>
                <td>{data.dueamount}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(event) => handleContractClick(event, data.id)}
                  >
                    Contract
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
export default DealDoneProperty;
