import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
  await resend.emails.send({
    from: "Auth App <onboarding@resend.dev>",
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 5 minutes.</p>`,
  });
};
