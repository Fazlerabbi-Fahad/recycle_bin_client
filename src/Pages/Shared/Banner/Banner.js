import React from 'react';
import banner from "../../../Asssests/Images/banner.jpg";

const Banner = ({ children }) => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Banner;