import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiShoppingCart, FiStar } from "react-icons/fi";
import PropTypes from "prop-types";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const SingleProductPage = () => {
  const { products } = useContext(AuthContext);
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  // Find product by id from params (ensure type match)
  const product = products.find((p) => String(p.id) === String(paramId));

  // Image Gallery state for main image index
  const [mainImageIndex, setMainImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Product not found or data missing.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Destructure product data
  const {
    name,
    brand,
    category,
    images = [],
    specification = {},
    description,
    availability,
    price,
  } = product;

  // Destructure specifications with defaults
  const {
    processor = "",
    ram = "",
    ssd = "",
    display = "",
    graphic = "",
    storage = "",
    battery = "",
    utility_properties = "",
    weight = "",
    dimensions = "",
    color = "",
    condition = "",
  } = specification;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header with back button */}
      <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
            aria-label="Go back"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-medium">{name}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        {/* Product Gallery and Info */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="mb-8 lg:mb-0 flex flex-col items-center">
            {/* Main Image */}
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden p-2 sm:p-4 mb-4 flex items-center justify-center w-full"
              style={{
                maxWidth: "600px",
                width: "100%",
                height: "auto",
                minHeight: "220px",
              }}
            >
              <img
                src={images[mainImageIndex]}
                alt={name}
                className="w-full h-[220px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-contain transition-all duration-300"
                style={{ maxHeight: "500px" }}
                loading="lazy"
              />
            </div>
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-[600px]">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMainImageIndex(index)}
                  className={`bg-white rounded-md shadow-sm overflow-hidden focus:outline-none ring-2 ${
                    mainImageIndex === index
                      ? "ring-indigo-500"
                      : "ring-transparent"
                  }`}
                  tabIndex={0}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${name} view ${index + 1}`}
                    className="w-full h-14 sm:h-20 object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6 lg:mt-0">
            <div className="mb-6">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{name}</h2>
                  <p className="text-gray-500 text-sm">
                    {brand} • {category}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    availability
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {availability ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="mt-4 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">(24 reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </p>
              {condition === "used" && (
                <p className="text-sm text-gray-500 mt-1">Condition: Used</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {processor && (
                  <li className="flex items-start">
                    <span className="text-gray-900 font-medium">
                      Processor:
                    </span>
                    <span className="text-gray-600 ml-1">{processor}</span>
                  </li>
                )}
                {ram && (
                  <li className="flex items-start">
                    <span className="text-gray-900 font-medium">RAM:</span>
                    <span className="text-gray-600 ml-1">{ram}</span>
                  </li>
                )}
                {storage && (
                  <li className="flex items-start">
                    <span className="text-gray-900 font-medium">Storage:</span>
                    <span className="text-gray-600 ml-1">{storage}</span>
                  </li>
                )}
                {display && (
                  <li className="flex items-start">
                    <span className="text-gray-900 font-medium">Display:</span>
                    <span className="text-gray-600 ml-1">{display}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors duration-200">
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 px-6 rounded-lg font-medium transition-colors duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mt-8 sm:mt-12 bg-white rounded-lg shadow-md overflow-x-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Detailed Specifications
            </h3>
          </div>
          <div className="px-2 sm:px-6 py-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <tbody className="bg-white divide-y divide-gray-200">
                  {processor && (
                    <tr>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-medium text-gray-900">
                        Processor
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500">
                        {processor}
                      </td>
                    </tr>
                  )}
                  {ram && (
                    <tr>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-medium text-gray-900">
                        RAM
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500">
                        {ram}
                      </td>
                    </tr>
                  )}
                  {ssd && (
                    <tr>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-medium text-gray-900">
                        SSD
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500">
                        {ssd}
                      </td>
                    </tr>
                  )}
                  {display && (
                    <tr>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap font-medium text-gray-900">
                        Display
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500">
                        {display}
                      </td>
                    </tr>
                  )}
                  {/* Add other specifications similarly */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

SingleProductPage.propTypes = {
  state: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      specification: PropTypes.object,
      description: PropTypes.string,
      availability: PropTypes.bool,
      price: PropTypes.number.isRequired,
    }),
  }),
};

export default SingleProductPage;
