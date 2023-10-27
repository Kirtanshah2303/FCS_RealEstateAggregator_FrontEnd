import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';



const SaleProperty = () => {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState({});

    const AddProperty = () => {
        navigate('/addProperty');
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRowData({ ...rowData, [name]: value });
    };

    const handleContractClick = () => {
        navigate('/sellerContract');
    };

    const handleDeleteClick = () => {
        // Add your delete logic here
    };



    useEffect(() => {
        console.log("Inside Page")
    })

    return (
        <div className="saleContainer">

            <div class="header">
                <h2>Sale Property Details</h2>
                <div class="rightcolumn">
                    <div class="card">
                        <button onClick={AddProperty}> Add Property
                            {/* <Link to="/addProperty">Add Property</Link> */}
                        </button>
                        {/* <h4>Add Property</h4> */}
                        {/* <div class="fakeimg" style="height:100px;">Image</div> */}
                        {/* <p>Some text about me in culpa qui officia deserunt mollit anim..</p> */}
                    </div>
                </div>
            </div>


                <div class="row">
                    <div class="leftcolumn">
                        <div class="card">
                            <h3 style={{ color: 'blue', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Existing Property Details</h3>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="propertyType"
                                                    value={rowData.propertyType || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="propertyNumber"
                                                    value={rowData.propertyNumber || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="propertyName"
                                                    value={rowData.propertyName || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="societyName"
                                                    value={rowData.societyName || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="landMark"
                                                    value={rowData.landMark || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="propertyArea"
                                                    value={rowData.propertyArea || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="roomCapacity"
                                                    value={rowData.roomCapacity || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="parking"
                                                    value={rowData.parking || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="sellAmount"
                                                    value={rowData.sellAmount || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleContractClick}
                                                >
                                                    Contract
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={handleDeleteClick}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                </div>

        </div>



    )
}
export default SaleProperty