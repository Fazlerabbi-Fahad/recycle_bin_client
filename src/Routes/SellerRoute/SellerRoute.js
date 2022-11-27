import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSeller from '../../Hooks/useSeller';
import Loader from "../../Components/Loader";
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';


const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email)

    const location = useLocation();

    if (loading || isSellerLoading) {
        return <Loader></Loader>
    }

    if ((user && isSeller) || isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default SellerRoute;