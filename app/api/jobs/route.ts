import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    // Get ALL jobs regardless of status
    const res = await sql`SELECT * FROM "Job"`;
    // Revalidate/purge the cache for the /api/jobs path
    revalidatePath("/api/jobs");
    return NextResponse.json({ jobs: res.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" });
  }
}
