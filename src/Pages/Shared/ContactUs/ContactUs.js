import React from 'react';
import toast from 'react-hot-toast';
import Button from '../Button/Button';

const ContactUs = () => {

    const handleContact = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const message = form.msg.value;
        const contact = {
            name: name,
            email,
            message,
        }
        fetch('https://recycle-bin-furniture-server.vercel.app/messages', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(contact)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Message delivered')
                    form.reset();
                }

            })
    }


    return (
        <div className="hero min-h-screen bg-accent">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left text-white">
                    <h1 className="text-5xl font-bold">Contact Us!</h1>
                    <p className="py-6">You have any problem or need any help.Contact with us.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleContact} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input className='input input-primary' name='name' type="text" placeholder="name" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input className='input input-primary' name='email' type="text" placeholder="email" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Message</span>
                            </label>
                            <textarea className="textarea textarea-primary" name='msg' placeholder="Send your message"></textarea>
                        </div>

                        <div className="form-control mt-6">
                            <Button>Contact us</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;