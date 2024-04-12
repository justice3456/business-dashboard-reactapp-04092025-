//imports
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import InventoryCard from "../inventory.components/InventoryCard";
import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import AddInventory from './AddInventory';
import axios from "axios";
import { useNavigate} from "react-router-dom";
//components
export default function () {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [data, setData] = useState([]);

  const navigate = useNavigate();


  if (!localStorage.getItem('user_id')){
    navigate("/NoPage");
  }

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleSave = (newName) => {

  };



  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    axios
      .get("http://localhost:80/dashboard_api/get_all_inventory.php/", {
        params: { user_id: user_id } // Pass user_id as a query parameter
      })
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
