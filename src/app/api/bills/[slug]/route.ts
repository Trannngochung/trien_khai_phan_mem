// update bill
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// xac nhan thanh toan hoa don
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const bill = await prisma.bill.update({
      where: { id: Number(slug) },
      data: {
        status: body.status,
        paidAt: body.paidAt ? new Date(body.paidAt) : null,
        totalCost: body.totalCost,
      },
    });
    return NextResponse.json(bill);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update bill" },
      { status: 500 }
    );
  }
}
