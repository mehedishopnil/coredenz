import React from "react";

const ProductCard = ({ product }) => {
  // Destructure the product props
  const { id, name, price, images } = product;
  
  // Get the first image as main image and second as hover (if available)
  const mainImage = images?.[0] || '';
  const hoverImage = images?.[1] || images?.[0] || ''; // Fallback to main image if no hover image

  return (
    <div className="card w-72 bg-base-100 border m-2">
      <div>
        <figure className="relative">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-0"
        />
        <img
          src={hoverImage}
          alt={`${name} Hover`}
          className="w-full h-48 object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        />
      </figure>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p className="text-lg font-semibold text-primary">${price}</p>
        <div className="card-actions">
          <button className="btn btn-primary">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;