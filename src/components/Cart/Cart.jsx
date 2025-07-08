import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import { FaPlus, FaMinus, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, addToCart } = useContext(AuthContext);
    console.log(cart)

    const handleIncrease = (productId) => {
        addToCart(productId, 1); // add 1 more
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            // Create manual decrease
            const updatedItem = { ...item, quantity: -1 };
            addToCart(item.productId, -1);
        } else {
            removeFromCart(item._id);
        }
    };

    const totalAmount = cart.reduce(
        (total, item) => total + (item.productDetails?.price || 0) * item.quantity,
        0
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

            {cart.length === 0 ? (
                <p className="text-gray-600 text-center">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md p-4 rounded-lg"
                        >
                            <div className="flex items-center space-x-4 w-full md:w-2/3">
                                <img
                                    src={item.productDetails?.image || 'https://via.placeholder.com/100'}
                                    alt={item.productDetails?.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <h3 className="text-lg font-medium">{item.productDetails?.name}</h3>
                                    <p className="text-gray-500">৳ {item.productDetails?.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 mt-4 md:mt-0">
                                <button
                                    onClick={() => handleDecrease(item)}
                                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                                >
                                    <FaMinus />
                                </button>
                                <span className="text-lg font-semibold">{item.quantity}</span>
                                <button
                                    onClick={() => handleIncrease(item.productId)}
                                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                                >
                                    <FaPlus />
                                </button>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 hover:text-red-700 ml-3"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Checkout Section */}
                    <div className="text-right mt-8 border-t pt-6">
                        <h4 className="text-xl font-semibold mb-4">
                            Total: <span className="text-blue-600">৳ {totalAmount}</span>
                        </h4>
                        <Link
                            to="/checkout"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FaCheckCircle className="mr-2" /> Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
