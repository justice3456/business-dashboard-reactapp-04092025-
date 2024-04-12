import React, { useState } from "react";
import PropTypes from "prop-types";

function Popup({ initialValue, onSave, onClose }) {
  const [name, setName] = useState(initialValue.name);
  const [phoneNumber, setPhoneNumber] = useState(initialValue.phoneNumber);
  const [totalPurchases, setTotalPurchases] = useState(initialValue.totalPurchases);

  const handleChange = (event) => {
    if (event.target.name === "newName") {
      setName(event.target.value);
    } else if (event.target.name === "newNumber") {
      setPhoneNumber(event.target.value);
    } else if (event.target.name === "newPurchases") {
      setTotalPurchases(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ name, phoneNumber, totalPurchases });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Edit Name"
            type="text"
            name="newName"
            value={name}
            onChange={handleChange}
          />
          <input
            placeholder="Edit Number"
            type="text"
            name="newNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
          <input
            placeholder="Edit Purchases"
            type="number"
            name="newPurchases"
            value={totalPurchases}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

Popup.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
