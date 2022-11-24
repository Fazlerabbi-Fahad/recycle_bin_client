import React from 'react';
import Button from '../Button/Button';

const ContactUs = () => {

    return (
        <div className="hero min-h-screen bg-accent">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left text-white">
                    <h1 className="text-5xl font-bold">Contact Us!</h1>
                    <p className="py-6">You have any problem or need any help.Contact with us.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input className='input input-primary' type="text" placeholder="name" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input className='input input-primary' type="text" placeholder="email" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Message</span>
                            </label>
                            <textarea className="textarea textarea-primary" placeholder="Send your message"></textarea>
                        </div>

                        <div className="form-control mt-6">
                            <Button>Contact us</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;