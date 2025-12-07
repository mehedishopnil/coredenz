import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import { FaArrowLeft } from 'react-icons/fa';
import Loading from '../Loading/Loading';

const SingleCategory = () => {
    const { category } = useParams(); // Get slug like "laptop" or "gadgets"
    const { products, loading } = useContext(AuthContext);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (products && category) {
            const normalizedCategory = category.toLowerCase().trim();
            const filtered = products.filter(product => {
                const productCategory = product.category?.toLowerCase().trim();
                return productCategory === normalizedCategory;
            });
            setFilteredProducts(filtered);
        }
    }, [products, category]);

    if (loading) {
        return <Loading />;
    }

    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Category Header */}
            <div className="mb-8">
                <Link 
                    to="/" 
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>
                
                <h1 className="text-3xl font-bold capitalize text-gray-800">
                    {formattedCategory} Products
                </h1>
                <p className="text-gray-600 mt-2">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id || product._id} 
                            product={product} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">
                        No products found in the "{formattedCategory}" category.
                    </p>
                    <Link 
                        to="/" 
                        className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SingleCategory;
