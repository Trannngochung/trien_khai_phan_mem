import prisma from "@/lib/prisma";
import { staffSchema } from "@/lib/zod/staff";
import { NextResponse } from "next/server";
import { z } from "zod";
// GET /api/staff - Get all staff members

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { id: "asc" },
      where: {
        isDeleted: false,
      },
      include: {
        account: true,
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch staff" },
      { status: 500 }
    );
  }
}

// POST /api/staff - Create many staff
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = staffSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedBody.error.format() },
        { status: 400 }
      );
    }
    const staff = await prisma.staff.create({
      data: parsedBody.data, // Đã được xác thực
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create staff" },
      { status: 500 }
    );
  }
}
