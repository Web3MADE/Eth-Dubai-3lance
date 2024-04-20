import {
  // const encodedSchema = constructSchema(attestJobData.schema);
  IAttestJobData,
} from "@/app/frontend/hooks/useAttestJob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (!process.env.ADMIN_PRIVATE_KEY) {
      throw new Error("Admin private key not found");
    }

    const attestJobData = (await req.json()) as IAttestJobData;
    console.log("req body attestJobData ", attestJobData);

    // construct encodedSchema = need jobHash, isComplete, price from DB
    // attest job + send eth payment from admin wallet for now
    //

    return NextResponse.json({ res: "Success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error" });
  }
}
