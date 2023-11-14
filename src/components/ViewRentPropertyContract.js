import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { getToken } from '../Utils/Common';
import { useNavigate, useParams } from 'react-router-dom';

const ViewRentPropertyContract = () => {
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
    if (acknowledgment) {
      axios.post(`http://localhost:8080/api/generateBuyerOTP/${id}`, {}, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
        .then((response) => {
          console.log(response);
          alert("Otp generated successfully! Kindly check your mail");
        })
        .catch((error) => {
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
      axios.post(`http://localhost:8080/api/validateBuyerOTP/${id}`, { "otp": otp }, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
        .then((response) => {
          console.log(response);
          setSubmitted(true);
          navigate('/buyProperty');
          alert("Otp generated successfully! Kindly check your mail");
        })
        .catch((error) => {
          alert("Error: " + "Invalid OTP Entered!")
          console.error(error);
        });
    } else {
      alert("Please enter the OTP and acknowledge the terms before submitting.");
    }
  };

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/viewRentalContract/${params.id}`, {
          headers: {
            "Authorization": "Bearer " + token
          }
        });

        setRowData(response.data);
        setFirstInstallmentDate(response.data.firstInstallmentDate);
        setFirstInstallmentAmount(response.data.firstInstallmentAmount);
        setDueDateOfPayment(response.data.dueDatePayment);
        setId(response.data.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id, token]);

  return (
    <div>
      <h1>Property Rent Contract</h1>
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
         This contract is to confirm that the tenant now occupies the property
            at the agreed-upon rent. It is understood that this agreement is not refundable
            or cancellable, and the tenant accepts full responsibility for the
            property and any associated obligations from the date of this contract.
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

export default ViewRentPropertyContract;
