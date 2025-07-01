import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const SignIn = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        if (!form.email || !form.password) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            if (form.email === 'user@example.com' && form.password === 'password123') {
                alert('Signed in successfully!');
            } else {
                setError('Invalid email or password.');
            }
            setLoading(false);
        }, 1000);
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic here
        alert('Google login would be implemented here');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
                    {/* Decorative header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
                    
                    <div className="p-8 sm:p-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                            <p className="text-gray-400 mt-2">Sign in to continue to your account</p>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all text-white mb-6 border border-gray-600"
                        >
                            <FcGoogle className="text-xl" />
                            <span>Continue with Google</span>
                        </motion.button>

                        <div className="relative flex items-center my-6">
                            <div className="flex-grow border-t border-gray-700"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-700"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
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
                                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
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
                                        className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        autoComplete="current-password"
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
                                <div className="flex justify-end mt-2">
                                    <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : 'Sign In'}
                            </motion.button>
                        </form>

                        <div className="text-center mt-8 text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Create one
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;