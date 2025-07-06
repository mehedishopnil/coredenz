// ...other imports
import React, { useState, useContext, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const Products = () => {
    const { products, loading } = useContext(AuthContext);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState({
        brand: 'all',
        minPrice: '',
        maxPrice: '',
        sort: 'featured'
    });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [brands, setBrands] = useState([]);

    // Extract unique brands when products change
    useEffect(() => {
        if (products && products.length > 0) {
            const uniqueBrands = [...new Set(products.map(product => product.brand))];
            setBrands(uniqueBrands);
            setFilteredProducts(products);
        }
    }, [products]);

    // Apply filters when filters or products change
    useEffect(() => {
        if (products && products.length > 0) {
            let result = [...products];

            // Brand filter
            if (filters.brand && filters.brand !== 'all') {
                result = result.filter(product => product.brand === filters.brand);
            }

            // Price range filter
            if (filters.minPrice) {
                result = result.filter(product => product.price >= Number(filters.minPrice));
            }
            if (filters.maxPrice) {
                result = result.filter(product => product.price <= Number(filters.maxPrice));
            }

            // Sorting
            switch (filters.sort) {
                case 'price-low':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    result.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'featured':
                default:
                    // Default sorting
                    break;
            }

            setFilteredProducts(result);
        }
    }, [filters, products]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const resetFilters = () => {
        setFilters({
            brand: 'all',
            minPrice: '',
            maxPrice: '',
            sort: 'featured'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile filter dialog */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
                    <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button
                                type="button"
                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                <FiX className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Mobile Filters */}
                        <div className="mt-4 border-t border-gray-200 px-4 py-6">
                            {/* Brand filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900">Brand</h3>
                                <div className="mt-2 space-y-3">
                                    <div className="flex items-center">
                                        <input
                                            id="mobile-brand-all"
                                            name="brand"
                                            type="radio"
                                            checked={filters.brand === 'all'}
                                            onChange={() => setFilters({ ...filters, brand: 'all' })}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="mobile-brand-all" className="ml-3 text-sm text-gray-700">
                                            All
                                        </label>
                                    </div>
                                    {brands.map((brand) => (
                                        <div key={brand} className="flex items-center">
                                            <input
                                                id={`mobile-brand-${brand}`}
                                                name="brand"
                                                type="radio"
                                                checked={filters.brand === brand}
                                                onChange={() => setFilters({ ...filters, brand })}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`mobile-brand-${brand}`} className="ml-3 text-sm text-gray-700">
                                                {brand}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900">Price</h3>
                                <div className="mt-2 grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="mobile-min-price" className="block text-sm text-gray-700 mb-1">
                                            Min
                                        </label>
                                        <input
                                            type="number"
                                            id="mobile-min-price"
                                            name="minPrice"
                                            value={filters.minPrice}
                                            onChange={handleFilterChange}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile-max-price" className="block text-sm text-gray-700 mb-1">
                                            Max
                                        </label>
                                        <input
                                            type="number"
                                            id="mobile-max-price"
                                            name="maxPrice"
                                            value={filters.maxPrice}
                                            onChange={handleFilterChange}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="1000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sort filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900">Sort By</h3>
                                <select
                                    id="mobile-sort"
                                    name="sort"
                                    value={filters.sort}
                                    onChange={handleFilterChange}
                                    className="mt-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                </select>
                            </div>

                            <button
                                onClick={resetFilters}
                                className="mt-4 w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Products</h1>

                    <div className="flex items-center">
                        {/* Mobile filter button */}
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <FiFilter className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Desktop Filters */}
                        <div className="hidden lg:block">
                            <div className="border-b border-gray-200 py-6">
                                <h3 className="font-medium text-gray-900">Brand</h3>
                                <div className="mt-2 space-y-3">
                                    <div className="flex items-center">
                                        <input
                                            id="brand-all"
                                            name="brand"
                                            type="radio"
                                            checked={filters.brand === 'all'}
                                            onChange={() => setFilters({ ...filters, brand: 'all' })}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="brand-all" className="ml-3 text-sm text-gray-700">
                                            All
                                        </label>
                                    </div>
                                    {brands.map((brand) => (
                                        <div key={brand} className="flex items-center">
                                            <input
                                                id={`brand-${brand}`}
                                                name="brand"
                                                type="radio"
                                                checked={filters.brand === brand}
                                                onChange={() => setFilters({ ...filters, brand })}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-gray-700">
                                                {brand}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-b border-gray-200 py-6">
                                <h3 className="font-medium text-gray-900">Price</h3>
                                <div className="mt-2 grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="min-price" className="block text-sm text-gray-700 mb-1">
                                            Min
                                        </label>
                                        <input
                                            type="number"
                                            id="min-price"
                                            name="minPrice"
                                            value={filters.minPrice}
                                            onChange={handleFilterChange}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="max-price" className="block text-sm text-gray-700 mb-1">
                                            Max
                                        </label>
                                        <input
                                            type="number"
                                            id="max-price"
                                            name="maxPrice"
                                            value={filters.maxPrice}
                                            onChange={handleFilterChange}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="1000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-200 py-6">
                                <h3 className="font-medium text-gray-900">Sort By</h3>
                                <select
                                    id="sort"
                                    name="sort"
                                    value={filters.sort}
                                    onChange={handleFilterChange}
                                    className="mt-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                </select>
                            </div>

                            <button
                                onClick={resetFilters}
                                className="mt-4 w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                Reset Filters
                            </button>
                        </div>

                        {/* Product grid */}
                        <div className="lg:col-span-3">
                            {/* Active filters */}
                            <div className="mb-6 flex flex-wrap items-center gap-2">
                                {filters.brand && filters.brand !== 'all' && (
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                                        Brand: {filters.brand}
                                        <button
                                            type="button"
                                            className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                            onClick={() => setFilters({ ...filters, brand: 'all' })}
                                        >
                                            <FiX className="h-2 w-2" />
                                        </button>
                                    </span>
                                )}
                                {(filters.minPrice || filters.maxPrice) && (
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                                        Price: {filters.minPrice || '0'} - {filters.maxPrice || '∞'}
                                        <button
                                            type="button"
                                            className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                            onClick={() => setFilters({ ...filters, minPrice: '', maxPrice: '' })}
                                        >
                                            <FiX className="h-2 w-2" />
                                        </button>
                                    </span>
                                )}
                            </div>

                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No products match your filters.</p>
                                    <button
                                        onClick={resetFilters}
                                        className="mt-4 text-blue-600 hover:text-blue-800"
                                    >
                                        Reset filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {filteredProducts.map((product) => (
                    
                        <ProductCard key={product.id}  product={product} />
                   
                ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Products;