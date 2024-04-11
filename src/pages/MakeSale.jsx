import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Popup({ initialValue, initialNumber, onSave, onClose }) {
  const [name, setName] = useState(initialValue);
  const [inputs, setInputs] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hideForm, setHideForm] = useState("")

  const handleChange = (event) => {
    const targetname = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [targetname]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:80/dashboard_api/make_sale.php/", inputs)
      .then(function (response) {
        console.log(response);
        if (response.data === 4) {
          setSuccessMessage("Sale recorded successfully!");
          setErrorMessage("");
          setHideForm("turn-off");
          setTimeout(function() {
            console.log(onClose());
          }, 1200);
          ;
        } else if (response.data[0] === 3) {
          setErrorMessage(
            "Only " +
              response.data[1] +
              " " +
              response.data[2] +
              " is remaining"
          );
          setSuccessMessage("");
        } else if (response.data === 2) {
          setErrorMessage("Item is unavailable");
          setSuccessMessage("");
        } else if (response.data[0] === 1) {
          setErrorMessage("No " + response.data[1] + " found");
          setSuccessMessage("");
        } else if (response.data[0] === 0) {
          setErrorMessage("Customer" + response.data[1] + " not found");
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
    <div>
      <div className={hideForm}>
        <div className="popup-overlay-vertical">
          <div className="sales-popup">
            <button className="sales-close-button" onClick={onClose}>
              &times;
            </button>

            <form method="post" onSubmit={handleSubmit}>
              <label>Make Sale</label> <br></br>
              <input
                placeholder="Customer Name"
                type="text"
                id="nameInput"
                name="customerName"
                value={name}
                onChange={handleChange}
              />
              <br></br>
              <input
                placeholder="Item Name"
                type="text"
                id="nameInput"
                name="inventoryName"
                value={name}
                onChange={handleChange}
              />
              <br></br>
              <input
                placeholder="Quantity"
                type="number"
                id="nameInput"
                name="quantity"
                onChange={handleChange}
              />
              <br></br>
              <button type="submit">Record Sale</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>

      {successMessage === "Sale recorded successfully!" && (
        <SuccessPopup message={successMessage} />
      )}
    </div>
  );
}

Popup.propTypes = {
  initialValue: PropTypes.string,
  initialNumber: PropTypes.number,
  onSave: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

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
