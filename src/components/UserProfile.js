import React,{useState, useEffect, useRef} from 'react';
import axios from '../api/axios';
import { getToken } from '../Utils/Common';
const UserProfile = () => {

  const token = getToken();
  const [rowData, setRowData] = useState([]);

  const [firstName, setFirstName] = useState(rowData.firstName);
  const [lastName, setLastName] = useState(rowData.lastName);

  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setIsProfileChanged(true);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setIsProfileChanged(true);
  };



  const handleSubmit = async (e) =>{

    try {
      // Make a POST request to the specified URL with the updated data
      const response = await fetch('http://localhost:8080/api/account', {
        method: 'PUT',
        headers: {
          "Authorization": "Bearer " + token,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({ firstName, lastName }),
      });

      // Handle the response as needed
      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }

      window.location.reload(false); 
    }
   
    catch (error) {
      alert('Error updating profile', error);
    }
  };

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
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <a className="navbar-brand" href="/">
            HOME
          </a>
      <div className="row">
        <div className="col-md-5 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile"
            />
            {/* <span className="font-weight-bold">{rowData.firstName}</span> */}
            <span className="font-weight-bold">{rowData.login}</span>
            <span className="text-black-50">Email: {rowData.email}</span>
          </div>
        </div>
        
        <div className="col-md-5 border-right">
          <form onSubmit={handleSubmit}>

          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input type="text" 
                className="form-control" 
                name= "firstName" 
                placeholder="first name" 
                // value={rowData.firstName}
                value = {firstName}
                onChange={handleFirstNameChange} />
              </div>

              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input type="text" 
                className="form-control" 
                name="lastName" 
                // value={rowData.lastName} 
                value = {lastName}
                placeholder="surname"
                onChange={handleLastNameChange} />
              </div>

            </div>
            <div className="row mt-3">
              
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input type="text" className="form-control" placeholder="enter email id" value={rowData.email} readOnly />
              </div>
            </div>
            
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button"
               type="submit"
               disabled={!isProfileChanged}>Edit Profile</button>
            </div>
          </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
