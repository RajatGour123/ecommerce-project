import { useEffect, useState } from 'react';
import Link from 'next/link';

const Header = ({ userName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setname] = useState("");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  let check;
   useEffect(()=>{
    console.log(localStorage.getItem("name"),"8888888888888888888888888")
    if(localStorage.getItem("name")){
        setname(JSON.parse(localStorage.getItem("name"))?.name)
    }

    // check=localStorage.getItem("name")
    // setname(check)
   },[])
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        Ecommerce
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
         
          <li className="nav-item dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" onClick={toggleDropdown}>
              Menu
            </button>
            <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}>
              <Link href="/create-customer" className="dropdown-item">
                Create Customer
              </Link>
              <Link href="/login-customer" className="dropdown-item">
                Log In Customer
              </Link>
              <Link href="/manage-products" className="dropdown-item">
                Manage Products
              </Link>
            </div>
          </li>
        </ul>
      </div>
      {name ? JSON.parse(localStorage.getItem("name"))?.customer_id && (
            <div className="nav-item">
              <span className="navbar-text mr-3">Welcome, {JSON.parse(localStorage.getItem("name"))?.name}</span>
            </div>
          ):""}
    </nav>
  );
};

export default Header;
