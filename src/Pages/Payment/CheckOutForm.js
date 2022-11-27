import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckOutForm = ({ data }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transitionId, setTransitionId] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const { price, patient, email, _id } = data;



    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setPaymentError(error.message)
        }
        else {
            setPaymentError('')
        }
        setSuccess('')
        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setPaymentError(error.message);
            return
        }

        if (paymentIntent.status === 'succeeded') {


            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id,
            }

            fetch('http://localhost:5000/payments', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrats! Your payment completed')
                        setTransitionId(paymentIntent.id)
                    }
                })
        }
        setProcessing(false)


    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary btn-sm mt-5'
                type="submit"
                disabled={!stripe || processing}>
                Pay
            </button>
            <p className="text-red-500">{paymentError}</p>
            {
                success &&
                <>
                    <p className="text-green-500">{success}</p>
                    <h1 className="text-xl font-bold">Transition Id:<br />{transitionId}</h1>
                </>
            }
        </form>
    );
};


export default CheckOutForm;