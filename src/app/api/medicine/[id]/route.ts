// get detail medicine
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const medicine = await prisma.medicine.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(medicine);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get medicine" },
      { status: 500 }
    );
  }
}

// update medicine
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const medicine = await prisma.medicine.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        unit: body.unit,
        price: Number(body.price),
        stock: Number(body.stock),
        note: body.note,
        importedPharmacy: body.importedPharmacy,
      },
    });
    return NextResponse.json(medicine);
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json(
      { error: "Failed to update medicine" },
      { status: 500 }
    );
  }
}

// delete medicine
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const medicine = await prisma.medicine.update({
      where: { id: Number(id) },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(medicine);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete medicine" },
      { status: 500 }
    );
  }
}
