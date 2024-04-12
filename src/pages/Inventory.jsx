//imports
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import InventoryCard from "../inventory.components/InventoryCard";
import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import AddInventory from './AddInventory';
import axios from "axios";

//components
export default function () {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [data, setData] = useState([]);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleSave = (newName) => {

  };



  useEffect(() => {
    axios
      .get("http://localhost:80/dashboard_api/get_all_inventory.php/")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isPopupOpen]); 

  return (
    <>
    <p className="add-inventory" onClick={openPopup}>Add + Inventory</p>
    <div>
      <DashboardTexts pageTitle="Inventory" salesPerWeek="display-off" />

      {data.length > 0 &&
          data.map((item, index) => (
            <InventoryCard
              key={index}
              itemName={item.ItemName}
              quantity={item.Quantity}
              lastUpdated={item.LastUpdated}
            />
          ))}
     


      <LeftMenu />
    </div>
    {isPopupOpen && (
        <AddInventory
          onSave={handleSave}
          onClose={closePopup}
        />
      )}
    </>
  );
}
