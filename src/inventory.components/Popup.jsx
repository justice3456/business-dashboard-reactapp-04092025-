import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SuccessPopup from "../pages/SuccessPopUp";

function Popup({ initialValue, onSave, onClose }) {
  const [itemName, setItemName] = useState(initialValue);
  const [inputs, setInputs] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hideForm, setHideForm] = useState("");

  const handleChange = (event) => {
    const targetName = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [targetName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:80/dashboard_api/edit_inventory.php", inputs)
      .then(function (response) {
        console.log(response.data.success);
        if (response.data.success) {
          setSuccessMessage("Item updated successfully!");
          setErrorMessage("");
          setHideForm("turn-off");
          setTimeout(() => {
            onClose(); // Close the popup after successful update
          }, 1200);
        } else {
          setErrorMessage("Failed to update item");
          setSuccessMessage("");
        }
      })
      .catch(function (error) {
        console.error("Error updating item:", error);
        setErrorMessage("An error occurred. Please try again.");
        setSuccessMessage("");
      });
  };

  return (
    <div className="popup-overlay-vertical">
      <div className="sales-popup">
        <div className={hideForm}>
          <p>Update {itemName}</p>
          <button className="sales-close-button" onClick={onClose}>
            &times;
          </button>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="itemName"
              value={itemName}
              onChange={handleChange}
              readOnly // Make the input read-only
            /><br></br>

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={inputs.quantity || ""}
              onChange={handleChange}
            /><br></br>
            

            <button type="submit">Save</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        {successMessage === "Item updated successfully!" && (
          <SuccessPopup message={successMessage} />
        )}
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
