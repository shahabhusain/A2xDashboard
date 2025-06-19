import React, { useState, useRef } from 'react';
import { Lock } from 'lucide-react';
import main from '../../assets/main.png';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "","",""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const navigate = useNavigate()

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Entered OTP:", otp.join(""));
      // Handle OTP verification logic here
    }, 2000);
    navigate("/auth/resetpassword")
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="bg-gradient-to-l from-gray-50 to-red-100 p-12">
        <img className="w-[750px]" src={main} alt="Main Illustration" />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <img className="w-[50px]" src={logo} alt="Logo" />
              <h1 className="text-2xl font-semibold text-gray-900">
                A2Z Home Health Care
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Enter OTP
            </h2>
            <p className="text-gray-600">
              Please enter the 6-digit code sent to your email
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-14 h-14 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || otp.some((digit) => digit === "")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Additional Links */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Didn’t receive the code?{" "}
              <button className="text-blue-600 font-medium hover:underline">
                Resend
              </button>
            </p>
            <Link
              to="/auth/login"
              className="block text-blue-600 text-sm font-medium mt-2 hover:underline"
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
