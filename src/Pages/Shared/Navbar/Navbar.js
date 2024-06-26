import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../../../Asssests/Images/Logo.png";
import { AuthContext } from "../../../Context/AuthProvider";
import toast from "react-hot-toast";
import Userphoto from "../../../Asssests/Images/Userphoto.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://recycle-bin-furniture-server.vercel.app/users?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [user?.email]);

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        toast.success("Logged Out Successfully");
      })
      .catch((error) => toast.error(error.message));
  };

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      {user?.email && data[0]?.role === "admin" ? (
        <div className="dropdown dropdown-hover">
          <li>
            <Link tabIndex={0} to="/dashboard">
              Dashboard
            </Link>
          </li>
          <ul
            tabIndex={0}
            className="menu menu-compact lg:dropdown-content menu p-2 shadow rounded-box w-52 bg-secondary"
          >
            <li>
              <Link to="/allsellers">All Sellers</Link>
            </li>
            <li>
              <Link to="/allbuyers">All Buyers</Link>
            </li>
          </ul>
        </div>
      ) : user?.email && data[0]?.role === "seller" ? (
        <div className="dropdown dropdown-hover">
          <li>
            <Link tabIndex={0} to="/dashboard">
              Dashboard
            </Link>
          </li>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow rounded-box w-52 bg-secondary"
          >
            <li>
              <Link to="/addproduct">Add Product</Link>
            </li>
            <li>
              <Link to="/myproducts">My Products</Link>
            </li>
          </ul>
        </div>
      ) : user?.email && data[0]?.role === "buyer" ? (
        <div className="dropdown dropdown-hover">
          <li>
            <Link tabIndex={0} to="/dashboard">
              Dashboard
            </Link>
          </li>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow rounded-box w-52 bg-secondary"
          >
            <li>
              <Link to="/myorders">My Orders</Link>
            </li>
          </ul>
        </div>
      ) : (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}

      {user?.displayName && <p className="m-3">{user?.displayName}</p>}

      {user?.photoURL ? (
        <img src={user?.photoURL} className="w-10 rounded-full" alt="" />
      ) : (
        <img src={Userphoto} className="w-10 rounded-full" alt="" />
      )}
    </>
  );
  return (
    <div className="navbar text-white uppercase absolute bg-transparent">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gradient-to-r from-primary to-accent text-white uppercase rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-2xl font-bold">
          <img className="w-10" src={`${Logo}`} alt="" />
          Recycle<span className="text-accent">BIN</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <Link onClick={handleLogOut} className="mr-3">
            <Button>Log Out</Button>
          </Link>
        ) : (
          <Link className="mr-3" to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
