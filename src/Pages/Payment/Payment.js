import React, { useContext } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import Loader from "../../Components/Loader";
import Banner from '../Shared/Banner/Banner';
import { AuthContext } from '../../Context/AuthProvider';


const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

const Payment = () => {
    const { user } = useContext(AuthContext)
    const data = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <Loader></Loader>
    }
    const { name, product, price, phone } = data[0];
    console.log(data);
    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Hello {user?.displayName}</h1>
                <p className="mb-5 text-white"></p>
            </Banner>

            <div className="m-20 pb-20 phone-3">
                <div>
                    <h1 className="text-2xl font-bold text-center my-5">Payment for {name}</h1>
                    <h1 className="text-2xl font-bold my-5">Please pay {price} tk. for {product} , if you want to verify call on {phone}</h1>
                </div>
                <div className='w-96'>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm data={data} />
                    </Elements>
                </div>
            </div>

        </div>
    );
};

export default Payment;