export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const getOTPExpiry = () =>
  Date.now() + 5 * 60 * 1000;
