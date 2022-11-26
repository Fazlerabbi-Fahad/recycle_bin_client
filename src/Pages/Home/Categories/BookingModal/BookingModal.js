import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider';

const BookingModal = ({ book }) => {
    const { register, handleSubmit } = useForm();
    const { user, setLoading } = useContext(AuthContext);
    const { name, originalPrice } = book;
    const navigate = useNavigate();

    const handleBookingSubmit = data => {
        const booking = {
            name: data.buyerName,
            email: data.buyerEmail,
            product: data.productName,
            price: data.price,
            phone: data.phone,
            meeting: data.meetingLocation
        }

        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoading(false)
                    navigate('/myorders')
                    toast.success("Product is booked")
                }
            })
            .catch(error => toast.error(error))



    }
    return (
        <div>
            <input type="checkbox" id="recycleModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box bg-secondary">
                    <label htmlFor="recycleModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className='w-full p-7 font-semibold'>
                        <h1 className='text-5xl fon-bold text-center my-5 text-white font-bold'>Book Now!</h1>

                        <form onSubmit={handleSubmit(handleBookingSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">User Name</span>
                                </label>
                                <input type='name' defaultValue={user?.displayName} readOnly
                                    {...register("buyerName", { required: true })}
                                    className="input input-bordered w-full text-black" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">User Email</span>
                                </label>
                                <input type='email' defaultValue={user?.email} readOnly
                                    {...register("buyerEmail", { required: true })}
                                    className="input input-bordered w-full  text-black" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">Product</span>
                                </label>
                                <input type='text' defaultValue={name} readOnly
                                    {...register("productName", { required: true })}
                                    className="input input-bordered w-full  text-black" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">Product Price(tk.)</span>
                                </label>
                                <input type='text' defaultValue={originalPrice} readOnly
                                    {...register("price", { required: true })}
                                    className="input input-bordered w-full  text-black" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">Your Phone Number</span>
                                </label>
                                <input type='text' {...register("phone", { required: "Phone number is required" })}
                                    placeholder="Your Phone Number" className="input input-bordered w-full  text-black" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">Meeting Location</span>
                                </label>
                                <input type='text' {...register("meetingLocation", { required: "Meeting location is required" })}
                                    placeholder="Meeting Location" className="input input-bordered w-full  text-black" />
                            </div>


                            <input className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase w-full mt-4' value='Book Now' type="submit" />
                        </form>
                    </div>
                </div >
            </div>
        </div >

    );
};

export default BookingModal;