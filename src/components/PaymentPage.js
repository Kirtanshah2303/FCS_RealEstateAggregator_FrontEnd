import React, { useState, useEffect } from 'react';
import { getToken } from "../Utils/Common";
import axios from '../api/axios';

const PaymentPage = () => {
  const [paySuccess, setPaySuccess] = useState(false);
 
  // useEffect(() => {
  //   // Load Razorpay script dynamically
  //   const script = document.createElement('script');
  //   script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);


  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Make API call to get payment details (rentalPayAmount, rentalPaidDate, paidBy, paidTo)
    // For simplicity, let's assume you have an API endpoint '/api/getPaymentDetails' that returns the required data

    console.log("Handle cpayment called!!");
    
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }


    const token = getToken();
    fetch('http://192.168.2.251:8080/api/payRent/'+ '1',{
        headers:{
            "Authorization" : "Bearer " + token
        }
    })
      .then(response => response.json())
      .then(paymentDetails => {
        const options = {
          key: 'rzp_test_fE9CO5AP0eMCxf', // Replace with your Razorpay API key
          secret: 'qoNEOQjaWXud6VPPqOtgGgIH',
          amount: paymentDetails.propertyRental.rentAmount * 100, // Amount is in paisa
          currency: 'INR', // Change currency as needed
        //   name: 'Your Company Name',
        //   description: 'Rent Payment',
        //   image: 'URL_TO_YOUR_LOGO',
          prefill: {
            name: 'Devkul',
            email: 'test@example.com', // Replace with the email of the payer
          },
          notes: {
            rentalPaidDate: '11/11/2023',
            paidBy: 'Devkul',
            paidTo: paymentDetails.propertyRental.paidTo,
          },
          theme: {
            color: '#3498db', // Change color as needed
          },
          handler: function (response) {
            // Handle success
            setPaySuccess(true);
            alert(response.razorpay_payment_id);
            alert("Payment successful");
            console.log(response);
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch(error => console.error('Error fetching payment details:', error));
  };

  return (
    <div className="main_container">
      <nav className="navbar navbar-light bg-light" style={{ backgroundColor: '#ffffff!important' }}>
        <a className="navbar-brand"></a>
      </nav>

      <div className={`alert alert-success ${paySuccess ? '' : 'd-none'}`} id="pay-success">
        <strong>Payment Completed Successfully</strong>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        id="rzp-button1"
        style={{ marginTop: '-2px' }}
        onClick={handlePayment}
      >
        Pay
      </button>
    </div>
  );
};

export default PaymentPage;
