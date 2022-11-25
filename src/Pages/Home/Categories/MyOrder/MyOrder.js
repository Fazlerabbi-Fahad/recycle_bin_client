import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import Banner from '../../../Shared/Banner/Banner';
import Button from '../../../Shared/Button/Button';

const MyOrder = () => {
    const { user } = useContext(AuthContext)
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/bookings')
            const data = res.json()
            return data
        }
    })
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
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map((order, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{order.product}</td>
                                    <td>{order.price}</td>
                                    <td><Button>Pay</Button></td>
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