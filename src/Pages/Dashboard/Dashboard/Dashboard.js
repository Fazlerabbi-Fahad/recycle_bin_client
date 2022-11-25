import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import Banner from "../../Shared/Banner/Banner";

const Dashboard = () => {
    const { user } = useContext(AuthContext)


    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Welcome to {user?.displayName}</h1>
                <p className="mb-5 text-white"></p>
            </Banner>
        </div>
    );
};

export default Dashboard;