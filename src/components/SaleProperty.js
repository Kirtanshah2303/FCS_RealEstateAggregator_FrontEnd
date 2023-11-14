import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import axios from '../api/axios';
import { getToken } from "../Utils/Common";

const SaleProperty = () => {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const token = getToken();

    const AddProperty = () => {
        navigate('/addProperty');
    };

    const handleSoldProperty = () => {
        navigate('/soldProperty');
    };
    const handleDealDoneProperty = () => {
        navigate('/dealDoneProperty');
    };


    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setRowData({ ...rowData, [name]: value });
    // };

    const handleContractClick = (event, param) => {
        navigate('/view/sellerContract/' + param);
    };

    const handleDeleteClick = async (event, param) => {
        console.log("param is --> " + param)
        try {
            // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
            await axios.delete('http://localhost:8080/api/sell/deleteUnSoldProperty/' + param, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            window.location.reload(false);

        } catch (error) {
            console.error("Error Deleting data:", error);
        }
    };



    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
                const response = await axios.get('http://localhost:8080/api/sell/getUnsoldProperties', {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                // Update the rowData state with the fetched data
                setRowData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (
        <div className="saleContainer">

            <div class="header">
                <h2>Sale Property Details</h2>
            </div>


            <div class="row">
                <div class="leftcolumn">
                    <div class="card">
                        <h3 style={{ color: 'blue', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Unsold Property Details</h3>
                        <div className="container rounded bg-white mt-5 mb-5">
                            <table className="table table-sm table-dark">
                                <thead>
                                    <tr>
                                        <th>Type of Property</th>
                                        <th>Plot No</th>
                                        <th>Plot Name</th>
                                        <th>Society Name</th>
                                        <th>Near By Landmark</th>
                                        <th>Area</th>
                                        <th>BHK</th>
                                        <th>Parking</th>
                                        <th>Sale Amount</th>
                                        <th>Contract</th>
                                        <th>Delete</th>
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
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={event => handleDeleteClick(event, data.id)}
                                                > Delete
                                                </button>
                                            </td>
                                            {/* Add more table data cells for other properties */}
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div className="rightcolumn">
                    <div class="card">
                        <button onClick={AddProperty}> Add Property</button>
                        <button onClick={handleSoldProperty}> Sold Property</button>
                        <button onClick={handleDealDoneProperty}> Deal Done Property</button>
                    </div>

                </div>

            </div>

        </div>



    )
};
export default SaleProperty