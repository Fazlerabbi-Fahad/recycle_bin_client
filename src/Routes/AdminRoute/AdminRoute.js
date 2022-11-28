import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import Loader from "../../Components/Loader";


const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();



    if (isAdminLoading) {
        return <Loader></Loader>
    }

    if (isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default AdminRoute;