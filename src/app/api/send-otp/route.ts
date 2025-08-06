export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email?.trim();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Thiếu email hợp lệ" },
        { status: 400 }
      );
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

    await prisma.otp.deleteMany({ where: { email } });

    await prisma.otp.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    await sendOtpEmail(email, otp);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi gửi OTP:", error);
    
    // Xử lý lỗi cụ thể
    if (error instanceof Error) {
      if (error.message.includes("Thiếu cấu hình email")) {
        return NextResponse.json(
          { success: false, error: "Hệ thống chưa được cấu hình email. Vui lòng liên hệ admin." },
          { status: 500 }
        );
      }
      if (error.message.includes("Không thể gửi email")) {
        return NextResponse.json(
          { success: false, error: "Không thể gửi email. Vui lòng kiểm tra cấu hình email." },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi khi gửi OTP" },
      { status: 500 }
    );
  }
}
