//imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import axios from "axios";
//component
function InventoryCard(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemId, setItemId] = useState(props.itemId); // Add state for item ID
  const [itemName, setNewName] = useState(props.itemName);
  const [quantity, setNewQuantity] = useState(props.quantity);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = ({ itemName, quantity }) => {
    axios
      .post("http://localhost:80/dashboard_api/edit_inventory.php", {
        item_id: itemId,
        new_name: itemName, // Use name instead of newName
        new_quantity: quantity
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          setItemName(name); // Update local state with the new name
          setQuantity(quantity); // Update local state with the new total purchases
          closePopup(); // Close the popup after successful save
        } else {
          console.error("Failed to edit item record");
        }
      })
      .catch(function (error) {
        console.error("Error editing item record:", error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      axios
        .post("http://localhost:80/dashboard_api/delete_inventory.php", { new_name: itemName }) // Use item_id instead of customer_id
        .then(function (response) {
          console.log(response.data);
          // Handle UI update after successful deletion (if needed)
        })
        .catch(function (error) {
          console.error("Error deleting item:", error);
        });
    }
  };

  return (
    <>
      <div className="customer-card">
        <p className="customer-name">
          <strong className="underline-text">Name:</strong> {itemName}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Quantity:</strong> {quantity}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Last Updated:</strong>{props.lastUpdated}
        </p>
        
        {/* <button className="action-button" onClick={openPopup}>
          <img src="../images/edit.png" alt="Edit" />
        </button>
        <button className="action-button" onClick={handleDelete}> 
          <img src="../images/delete.png" alt="Delete" />
        </button> */}
      </div>
      {isPopupOpen && (
        <Popup
          itemId={itemId} // Pass itemId to Popup
          itemName={itemName}
          quantity={quantity}
          onSave={handleSave}
          onClose={closePopup}
        />
      )}
    </>
  );
}


export default InventoryCard;
