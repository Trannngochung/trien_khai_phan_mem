import { NextResponse } from "next/server";
import { BillStatus } from "@prisma/client";
import prisma from "@/lib/prisma";

// GET /api/bills - Get all bills
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status: BillStatus | null = searchParams.get("status") as BillStatus;
    const patientId: string | null = searchParams.get("patientId");
    const bills = await prisma.bill.findMany({
      where: {
        status: status ? (status as BillStatus) : undefined,
        patientId: patientId ? Number(patientId) : undefined,
        isDeleted: false,
      },
      include: {
        patient: true,
        doctor: true,
        medicalRecord: true,
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
    });
    return NextResponse.json(bills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bills" },
      { status: 500 }
    );
  }
}

// POST /api/bills - Create new bill
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const bill = await prisma.bill.create({
//       data: {
//         totalAmount: body.totalAmount,
//         status: body.status,
//         paidAt: body.paidAt ? new Date(body.paidAt) : null,
//         patient: {
//           connect: {
//             id: body.patientId,
//           },
//         },
//         doctor: {
//           connect: {
//             id: body.doctorId,
//           },
//         },
//         ...(body.prescriptionId && {
//           prescription: {
//             connect: {
//               id: body.prescriptionId,
//             },
//           },
//         }),
//       },
//       include: {
//         patient: true,
//         doctor: true,
//         prescription: true,
//       },
//     });
//     return NextResponse.json(bill);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to create bill" },
//       { status: 500 }
//     );
//   }
// }

// DELETE /api/bills/[id] - Delete bill
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json(
//         { error: "Bill ID is required" },
//         { status: 400 }
//       );
//     }

//     await prisma.bill.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Bill deleted successfully" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete bill" },
//       { status: 500 }
//     );
//   }
// }
