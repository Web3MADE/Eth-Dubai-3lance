import { registerSchema } from "@/app/utils/EAS";
import { constructSchema } from "@/app/utils/Schema";
import { sql } from "@vercel/postgres";
import { ethers } from "ethers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// LATER: typecast params
export async function POST(req: Request, res: Response) {
  try {
    if (!process.env.ADMIN_PRIVATE_KEY) {
      throw new Error("Admin private key not found");
    }
    const { jobSchemaData } = await req.json();
    console.log("skills ", jobSchemaData);
    console.log("req body params ", jobSchemaData);
    // construct jobHash
    const jobHash = constructJobHash(
      jobSchemaData.title.name,
      jobSchemaData.offer.name,
      jobSchemaData.skills.map((skill: any) => skill.name)
    );
    console.log("jobHash ", jobHash);
    const schema = constructSchema([
      {
        type: "string",
        name: uuidv4(),
      },
      {
        type: "bytes32",
        name: "jobHash",
      },
      {
        type: "bool",
        name: "isComplete",
      },
      {
        type: "uint256",
        name: "price",
      },
    ]);
    const transaction = await registerSchema(
      process.env.ADMIN_PRIVATE_KEY,
      schema
    );
    // Wait for the transaction to be mined
    const schemaUID = await transaction.wait();
    console.log("schemaUID ", schemaUID);
    // TODO: fix foreign key constraint in job table
    await sql`
      INSERT INTO "Job" ("title", "description", "freelancerId", "id", "skills", "price", "status", "schema", "jobHash") 
      VALUES (${jobSchemaData.title.name},
        ${jobSchemaData.offer.name},
        ${jobSchemaData.ownerAddress},
        ${schemaUID},
        ${JSON.stringify(jobSchemaData.skills.map((skill: any) => skill.name))},
        ${parseFloat(jobSchemaData.price.name)},
        ${jobSchemaData.status.name},
        ${schema},
        ${jobHash}
      )`;
    revalidatePath("/api/job");

    return NextResponse.json({ schemaUID });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: e });
  }
}
// constructs keccak256 hash of job data
function constructJobHash(
  title: string,
  description: string,
  skills: string[]
) {
  const types: ReadonlyArray<string> = ["string", "string", "string"];
  const values: ReadonlyArray<any> = [
    title,
    description,
    JSON.stringify(skills),
  ];

  return ethers.solidityPackedKeccak256(types, values);
}

//TODO: no need to dynamically encode data, since the schema contains a jobHash now
// export as generic createEncodedData func
// function createJobHash(jobHash: string, isComplete: boolean, price: number) {
//       const types: ReadonlyArray<string | ParamType> = [
//         "string",
//         "bool",
//         "number",
//       ];
//       const values: ReadonlyArray<any> = [
//         jobHash,
//         isComplete,
//         price
//       ];

//       const bytes32Hash = ethers.AbiCoder.defaultAbiCoder().encode(
//         types,
//         values
//       );
// }
