import { NextResponse } from "next/server";
import { ICreateDoctor } from "../route";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Tìm hồ sơ y tế theo ID
    const doctor = await prisma.doctor.findUnique({
      where: { id: Number(slug) }, // Chuyển ID thành số nếu ID là kiểu int
      include: {},
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Medical record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching medical record:", error);
    return NextResponse.json(
      { error: "Failed to fetch medical record" },
      { status: 500 }
    );
  }
}

// update doctor

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body: ICreateDoctor = await request.json();
    const {
      userId,
      fullName,
      specialization,
      phone,
      avatar, // Expect base64 string
      department,
    } = body;

    const doctor = await prisma.doctor.update({
      where: { id: Number(slug) },
      data: {
        userId,
        fullName,
        specialization,
        phone,
        department,
        avatar,
      },
    });
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const doctor = await prisma.doctor.update({
      where: { id: Number(slug) },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
}
