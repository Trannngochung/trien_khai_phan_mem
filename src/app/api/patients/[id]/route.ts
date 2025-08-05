// get detail patient
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const patient = await prisma.patient.findUnique({
      where: { id: Number(id) },
      include: {
        account: true,
        appointments: true,
        prescriptions: true,
        bills: true,
        medicalRecords: true,
      },
    });
    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get patient" },
      { status: 500 }
    );
  }
}

// update patient
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const patient = await prisma.patient.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

// delete patient
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const patient = await prisma.patient.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
