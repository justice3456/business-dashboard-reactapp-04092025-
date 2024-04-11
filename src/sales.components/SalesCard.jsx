//imports
import PropTypes from "prop-types";
import { useState} from "react";
import axios from "axios";
//component
function SalesCard(props) {


  




  return (
    <>
      <div className="customer-card">
        <p className="customer-name">
          <strong className="underline-text">Customer:</strong> {props.customerName}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Date Sold:</strong> {props.dateSold}
        </p>
        <p className="customer-name">
          <strong className="underline-text">Total Items</strong> {props.itemsSold} items
        </p>
        <button className="action-button">
          <img src="../images/delete.png" alt="Delete" />
        </button>

      </div>
    </>
  );
}

export default SalesCard;
