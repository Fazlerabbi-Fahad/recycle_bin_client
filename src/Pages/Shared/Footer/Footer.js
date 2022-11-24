import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Logo from "../../../Asssests/Images/Logo.png";
import { AuthContext } from '../../../Context/AuthProvider';

const Footer = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(result => {
                toast.success('Logged Out Successfully')
            })
            .catch(error => toast.error(error))
    }
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
                {
                    user?.email ?
                        <Link onClick={handleLogOut}>Log Out</Link>
                        :
                        <Link to='/login'>Login</Link>
                }
            </div>
        </footer>
    );
};

export default Footer;