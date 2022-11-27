import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState('');
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setIsAdmin(data.isAdmin)
                        setIsAdminLoading(false)

                    }

                })
        }
    }, [email])
    return [isAdmin, isAdminLoading];
}

export default useAdmin;