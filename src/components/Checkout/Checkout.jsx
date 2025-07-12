import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaArrowLeft, FaRegCreditCard, FaBarcode, FaMoneyBillWave, FaShippingFast } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import PaymentMethod from '../PaymentMethod/PaymentMethod';

const Checkout = () => {
    const { cart, user } = useContext(AuthContext);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const { cartProducts = [], subtotal = 0, shippingFee = 0, total = 0 } = location.state || {};

    const {productDetails, productId, quantity} = cartProducts[0] || {};

    console.log(transactionId);

    console.log(cartProducts);

    // State for form inputs
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: user?.email || ''
    });
    
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [orderNotes, setOrderNotes] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Calculate order totals
    
    const tax = subtotal * 0.08; // Example 8% tax


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // On success
            setOrderSuccess(true);
            
            // In a real app, you would:
            // 1. Send order to backend
            // 2. Clear cart
            // 3. Redirect to order confirmation
            
        } catch (error) {
            console.error("Order submission failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <BsCheckCircleFill className="text-green-500 text-6xl mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        {cartProducts.map(item => (
                            <div key={item._id} className="flex justify-between py-2 border-b border-gray-200">
                                console.log(item)
                                <div className="flex items-center">
                                    <img 
                                        src={item.productDetails?.image} 
                                        alt={item.productDetails?.name} 
                                        className="w-16 h-16 object-cover rounded mr-4"
                                    />
                                    <div>
                                        <h3 className="font-medium">{item.productDetails?.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="font-medium">
                                    ${((item.productDetails?.price || 0) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>${shippingFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax:</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to="/orders" 
                            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            View Order Details
                        </Link>
                        <Link 
                            to="/products" 
                            className="px-6 py-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
            >
                <FaArrowLeft className="mr-2" /> Back to Cart
            </button>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                {/* Left Column - Shipping and Payment */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Shipping Information */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium flex items-center">
                                <HiOutlineLocationMarker className="text-indigo-500 mr-2" />
                                Shipping Information
                            </h2>
                        </div>
                        <div className="p-6">
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={shippingInfo.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={shippingInfo.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={shippingInfo.city}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                            State/Province
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={shippingInfo.state}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                            ZIP/Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            value={shippingInfo.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={shippingInfo.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={shippingInfo.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    {/* Payment Method */}
                    <PaymentMethod 
                    selectedMethod={paymentMethod}
                    onSelectMethod={setPaymentMethod}
                    onTransactionIdChange={setTransactionId}
                />
                    
                    {/* Order Notes */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium">Additional Information</h2>
                        </div>
                        <div className="p-6">
                            <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">
                                Order Notes (Optional)
                            </label>
                            <textarea
                                id="orderNotes"
                                rows="3"
                                value={orderNotes}
                                onChange={(e) => setOrderNotes(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Notes about your order, e.g. special delivery instructions"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Right Column - Order Summary */}
                <div className="lg:col-span-4 mt-6 lg:mt-0">
                    <div className="bg-white shadow-sm rounded-lg sticky top-4">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium">Order Summary</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {cartProducts.map(item => (
                                    
                                    <div key={item._id} className="flex justify-between">
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                                                <img 
                                                    src={item.productDetails?.image} 
                                                    alt={item.productDetails?.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{item.productDetails?.name}</h3>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="font-medium">
                                            ${((item.productDetails?.price || 0) * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-6 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span>${shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleSubmitOrder}
                                disabled={isProcessing}
                                className={`w-full mt-6 py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isProcessing ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <FaLock className="mr-2" /> Place Order
                                    </span>
                                )}
                            </button>
                            
                            <div className="mt-4 flex items-center text-sm text-gray-500">
                                <FaLock className="mr-2 text-gray-400" />
                                <span>Your transaction is secure and encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;