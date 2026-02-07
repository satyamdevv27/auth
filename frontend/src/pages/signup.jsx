import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Step 1: Signup
  const handleSignup = async () => {
    const res = await fetch("http://localhost:8080/user/signup", {
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
    }
  };

  // Step 2: OTP verify
  const verifyOtp = async () => {
    const res = await fetch("http://localhost:8080/user/verify-otp", {
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

alert(data.message || data.error || "Something went wrong");


    if (res.ok) {
      setShowOtpField(false);
      setFormData({ name: "", email: "", password: "" });
      setOtp("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        {!showOtpField && (
          <>
            <input
              name="name"
              placeholder="Name"
              className="border p-2 mb-2 w-full"
              value={formData.name}
              onChange={handlechange}
            />

            <input
              name="email"
              placeholder="Email"
              className="border p-2 mb-2 w-full"
              value={formData.email}
              onChange={handlechange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 mb-4 w-full"
              value={formData.password}
              onChange={handlechange}
            />

            <button
              onClick={handleSignup}
              className="bg-blue-500 text-white w-full py-2 rounded"
            >
              Signup
            </button>
          </>
        )}

        {showOtpField && (
          <>
            <p className="mb-2 text-sm">
              Enter OTP sent to your email
            </p>

            <input
              placeholder="Enter OTP"
              className="border p-2 mb-4 w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              className="bg-green-500 text-white w-full py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
