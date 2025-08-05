import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const accounts = await prisma.account.createMany({
      data: body,
      skipDuplicates: true,
    });
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create accounts" },
      { status: 500 }
    );
  }
}
