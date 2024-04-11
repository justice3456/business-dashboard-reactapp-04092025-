// Popup.js
import React, { useState } from "react";
import PropTypes from "prop-types";

function Popup({ initialValue, onSave, onClose }) {
  const [name, setName] = useState(initialValue);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(name);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nameInput">Edit Name:</label>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={handleChange}
          />
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
