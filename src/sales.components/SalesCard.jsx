// sales.components/SalesCard.jsx

import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

function SalesCard(props) {
  const deleteSale = () => {
    
    props.onDelete(props.id);
  };

  return (
    <>
      <div className="customer-card">
        <p className="customer-name">
          <strong className="underline-text">Customer:</strong> {props.customerName}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Item:</strong> {props.itemSold}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Total Items:</strong> {props.quantity} items
        </p>
        <button className="action-button" onClick={deleteSale}>
          <img src="../images/delete.png" alt="Delete" />
        </button>
      </div>
    </>
  );
}



export default SalesCard;
