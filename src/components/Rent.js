import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Rent = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState({
    name: '',
    address: '',
    pincode: '',
    rent: '',
    owner: '',
    lastpayment: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRowData({ ...rowData, [name]: value });
  };

  const handleContractClick = () => {
    navigate('/rentContract');
  };

  const handleDeleteClick = () => {
    // Add your delete logic here
  };

  return (
    <div>
      <h1 >Rented Property</h1>
      <div className="container rounded bg-white mt-5 mb-5">
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Rent</th>
              <th>Owner</th>
              <th>Last Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={rowData.name}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={rowData.address}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={rowData.pincode}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="rent"
                  value={rowData.rent}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="owner"
                  value={rowData.owner}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="lastpayment"
                  value={rowData.lastpayment}
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
            </tr>
          </tbody>
        </table>

        
      </div>
    </div>
  );
};

export default Rent;
