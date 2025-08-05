export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json(
      { valid: false, error: "Thiếu email hoặc mã OTP" },
      { status: 400 }
    );
  }

  const record = await prisma.otp.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return NextResponse.json({ valid: false, error: "Không tìm thấy mã OTP" });
  }

  const isExpired = new Date() > record.expiresAt;
  const isMatch = otp === record.otp;

  if (isExpired) {
    await prisma.otp.deleteMany({ where: { email } });
    return NextResponse.json({ valid: false, error: "Mã OTP đã hết hạn" });
  }

  if (!isMatch) {
    return NextResponse.json({ valid: false, error: "Mã OTP không đúng" });
  }

  await prisma.otp.deleteMany({ where: { email } }); // Xoá sau khi xác thực
  return NextResponse.json({ valid: true });
}
