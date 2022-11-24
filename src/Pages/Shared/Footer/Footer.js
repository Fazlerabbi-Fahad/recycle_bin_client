import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../../Asssests/Images/Logo.png";

const Footer = () => {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
            <div className="items-center lg:grid-flow-col">
                <Link className="btn btn-ghost normal-case text-2xl font-bold"><img className='w-10' src={`${Logo}`} alt='' />Recycle<span className='text-accent'>BIN</span></Link>
                <p>Copyright © 2022 - All right reserved</p>
            </div>
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <Link to='/'>Home</Link>
                <Link to='/blog'>Blog</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/login'>Login</Link>
            </div>
        </footer>
    );
};

export default Footer;