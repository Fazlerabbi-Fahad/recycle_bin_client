import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import Verified from '../../Components/Verified';
import { AuthContext } from '../../Context/AuthProvider';
import Banner from '../Shared/Banner/Banner';


const AllSellers = () => {
    const { user } = useContext(AuthContext)

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/seller')
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

    const handleVerify = id => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`${user?.displayName} is now verified`)
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellers.map((seller, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{seller.displayName}
                                        {seller?.verified &&
                                            <Verified></Verified>
                                        }</td>
                                    <td>{seller.email}</td>
                                    <td>
                                        {
                                            !seller?.verified &&
                                            <button onClick={() => handleVerify(seller._id)} className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase'>Verify</button>
                                        }
                                    </td>
                                    <td><button onClick={() => handleDelete(seller._id)} className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase'>Delete</button></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AllSellers;