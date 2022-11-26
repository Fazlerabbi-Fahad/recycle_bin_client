import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider';
import Banner from '../../../Shared/Banner/Banner';
import BookingModal from '../BookingModal/BookingModal';
import Products from '../Products/Products';

const Category = () => {
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState([]);
    const category = useLoaderData();
    const { setLoading } = useContext(AuthContext)


    setLoading(false)
    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Hello {user?.displayName}</h1>
                <p className="mb-5 text-white">Welcome to {user?.role || 'this'} section. Let's explore.</p>
            </Banner>
            <div className='bg-neutral p-10 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    category.map(product => <Products
                        key={product._id}
                        product={product}
                        setBook={setBook}
                    >
                    </Products>)
                }

            </div>
            <div className='bg-neutral p-10 text-center'>
                <Link to='/'><button className="btn glass text-white">Go to Homepage</button></Link>
            </div>
            {
                <BookingModal
                    book={book}
                >

                </BookingModal>
            }

        </div>
    );
};

export default Category;