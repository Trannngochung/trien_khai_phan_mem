import { NextResponse } from "next/server";
import { Appointment } from "@/types/type";
import prisma from "@/lib/prisma";

// GET /api/appointments - Get all appointments
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");
    const doctorId = searchParams.get("doctorId");
    const status = searchParams.get("status");

    const where: any = { isDeleted: false };
    if (patientId) where.patientId = Number(patientId);
    if (doctorId) where.doctorId = Number(doctorId);
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        doctor: true,
        medicalRecord: true,
      },
    });
    return NextResponse.json(appointments.reverse());
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// POST /api/appointments - Create new appointment
export async function POST(request: Request) {
  try {
    const body: Appointment = await request.json();
    console.log("body:", body);
    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: new Date(body?.appointmentDate),
        status: body?.status,
        patientId: Number(body?.patientId),
        doctorId: Number(body?.doctorId) || undefined,
        symptoms: body.symptoms,
      },
      include: {
        patient: {
          include: {
            account: true,
          },
        },
        doctor: {
          include: {
            account: true,
          },
        },
        medicalRecord: true,
      },
    });
    return NextResponse.json(appointment);
  } catch (error) {
    console.log("error:", {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// PUT /api/appointments/[id] - Update appointment
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const appointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        appointmentDate: new Date(body?.appointmentDate),
        status: body?.status,
        patientId: Number(body?.patientId),
        doctorId: Number(body?.doctorId) || undefined,
        symptoms: body.symptoms,
      },
      include: {
        patient: {
          include: {
            account: true,
          },
        },
        doctor: {
          include: {
            account: true,
          },
        },
        medicalRecord: true,
      },
    });
    return NextResponse.json(appointment);
  } catch (error) {
    console.log("error:", {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

// DELETE /api/appointments/[id] - Delete appointment
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
