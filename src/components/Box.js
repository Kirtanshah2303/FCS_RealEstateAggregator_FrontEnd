import React from 'react';
import { useNavigate, Link } from "react-router-dom";

const Box = () => {

  const navigate = useNavigate();

  const handleSalePropertyClick = () => {
    // const url = 'src\components\buyhtmlpage.html';
    // window.open(url, '_blank');
    navigate('/saleProperty');
  };

  const handleBuyPropertyClick = () => {
    const url = '#';
    window.open(url, '_blank');
  };

  const handlerentPropertyClick = () => {
    const url = '#';
    window.open(url, '_blank');
  };

  const handleviewPropertyClick = () => {
    const url = '#';
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="conatiner bg-dark m-5 p-4">
        <div className="row">
          <div className="col-md-3">
            <button className="btn btn-success mx-3 px-4 my-3" onClick={handleSalePropertyClick}>
              Sale Property
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-danger px-4 my-3" onClick={handleBuyPropertyClick}>
              Buy Property
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-secondary px-4 my-3" onClick={handlerentPropertyClick}>
              RENT Property
            </button>
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary px-4 my-3" onClick={handleviewPropertyClick}>
              VIEW Property
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Box;
