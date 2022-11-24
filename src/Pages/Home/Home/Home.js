import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../Shared/Banner/Banner';
import ContactUs from '../../Shared/ContactUs/ContactUs';
import Categories from '../Categories/Categories';

const Home = () => {
    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Welcome to ReycleBIN</h1>
                <p className="mb-5 text-white">You can buy or sell used products with affordable price. Start working with us. Just click on the <Link to='/login' className="text-accent">login</Link> button. </p>
            </Banner>
            <div>
                <Categories></Categories>
            </div>
            <div>Advertise</div>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;