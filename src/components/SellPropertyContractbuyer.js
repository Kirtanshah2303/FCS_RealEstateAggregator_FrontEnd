import React, { useState,useEffect } from 'react';
import { useNavigate, useParams} from "react-router-dom";
import axios from '../api/axios';
import { getToken } from "../Utils/Common";

const SellPropertyContractbuyer = () => {
  const [acknowledgment, setAcknowledgment] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const token = getToken();

  const [firstInstallmentDate, setFirstInstallmentDate] = useState('');
  const [firstInstallmentAmount, setFirstInstallmentAmount] = useState('');
  const [dueDateOfPayment, setDueDateOfPayment] = useState('');
  const [id, setId] = useState(0);

  const handleAcknowledgmentChange = (e) => {
    setAcknowledgment(e.target.checked);
  };

  const handleSendOTP = () => {
    console.log("inside send otp");
    if (acknowledgment) {
      // Generate and send OTP logic here.
        // Handle form submission, e.g., sending the data to an API
    axios.post(`http://192.168.2.251:8080/api/generateBuyerOTP/${id}`,{},{
      headers:{
        "Authorization" : "Bearer "+ token
      }
    })
      .then((response) => {
        // Handle success, you may want to navigate or show a success message
        console.log(response);
        alert("Otp generated successfully! Kindly check your mail");
      })
      .catch((error) => {
        // Handle errors, show an error message, etc.
        console.error(error);
      });
      setOtpSent(true);
    } else {
      alert("Please acknowledge the terms before sending OTP.");
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = () => {
    if (acknowledgment && otp) {
      // Add your submission logic here.
      axios.post(`http://192.168.2.251:8080/api/validateBuyerOTP/${id}`,{"otp": otp},{
      headers:{
        "Authorization" : "Bearer "+ token
      }
    })
      .then((response) => {
        // Handle success, you may want to navigate or show a success message
        console.log(response);
        setSubmitted(true);
        navigate('/buyProperty');
        alert("Otp generated successfully! Kindly check your mail");
      })
      .catch((error) => {
        // Handle errors, show an error message, etc.
        alert("Error: " + "Invalid OTP Entered!")
        console.error(error);
      });
      
       // Navigate back to buy property page
    } else {
      alert("Please enter the OTP and acknowledge the terms before submitting.");
    }
  };
  const params = useParams();
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
        try {
            // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
            const response = await axios.get(`http://192.168.2.251:8080/api/getContractDetails/${params.id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            // Update the rowData state with the fetched data
            setRowData(response.data);
            setFirstInstallmentDate(response.data.firstInstallmentDate);
            setFirstInstallmentAmount(response.data.firstInstallmentAmount);
            setDueDateOfPayment(response.data.dueDatePayment);
            setId(response.data.id);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Call the fetchData function when the component mounts
    fetchData();
}, []);



  return (
    <div>
      <h1>Property Sale Contract</h1>
      <table className="table table-bordered">
        <tbody>

          <tr>
            <td>First Installement Date:</td>
            <td>{firstInstallmentDate}</td>
          </tr>

          <tr>
            <td>First Installement Amount:</td>
            <td>{firstInstallmentAmount}</td>
          </tr>
          <tr>
            <td>Due Date of Payment:</td>
            <td>{dueDateOfPayment}</td>
          </tr>
          <tr>
            <td>Terms:</td>
            <td>
              This contract is to verify that the property now belongs to the buyer
              at the respective amount. It is agreed that this deal is not refundable
              or cancellable, and the buyer accepts full responsibility for the
              property and any associated liabilities from the date of this contract.
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="acknowledgment"
                  checked={acknowledgment}
                  onChange={handleAcknowledgmentChange}
                />
                <label className="form-check-label">
                  I acknowledge and accept the terms of this contract.
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              {otpSent ? (
                <div>
                  <label htmlFor="otpInput">Enter OTP:</label>
                  <input
                    type="text"
                    id="otpInput"
                    className="form-control"
                    name="otp"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </div>
              ) : (
                <button className="btn btn-primary" onClick={handleSendOTP}>
                  Send OTP
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {submitted ? (
        <p>Contract Submitted. Thank you!</p>
      ) : (
        <button
          className={`btn btn-success ${!acknowledgment || !otp ? 'disabled' : ''}`}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default SellPropertyContractbuyer;
