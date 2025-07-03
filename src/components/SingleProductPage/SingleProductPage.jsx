import React from 'react';

const SingleProductPage = () => {
    return (
        <div>
            <h1>Product Name</h1>
            <img src="product-image.jpg" alt="Product Name" />
            <p>Product Description</p>
            <p>Price: $XX.XX</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default SingleProductPage;