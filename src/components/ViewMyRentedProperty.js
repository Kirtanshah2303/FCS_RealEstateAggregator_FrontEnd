import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { getToken } from '../Utils/Common';
import { useNavigate } from 'react-router-dom';

const ViewMyRentedProperty = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [rowData, setRowData] = useState([]);
  const [paySuccess, setPaySuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.2.251:8080/api/getMyRentedPropertiesForTenant', {
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
  }, [token]);

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


  const handlePayClick = async (id) => {
    // Add your payment logic here, e.g., navigate to a payment page
    
    console.log("Handle patment called!");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const token = getToken();
    fetch('http://192.168.2.251:8080/api/payRent/'+ id,{
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
          currency: 'INR', // Change currency as needed,
          callback_url: 'http://192.168.2.251:8080/api/payment/success/'+paymentDetails.orderId,
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

    // navigate('/payment');
  };

  return (
    <div className="saleContainer">
      <div className="header">
        <h2>My rented property View Page Details</h2>
      </div>
      <div className={`alert alert-success ${paySuccess ? '' : 'd-none'}`} id="pay-success">
        <strong>Payment Completed Successfully</strong>
      </div>

      <div className="row">
        <div className="leftcolumn">
          <div className="card">
            <h3 style={{ color: 'blue', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              Property Details
            </h3>
            <div className="container rounded bg-white mt-5 mb-5">
              <table className="table table-sm table-dark">
                <thead>
                  <tr>
                    <th>Property No</th>
                    <th>Property Name</th>
                    <th>Land Mark</th>
                    <th>City</th>
                    <th>Pincode</th>
                    <th>Parking</th>
                    <th>Created Date</th>
                    <th>Room Capacity</th>
                    <th>Rent Amount</th>
                    <th>Type of Property</th>
                    <th>Lessee Name</th>
                    <th>Payment</th>
                  </tr>
                </thead>

                <tbody>
                  {rowData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.propertyNumber}</td>
                      <td>{data.propertyName}</td>
                      <td>{data.landMark}</td>
                      <td>{data.city}</td>
                      <td>{data.pincode}</td>
                      <td>{data.parking ? 'Yes' : 'No'}</td>
                      <td>{data.createdDate}</td>
                      <td>{data.roomCapacity}</td>
                      <td>{data.rentAmount}</td>
                      <td>{data.typeOfProperty}</td>
                      <td>{data.lesseeName}</td>
                      <td>
                        <button className="btn btn-primary" type='button' onClick={() => handlePayClick(data.id)}>
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyRentedProperty;
