import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ---------- Send OTP ---------- */
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8080/user/send-reset-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      alert(data.message);

      if (res.ok) setStep(2);
    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Reset Password ---------- */
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8080/user/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await res.json();
      alert(data.message);

      if (res.ok) navigate("/login");
    } catch {
      alert("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {step === 1 && (
          <form onSubmit={sendOtp}>
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-2 mb-4 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white w-full py-2 rounded disabled:bg-gray-400"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={resetPassword}>
            <input
              placeholder="Enter OTP"
              className="border p-2 mb-2 w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="New Password"
              className="border p-2 mb-4 w-full"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white w-full py-2 rounded disabled:bg-gray-400"
            >
              {loading
                ? "Resetting password..."
                : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
