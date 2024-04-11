//imports
import CustomerCard from "../customer.components/CustomerCard";
import CustomerEditForm from "../customer.components/CustomerEditForm";
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddCustomer from './AddCustomer'; 

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
    <p className="add-inventory" onClick={openPopup}>Add + Customer</p>
    <div>
      <DashboardTexts pageTitle="Customers" salesPerWeek="display-off" />
      <CustomerCard />
      <CustomerCard />
      <CustomerCard />
      <LeftMenu />
      <CustomerEditForm/>
    </div>

    {isPopupOpen && (
        <AddCustomer
          onSave={handleSave}
          onClose={closePopup}
        />
      )}
    </>
  );
}
