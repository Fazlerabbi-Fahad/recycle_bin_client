import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../Shared/Banner/Banner';
import Button from '../../Shared/Button/Button';
import ContactUs from '../../Shared/ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Welcome to ReycleBIN</h1>
                <p className="mb-5 text-white">You can buy or sell used products with affordable price. Start working with us. Just click on the button below. </p>
                <Link><Button>Want to join</Button></Link>
            </Banner>
            <div>Categories</div>
            <div>Advertise</div>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;