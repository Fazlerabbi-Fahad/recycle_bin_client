import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import Banner from '../Shared/Banner/Banner';

const AllBuyers = () => {
    const { user } = useContext(AuthContext)

    const { data: Buyers = [], refetch } = useQuery({
        queryKey: ['buyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users?role=Buyer')
            const data = await res.json()
            return data
        }
    })

    const handleDelete = id => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("User deleted successfully")
                    refetch();
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Buyers.map((buyer, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{buyer.displayName}</td>
                                    <td>{buyer.email}</td>
                                    <td><button onClick={() => handleDelete(buyer._id)} className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase'>Delete</button></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AllBuyers;