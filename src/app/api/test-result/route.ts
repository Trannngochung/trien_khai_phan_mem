import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/medical-records - Get all medical records
export async function GET() {
  try {
    const medicalRecords = await prisma.medicalRecord.findMany({
      include: {
        patient: true,
        doctor: true,
        bill: true,
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

// POST /api/test-result - Create new test result
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testResult = await prisma.testResult.create({
      data: {
        testName: body.testName,
        testType: body.testType,
        result: body.result,
        interpretation: body.interpretation,
        note: body.note,
        totalCost: body.totalCost,
        patientId: body.patientId,
        doctorId: body.doctorId,
        billId: body.billId,
        testDate: new Date(body.testDate),
      },
      include: {
        patient: true,
        doctor: true,
        bill: true,
      },
    });
    return NextResponse.json(testResult);
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
