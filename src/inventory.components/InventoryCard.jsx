//imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import axios from "axios";
import SuccessPopup from '../pages/SuccessPopUp';
//component
function InventoryCard(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemId, setItemId] = useState(props.itemId); 
  const [itemName, setNewName] = useState(props.itemName);
  const [quantity, setNewQuantity] = useState(props.quantity);
  const [price, setNewPrice] = useState(props.price);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = ({ itemName, quantity }) => {
    // axios
    //   .post("http://localhost:80/dashboard_api/edit_inventory.php", {
    //     new_name: itemName, // Use name instead of newName
    //     new_quantity: quantity,
    //     new_price: price
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //     if (response.data.success['success']) {
    //       setNewName(itemName); // Update local state with the new name
    //       setNewQuantity(quantity);
    //       setNewPrice(price) // Update local state with the new total purchases
    //       closePopup(); // Close the popup after successful save
    //     } else {
    //       setErrorMessage("Failed to edit item record");
    //       console.error("Failed to edit item record");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error("Error editing item record:", error);
    //   });
  };
  
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      axios
        .post("http://localhost:80/dashboard_api/delete_inventory.php", { new_name: itemName }) 
        .then(function (response) {
          console.log(response.data['success']);
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
          <strong className="underline-text">Selling Price:</strong>{props.price}
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
          initialValue={itemName}
          price={price}
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
