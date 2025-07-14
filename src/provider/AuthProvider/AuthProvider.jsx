import React, { useState, useEffect, useCallback } from "react";
import app from "../../Firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  console.log(orders)

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const API_URL = import.meta.env.VITE_API_Link;


  // Create user in our backend - memoized with useCallback
  const createBackendUser = useCallback(
    async (firebaseUser) => {
      try {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || "",
          provider: firebaseUser.providerData[0]?.providerId || "email",
          phoneNumber: firebaseUser.phoneNumber || "",
        };

        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
      } catch (err) {
        console.error("Error creating backend user:", err);
        throw err;
      }
    },
    [API_URL]
  );

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Check if user exists in our database
          await axios.get(`${API_URL}/users/${currentUser.email}`);

          // Fetch user's cart if exists
          try {
            const cartResponse = await axios.get(
              `${API_URL}/cart/${currentUser.uid}`
            );
            setCart(cartResponse.data);
          } catch (cartErr) {
            console.error("Error fetching cart:", cartErr);
            setCart([]);
          }
        } catch (err) {
          if (err.response?.status === 404) {
            // User doesn't exist in our DB, create them
            await createBackendUser(currentUser);
          } else {
            console.error("Error checking user:", err);
          }
        }
      } else {
        setCart([]); // Clear cart when user logs out
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth, API_URL, createBackendUser]);

  // Auth functions
  const signUp = async ({ displayName, email, password, phoneNumber }) => {
    setLoading(true);
    setError(null);

    try {
      // First check if user exists in our backend
      try {
        await axios.get(`${API_URL}/users/${email}`);
        throw new Error("User already exists with this email");
      } catch (err) {
        if (err.response?.status !== 404) throw err;
      }

      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with display name
      await updateProfile(userCredential.user, { displayName });

      // Create user in our backend
      await createBackendUser({
        ...userCredential.user,
        displayName,
        phoneNumber,
      });

      return userCredential;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Verify user exists in our backend
      await axios.get(`${API_URL}/users/${email}`);

      return userCredential;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in our backend
      try {
        await axios.get(`${API_URL}/users/${user.email}`);
      } catch (err) {
        if (err.response?.status === 404) {
          await createBackendUser(user);
        } else {
          throw err;
        }
      }

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCart([]); // Clear cart on logout
    } finally {
      setLoading(false);
    }
  };

  // Fetch products data - memoized with useCallback
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    }
  }, [API_URL]);

  // Cart operations
  const addToCart = async (productId, quantity = 1) => {
    if (!user) throw new Error("You must be logged in to add to cart");

    try {
      const cartItem = {
        userId: user.uid, 
        userEmail: user.email,
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      };

      console.log("✅ API URL:", API_URL);
      const response = await axios.post(`${API_URL}/cart`, cartItem);
      console.log("✅ API URL:", API_URL);
      setCart((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  // Fetch user's cart - memoized with useCallback
  const fetchCart = useCallback(async () => {
    if (!user) return;

    try { 
      const response = await axios.get(`${API_URL}/cart/${user.email}`);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [API_URL, user]);




// Update cart item quantity
const updateCartItemQuantity = async (productId, newQuantity) => {
  if (!user || !user.email) {
    throw new Error("You must be logged in to update your cart");
  }
  
  if (newQuantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  try {
    // Find the current item for potential rollback
    const currentItem = cart.find(item => item.productId === productId);
    if (!currentItem) {
      throw new Error("Item not found in cart");
    }

    // Optimistic UI update
    setCart(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update backend using PATCH - note the numeric productId
    const response = await axios.patch(`${API_URL}/cart/${productId}`, {
      quantity: newQuantity,
      userEmail: user.email
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update quantity:", error);
    // Re-fetch cart to ensure sync with server
    await fetchCart();
    throw error;
  }
};


  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
  if (!cartItemId) {
    console.warn("Invalid cartItemId passed to removeFromCart");
    return;
  }

  try {
    await axios.delete(`${API_URL}/cart/${cartItemId}`);
    setCart((prev) => prev.filter((item) => item._id !== cartItemId));
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};




// Place Order
const placeOrder = async (orderData) => {
  if (!user) {
    throw new Error("You must be logged in to place an order");
  }

  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// Fetch Order data(required email)
const fetchOrders = useCallback(async (email) => {
  if (!email) throw new Error("Email is required to fetch orders");

  try {
    const response = await axios.get(`${API_URL}/orders/${email}`);
    setOrders(response.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}, [API_URL]);


  // Fetch products when the component mounts
useEffect(() => {
  fetchProducts();
  fetchOrders(user?.email);
}, [fetchProducts, fetchOrders, user?.email]);



  // Fetch cart when user changes
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  const authInfo = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    logOut,
    products,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    fetchCart,
    clearError: () => setError(null),
    placeOrder,
    orders
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
