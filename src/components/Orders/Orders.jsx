import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBoxOpen, 
  FaShippingFast, 
  FaCheckCircle, 
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaCreditCard,
  FaBarcode,
  FaMoneyBillWave
} from 'react-icons/fa';
import { BsBoxSeam, BsClockHistory } from 'react-icons/bs';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';

const Orders = () => {
    const { user, orders } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <FaBoxOpen className="text-gray-400 text-5xl mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Please sign in to view your orders</h2>
                    <Link 
                        to="/login" 
                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded mt-4"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    if (!orders) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <div className="text-gray-500">Loading your orders...</div>
            </div>
        );
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status) => {
        switch(status) {
            case 'processing':
                return <BsClockHistory className="text-yellow-500" />;
            case 'shipped':
                return <FaShippingFast className="text-blue-500" />;
            case 'delivered':
                return <FaCheckCircle className="text-green-500" />;
            case 'cancelled':
                return <FaTimesCircle className="text-red-500" />;
            case 'pending':
                return <BsClockHistory className="text-yellow-500" />;
            default:
                return <BsBoxSeam className="text-gray-500" />;
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'processing':
                return 'Processing';
            case 'shipped':
                return 'Shipped';
            case 'delivered':
                return 'Delivered';
            case 'cancelled':
                return 'Cancelled';
            case 'pending':
                return 'Pending';
            default:
                return 'Order Placed';
        }
    };

    const getPaymentMethodIcon = (method) => {
        switch(method) {
            case 'bkash':
                return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Bkash</span>;
            case 'nagad':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Nagad</span>;
            case 'bank':
                return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Bank Transfer</span>;
            case 'cod':
                return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Cash on Delivery</span>;
            case 'credit-card':
                return <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">Credit Card</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Unknown</span>;
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
            
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center mr-4">
                            <FaFilter className="text-gray-500 mr-2" />
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Orders</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <FaBoxOpen className="text-gray-400 text-5xl mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h2>
                    <p className="text-gray-500 mb-4">
                        {statusFilter === 'all' 
                            ? "You haven't placed any orders yet."
                            : `You don't have any ${statusFilter} orders.`}
                    </p>
                    <Link 
                        to="/products" 
                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredOrders.map(order => (
                        <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Order Header */}
                            <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="mb-2 sm:mb-0">
                                    <div className="flex items-center">
                                        <span className="font-medium mr-4">Order #{order._id.slice(-6).toUpperCase()}</span>
                                        <div className="flex items-center">
                                            {getStatusIcon(order.status)}
                                            <span className="ml-2 text-sm">
                                                {getStatusText(order.status)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Placed on {formatDate(order.orderDate)}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium mr-2">Total:</span>
                                    <span className="font-bold">${order.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="divide-y divide-gray-200">
                                {order.products.map((product, index) => (
                                    <div key={`${order._id}-${index}`} className="px-6 py-4 flex">
                                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="font-medium">{product.name}</h3>
                                            <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                                            <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>
                                        </div>
                                        <div className="ml-4">
                                            <Link 
                                                to={`/products/${product.productId}`} 
                                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                            >
                                                View Product
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium mr-2">Payment Method:</span>
                                            {getPaymentMethodIcon(order.paymentMethod)}
                                        </div>
                                        {order.shippingInfo && (
                                            <div className="text-sm">
                                                <span className="font-medium">Shipped to: </span>
                                                <span>
                                                    {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.zipCode}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-3">
                                        <Link 
                                            to={`/orders/${order._id}`}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                                        >
                                            View Details
                                        </Link>
                                        {order.status === 'delivered' && (
                                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                                                Buy Again
                                            </button>
                                        )}
                                        {order.status === 'shipped' && (
                                            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                                                Track Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;