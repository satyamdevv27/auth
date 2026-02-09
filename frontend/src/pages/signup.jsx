import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const url = "https://auth-backend-xzsl.onrender.com"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Resend OTP states */
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------- Signup ---------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${url}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setShowOtpField(true);
      setTimer(30);
      setCanResend(false);
    }

    setLoading(false);
  };

  /* ---------- OTP Verify ---------- */
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${url}/user/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        otp,
      }),
    });

    const data = await res.json();

    alert(data.message || data.error);

    if (res.ok) {
      setShowOtpField(false);
      setFormData({ name: "", email: "", password: "" });
      setOtp("");
    }

    setLoading(false);
  };

  /* ---------- Timer countdown ---------- */
  useEffect(() => {
    if (!showOtpField) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtpField]);

  /* ---------- Resend OTP ---------- */
  const resendOtp = async () => {
    setLoading(true);

    const res = await fetch(
      `${url}/user/resend-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      }
    );

    const data = await res.json();
    alert(data.message);

    setTimer(30);
    setCanResend(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        {!showOtpField && (
          <form onSubmit={handleSignup}>
            <input
              name="name"
              placeholder="Name"
              className="border p-2 mb-2 w-full"
              value={formData.name}
              onChange={handlechange}
              required
            />

            <input
              name="email"
              placeholder="Email"
              className="border p-2 mb-2 w-full"
              value={formData.email}
              onChange={handlechange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 mb-4 w-full"
              value={formData.password}
              onChange={handlechange}
              required
            />

            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded disabled:bg-gray-400"
            >
              {loading ? "Sending OTP..." : "Signup"}
            </button>

            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        )}

        {showOtpField && (
          <form onSubmit={verifyOtp}>
            <p className="mb-2 text-sm">
              Enter OTP sent to your email
            </p>

            <input
              placeholder="Enter OTP"
              className="border p-2 mb-4 w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white w-full py-2 rounded disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend OTP */}
            <button
              type="button"
              onClick={resendOtp}
              disabled={!canResend || loading}
              className="text-blue-500 mt-3 text-sm disabled:text-gray-400"
            >
              {canResend
                ? "Resend OTP"
                : `Resend OTP in ${timer}s`}
            </button>

            <p className="mt-4 text-center">
              Already have account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
