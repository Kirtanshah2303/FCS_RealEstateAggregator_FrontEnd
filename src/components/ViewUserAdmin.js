import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getToken } from '../Utils/Common';

const ViewUserAdmin = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.2.251:8080/api/admin/users', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleActivationStatusClick = (activationStatus) => {
    // Handle the activation status button click here
    // You can navigate or perform any other action based on the activationStatus
    // const fetchData = async () => {
        try {
          console.log("Inside fetchData")
          // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
          const response = axios.put('http://192.168.2.251:8080/api/admin/users/changeActivation',{"id" : activationStatus}, {
            headers: {
              "Authorization": "Bearer " + token
            }
          });
          console.log(response.data)
          window.location.reload(false);
          // Update the rowData state with the fetched data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    //   };
    console.log(`Activation Status Clicked: ${activationStatus}`);
  };

  return (
    <div>
      <h1>View User Admin</h1>
      <div className="container rounded bg-white mt-5 mb-5">
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th>Login</th>
              <th>Email</th>
              <th>E-KYC</th>
              <th>E-KYC Email</th>
              <th>Activation Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((data, index) => (
              <tr key={index}>
                <td>{data.login}</td>
                <td>{data.email}</td>
                <td>{data.ekyc? 'Yes' : 'No'}</td>
                <td>{data.eKycEmail? data.eKycEmail : 'NULL'}</td>
                <td>{data.activationstatus}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleActivationStatusClick(data.id)}
                    
                  >
                    {data.activated ? 'Activated' : 'Deactivated'}
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

export default ViewUserAdmin;
