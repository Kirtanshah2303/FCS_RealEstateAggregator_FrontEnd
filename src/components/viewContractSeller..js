import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from '../api/axios';
import {getToken } from "../Utils/Common";
const Contract = (props) => {
  const [formData, setFormData] = useState({
    dueDatePayment: '',
    firstInstallmentDate: '',
    firstInstallmentAmount: '',
    // city: '',
    // rentAmount: '',
    // name: '',
    // address: '',
    // email: '',
    // securityDeposit: '',
  });

  // Get ID from URL
  const params = useParams();

  const token = getToken();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Form Data:"+formData);
//     // Handle form submission, e.g., sending the data to an API
//     axios.post(`http://localhost:8080/api/createContract/${params.id}`, formData,{
//       headers:{
//         "Authorization" : "Bearer "+ token
//       }
//     })
//       .then((response) => {
//         // Handle success, you may want to navigate or show a success message
//         console.log(response);
//         navigate('/saleProperty');
//       })
//       .catch((error) => {
//         // Handle errors, show an error message, etc.
//         console.error(error);
//       });
//   };

useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
        const response = await axios.get('http://localhost:8080/api/getContractDetails/'+params.id,{
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

  
  // const handleContract = () => {
  //   // Add code to handle the contract action and navigate to another page.
  //   console.log("Contract button clicked");
  //   navigate('/');
  // };

  return (
    <div className="text-primary">
      <form>
        <div>
          <label>Due Date of Payment:</label>
          <input
            type="text"
            name="dueDatePayment"
            value={formData.dueDatePayment}
            // onChange={handleChange}
            readOnly
          />
        </div>

        <div>
          <label>First Installment Date:</label>
          <input
            type="text"
            name="firstInstallmentDate"
            value={formData.firstInstallmentDate}
            // onChange={handleChange}
            readOnly
          />
        </div>

        <div>
          <label>Installment Amount:</label>
          <input
            type="text"
            name="firstInstallmentAmount"
            value={formData.firstInstallmentAmount}
            // onChange={handleChange}
            readOnly
          />
        </div>
      

        {/* <button className="contract-button mx-3" type="submit">
         Submit
        </button> */}
      </form>
    </div>
  );
};

const viewContractSeller = () => {
  return (
    <div>
      <h1>Seller Contract</h1>
      <Contract />
    </div>
  );
};

export default viewContractSeller;
