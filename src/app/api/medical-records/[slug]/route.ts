import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Tìm hồ sơ y tế theo ID
    const medicalRecord = await prisma.medicalRecord.findUnique({
      where: { id: Number(slug) }, // Chuyển ID thành số nếu ID là kiểu int
      include: {
        patient: true,
        doctor: true,
        bill: {
          include: {
            prescriptions: {
              include: {
                prescriptionMedicines: {
                  include: {
                    medicine: true,
                    prescription: true,
                  },
                },
              },
            },
            testResults: true,
          },
        },
        appointment: true,
      },
    });

    if (!medicalRecord) {
      return NextResponse.json(
        { error: "Medical record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(medicalRecord);
  } catch (error) {
    console.error("Error fetching medical record:", error);
    return NextResponse.json(
      { error: "Failed to fetch medical record" },
      { status: 500 }
    );
  }
}
