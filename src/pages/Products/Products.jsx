import React, { useState, useContext, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import {
  FiFilter,
  FiX,
  FiGrid,
  FiList,
  FiChevronDown,
  FiSearch,
} from 'react-icons/fi';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const Products = () => {
  const { products, loading } = useContext(AuthContext);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brand: 'all',
    category: 'all',
    minPrice: '',
    maxPrice: '',
    rating: 'all',
    sort: 'featured',
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Extract unique brands, categories, and price range when products change
  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueBrands = [
        ...new Set(products.map(product => product.brand)),
      ].sort();
      const uniqueCategories = [
        ...new Set(
          products.map(product => product.category || 'Uncategorized')
        ),
      ].sort();

      // Calculate price range
      const prices = products.map(p => p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));

      setBrands(uniqueBrands);
      setCategories(uniqueCategories);
      setPriceRange({ min: minPrice, max: maxPrice });
      setFilteredProducts(products);
    }
  }, [products]);

  // Apply filters when filters, products, or search query change
  useEffect(() => {
    if (products && products.length > 0) {
      let result = [...products];

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          product =>
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            (product.description &&
              product.description.toLowerCase().includes(query)) ||
            (product.category && product.category.toLowerCase().includes(query))
        );
      }

      // Brand filter
      if (filters.brand && filters.brand !== 'all') {
        result = result.filter(product => product.brand === filters.brand);
      }

      // Category filter
      if (filters.category && filters.category !== 'all') {
        result = result.filter(
          product => (product.category || 'Uncategorized') === filters.category
        );
      }

      // Price range filter
      if (filters.minPrice) {
        result = result.filter(
          product => product.price >= Number(filters.minPrice)
        );
      }
      if (filters.maxPrice) {
        result = result.filter(
          product => product.price <= Number(filters.maxPrice)
        );
      }

      // Rating filter
      if (filters.rating && filters.rating !== 'all') {
        const minRating = Number(filters.rating);
        result = result.filter(product => (product.rating || 0) >= minRating);
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
        case 'rating':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          result.sort(
            (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          );
          break;
        case 'featured':
        default:
          break;
      }

      setFilteredProducts(result);
    }
  }, [filters, products, searchQuery]);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      brand: 'all',
      category: 'all',
      minPrice: '',
      maxPrice: '',
      rating: 'all',
      sort: 'featured',
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.brand !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.rating !== 'all') count++;
    if (searchQuery.trim()) count++;
    return count;
  };

  const FilterSection = ({ isMobile = false }) => {
    const idPrefix = isMobile ? 'mobile-' : '';

    return (
      <div className={isMobile ? 'space-y-6' : ''}>
        {/* Search */}
        <div className={`${isMobile ? '' : 'border-b border-gray-200'} py-6`}>
          <h3 className="font-semibold text-gray-900 mb-3">Search Products</h3>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className={`${isMobile ? '' : 'border-b border-gray-200'} py-6`}>
            <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer group">
                <input
                  id={`${idPrefix}category-all`}
                  name="category"
                  type="radio"
                  checked={filters.category === 'all'}
                  onChange={() => setFilters({ ...filters, category: 'all' })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  All Categories
                </span>
              </label>
              {categories.map(category => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    id={`${idPrefix}category-${category}`}
                    name="category"
                    type="radio"
                    checked={filters.category === category}
                    onChange={() => setFilters({ ...filters, category })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Brand filter */}
        <div className={`${isMobile ? '' : 'border-b border-gray-200'} py-6`}>
          <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <label className="flex items-center cursor-pointer group">
              <input
                id={`${idPrefix}brand-all`}
                name="brand"
                type="radio"
                checked={filters.brand === 'all'}
                onChange={() => setFilters({ ...filters, brand: 'all' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                All Brands
              </span>
            </label>
            {brands.map(brand => (
              <label
                key={brand}
                className="flex items-center cursor-pointer group"
              >
                <input
                  id={`${idPrefix}brand-${brand}`}
                  name="brand"
                  type="radio"
                  checked={filters.brand === brand}
                  onChange={() => setFilters({ ...filters, brand })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price filter */}
        <div className={`${isMobile ? '' : 'border-b border-gray-200'} py-6`}>
          <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor={`${idPrefix}min-price`}
                  className="block text-xs text-gray-600 mb-1"
                >
                  Min Price
                </label>
                <input
                  type="number"
                  id={`${idPrefix}min-price`}
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder={`${priceRange.min}`}
                />
              </div>
              <div>
                <label
                  htmlFor={`${idPrefix}max-price`}
                  className="block text-xs text-gray-600 mb-1"
                >
                  Max Price
                </label>
                <input
                  type="number"
                  id={`${idPrefix}max-price`}
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder={`${priceRange.max}`}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Range: ${priceRange.min} - ${priceRange.max}
            </p>
          </div>
        </div>

        {/* Rating filter */}
        <div className={`${isMobile ? '' : 'border-b border-gray-200'} py-6`}>
          <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {['all', '4', '3', '2', '1'].map(rating => (
              <label
                key={rating}
                className="flex items-center cursor-pointer group"
              >
                <input
                  id={`${idPrefix}rating-${rating}`}
                  name="rating"
                  type="radio"
                  checked={filters.rating === rating}
                  onChange={() => setFilters({ ...filters, rating })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {rating === 'all' ? 'All Ratings' : `${rating}+ Stars`}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset button */}
        <button
          onClick={resetFilters}
          className="w-full mt-4 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
        >
          Reset All Filters
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <div className="relative w-screen max-w-md">
              <div className="flex h-full flex-col bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-white transition-colors"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <FilterSection isMobile={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">Discover our complete collection</p>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Results count and active filters */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{' '}
                products found
              </span>
              {getActiveFilterCount() > 0 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {getActiveFilterCount()} filter
                  {getActiveFilterCount() !== 1 ? 's' : ''} active
                </span>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  id="sort"
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiList className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile filter button */}
              <button
                type="button"
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FiFilter className="h-5 w-5" />
                <span className="text-sm font-medium">Filters</span>
                {getActiveFilterCount() > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Active filter tags */}
        {getActiveFilterCount() > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">
              Active filters:
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
                Search: "{searchQuery}"
                <button
                  type="button"
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  onClick={() => setSearchQuery('')}
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-medium border border-purple-200">
                Category: {filters.category}
                <button
                  type="button"
                  className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                  onClick={() => setFilters({ ...filters, category: 'all' })}
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
            {filters.brand !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-200">
                Brand: {filters.brand}
                <button
                  type="button"
                  className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                  onClick={() => setFilters({ ...filters, brand: 'all' })}
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-medium border border-orange-200">
                Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                <button
                  type="button"
                  className="hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                  onClick={() =>
                    setFilters({ ...filters, minPrice: '', maxPrice: '' })
                  }
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
            {filters.rating !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium border border-yellow-200">
                Rating: {filters.rating}+ stars
                <button
                  type="button"
                  className="hover:bg-yellow-200 rounded-full p-0.5 transition-colors"
                  onClick={() => setFilters({ ...filters, rating: 'all' })}
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
              <FilterSection />
            </div>
          </aside>

          {/* Product grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products matching your filters. Try
                    adjusting your search criteria.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
