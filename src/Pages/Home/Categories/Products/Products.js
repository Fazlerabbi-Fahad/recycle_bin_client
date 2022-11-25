import React from 'react';

const Products = ({ product, setBook }) => {
    const { img, name, location, resalePrice, originalPrice, yearsOfUse, postedAt, sellerName } = product;
    return (
        <div className="card w-96 glass text-white">
            <figure><img className='h-[400px]' src={img} alt="car!" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Resale Price:</strong> {resalePrice}tk.</p>
                <p><strong>Original Price:</strong> {originalPrice}tk.</p>
                <p><strong>Used for:</strong> {yearsOfUse}years</p>
                <p><strong>Posted:</strong> {postedAt.slice(11, 19)};{postedAt.slice(1, 10)}</p>
                <p><strong>Seller Name:</strong> {sellerName}</p>
                <div className="card-actions justify-end">
                    <label htmlFor="recycleModal"
                        onClick={() => setBook(product)}
                        className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase'
                    >Book now!</label>
                </div>
            </div>
        </div>
    );
};

export default Products;