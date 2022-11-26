import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../Home/Categories/BookingModal/BookingModal';
import HomeProduct from "./HomeProduct";
import "./Advertise.css";

const Advertise = () => {
    const [book, setBook] = useState([]);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/allproducts')
            .then(res => res.json())
            .then(data => setCategory(data))

    }, [])



    return (
        <div className='bg-neutral p-10' >
            <div className='text-center text-white'>
                <h1 className="text-4xl font-bold">Products</h1>
                {
                    category.length === 0 ?
                        < h3 className="text-2xl font-semibold">No product to advertise</h3>
                        :
                        < h3 className="text-2xl font-semibold">{category.length} products to advertise</h3>
                }
            </div>
            <div className='overflow-hidden relative h-[700px] grid mt-10'>
                <div className='flex slider'>

                    {
                        category.map((product) => <HomeProduct
                            key={product._id}
                            product={product}
                            setBook={setBook}
                        >
                        </HomeProduct>)
                    }
                </div >
            </div>

            <div className='bg-neutral p-10 text-center'>
                <Link to='/dashboard'><button className="btn glass text-white">See All Products</button></Link>
            </div>
            {
                <BookingModal
                    book={book}
                >

                </BookingModal>
            }

        </div >
    )
};

export default Advertise;