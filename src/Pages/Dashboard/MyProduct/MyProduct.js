import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import Banner from '../../Shared/Banner/Banner';
import { FaTimes } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';

const MyProduct = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/products?email=${user?.email}`
    const { data: products = [], refetch } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    })

    const handleDelete = id => {
        fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Product deleted successfully")
                    refetch()
                }
            })
            .catch(error => toast.error(error.message))
    }

    const handleAdvertised = id => {
        fetch(`http://localhost:5000/allproducts/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('See in the homepage')
                    refetch()
                }
            })
    }

    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Hello {user?.displayName}</h1>
                <p className="mb-5 text-white">Welcome to {user?.role || 'this'} section. Let's explore.</p>
            </Banner>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.resalePrice}</td>
                                    <td>
                                        {
                                            !product.advertised &&
                                            <button onClick={() => handleAdvertised(product._id)} className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase'>Advertise</button>
                                        }
                                    </td>
                                    <td><FaTimes onClick={() => handleDelete(product._id)} /></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyProduct;