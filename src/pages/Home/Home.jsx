import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import { BsFillLaptopFill } from "react-icons/bs";
import { MdDevicesOther } from "react-icons/md";
import coverImg from "../../assets/images/CoreDenz-facebook-banner.jpg";

const Home = () => {
  const { products, loading, error } = useContext(AuthContext);

  // Category data with name and corresponding icon
  const Categories = [
    {
      name: 'Laptop',
      icon: <BsFillLaptopFill className="text-3xl" />
    },
    {
      name: 'Gadgets',
      icon: <MdDevicesOther className="text-3xl" />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <section className="relative w-full h-[300px] md:h-[300px] lg:h-[350px] bg-[#040144] text-white py-16 px-4">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat h-full"
          style={{
            backgroundImage: `url(${coverImg})`,
          }}
        />
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Featured Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse products by category to find exactly what you need
          </p>
        </div>

        {/* Categories Grid - Responsive and centered */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl">
            {Categories.map((category, index) => (
              <Link
                key={index}
                to={`/single-category/${category.name.toLowerCase()}`}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer hover:bg-gray-50"
                aria-label={`Browse ${category.name} category`}
              >
                <div className="mb-3 text-blue-600">{category.icon}</div>
                <h3 className="font-medium text-gray-800">{category.name}</h3>
              </Link>
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-red-500">Error loading products: {error}</p>
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No products available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;