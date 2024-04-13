// Popup.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SuccessPopUp from "../pages/SuccessPopUp";

function Popup({ initialValue, initialQuantity, onSave, onClose }) {
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


    const user_id = localStorage.getItem('user_id');
    inputs.user_id = user_id;
    axios
      .post("http://localhost:80/dashboard_api/set_target.php/", inputs)
      .then(function (response) {
        console.log(response);
        if (response.data === 0) {
          setSuccessMessage("Target Set!");
          setErrorMessage("");
          setHideForm("turn-off");
          setTimeout(function() {
            console.log(onClose());
          }, 1200);
        } else if (response.data === 1) {
          setErrorMessage("Failed to set target");
          setSuccessMessage("");
        } 
      })
    
      
    
  };
  return (
    <div className="popup-overlay-vertical">
      <div className="sales-popup">
      <div className={hideForm}>
        <p>Set Target {name}</p>
        <button className="sales-close-button" onClick={onClose}>
          &times;
        </button>

        <form method="post" onSubmit={handleSubmit}>

          <input type="number" id="nameInput" name="sale_target" placeholder="Target in price" onChange={handleChange} /><br></br>


          <button type="submit">Save</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

      </div>
      {successMessage === "Target Set!" && (
        <SuccessPopUp message={successMessage} />
      )}
    </div>
    </div>
  );
}



export default Popup;
