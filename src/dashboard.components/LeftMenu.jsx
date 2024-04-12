import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function LeftMenu(props) {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="left-menu">
      <h1 className="app-name">SSB Dashboard</h1>
      <div className="left-menu-items">
        <Link
          to="/Home"
          style={{
            textDecoration: activeLink === '/Home' ? 'underline' : 'none',
          }}
          className="link-style"
          onClick={() => handleLinkClick('/Home')}
        >
          <p>
            <img src="../images/home.png" alt="Home"></img>Home
          </p>
        </Link>

        <Link
          to="/Customers"
          style={{
            textDecoration: activeLink === '/Customers' ? 'underline' : 'none',
          }}
          className="link-style"
          onClick={() => handleLinkClick('/Customers')}
        >
          <p>
            <img src="../images/customers.png" alt="Customers"></img>Customers
          </p>
        </Link>

        <Link
          to="/Inventory"
          style={{
            textDecoration: activeLink === '/Inventory' ? 'underline' : 'none',
          }}
          className="link-style"
          onClick={() => handleLinkClick('/Inventory')}
        >
          <p>
            <img src="../images/inventory.png" alt="Inventory"></img>Inventory
          </p>
        </Link>

        <Link
          to="/Sales"
          style={{
            textDecoration: activeLink === '/Sales' ? 'underline' : 'none',
          }}
          className="link-style"
          onClick={() => handleLinkClick('/Sales')}
        >
          <p>
            <img src="../images/sales.png" alt="Sales"></img>Sales
          </p>
        </Link>
      </div>
      <p className="user-name">{props.user_name}</p>
    </div>
  );
}

LeftMenu.propTypes = {
  user_name: PropTypes.string.isRequired,
};

export default LeftMenu;
