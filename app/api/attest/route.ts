import { attestStartJob } from "@/app/utils/EAS";
import { constructEncodedData } from "@/app/utils/Schema";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { sql } from "@vercel/postgres";
import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (!process.env.ADMIN_PRIVATE_KEY) {
      throw new Error("Admin private key not found");
    }
    const { attestJobData } = await req.json();
    const updatedSchema = removeUUID(attestJobData.schema);
    const schemaValues = {
      jobHash: attestJobData.jobHash,
      isComplete: attestJobData.isComplete,
      price: ethers.parseEther(attestJobData.price.toString()),
    };
    const constructedData = constructEncodedData(updatedSchema, schemaValues);
    const schemaEncoder = new SchemaEncoder(updatedSchema);
    const encodedData = schemaEncoder.encodeData(constructedData);

    const attestationUID = await attestStartJob(
      process.env.ADMIN_PRIVATE_KEY,
      attestJobData.schemaUID,
      encodedData,
      attestJobData.freelancerId,
      attestJobData.price
    );

    // update job status to pending
    // update UI & allow client to attest to finishing job
    // observe ether is sent to Freelancer wallet
    if (!attestJobData.isComplete) {
      await sql`UPDATE "Job" SET "status" = 'pending' WHERE "id" = ${attestJobData.schemaUID} `;
      return NextResponse.json({ jobStatus: "pending" });
    }

    await sql`UPDATE "Job" SET "status" = 'complete' WHERE "id" = ${attestJobData.schemaUID} `;
    return NextResponse.json({ jobStatus: "complete" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error" });
  }
}

export function removeUUID(originalSchema: string): string {
  const components = originalSchema.split(", ");

  // Remove the first component which is assumed to be the UUID string
  components.shift();

  // Join the remaining components back into a single string
  const modifiedSchema = components.join(", ");

  return modifiedSchema;
}
