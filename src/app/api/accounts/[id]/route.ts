import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// update doctor

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { username, password, email, role } = body;
    const account = await prisma.account.update({
      where: { id: Number(id) },
      data: {
        password,
      },
    });
    return NextResponse.json(account);
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const account = await prisma.account.update({
      where: { id: Number(id) },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(account);
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}
