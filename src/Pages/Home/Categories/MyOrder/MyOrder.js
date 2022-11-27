import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import Banner from '../../../Shared/Banner/Banner';
import { FaTimes } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const MyOrder = () => {
    const { user, setLoading } = useContext(AuthContext)
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            const data = res.json()
            return data
        }
    })
    refetch()

    const handleOrderDelete = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Product deleted successfully")
                    setLoading(false);
                    refetch()
                }
            })
            .catch(error => toast.error(error.message))
    }


    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Hello {user?.displayName}</h1>
                <p className="mb-5 text-white"></p>
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
                            orders.map((order, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{order.product}</td>
                                    <td>{order.price}</td>
                                    <td><Link to={`/myorders/payment/${order._id}`}><button className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase'>Pay</button></Link></td>
                                    <td><FaTimes onClick={() => handleOrderDelete(order._id)} /></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default MyOrder;