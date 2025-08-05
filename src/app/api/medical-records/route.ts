import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/medical-records - Get all medical records
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");
    const medicalRecords = await prisma.medicalRecord.findMany({
      where: {
        patientId: patientId ? Number(patientId) : undefined,
        isDeleted: false,
      },
      include: {
        patient: true,
        doctor: true,
        bill: {
          include: {
            prescriptions: {
              include: {
                prescriptionMedicines: {},
              },
            },
          },
        },
        appointment: true,
      },
    });
    return NextResponse.json(medicalRecords);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch medical records" },
      { status: 500 }
    );
  }
}

// POST /api/medical-records - Create new medical record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const medicalRecord = await prisma.medicalRecord.create({
      data: {
        diagnosis: body.diagnosis,
        symptoms: body.symptoms,
        doctorId: body.doctorId,
        patientId: body.patientId,
        appointmentId: body.appointmentId,
        note: body.note,
        bill: {
          create: {
            doctorId: body.doctorId,
            patientId: body.patientId,
            status: "PENDING",
          },
        },
      },
      include: {
        patient: true,
        doctor: true,
        bill: true,
        appointment: true,
      },
    });
    return NextResponse.json(medicalRecord);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create medical record" },
      { status: 500 }
    );
  }
}

// PUT /api/medical-records/[id] - Update medical record
// export async function PUT(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json(
//         { error: "Medical Record ID is required" },
//         { status: 400 }
//       );
//     }

//     const body = await request.json();
//     const medicalRecord = await prisma.medicalRecord.update({
//       where: { id },
//       data: {
//         recordDate: body.recordDate ? new Date(body.recordDate) : undefined,
//         diagnosis: body.diagnosis,
//         treatment: body.treatment,
//         note: body.note,
//         attachments: body.attachments,
//       },
//       include: {
//         patient: true,
//         doctor: true,
//       },
//     });
//     return NextResponse.json(medicalRecord);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update medical record" },
//       { status: 500 }
//     );
//   }
// }

// DELETE /api/medical-records/[id] - Delete medical record
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Medical Record ID is required" },
        { status: 400 }
      );
    }

    await prisma.medicalRecord.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Medical record deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete medical record" },
      { status: 500 }
    );
  }
}
