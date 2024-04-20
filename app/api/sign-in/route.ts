import { sql } from "@vercel/postgres";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const payload = await req.json();
    const newUser = await sql`INSERT INTO "User" ("id") VALUES (${payload.id})`;
    return NextResponse.json({ res, newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" });
  }
}
