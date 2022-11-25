import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from "../Button/Button";
import Logo from "../../../Asssests/Images/Logo.png";
import { AuthContext } from '../../../Context/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(result => {
                toast.success('Logged Out Successfully')
            })
            .catch(error => toast.error(error))
    }

    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        {
            user?.email ?
                <li><Link to='/myorders'>My Order</Link></li>
                :
                <div className="dropdown dropdown-hover">
                    <li><Link tabIndex={0} to='/dashboard'>Dashboard</Link></li>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52">

                        <li><a>My Products</a></li>
                    </ul>
                </div>
        }
        {
            user?.displayName ?
                <p className='m-3'>{user?.displayName}</p>
                :
                <p className='m-3'>{user?.email}</p>
        }
        {
            user?.photoURL &&
            <img src={user?.photoURL} className='w-10 rounded-full' alt="" />
        }
    </>
    return (
        <div className="navbar bg-gradient-to-r from-primary to-accent text-white uppercase absolute lg:top-5 lg:max-w-[1200px] lg:left-10 lg:rounded-lg">
            <div className="navbar-start ">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gradient-to-r from-primary to-accent text-white uppercase rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-2xl font-bold"><img className='w-10' src={`${Logo}`} alt='' />Recycle<span className='text-accent'>BIN</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?
                        <Link onClick={handleLogOut} className='mr-3'><Button>Log Out</Button></Link>
                        :
                        <Link className='mr-3' to='/login'><Button>Login</Button></Link>
                }


            </div>
        </div>
    );
};

export default Navbar;