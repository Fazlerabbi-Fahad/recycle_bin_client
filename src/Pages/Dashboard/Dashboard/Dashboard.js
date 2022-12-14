import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import BookingModal from '../../Home/Categories/BookingModal/BookingModal';
import Products from '../../Home/Categories/Products/Products';
import Banner from "../../Shared/Banner/Banner";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState([]);
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);


    useEffect(() => {
        fetch(`https://recycle-bin-furniture-server.vercel.app/dashboardProducts?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setCategory(data.products)
            })
    }, [page, size])
    const pages = Math.ceil(count / size);

    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Hello {user?.displayName}</h1>
                <p className="mb-5 text-white"></p>
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
                <div className="btn-group text-center">
                    {
                        [...Array(pages).keys()].map(number => <button
                            key={number}
                            className={page === number ? 'btn btn-xs btn-active' : 'btn btn-xs'}
                            onClick={() => setPage(number)}
                        >
                            {number + 1}
                        </button>)
                    }
                </div>
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

export default Dashboard;