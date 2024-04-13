// pages/SalesPage.jsx

import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import SalesCard from "../sales.components/SalesCard";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MakeSale from "./MakeSale";
import axios from "axios";
import Popup from "../sales.components/Popup";
import { useNavigate} from "react-router-dom";
export default function SalesPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [targetPopUp, setTargetPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [deleteValue, setDeleteValue] = useState(true);
  
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openTargetPopup = () => {
    setTargetPopUp(true);
  };

  const closeTargetPopup = () => {
    setTargetPopUp(false);
  };

  const handleSave = (newName) => {};

  const deleteSale = (saleId) => {
  // Call the backend API to delete the sale record
  axios
    .post("http://localhost:80/dashboard_api/delete_sale_action.php", { sale_id: saleId })
    .then(function (response) {
      if (response.data.success) {
        // If deletion successful, filter out the sale card with the given ID
        const newData = data.filter((sale) => sale.id !== saleId);
        setData(newData);
        setDeleteValue(prevValue => !prevValue); // Update deleteValue state
      } else {
        console.error("Failed to delete sale record");
      }
    })
    .catch(function (error) {
      console.error("Error deleting sale record:", error);
    });
};

  useEffect(() => {
    axios
      .get("http://localhost:80/dashboard_api/get_all_sales.php/")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isPopupOpen] ||deleteValue); 
  
  useEffect(() => {
    axios
      .get("http://localhost:80/dashboard_api/get_all_sales.php/")
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [deleteValue]);// Effect for fetching data when isPopupOpen changes
  


  

  return (
    <>
      <div>
        <p className="add-inventory" onClick={openPopup}>
          Make + Sale
        </p>
        <p className="add-inventory" onClick={openTargetPopup}>
          Set Sale Target
        </p>

        <DashboardTexts pageTitle="Sales" salesPerWeek="display-off" />

        {data.length > 0 &&
  data.map((sale) => (
    <SalesCard
      key={sale.SaleID} 
      id={sale.SaleID} 
      customerName={sale.CustomerName}
      itemSold={sale.ItemName}
      quantity={sale.TotalAmount}
      onDelete={deleteSale}
    />
  ))}


        {targetPopUp && <Popup onSave={handleSave} onClose={closeTargetPopup} />}
        <LeftMenu />
      </div>

      {isPopupOpen && <MakeSale onSave={handleSave} onClose={closePopup} />}
    </>
  );
}
