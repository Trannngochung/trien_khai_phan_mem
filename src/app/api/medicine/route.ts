//  api create medicine
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Medicine } from "@/types/type";
import { Unit } from "@prisma/client";
export interface ICreateMedicine {
  name: string;
  unit: Unit;
  price: number;
  stock: number;
  note: string;
  importedPharmacy: string;
}
// create many medicine, skip data if medicine already exists
export async function POST(request: Request) {
  const body: ICreateMedicine = await request.json();
  const { name, unit, price, stock, note, importedPharmacy } = body;
  try {
    const medicines = await prisma.medicine.create({
      data: {
        name,
        unit,
        price: Number(price),
        stock: Number(stock),
        note,
        importedPharmacy,
      },
    });
    return NextResponse.json(medicines);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create medicine" },
      { status: 500 }
    );
  }
}

// api get all medicine
export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany({
      orderBy: { id: "asc" },
      where: { isDeleted: false },
    });
    return NextResponse.json(medicines);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get medicines" },
      { status: 500 }
    );
  }
}
