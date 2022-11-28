import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../Context/AuthProvider';

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        fetch(`https://recycle-bin-furniture-server.vercel.app/users?email=${user?.email}`)
            .then(res => res.json())

            .then(data => {
                if (data[0].role === "admin") {
                    setIsAdmin(true)
                    setIsAdminLoading(false)
                }
            })
    }, [user?.email])
    return [isAdmin, isAdminLoading];
}

export default useAdmin;