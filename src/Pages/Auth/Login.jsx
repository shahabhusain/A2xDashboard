import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import main from '../../assets/main.png';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../lib/axious';
import { getToken } from '../../lib/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Fix: Missing function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const res = await axiosPublic.post("/auth/login", formData);
    const { token } = res.data;

    if (token) {
      localStorage.setItem("token", token); 
      await sentOtp();
      navigate('/auth/otp');
    } else {
      setError("No token received from login.");
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed. Please try again.');
    console.error('Login error:', err);
  } finally {
    setIsLoading(false);
  }
};

const sentOtp = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    await axiosPublic.post(
      "/auth/login-otp",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("OTP request failed:", err);
    throw err;
  }
};


  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className='bg-gradient-to-l from-gray-50 to-red-100 p-12'>
        <img className='w-[750px]' src={main} alt="Healthcare illustration" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="flex flex-col gap-3 mb-8">
            <div className='flex items-center gap-3'>
              <img className='w-[50px]' src={logo} alt="A2Z Logo" />
              <h1 className='text-2xl font-semibold text-gray-900'>A2Z Home Health Care</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In to your Account</h2>
            <p className="text-gray-600">Welcome back! Please enter your details</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
            <Link to="/auth/forgot">Forgot Password</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
