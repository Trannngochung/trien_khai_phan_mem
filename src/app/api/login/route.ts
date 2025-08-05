import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Find account with matching username and password
    const account = await prisma.account.findFirst({
      where: {
        username: username,
        password: password,
      },
      include: {
        patient: true,
        doctor: true,
        staff: true,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Return account data on successful login
    return NextResponse.json({
      id: account.id,
      username: account.username,
      email: account.email,
      role: account.role,
      profile: account.patient || account.doctor || account.staff,
    });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
