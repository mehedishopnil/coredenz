import { useContext } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const Home = () => {
  const { products, loading, error } = useContext(AuthContext);
  
  // Extract unique categories from products
  const categories = [...new Set(products?.map(product => product.category) || [])];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <section className="w-full h-[350px] md:h-[350px] lg:h-[450px]
       bg-gradient-to-r from-blue-600 to-indigo-700 text-white 
        py-16 px-4">
        <div className="mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className=" mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Featured Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse products by category to find exactly what you need
          </p>
        </div>

        {/* Centered categories grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-4xl">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer text-center flex flex-col items-center"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <span className="text-blue-600 text-2xl">🛍️</span>
                </div>
                <h3 className="font-semibold text-gray-700">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-6xl mx-auto py-8 px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Top Selling Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular products this season
          </p>
        </div>
        
        {!products || products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No products available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;