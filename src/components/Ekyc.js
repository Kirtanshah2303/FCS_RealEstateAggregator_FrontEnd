import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { getToken ,removeUserSession} from "../Utils/Common";

const eKyc_URL = "https://192.168.3.39:5000/kyc";

const Ekyc = () => {
  const formStyle = {
    width: '30%',
    margin: '0 auto',
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();

  const token = getToken();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const EkycSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://192.168.2.251:8080/api/eKyc", { email: user, password: pwd }, {
        headers: {'Authorization': 'Bearer '+token ,'Content-Type': 'application/json' },
        withCredentials: true
      });
      
      // if (response.status) {
      //   console.log(JSON.stringify(response?.data));
      //   console.log('Request was successful:', response.data);
      //   // You can access the response data here and do something with it
      //   setUser('');
      //   setPwd('');
      //   navigate(from, { replace: true });
      // } else {
      //   console.log('Request was not successful. Status code:', response.status);
      //   // Handle the unsuccessful response here
      // }

      console.log("Log of the response---->"+response);
      removeUserSession();
      navigate("/");
      

      
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 417) {
        alert("Something Went Wrong!!")
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        alert("Wrong credentials entered!!")
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <form style={formStyle} onSubmit={EkycSubmit}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label style={labelStyle}>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
      </div>
      <div className="mb-3">
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Ekyc;
