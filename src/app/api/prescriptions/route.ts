import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/prescriptions - Get all prescriptions
// export async function GET() {
//   try {
//     const prescriptions = await prisma.prescription.findMany({
//       include: {
//         patient: true,
//         doctor: true,
//         medicines: true,
//       },
//     });
//     return NextResponse.json(prescriptions);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch prescriptions" },
//       { status: 500 }
//     );
//   }
// }
export interface IMedicine {
  id: number;
  name: string;
  quantity: number;
  note: string;
  price: number;
  createdAt: Date;
}
export interface ICreatePrescription {
  doctorId: number;
  patientId: number;
  billId: number;
  createdAt: Date;
  note: string;
  totalCost: number;
  medicines: IMedicine[];
}
// POST /api/prescriptions - Create new prescription with medicines
export async function POST(request: Request) {
  try {
    const body: ICreatePrescription = await request.json();
    const medicines = body.medicines;
    const prescription = await prisma.prescription.create({
      data: {
        doctorId: Number(body.doctorId),
        patientId: Number(body.patientId),
        billId: Number(body.billId),
        createdAt: new Date(body.createdAt),
        note: body.note,
        totalCost: body.totalCost,
        prescriptionMedicines: {
          create: medicines.map((medicine) => ({
            medicineId: medicine.id,
            quantity: medicine.quantity,
            note: medicine.note,
            priceAtTime: medicine.price,
            createdAt: medicine.createdAt,
          })),
        },
      },
    });
    return NextResponse.json(prescription);
  } catch (error) {
    console.log("error:", String(error));
    return NextResponse.json(
      { error: "Failed to create prescription" },
      { status: 500 }
    );
  }
}

// PUT /api/prescriptions/[id] - Update prescription
// export async function PUT(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json(
//         { error: "Prescription ID is required" },
//         { status: 400 }
//       );
//     }

//     const body = await request.json();
//     const { medicines, ...prescriptionData } = body;

//     const prescription = await prisma.prescription.update({
//       where: { id },
//       data: {
//         diagnosis: prescriptionData.diagnosis,
//         note: prescriptionData.note,
//         status: prescriptionData.status,
//         medicines: {
//           deleteMany: {},
//           create: medicines.map((medicine: any) => ({
//             name: medicine.name,
//             dosage: medicine.dosage,
//             frequency: medicine.frequency,
//             duration: medicine.duration,
//             note: medicine.note,
//           })),
//         },
//       },
//       include: {
//         patient: true,
//         doctor: true,
//         medicines: true,
//       },
//     });
//     return NextResponse.json(prescription);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update prescription" },
//       { status: 500 }
//     );
//   }
// }

// DELETE /api/prescriptions/[id] - Delete prescription
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json(
//         { error: "Prescription ID is required" },
//         { status: 400 }
//       );
//     }

//     await prisma.prescription.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Prescription deleted successfully" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete prescription" },
//       { status: 500 }
//     );
//   }
// }
