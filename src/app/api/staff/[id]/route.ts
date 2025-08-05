// get detail staff
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { staffSchema } from "@/lib/zod/staff";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const staff = await prisma.staff.findUnique({
      where: { id: Number(id) },
      include: {
        account: true,
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: "Failed to get staff" }, { status: 500 });
  }
}

//update staff
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsedBody = staffSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedBody.error.format() },
        { status: 400 }
      );
    }
    const staff = await prisma.staff.update({
      where: { id: Number(id) },
      data: parsedBody.data,
    });
    return NextResponse.json(staff);
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json(
      { error: "Failed to update staff" },
      { status: 500 }
    );
  }
}

// delete staff
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const staff = await prisma.staff.update({
      where: { id: Number(id) },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete staff" },
      { status: 500 }
    );
  }
}
