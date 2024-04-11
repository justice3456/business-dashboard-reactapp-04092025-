//imports
import {  Link} from "react-router-dom";

//component
function LeftMenu() {
  return (
    <div className="left-menu">
      <h1 className="app-name">SSB Dashboard</h1>
      <div className="left-menu-items">
        <Link to = "/Home" style={{ textDecoration: 'none' }} className="link-style" >
        <p>
          <img src="../images/home.png"></img>Home
        </p>
        </Link>

        <Link to= "/Customers" style={{ textDecoration: 'none' }} className="link-style">
        <p>
          <img src="../images/customers.png"></img>Customers
        </p>
        </Link>
        <p>
          <img src="../images/settings.png"></img>Settings
        </p>
      </div>
      <p className="user-name">Justice Quagraine</p>
    </div>
  );
}

export default LeftMenu;
