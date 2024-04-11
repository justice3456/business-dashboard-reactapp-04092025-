import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup'; // Import the Popup component

function CustomerCard(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [customerName, setCustomerName] = useState("Name");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = (newName) => {
    setCustomerName(newName);
  };

  return (
    <>
      <div className="customer-card">
        <p className="customer-name">
          <strong className="underline-text">Name:</strong> {customerName}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Date Added:</strong> {props.dateAdded}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Total Purchase:</strong> {props.totalPurchases} items
        </p>
        <button className="action-button" onClick={openPopup}>
          <img src="../images/edit.png" alt="Edit" />
        </button>
        <button className="action-button">
          <img src="../images/delete.png" alt="Delete" />
        </button>
      </div>
      {isPopupOpen && (
        <Popup
          initialValue={customerName}
          onSave={handleSave}
          onClose={closePopup}
        />
      )}
    </>
  );
}

export default CustomerCard;
