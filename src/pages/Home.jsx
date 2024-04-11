import Chart from "../dashboard.components/Chart";
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import MediumCard from "../dashboard.components/MediumCard";
import {  Link} from "react-router-dom";
export default function () {
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
          cardDescription="Total Sales This Week"
          displayValue="GHC500"
          cardPosition="progress-position-left"
          percentage="65%"
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
          displayValue="GHC500"
          cardPosition="progress-position-left"
          percentage="65%"
          circleHeader="no-circle-header"
        />
        </Link>
        {/** LEFT CARDS */}

        {/** RIGHT CARD */}
        {/** PROFIT CARD */}
        <MediumCard
          classname="profit-card"
          cardName="Profit"
          circleHeader="card-price"
          cardDescription="Profit Stat Per Week "
          displayValue="GHC700"
          cardHeaderValue="Current &nbsp;&nbsp; Target &nbsp;&nbsp;&nbsp;&nbsp; Best"
          cardPosition="progress-position-right"
          percentage="75%"
          cardPosition1="target-position"
          percentage1="10000"
          cardPosition2="best-position"
          percentage2="700"
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
