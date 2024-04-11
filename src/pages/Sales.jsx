//imports
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import SalesCard from "../sales.components/SalesCard";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MakeSale from './MakeSale';
//components
export default function () {
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
      <div>
        <p className="add-inventory" onClick={openPopup}>Make + Sale</p>

        <DashboardTexts pageTitle="Sales" salesPerWeek="display-off" />
        <SalesCard />
        <SalesCard />
        <SalesCard />
        <LeftMenu />
      </div>

      {isPopupOpen && <MakeSale onSave={handleSave} onClose={closePopup} />}
    </>
  );
}
