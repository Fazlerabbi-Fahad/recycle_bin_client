import React from 'react';
import Banner from '../Shared/Banner/Banner';
import ContactUs from '../Shared/ContactUs/ContactUs';

const Contact = () => {
    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Contact Us</h1>
                <p className="mb-5 text-white">Want to know about us?</p>
            </Banner>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Contact;