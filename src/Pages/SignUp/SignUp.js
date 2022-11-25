import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../Shared/Banner/Banner';
import Button from '../Shared/Button/Button';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, signInWithGoogle, updateUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSignUp = data => {
        createUser(data.email, data.password)
            .then(result => {
                toast.success('Account created successfully')
                const profile = {
                    displayName: data.name,
                    role: data.role,
                    verified: false
                }

                updateUser(profile)
                    .then(result => {
                        const userInfo = {
                            displayName: data.name,
                            role: data.role,
                            verified: false,
                            email: data.email
                        }
                        addUsers(userInfo)
                    })
                    .catch(error => toast.error(error))
            })
            .catch(error => toast.error(error))
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                toast.success('Account created successfully')
                const profile = {
                    role: 'Buyer',
                    verified: false
                }
                updateUser(profile)
                    .then(result => {
                        const user = result.user;
                        const userInfo = {
                            displayName: user.displayName,
                            role: "Buyer",
                            verified: false,
                            email: user.email
                        }
                        addUsers(userInfo)
                    })
                    .catch(error => toast.error(error))
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
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Sign Up Now</h1>
                <p className="mb-5 text-white">Join with us</p>
            </Banner>
            <div className='h-[800px] flex justify-center items-center bg-neutral text-white'>
                <div className='w-96 p-7'>
                    <h1 className='text-5xl fon-bold text-center my-5'>Sign Up</h1>

                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input type='name' {...register("name", { required: "Name is required" })}
                                placeholder="Name" className="input input-bordered w-full max-w-xs text-black" />
                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                        </div>
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
                                pattern: { value: /^[A-Za-z]/, message: "Password must have uppercase" },
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                                placeholder="Password" className="input input-bordered w-full max-w-xs text-black" />
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Join as</span><br />
                            </label>
                            <select
                                {...register("role", { required: true })}
                                className="input input-bordered w-full max-w-xs text-black">
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase w-full mt-4' value='Sign Up' type="submit" />

                    </form>
                    <p>Already Have an Account? <Link className='text-secondary' to='/login' >Login</Link></p>
                    <div className="divider">OR</div>
                    <Link onClick={handleSignInWithGoogle}><Button><FaGoogle className='mr-2' />Sign Up With Google</Button></Link>

                </div>
            </div >
        </div >
    );
};

export default SignUp;