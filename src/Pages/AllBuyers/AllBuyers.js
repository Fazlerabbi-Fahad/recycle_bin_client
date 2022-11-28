import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import Banner from '../Shared/Banner/Banner';
import { FaTimes } from "react-icons/fa";
import Loader from "../../Components/Loader";

const AllBuyers = () => {
    const { user } = useContext(AuthContext)

    const { data: Buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyer'],
        queryFn: async () => {
            const res = await fetch('https://recycle-bin-furniture-server.vercel.app/users/buyer')
            const data = await res.json()
            return data
        }
    })

    const handleDelete = id => {
        fetch(`https://recycle-bin-furniture-server.vercel.app/users/${id}`, {
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

    if (isLoading) {
        return <Loader></Loader>
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
                                <tr key={buyer._id}>
                                    <th>{i + 1}</th>
                                    <td>{buyer.displayName}</td>
                                    <td>{buyer.email}</td>
                                    <td><FaTimes onClick={() => handleDelete(buyer._id)} /></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>

        </div >
    );
};

export default AllBuyers;