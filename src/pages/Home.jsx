import Chart from "../dashboard.components/Chart";
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import MediumCard from "../dashboard.components/MediumCard";
import {  Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";




export default function () {
  const navigate = useNavigate();
  const [inventoryValue, setInventoryValue] = useState();
  const [sales, setSales] = useState();
  const [salesTarget, setSalesTarget] = useState();
  const [todaysSales, setTodaysSales] = useState();
  const [progress, setProgress] = useState();
  const [progressCircle, setProgressCircle] = useState();
  const [profit, setProfit] = useState();

  if (!localStorage.getItem('user_id')){
    
    navigate("/Login");
  }


  const user_id = localStorage.getItem('user_id');
  axios
    .get("http://51.120.240.118/dashboard_api/sales_progress.php/", {
      params: { user_id: user_id } 
    })
      .then(function (response) {
        setSales(Number(response.data['total_sales']).toFixed(2));
      })
      .catch(function (error) {
        console.log(error);
      });

      axios
      .get("http://51.120.240.118/dashboard_api/sum_all_inventory.php/", {
        params: { user_id: user_id } 
      })
 
      .then(function (response) {
        setInventoryValue(response.data['total_quantity']);
      })
      .catch(function (error) {
        console.log(error);
      });

      axios
      .get("http://51.120.240.118/dashboard_api/get_sales_target.php/", {
        params: { user_id: user_id } 
      })
      .then(function (response) {
        console.log(response);
        setSalesTarget(response.data['sales_target']);
      })
      .catch(function (error) {
        console.log(error);
      });

      axios
      .get("http://51.120.240.118/dashboard_api/todays_sales.php/", {
        params: { user_id: user_id } 
      })
      .then(function (response) {
        setTodaysSales(Number(response.data['todays_sales']).toFixed(2));
      })
      .catch(function (error) {
        console.log(error);
      });

      axios
      .get("http://51.120.240.118/dashboard_api/sale_progress_calculations.php/", {
        params: { user_id: user_id } 
      })
      .then(function (response) {
         console.log(response);
        setProgress(response.data[0]);
        setProgressCircle(response.data[1]);
      })
      .catch(function (error) {
        console.log(error);
      });


      // axios
      // .get("http://localhost:80/dashboard_api/get_sales_target.php/")
      // .then(function (response) {
      //   console.log(response.data['total_quantity']);
      //   setInventoryValue(response.data['total_quantity']);
      // })
      axios
      .get("http://51.120.240.118/dashboard_api/profit.php/", {
        params: { user_id: user_id } 
      })
      .then(function (response) {
        console.log(response)
        setProfit(Number(response.data['total_profit']).toFixed(2));
      })
      .catch(function (error) {
        console.log(error);
      });

     
      







  






  return (
    <>
      <DashboardTexts pageTitle="Dashboard" salesPerWeek="chart-description"/>
      <Chart />
      <div className="medium-cards-group">
        {/* <RegisterForm/> */}
        {/* <LoginForm/> */}
        {/** LEFT CARDS */}
        {/** SALES CARD */}
        
        
        <Link to ="/Sales" style={{ textDecoration: 'none' }} className="link-style">
        <MediumCard
          cardPosition1="no-circle-header"
          cardPosition2="no-circle-header"
          classname="sales-card"
          cardName="Sales"
          cardDescription="Total Sales"
          displayValue= {sales}
          cardPosition="progress-position-left"
          percentage="GHC"
          position="sales-position"
          circleHeader="no-circle-header"
        />
        </Link>

        {/** INVENTORY */}
        <Link to ="/Inventory" style={{ textDecoration: 'none' }} className="link-style">
        <MediumCard
          cardPosition1="no-circle-header"
          cardPosition2="no-circle-header"
          classname="inventory-card"
          cardName="Inventory"
          cardDescription="Inventory Remaining"
          displayValue= {inventoryValue} 
          cardPosition="progress-position-left"
          percentage="Items"
          circleHeader="no-circle-header"
        />
        </Link>
        {/** LEFT CARDS */}

        {/** RIGHT CARD */}
        {/** PROFIT CARD */}
        <MediumCard
          classname="profit-card"
          cardName="Profit"
          circleControl = "current-control"
          circleHeader="card-price"
          cardDescription="Profit"
          displayValue= {"GHC" + profit}
          cardHeaderValue="Progress &nbsp;&nbsp; Target &nbsp;&nbsp;&nbsp;&nbsp; Todays"
          cardPosition="progress-position-right"
          percentage= {progress + "%"}
          cardPosition1="target-position"
          percentage1= {salesTarget}
          cardPosition2="best-position"
          percentage2= {sales}
        />

        {/**Target Circle */}
        {/* <ProgressCircle percentage="GHC1000" position="target-position" />
      <ProgressCircle percentage="GHC800" position="best-position" /> */}
        {/** RIGHT CARDS */}
      </div>

      {/** LEFT MENU */}
      <LeftMenu />

      {/** LEFT MENU */}
    </>
  );
}
