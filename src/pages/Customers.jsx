import CustomerCard from "../customer.components/CustomerCard";
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import React, { useState, useEffect } from "react"; // Import useEffect for fetching data
import AddCustomer from "./AddCustomer";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export default function CustomerPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [data, setData] = useState([]);
  const [inputs, seInputs] = useState({});

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
    // Handle save logic (if needed)
  };

  const fetchData = () => {
    const user_id = localStorage.getItem('user_id');
    axios
      .get("http://localhost:80/dashboard_api/get_all_customers.php/", {
        params: { user_id: user_id } 
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

  useEffect(() => {
    fetchData();
  }, [isPopupOpen]); // Trigger fetch data when isPopupOpen changes

  // Re-fetch data when data is updated after delete or edit
  useEffect(() => {
    fetchData();
  }, [data]); 

  return (
    <>
      <p className="add-inventory" onClick={openPopup}>
        Add + Customer
      </p>
      <div>
        <DashboardTexts pageTitle="Customers" salesPerWeek="display-off" />

        {data.length > 0 &&
          data.map((customer, index) => (
            <CustomerCard
              key={index}
              customerId={customer.CustomerID}
              customerName={customer.Customer_Name}
              phoneNumber={customer.PhoneNumber}
              totalPurchases={customer.TotalPurchases}
            />
          ))}

        <LeftMenu />
      </div>

      {isPopupOpen && <AddCustomer onSave={handleSave} onClose={closePopup} />}
    </>
  );
}
