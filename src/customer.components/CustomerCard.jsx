import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup'; // Import the Popup component
import axios from 'axios'; // Import axios

function CustomerCard(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [customerName, setCustomerName] = useState(props.customerName);
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
  const [totalPurchases, setTotalPurchases] = useState(props.totalPurchases);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = ({ name, phoneNumber, totalPurchases }) => {
    // Call the edit API to update the customer name and phone number
    axios
      .post("http://51.120.240.118/dashboard_api/edit_customer.php", {
        customer_id: props.customerId,
        customer_name: name,
        phone_number: phoneNumber,
        total_purchases: totalPurchases
        
      })
      .then(function (response) {
        console.log(response)
        if (response.data.success) {
          setCustomerName(name); // Update local state with the new name
          setPhoneNumber(phoneNumber); // Update local state with the new phone number
          setTotalPurchases(totalPurchases); // Update local state with the new total purchases
          closePopup(); // Close the popup after successful save
        } else {
          console.error("Failed to edit customer record");
        }
      })
      .catch(function (error) {
        console.error("Error editing customer record:", error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      axios
        .post("http://51.120.240.118/dashboard_api/delete_customer_action.php", { customer_id: props.customerId })
        .then(function (response) {

          // Handle UI update after successful deletion (if needed)
        })
        .catch(function (error) {
          console.error("Error deleting customer:", error);
        });
    }
  };

  return (
    <>
      <div className="customer-card">
        <p className="customer-name">
          <strong className="underline-text">Name:</strong> {customerName}
        </p>
        <p className="customer-name">
          <strong className="underline-text" pattern="[0-9]{10}" title="Please enter a 10-digit phone number">Contact:</strong> {phoneNumber}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Total Purchase:</strong> {totalPurchases} items
        </p>
        <button className="action-button" onClick={openPopup}>
          <img src="../images/edit.png" alt="Edit" />
        </button>
        <button className="action-button" onClick={handleDelete}>
          <img src="../images/delete.png" alt="Delete" />
        </button>
      </div>
      {isPopupOpen && (
        <Popup
          initialValue={{ name: customerName, phoneNumber: phoneNumber, totalPurchases: totalPurchases }}
          onSave={handleSave}
          onClose={closePopup}
        />
      )}
    </>
  );
}



export default CustomerCard;
