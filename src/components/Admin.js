import React from 'react';
import { Link } from 'react-router-dom';

const handleButtonClick = (action) => {
    // Define logic for each button click action
    if (action === "report") {
      // Handle the "Report" button click
    } else if (action === "deleteProperty") {
      // Handle the "Delete Property" button click
    } else if (action === "viewUser") {
      // Handle the "View User" button click
    }
};

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have been assigned an Admin role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
        <button onClick={() => handleButtonClick("report")}>Report</button>
        <button onClick={() => handleButtonClick("deleteProperty")}>Delete Property</button>
        <button onClick={() => handleButtonClick("viewUser")}>View User</button>
      </div>
    </section>
  );

  
};

export default Admin;
