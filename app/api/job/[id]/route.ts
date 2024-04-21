import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
/**@dev order of arguments matter here, second arg is context object */
export async function GET(req: any, context: any) {
  try {
    const { params } = context;
    const id = params.id;
    if (!id) {
      throw new Error("Job id not found");
    }
    const res = await sql`SELECT * FROM "Job" WHERE id = ${id}`;
    // Remember to invalidate cache on each page request
    revalidatePath(`/api/job/${id}`);

    return NextResponse.json({ job: res.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" });
  }
}
