import React from 'react';
import Banner from '../Shared/Banner/Banner';

const Blog = () => {
    return (
        <div>
            <Banner>
                <h1 className="mb-5 text-5xl font-bold text-white uppercase">Blog</h1>
                <p className="mb-5 text-white">Learn and Fly</p>
            </Banner>
            <div className='bg-neutral'>
                <ul>
                    <li>
                        <h3 className='text-xl font-bold text-white'></h3>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Blog;