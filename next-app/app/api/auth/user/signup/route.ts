import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthController } from "@/lib/controllers/user/authController";

mongoose.connect(process.env.MONGODB_URI!);

export async function POST(req: Request) {
  try {
    const result = await AuthController.signup(req);
    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
