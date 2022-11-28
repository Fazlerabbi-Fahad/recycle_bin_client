import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button/Button';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div>
            <div className="bg-gradient-to-r from-purple-300 to-blue-200">
                <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                        <div className="border-t border-gray-200 text-center pt-8">
                            <h1 className="text-9xl font-bold text-purple-400">404</h1>
                            <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
                            <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                            <div className='flex justify-center'>
                                <Link to='/' className='mr-5'><Button>Home</Button></Link>
                                <Link to='/contact'><Button>Contact</Button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;