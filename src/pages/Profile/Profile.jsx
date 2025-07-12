import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaEdit,
  FaHistory,
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { BsCreditCard } from 'react-icons/bs';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';

const Profile = () => {
    const { user, orders } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        // Add your profile update logic here
        setIsEditing(false);
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'processing': return <FaBoxOpen className="text-yellow-500" />;
            case 'shipped': return <FaShippingFast className="text-blue-500" />;
            case 'delivered': return <FaCheckCircle className="text-green-500" />;
            case 'cancelled': return <FaTimesCircle className="text-red-500" />;
            default: return <FaBoxOpen className="text-gray-500" />;
        }
    };

    const recentOrders = orders?.slice(0, 3) || [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit sticky top-4">
                    <div className="text-center mb-6">
                        <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                            {/* here should user img */}
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="User" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <FaUser className="text-indigo-500 text-3xl" />
                            )}
                        </div>
                        <h2 className="text-xl font-bold">{user?.displayName || 'User'}</h2>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                    </div>
                    
                    <nav className="space-y-1">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <FaUser className="mr-3" />
                            Profile Information
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <FaHistory className="mr-3" />
                            Order History
                        </button>
                        <button
                            onClick={() => setActiveTab('payment')}
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center ${activeTab === 'payment' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <BsCreditCard className="mr-3" />
                            Payment Methods
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Profile Information</h2>
                                {!isEditing && (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center text-indigo-600 hover:text-indigo-800"
                                    >
                                        <FaEdit className="mr-2" /> Edit Profile
                                    </button>
                                )}
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleSaveProfile}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="flex space-x-3 pt-2">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <FaUser className="text-gray-400 mr-4" />
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-medium">{formData.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FaEnvelope className="text-gray-400 mr-4" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{formData.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FaPhone className="text-gray-400 mr-4" />
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium">{formData.phone || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="text-gray-400 mr-4" />
                                        <div>
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p className="font-medium">{formData.address || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6">Order History</h2>
                            
                            {recentOrders.length > 0 ? (
                                <div className="space-y-6">
                                    {recentOrders.map(order => (
                                        <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <h3 className="font-medium">Order #{order._id.slice(-6).toUpperCase()}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(order.orderDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center">
                                                    {getStatusIcon(order.status)}
                                                    <span className="ml-2 text-sm capitalize">{order.status}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-3 mb-3">
                                                {order.products.slice(0, 2).map((product, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                                                            <img 
                                                                src={product.image} 
                                                                alt={product.name} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-sm">{product.name}</p>
                                                            <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
                                                        </div>
                                                        <p className="font-medium">${product.price.toFixed(2)}</p>
                                                    </div>
                                                ))}
                                                {order.products.length > 2 && (
                                                    <p className="text-sm text-gray-500">
                                                        +{order.products.length - 2} more items
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                                <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
                                                <Link 
                                                    to={`/orders/${order._id}`}
                                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="text-center mt-6">
                                        <Link
                                            to="/orders"
                                            className="inline-block px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            View All Orders
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <FaBoxOpen className="text-gray-400 text-5xl mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-700">No orders yet</h3>
                                    <p className="text-gray-500 mb-4">You haven't placed any orders</p>
                                    <Link
                                        to="/products"
                                        className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'payment' && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
                            
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
                                                <FaPhone className="text-blue-500" />
                                            </div>
                                            <h3 className="font-medium">Bkash</h3>
                                        </div>
                                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Default</span>
                                    </div>
                                    <p className="text-sm text-gray-500 ml-11">Phone: 01316265634</p>
                                </div>
                                
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <div className="bg-green-100 text-green-800 p-2 rounded-full mr-3">
                                            <FaPhone className="text-green-500" />
                                        </div>
                                        <h3 className="font-medium">Nagad</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 ml-11">Phone: 01316265634</p>
                                </div>
                                
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">
                                            <FaUniversity className="text-purple-500" />
                                        </div>
                                        <h3 className="font-medium">Bank Transfer</h3>
                                    </div>
                                    <div className="ml-11 space-y-1 text-sm">
                                        <p className="text-gray-500">Islami Bank Bangladesh Ltd</p>
                                        <p className="text-gray-500">A/C: 20501860203869010</p>
                                        <p className="text-gray-500">Branch: Kaliganj, Satkhira</p>
                                    </div>
                                </div>
                                
                                <button className="w-full mt-4 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500">
                                    + Add Payment Method
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;