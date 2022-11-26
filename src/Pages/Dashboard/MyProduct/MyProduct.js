import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import Banner from '../../Shared/Banner/Banner';

const MyProduct = () => {
    const { user, setLoading } = useContext(AuthContext);

    const url = `http://localhost:5000/products?email=${user?.email}`;

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
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
                    refetch();
                    setLoading(false);
                }
            })
            .catch(error => toast.error(error.message))
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
                                    <td><button onClick={() => handleDelete(product._id)} className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase'>Delete</button></td>
                                    <td>

                                    </td>
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