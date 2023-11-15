import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import {getToken } from "../Utils/Common";

const Contract = () => {
  const [formData, setFormData] = useState({
    monthlyRentDate: '',
    securityDepositAmount: ''
  });
   // Get ID from URL
   const params = useParams();

   const token = getToken();
   const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // useEffect = (e) => {
  //   // Handle form submission, e.g., sending the data to an API
  //  console.log("Form Data:"+formData);
  //   // Handle form submission, e.g., sending the data to an API
  //   axios.get('http://192.168.2.251:8080/api/getContractDetails/'+params.id,{
  //     headers:{
  //       "Authorization" : "Bearer "+ token
  //     }
  //   })
  //     .then((response) => {
  //       // Handle success, you may want to navigate or show a success message
  //       console.log(response);
  //       navigate('/rentProperty');
  //     })
  //     .catch((error) => {
  //       // Handle errors, show an error message, etc.
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
        const response = await axios.get('http://192.168.2.251:8080/api/viewRentalContract/'+ params.id,{
            headers:{
                "Authorization" : "Bearer "+ token
              }
        });

        // Update the rowData state with the fetched data
        setFormData(response.data);
        console.log("INside data checking --> "+response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);
 

  return (
    <div className="text-primary">
      <h2>Property Rental Contract Form</h2>

      <form>
      <div>
          <label>Monthly Rent Due Date</label>
          <input
            type="date"
            name="monthlyRentDate"
            value={formData.monthlyRentDate}
            // onChange={handleChange}
            readOnly
          />
        </div>

        <div>
          <label>Security Deposite Amount</label>
          <input
            type="text"
            name="securityDepositAmount"
            value={formData.securityDepositAmount}
            // onChange={handleChange}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default Contract;
