import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Banner from '../Shared/Banner/Banner';
import Button from "../Shared/Button/Button";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { logIn, signInWithGoogle, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.location?.pathname || '/';

    const handleLogin = data => {
        logIn(data.email, data.password)
            .then(result => {
                setLoading(true)
                setLoading(false)
                navigate(from, { replace: true })
                toast.success('Log In Successful')

            })
            .catch(error => toast.error(error))
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                toast.success('Account created successfully')
                const userInfo = {
                    displayName: user.displayName,
                    role: "Buyer",
                    verified: false,
                    email: user.email
                }
                addUsers(userInfo)
                toast.success('Log In Successful')
            })
            .catch(error => toast.error(error))
    }
    const addUsers = profile => {
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('User added successfully')
                    navigate('/')
                }
            })
            .catch(error => toast.error(error))
    }

    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Login Now</h1>
                <p className="mb-5 text-white">Start Now</p>
            </Banner>
            <div className='h-[600px] flex justify-center items-center bg-neutral text-white'>
                <div className='w-96 p-7'>
                    <h1 className='text-5xl fon-bold text-center my-5'>Login</h1>

                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type='email' {...register("email", { required: "Email Address is required" })}
                                placeholder="Email" className="input input-bordered w-full max-w-xs text-black" />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Password</span><br />
                            </label>
                            <input type='password' {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                                placeholder="Password" className="input input-bordered w-full max-w-xs text-black" />
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                            <label className="label">
                                <span className="label-text text-white">Forget Password</span><br />
                            </label>
                        </div>
                        <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase w-full mt-2' value='Login' type="submit" />

                    </form>
                    <p>New to RecycleBIN? <Link className='text-secondary' to='/signup' >Create New Account</Link></p>
                    <div className="divider">OR</div>
                    <Link onClick={handleSignInWithGoogle}><Button><FaGoogle className='mr-2' />Sign Up With Google</Button></Link>
                </div>
            </div >
        </div>
    );
};

export default Login;