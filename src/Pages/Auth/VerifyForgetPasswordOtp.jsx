import React, { useState, useRef, useEffect } from 'react';
import { Lock } from 'lucide-react';
import main from '../../assets/main.png';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../lib/axious';
import { toast } from 'react-toastify';
import { getToken } from '../../lib/auth';
import { useGetCurrentUser } from '../../Api/authApi';

const VerifyForgetPasswordOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);
  const containerRef = useRef(null);
  const user = useGetCurrentUser();
  const email = user?.email;

  // Handle countdown for resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  // Add paste event listener to the container
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('paste', handleContainerPaste);
      return () => {
        container.removeEventListener('paste', handleContainerPaste);
      };
    }
  }, []);

  const handleContainerPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted data is a 6-digit number
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('').slice(0, 6);
      setOtp(newOtp);
      
      // Focus on the last input field after paste
      setTimeout(() => {
        if (inputsRef.current[5]) {
          inputsRef.current[5].focus();
        }
      }, 0);
      
      // Auto-submit if all fields are filled
      if (newOtp.every(digit => digit !== "")) {
        handleSubmit();
      }
    } else {
      toast.error("Please paste a valid 6-digit OTP");
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
    
    // Auto-submit when last digit is entered
    if (index === 5 && value) {
      handleSubmit();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior on individual inputs
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (otp.some(digit => digit === "")) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    const fullOtp = otp.join("");

    try {
      const token = getToken();
      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/auth/login");
        return;
      }

      const response = await axiosPublic.post(
        "/auth/verify-otp",
        { otp: fullOtp, email: email },
      );

      if (response.data?.verified) {
        toast.success("OTP verified successfully!");
        navigate("/auth/resetpassword");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      const errorMessage = err.response?.data?.message || "OTP verification failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/auth/login");
        return;
      }

      await axiosPublic.post("/auth/resend-otp", { email }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("New OTP sent successfully!");
      setCountdown(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0].focus();
    } catch (err) {
      console.error("Resend OTP error:", err);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (hidden on mobile) */}
      <div className="hidden md:block bg-gradient-to-l from-gray-50 to-red-100 p-12">
        <img className="w-full max-w-[750px]" src={main} alt="Health care illustration" />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md" ref={containerRef}>
          {/* Logo and Header */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <img className="w-12 h-12" src={logo} alt="Company logo" />
              <h1 className="text-2xl font-semibold text-gray-900">A2Z Home Health Care</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Enter OTP</h2>
            <p className="text-gray-600">
              Please enter the 6-digit code sent to {email}
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="flex justify-between gap-2 sm:gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                autoFocus={index === 0}
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Verify Button */}
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

          {/* Resend OTP Section */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              {canResend ? (
                <button 
                  onClick={handleResendOtp}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-500">
                  Resend in {countdown}s
                </span>
              )}
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

export default VerifyForgetPasswordOtp;