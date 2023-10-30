import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const SellPropertyContractbuyer = () => {
  const [acknowledgment, setAcknowledgment] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAcknowledgmentChange = (e) => {
    setAcknowledgment(e.target.checked);
  };

  const handleSendOTP = () => {
    if (acknowledgment) {
      // Generate and send OTP logic here.
      setOtpSent(true);
    } else {
      alert("Please acknowledge the terms before sending OTP.");
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (acknowledgment && otp) {
      // Add your submission logic here.
      setSubmitted(true);
      navigate('/mypropertiespage'); // Navigate to mypropertiespage
    } else {
      alert("Please enter the OTP and acknowledge the terms before submitting.");
    }
  };

  return (
    <div>
      <h1>Property Sale Contract</h1>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>Property Address:</td>
            <td>[Property Address]</td>
          </tr>
          <tr>
            <td>Sale Amount:</td>
            <td>[Sale Amount]</td>
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
