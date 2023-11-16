import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getToken } from "../Utils/Common";

const BuyProperty = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const token = getToken();

  const handleCompletedDealProperty = () => {
    navigate('/completedDealProperty')
  };

  const handleOngoingDealProperty = () => {
    navigate('/ongoingDealProperty')
  };

  const handleContractClick = (event, param) => {
    navigate(`/sellpropertycontractbuyer/${param}`);
};


  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
        try {
            // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
            const response = await axios.get('http://192.168.2.251:8080/api/sell/getUnsoldPropertiesForBuyer', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

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

    // Call the fetchData function when the component mounts
    fetchData();
}, []);

 

  return (
    <div>
      <h1>Buy Property</h1>
      <div className="container rounded bg-white mt-5 mb-5">
        <table className="table table-sm table-dark">
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
              <th>Contract</th>

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
                    {/* Add more table data cells for other properties */}
                </tr>
            ))}
          </tbody>
        </table>

        <div className="row mt-3 justify-content-end">
        <div className="col-md-6">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleOngoingDealProperty}
            >
              Ongoing Deal Property
            </button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleCompletedDealProperty}
            >
              Completed Deal Property
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default BuyProperty;
