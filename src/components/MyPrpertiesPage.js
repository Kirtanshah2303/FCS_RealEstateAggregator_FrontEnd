import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPrpertiesPage = () => {
  const [rowData, setRowData] = useState({
    Typeofproperty: '',
    Plotno: '',
    Plotname: '',
    SocietyName: '',
    NearbyLandmark: '',
    Area: '',
    BHK: '',
    Parking: '',
    Saleamount: '',
    DealDoneDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRowData({
      ...rowData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleContractClick = () => {
    navigate('/view/sellerContract/');
  };

  return (
    <div>
      <h1>My Properties Page</h1>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Typeofproperty"
                  value={rowData.Typeofproperty}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Plotno"
                  value={rowData.Plotno}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Plotname"
                  value={rowData.Plotname}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="SocietyName"
                  value={rowData.SocietyName}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="NearbyLandmark"
                  value={rowData.NearbyLandmark}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Area"
                  value={rowData.Area}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="BHK"
                  value={rowData.BHK}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Parking"
                  value={rowData.Parking}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="Saleamount"
                  value={rowData.Saleamount}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="DealDoneDate"
                  value={rowData.DealDoneDate}
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

export default MyPrpertiesPage;
