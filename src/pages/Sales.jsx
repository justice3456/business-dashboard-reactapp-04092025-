import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import SalesCard from "../sales.components/SalesCard";
import MakeSale from "./MakeSale";
import Popup from "../sales.components/Popup";

export default function SalesPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [targetPopUp, setTargetPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [deleteValue, setDeleteValue] = useState(false); // Changed initial value to false

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
    axios
      .post("http://localhost:80/dashboard_api/delete_sale_action.php", {
        sale_id: saleId
      })
      .then(function (response) {
        if (response.data.success) {
          const newData = data.filter((sale) => sale.id !== saleId);
          setData(newData);
          setDeleteValue((prevValue) => !prevValue);
        } else {
          console.error("Failed to delete sale record");
        }
      })
      .catch(function (error) {
        console.error("Error deleting sale record:", error);
      });
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    axios
      .get("http://localhost:80/dashboard_api/get_all_sales.php/", {
        params: { user_id: user_id }
      })
      .then(function (response) {
        console.log(response.data);
        setData(response.data); // Assuming response.data is an array
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isPopupOpen, deleteValue]); // Corrected dependencies array

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
