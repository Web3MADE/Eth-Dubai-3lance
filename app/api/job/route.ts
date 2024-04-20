import { registerSchema } from "@/app/utils/EAS";
import { constructSchema } from "@/app/utils/Schema";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
// LATER: typecast params
export async function POST(req: Request, res: Response) {
  try {
    if (!process.env.ADMIN_PRIVATE_KEY) {
      throw new Error("Admin private key not found");
    }
    const { jobSchemaData } = await req.json();
    console.log("req body params ", jobSchemaData);
    const schema = constructSchema([
      ...jobSchemaData.skills,
      jobSchemaData.title,
      jobSchemaData.price,
      jobSchemaData.offer,
      jobSchemaData.projectID,
    ]);
    console.log("constructed schema ", schema);
    const transaction = await registerSchema(
      process.env.ADMIN_PRIVATE_KEY,
      schema
    );
    // Wait for the transaction to be mined
    const schemaUID = await transaction.wait();
    console.log("schemaUID ", schemaUID);
    // TODO: fix foreign key constraint in job table
    await sql`
      INSERT INTO "Job" ("title", "description", "freelancerId", "id", "skills", "price", "status") 
      VALUES (${jobSchemaData.title.name},
        ${jobSchemaData.offer.name},
        ${jobSchemaData.ownerAddress},
        ${schemaUID},
        ${JSON.stringify(jobSchemaData.skills.map((skill: any) => skill.name))},
        ${parseInt(jobSchemaData.price.name)},
        ${jobSchemaData.status.name}
      )`;

    return NextResponse.json({ schemaUID });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error" });
  }
}
