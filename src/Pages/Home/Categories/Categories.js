import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const { setLoading } = useContext(AuthContext)

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
        setLoading(false)
    }, [])
    return (
        <div className="bg-accent p-10">
            <div className='text-center text-white'>
                <h1 className="text-4xl font-bold">Categories</h1>
                <h3 className="text-2xl font-semibold">All the categories we can find here</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 '>
                {
                    categories.map(category =>
                        <Link to={`/categories/${category._id}`}>
                            <div className="card lg:w-96 h-[500px] image-full hover:w-150 hover:h-[530px]">
                                <figure><img src={category.img} alt={category.name} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl font-bold text-white">{category.name}</h2>
                                    <p className='text-white'>{category.types}. you can find here. This is trustworthy and affordable.We will always help you. Want to see the products? <strong className='text-xl'>Just click anywhere in this box.</strong> </p>
                                </div>
                            </div>
                        </Link>)
                }
            </div>
        </div>
    );
};

export default Categories;