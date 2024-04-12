// Popup.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Popup({ initialValue, initialNumber, onSave, onClose }) {
  const [name, setName] = useState(initialValue);
  const [inputs, setInputs] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hideForm, setHideForm] = useState("");

  const handleChange = (event) => {
    const targetname = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [targetname]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:80/dashboard_api/add_customer.php/", inputs)
      .then(function (response) {
        console.log(response);
        if (response.data === 0) {
          setSuccessMessage("Customer added successfully!");
          setErrorMessage("");
          setHideForm("turn-off");
          setTimeout(function() {
            console.log(onClose());
          }, 1200);
        } else if (response.data[0] === 1) {
          setErrorMessage("Failed to add customer");
          setSuccessMessage("");
        } else if (response.data === 2) {
          setErrorMessage("Customer already exists");
          setSuccessMessage("");
        }
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage("An error occurred. Please try again.");
        setSuccessMessage("");
      });
      
    
  };

  return (
    
    <div className="popup-overlay-vertical">
      <div className="sales-popup">
      <div className={hideForm}>
        <p>Add Customer</p>
        <button className="sales-close-button" onClick={onClose}>
          &times;
        </button>

        <form method="post" onSubmit={handleSubmit}>
          <input
            placeholder="Customer Name"
            type="text"
            id="nameInput"
            name="nameInput"
            value={name}
            onChange={handleChange}
          />

          <input type="number" id="nameInput" name="numberInput" placeholder="Phone Number" onChange={handleChange} /><br></br>

          <button type="submit">Save</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

      </div>
      {successMessage === "Customer added successfully!" && (
        <SuccessPopup message={successMessage} />
      )}
    </div>
    </div>
  );
}


function SuccessPopup({ message }) {
  return (
      
    <div className="popup-overlay-vertical">
      <div className="success-popup">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="sucess-message">{message}</p>
      </div>
    </div>
  );
}
export default Popup;
