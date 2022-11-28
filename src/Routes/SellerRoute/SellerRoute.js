import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSeller from '../../Hooks/useSeller';
import Loader from "../../Components/Loader";


const SellerRoute = ({ children }) => {
    const [isSeller, isSellerLoading] = useSeller();
    const location = useLocation();
    if (isSellerLoading) {
        return <Loader></Loader>
    }

    if ((isSeller)) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default SellerRoute;