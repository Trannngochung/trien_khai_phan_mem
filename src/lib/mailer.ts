export const runtime = "nodejs";

import nodemailer from "nodemailer";

export async function sendOtpEmail(email: string, otp: string) {
  if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
    throw new Error("Thiếu cấu hình email. Vui lòng kiểm tra EMAIL_USERNAME và EMAIL_PASSWORD trong file .env");
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, 
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Mã xác thực OTP",
    text: `Mã OTP của bạn là: ${otp}. Mã có hiệu lực trong 5 phút.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    throw new Error("Không thể gửi email. Vui lòng kiểm tra cấu hình email.");
  }
}
