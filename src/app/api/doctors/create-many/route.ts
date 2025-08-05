import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Lấy danh sách doctor vừa tạo (theo danh sách email hoặc username nếu có)
    const accountDoctors = body.map((doctor: any, index: any) => {
      return {
        password: "123",
        role: "DOCTOR",
        username: `bacsi${index + 1}`,
      };
    });
    const accounts = await prisma.account.createMany({
      data: accountDoctors,
      skipDuplicates: true,
    });
    const doctorList = body.map((doctor: any, index: any) => {
      return {
        ...doctor,
        accountId: index + 1,
      };
    });
    const doctors = await prisma.doctor.createMany({
      data: doctorList,
      skipDuplicates: true,
    });
    return NextResponse.json(doctors);
  } catch (error) {
    console.log("errrr:", String(error));
    return NextResponse.json(
      { error: "Failed to create doctors" },
      { status: 500 }
    );
  }
}
