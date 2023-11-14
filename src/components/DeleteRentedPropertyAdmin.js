import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getToken } from '../Utils/Common';

const DeletePropertyAdmin = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [rowData, setRowData] = useState([]);

  const handleContractClick = (event, param) => {
    navigate('/view/sellerContract/' + param);
  };

  const handleDeleteClick = async (event, param) => {
    console.log("param is --> " + param);
    console.log("Token is -- >"+token)
    try {
      await axios.delete('http://localhost:8080/api/admin/deletePropertyForRentByAdmin/' + param, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      window.location.reload(false);
    } catch (error) {
      console.error("Error Deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/getAllPropertiesForRent', {
          headers: {
            "Authorization": "Bearer " + token
          }
        });

        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Rented Property Details For The Admin</h2>
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
              <th>Contract</th>
              <th>Delete</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletePropertyAdmin;
