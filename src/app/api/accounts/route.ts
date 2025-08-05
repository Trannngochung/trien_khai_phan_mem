import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/accounts - Get all accounts
export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        patient: true,
        doctor: true,
        staff: true,
      },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}

// POST /api/accounts - Create new account
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, email, role } = body;

    // Create account with related data based on role

    // Create account with related data based on role
    // bệnh nhân đăng kí
    const account = await prisma.account.create({
      data: {
        username,
        password,
        email,
        role,
      },
      include: {
        patient: true,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log("error:", String(error));
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}

// PUT /api/accounts/[id] - Update account
// export async function PUT(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json(
//         { error: "Account ID is required" },
//         { status: 400 }
//       );
//     }

//     const body = await request.json();
//     const { password, ...updateData } = body;

//     const data = password ? { ...updateData, password } : updateData;

//     const account = await prisma.account.update({
//       where: { id },
//       data,
//       include: {
//         patient: true,
//         doctor: true,
//         staff: true,
//       },
//     });

//     return NextResponse.json(account);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update account" },
//       { status: 500 }
//     );
//   }
// }

// DELETE /api/accounts/[id] - Delete account
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json(
//         { error: "Account ID is required" },
//         { status: 400 }
//       );
//     }

//     await prisma.account.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Account deleted successfully" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete account" },
//       { status: 500 }
//     );
//   }
// }
