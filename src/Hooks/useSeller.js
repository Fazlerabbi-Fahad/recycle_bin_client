import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";

const useSeller = () => {
    const { user } = useContext(AuthContext);
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    useEffect(() => {
        fetch(`https://recycle-bin-furniture-server.vercel.app/users?email=${user?.email}`)
            .then(res => res.json())

            .then(data => {
                if (data[0].role === "seller") {
                    setIsSeller(true)
                    setIsSellerLoading(false)
                }
            })
    }, [user?.email])
    return [isSeller, isSellerLoading];
}

export default useSeller;