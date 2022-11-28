import React from 'react';

const Products = ({ product, setBook, i }) => {
    const { img, name, location, resalePrice, originalPrice, yearsOfUse, sellerName, advertised } = product;

    return (
        <div className='w-96 p-4'>
            <figure><img className='w-full h-[400px] object-cover object-center rounded-lg shadow-md' src={img} alt={name} /></figure>

            <div className="relative px-4 -mt-[100px]">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-baseline">
                        {advertised ?
                            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                                advertised
                            </span>
                            :
                            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                                not advertised
                            </span>

                        }
                    </div>

                    <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{name}</h4>

                    <div className="mt-1">
                        <strong>Location: </strong>{location}
                    </div>
                    <div className="mt-1">
                        <strong>Original Price: </strong>{originalPrice}
                        <span className="text-gray-600 text-sm"> tk.</span>
                    </div>
                    <div className="mt-1">
                        <strong>Used: </strong>{yearsOfUse}
                        <span className="text-gray-600 text-sm"> years</span>
                    </div>
                    <div className="mt-1">
                        <strong>Seller Name: </strong>{sellerName}
                    </div>
                    <div className="mt-4">
                        <span className="text-teal-600 text-md font-semibold"> Resale Price:<strong> {resalePrice}</strong> tk.</span>
                    </div>
                    <div className="mt-2 flex justify-end">
                        <label htmlFor="recycleModal"
                            onClick={() => setBook(product)}
                            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase">Book Now</label>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Products;