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
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <section className="w-full bg-blue-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer text-center"
            >
              <div className="text-2xl mb-2">🛍️</div>
              <h3 className="font-semibold text-gray-700">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-6xl mx-auto py-8 px-4 pb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Top Selling Products
        </h2>
        {!products || products.length === 0 ? (
          <p className="text-center">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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