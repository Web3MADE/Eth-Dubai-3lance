import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { BASE_SEPOLIA_URL } from "../config/Constants";

const BASE_SEPOLIA_EAS = "0x4200000000000000000000000000000000000021";
const BASE_SEPOLIA_SCHEMA_REGISTRY =
  "0x4200000000000000000000000000000000000020";
const BASE_SEPOLIA_RESOLVER = "0x24a4bd803fb5CA914119F062c4e6aB1c9e4649dc";

// TODO: use Base over Sepolia, & us smart accounts via Biconomy
export function getEAS(privateKey: string) {
  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(BASE_SEPOLIA_EAS);

  // Gets a default provider (in production use something else like infura/alchemy)
  // TODO: provider will ALWAYS be using OP Sepolia rpc url
  // private key will ALWAYS be admin
  // YOU NEED a JSONRPCPPROVIDER to do EAS methods, NOT BROWSERPROVIDER
  const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_URL);
  const signer = new ethers.Wallet(privateKey, provider);

  // Connects an ethers style provider/signingProvider to perform read/write functions.
  // MUST be a signer to do write operations!
  eas.connect(signer);
  return { eas, provider, signer };
}

export async function registerSchema(privateKey: string, schema: string) {
  const schemaRegistry = new SchemaRegistry(BASE_SEPOLIA_SCHEMA_REGISTRY);
  const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_URL);
  const signer = new ethers.Wallet(privateKey, provider);

  schemaRegistry.connect(signer);
  const transaction = await schemaRegistry.register({
    schema,
    resolverAddress: BASE_SEPOLIA_RESOLVER,
    revocable: true,
  });

  return transaction;
}

export async function attestStartJob(
  privateKey: string,
  schemaUID: string,
  encodedData: any,
  recipient: string,
  price: number
) {
  const { eas, provider, signer } = getEAS(privateKey);

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient,
      expirationTime: BigInt(0),
      revocable: true,
      data: encodedData,
      value: ethers.parseEther(price.toString()),
    },
  });

  const attestationUID = await tx.wait();

  return attestationUID;
}
