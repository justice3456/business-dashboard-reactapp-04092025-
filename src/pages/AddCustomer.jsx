// Popup.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Popup({ initialValue, initialNumber, onSave, onClose }) {
  const [name, setName] = useState(initialValue);
  const [inputs, setInputs] = useState({});

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
        if (response.data == 1) {
        }
      });
    
      onClose();
    
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>Add Customer</p>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="nameInput">Customer:</label>
          <input
            type="text"
            id="nameInput"
            name="nameInput"
            value={name}
            onChange={handleChange}
          />

          <label htmlFor="numberInput">Phone:</label>
          <input type="number" id="nameInput" name="numberInput" onChange={handleChange} />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

Popup.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
