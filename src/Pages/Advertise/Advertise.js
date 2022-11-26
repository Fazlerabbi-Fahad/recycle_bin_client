import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import BookingModal from '../Home/Categories/BookingModal/BookingModal';
import Products from '../Home/Categories/Products/Products';

const Advertise = () => {



    return (
        <div className='bg-neutral p-10'>
            <div className='text-center text-white'>
                <h1 className="text-4xl font-bold">Categories</h1>
                <h3 className="text-2xl font-semibold">Products we can be found here</h3>
            </div>
            {

            }

        </div>
    )
};

export default Advertise;