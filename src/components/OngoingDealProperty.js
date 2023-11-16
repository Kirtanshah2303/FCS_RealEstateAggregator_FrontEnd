import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getToken } from "../Utils/Common";

const OngoingDealProperty = () => {

  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const token = getToken();
  const [paySuccess, setPaySuccess] = useState(false);

  const handleContractClick = (event, param) => {
    navigate('/view/sellerContract/' + param);
  };

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

  const fetchData = async () => {
    try {
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
        const response = await axios.get('http://192.168.2.251:8080/api/getOngoingPropertyForBuyer', {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        console.log("API Response:", response.data);
        // Update the rowData state with the fetched data
        setRowData(response.data);
    } catch (error) {
      if(error.response?.status === 403){
        alert("You'll have to do eKyc First to access this feature")
        navigate("/ekyc")
      }
        console.error("Error fetching data:", error);
    }
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
  fetch('http://192.168.2.251:8080/api/paySellAmount/'+ id,{
      headers:{
          "Authorization" : "Bearer " + token
      }
  })
    .then(response => response.json())
    .then(paymentDetails => {
      const options = {
        key: 'rzp_test_fE9CO5AP0eMCxf', // Replace with your Razorpay API key
        secret: 'qoNEOQjaWXud6VPPqOtgGgIH',
        amount: paymentDetails.propertySell.sellAmount * 100, // Amount is in paisa
        currency: 'INR', // Change currency as needed,
        // callback_url: 'http://192.168.2.251:8080/api/payment/success/'+paymentDetails.orderId,
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
          paidTo: paymentDetails.propertySell.paidTo,
        },
        theme: {
          color: '#3498db', // Change color as needed
        },
        handler: function (response) {
          // Handle success
          setPaySuccess(true);
          alert(response.razorpay_payment_id);
          axios.post('http://192.168.2.251:8080/api/payment/success/sell/'+paymentDetails.orderId+'?razorpay_payment_id='+response.razorpay_payment_id,{},{
            headers:{
              'Authorization' : "Bearer "+token
            }
          }).then(() => {
            alert("Payment successful");
          }).catch((e)=>{
            alert(e);
          })
          
          console.log(response);
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    })
    .catch(error => console.error('Error fetching payment details:', error));

  // navigate('/payment');
};


  useEffect(() => {
    // Define an async function to fetch data
    // Call the fetchData function when the component mounts
    fetchData();
}, []);

if (rowData.length === 0) {
  return <p>Loading...</p>;
}

  return (
    <div>
      <h1>Ongoing Deal Properties List</h1>
      <div className="container rounded bg-white mt-5 mb-5">
        <table className="table table-sm table-danger">
          <thead>
            <tr>
              <th>Type of Property</th>
              <th>Plot no</th>
              <th>Plot Name</th>
              <th>Society Name</th>
              <th>Near by Landmark</th>
              <th>Area</th>
              <th>BHK</th>
              <th>Parking</th>
              <th>Sale Amount</th>
              <th>Deal Done Date</th>
              <th>Contract</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
          {rowData && rowData.map((data, index) => (
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
                    <td>{data.dealDoneDate}</td>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={event => handleContractClick(event, data.id)}
                        >Contract
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-primary" type='button' onClick={() => handlePayClick(data.id)}>
                          Pay
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

export default OngoingDealProperty;
