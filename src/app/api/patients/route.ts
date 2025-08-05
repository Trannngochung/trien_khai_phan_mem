import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/patients - Get all patients
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        account: true,
        appointments: true,
        prescriptions: true,
        bills: true,
        medicalRecords: true,
      },
    });
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

// POST /api/patients - Create new patient
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const patient = await prisma.patient.create({
      data: {
        fullName: body?.fullName,
        dob: body?.dob,
        gender: body?.gender,
        phone: body?.phone,
        address: body?.address,
        citizenId: body?.citizenId,
        accountId: body?.accountId,
        healthInsuranceId: body?.healthInsuranceId,
      },
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
    console.log(String(error));
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}

// PUT /api/patients/[id] - Update patient
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const patient = await prisma.patient.update({
      where: { id: Number(id) },
      data: {
        fullName: body.fullName,
        dob: body.dob ? new Date(body.dob) : undefined,
        gender: body.gender,
        phone: body.phone,
        address: body.address,
      },
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
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

// DELETE /api/patients/[id] - Delete patient
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    await prisma.patient.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Patient deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
