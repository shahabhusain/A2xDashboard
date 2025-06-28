import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import main from '../../assets/main.png';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../lib/axious';

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ FIXED: handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.email) {
      alert("Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);

      // Call your forget-password endpoint
      await axiosPublic.post("/auth/forget-password", formData);

      // On success navigate
      navigate("/auth/verifyotp");
    } catch (error) {
      console.error('Error during forgot password:', error);
      alert('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="bg-gradient-to-l from-gray-50 to-red-100 p-12 hidden md:block">
        <img className="w-[750px]" src={main} alt="Main Illustration" />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <img className="w-[50px]" src={logo} alt="A2Z Logo" />
              <h1 className="text-2xl font-semibold text-gray-900">A2Z Home Health Care</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
            <p className="text-gray-600">Please enter your email to receive a reset link.</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
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

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className="flex items-center justify-center">
              <Link to="/auth/login" className="text-center text-blue-600 text-[14px] font-[500]">
                Back to Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
