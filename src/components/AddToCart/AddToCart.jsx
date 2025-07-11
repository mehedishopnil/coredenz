import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const AddToCart = ({ product }) => {
  const { user, addToCart } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddToCart = async () => {
    if (!product?.id) return toast.error("Invalid product!");

    setIsProcessing(true);

    try {
      if (user?.email) {
        if (typeof addToCart === "function") {
          await addToCart(product.id, 1);
          toast.success("Added to cart!");
        } else {
          toast.error("Add to cart function is not available.");
        }
      } else {
        // Guest cart in localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const existingIndex = guestCart.findIndex(item => item.id === product.id);

        if (existingIndex >= 0) {
          guestCart[existingIndex].quantity += 1;
        } else {
          guestCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product?.images?.[0] || "",
            quantity: 1
          });
        }

        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast.success("Added to cart!");
      }
    } catch (error) {
      console.error("Add to cart failed", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isProcessing}
      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 disabled:opacity-60"
    >
      <FaShoppingCart className="mr-2" />
      {isProcessing ? "Adding..." : "Add to Cart"}
    </button>
  );
};

AddToCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default AddToCart;
