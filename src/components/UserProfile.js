import React,{useState, useEffect} from 'react';
import axios from '../api/axios';
import { getToken } from '../Utils/Common';
const UserProfile = () => {

  const token = getToken();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Inside fetchData")
        // Replace 'your_api_endpoint' with the actual API endpoint to fetch data
        const response = await axios.get('http://localhost:8080/api/account', {
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

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-5 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile"
            />
            <span className="font-weight-bold">Bharat</span>
            <span className="text-black-50">bharat69@gmail.com</span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input type="text" className="form-control" placeholder="first name" value="" />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input type="text" className="form-control" value="" placeholder="surname" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Address</label>
                <input type="text" className="form-control" placeholder="enter address" value="" />
              </div>
              <div className="col-md-12">
                <label className="labels">Postcode</label>
                <input type="text" className="form-control" placeholder="enter postal code" value="" />
              </div>
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input type="text" className="form-control" placeholder="enter email id" value="" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">Country</label>
                <input type="text" className="form-control" placeholder="country" value="" />
              </div>
              <div className="col-md-6">
                <label className="labels">State/Region</label>
                <input type="text" className="form-control" value="" placeholder="state" />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
