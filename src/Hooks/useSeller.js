import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setIsSeller] = useState('');
    const [isSellerLoading, setIsSellerLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.role === "seller") {
                        setIsSeller(data.role)
                        setIsSellerLoading(false)

                    }

                })
        }
    }, [email])
    return [isSeller, isSellerLoading];
}

export default useSeller;