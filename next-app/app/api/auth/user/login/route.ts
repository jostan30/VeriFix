import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AuthController } from "@/lib/controllers/user/authController";

mongoose.connect(process.env.MONGODB_URI!);

export async function POST(req: Request) {
  try {
    const result = await AuthController.login(req);
    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    if(err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }
}
