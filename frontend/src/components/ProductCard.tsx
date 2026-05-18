import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-500 font-semibold mt-2">${product.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">Add to Cart</button>
        </div>
    );
};

export default ProductCard;
