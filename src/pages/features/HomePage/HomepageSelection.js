import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomepageSelection.css";

const HomepageSelection = () => {
  const navigate = useNavigate();

  const handleServiceClick = (route) => {
    navigate(route);
  };

  return (
    <div className="homepage-container">
      <div className="transaction-section">
        <h2>Select a Service</h2>
        <div className="services-grid">
          <button
            className="service-button"
            onClick={() => handleServiceClick("/bill-payment")}
          >
            Bill Payment
          </button>
          <button
            className="service-button"
            onClick={() => handleServiceClick("/new-application")}
          >
            New Service Connection
          </button>
          <button
            className="service-button"
            onClick={() => handleServiceClick("/reconnection-request")}
          >
            Service Reconnection Request
          </button>
          <button
            className="service-button"
            onClick={() => handleServiceClick("/complaint")}
          >
            Complaint Filing
          </button>
          <button
            className="service-button"
            onClick={() => handleServiceClick("/update-details")}
          >
            Change Account Name
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomepageSelection;
