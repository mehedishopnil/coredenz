import React, { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { signUp, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const showSuccessAlert = (message) => {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'Continue',
            confirmButtonColor: '#4f46e5',
            background: '#1f2937',
            color: 'white'
        });
    };

    const showErrorAlert = (message) => {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#dc2626',
            background: '#1f2937',
            color: 'white'
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Full name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (form.phone && !/^[0-9]{10,15}$/.test(form.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            await signUp({
                displayName: form.name,
                email: form.email,
                password: form.password,
                phoneNumber: form.phone
            });
            showSuccessAlert('Account created successfully!');
            navigate('/');
        } catch (err) {
            showErrorAlert(err.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        try {
            await signInWithGoogle();
            showSuccessAlert('Signed up with Google successfully!');
            navigate('/');
        } catch (err) {
            showErrorAlert(err.message || 'Failed to sign up with Google');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-2 py-6 md:mt-5 sm:px-4 md:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
            >
                <div className="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
                    <div className="p-4 sm:p-8 md:p-10">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-500">Create Account</h2>
                            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">Join us to get started</p>
                        </div>
                        
                        {/* Google Sign Up Button */}
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleSignUp}
                            disabled={googleLoading}
                            className={`w-full flex items-center justify-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all text-white mb-4 sm:mb-6 border border-gray-600 text-sm sm:text-base ${googleLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                        >
                            {googleLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <FcGoogle className="text-lg sm:text-xl" />
                                    <span>Sign up with Google</span>
                                </>
                            )}
                        </motion.button>

                        <div className="relative flex items-center my-4 sm:my-6">
                            <div className="flex-grow border-t border-gray-700"></div>
                            <span className="flex-shrink mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-700"></div>
                        </div>

                        {/* Manual Sign Up Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                                        required
                                    />
                                </div>
                                {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-gray-500" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className={`w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                                        required
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2">
                                    Phone Number (Optional)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiPhone className="text-gray-500" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="1234567890"
                                        className={`w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                                    />
                                </div>
                                {errors.phone && <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-500" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`w-full pl-10 pr-12 py-2 sm:py-3 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="text-gray-400 hover:text-gray-300" />
                                        ) : (
                                            <FiEye className="text-gray-400 hover:text-gray-300" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.password}</p>}
                                <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-500" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`w-full pl-10 pr-12 py-2 sm:py-3 bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <FiEyeOff className="text-gray-400 hover:text-gray-300" />
                                        ) : (
                                            <FiEye className="text-gray-400 hover:text-gray-300" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.confirmPassword}</p>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 block text-xs sm:text-sm text-gray-400">
                                    I agree to the <Link to="/terms" className="text-blue-400 hover:text-blue-300">Terms</Link> and <Link to="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
                                </label>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className={`w-full px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:from-purple-700 hover:to-blue-600 transition-all ${loading ? 'opacity-80 cursor-not-allowed' : ''} text-sm sm:text-base`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : 'Sign Up'}
                            </motion.button>
                        </form>

                        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;