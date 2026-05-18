import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/penguinPage.css';

const products = [
    { id: 1, name: 'Product 1', description: 'Description for product 1', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Description for product 2', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'Description for product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', description: 'Description for product 4', price: 49.99, image: 'https://via.placeholder.com/150' },
];

const PenguinPage = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <div className="penguin-page font-sans antialiased bg-gray-900 text-white">
            <header className="bg-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-bold">Penguin Products</h1>
                    <p className="text-gray-400">Explore our wide range of products tailored for you.</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Product List */}
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold mb-4">Products</h2>
                        <div className="product-grid">
                            {products.map((product) => (
                                <div key={product.id} onClick={() => addToCart(product)}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shopping Cart */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <p className="text-gray-400">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-gray-400">${item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-4 border-t border-gray-700 pt-4">
                            <h3 className="text-lg font-bold">Total: ${calculateTotal()}</h3>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-gray-400">© 2026 Penguin Commerce. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PenguinPage;