import { attestStartJob } from "@/app/utils/EAS";
import { constructEncodedData } from "@/app/utils/Schema";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
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
    return NextResponse.json({ attestationUID });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error" });
  }
}

function removeUUID(originalSchema: string): string {
  const components = originalSchema.split(", ");

  // Remove the first component which is assumed to be the UUID string
  components.shift();

  // Join the remaining components back into a single string
  const modifiedSchema = components.join(", ");

  return modifiedSchema;
}
