import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

function Navbar({ categories, clickButton, searchProduct, getProducts, logout }) {

  const [searchText, setSearchText] = useState(""); // this is the value of the search field
  const [loggedInUser, setLoggedInUser] = useState(false);
  const location = useLocation();
  const hello_style = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
  };
  useEffect(() => {

  }, []); // The empty dependency array ensures this effect runs only once on mount

  const isConnected = () => {
    if (localStorage.getItem('token') === null) {
      return (
        <li className="nav-item">
          <Link className="mx-1 btn btn-success" to='/login'>
            Login
          </Link>
        </li>
      )
    }
    else {
      return (
        <>
          <li className="nav-item">
            <Link to='/cart'>
              <BsCart4 style={{ fontSize: '2em', color: 'blue' }} />
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={() => logout()}>
              Logout
            </Link>
          </li>
        </>
      )
    }

  }
  return (
    <>
      <ul className="nav my-4 ">
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={() => { setSearchText(''); getProducts() }}>
            All Products
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id} className="nav-item">
            <Link
              to="/"
              className="nav-link"
              onClick={() => { setSearchText(''); clickButton(category.id) }}
            >
              {category.name} ({category.id})
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </li>
        <li className="nav-item">
          <Link
            to="/"
            className="mx-1 btn btn-info"
            onClick={() => searchProduct(searchText)}
          >
            Search
          </Link>
        </li>
        {isConnected()}


      </ul>
    </>
  );
}

export default Navbar;
