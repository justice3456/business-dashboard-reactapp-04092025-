import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SuccessPopup from "../pages/SuccessPopUp";
import { useNavigate} from "react-router-dom";
function Popup({ initialValue, quantity, price, onSave, onClose }) {
  const [itemName, setItemName] = useState(initialValue);
  
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    itemName: initialValue,
    quantity: quantity,
    price: price,
    itemNamePlaceholder: initialValue,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hideForm, setHideForm] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  function reFresh(){
    window.location.reload()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:80/dashboard_api/edit_inventory.php", inputs)
      .then(function (response) {
        if (response.data['success']) {
          setSuccessMessage("Item updated successfully!");
          setErrorMessage("");
          setHideForm("turn-off");
          
          setTimeout(() => {
            onClose();
            reFresh();
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
          <p>Update {initialValue}</p>
          <button className="sales-close-button" onClick={onClose}>
            &times;
          </button>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="itemName"
              value={inputs.itemName}
              placeholder={inputs.itemNamePlaceholder}
              onChange={handleChange}
              required
            />
            <br />

            <input
              type="number"
              name="quantity"
              value={inputs.quantity}
              placeholder={quantity}
              onChange={handleChange}
              required
            />
            <br />

            <input
              type="number"
              name="price"
              value={inputs.price}
              placeholder={price}
              onChange={handleChange}
              required
            />
            <br />

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


export default Popup;
