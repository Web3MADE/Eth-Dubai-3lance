"use client";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import React from "react";
import { useAttestJob } from "../hooks/useAttestJob";

interface Skill {
  id: number;
  name: string;
}

interface FreelancerOffer {
  summary: string;
  price: number;
  skills: Skill[];
}

interface IJobSummaryForm {
  schemaUID: string;
  freelancerId: string;
  jobHash: string;
  schema: string;
  title: string;
  description: string;
  price: number;
  skills: any[];
  status: string;
}

export default function JobSummaryForm({
  schemaUID,
  freelancerId,
  schema,
  jobHash,
  title,
  description,
  price,
  skills,
  status,
}: IJobSummaryForm) {
  const router = useRouter();
  const { ready: isWalletReady, wallets } = useWallets();

  const { attestJob } = useAttestJob();
  const [jobStatus, setJobStatus] = React.useState(status);

  console.log("jobs status ", jobStatus);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle payment submission
    // 1. create hash via ethers of job details
    // TODO: call useAttestJob hook
    if (jobStatus === "open") {
      const wallet = wallets[0]; // Replace this with your desired wallet
      const provider = await wallet.getEthereumProvider();
      const transactionRequest = {
        to: "0x6116ABf3445d8744bF78c8c7B322cD5A91613fbA",
        value: ethers.parseEther(price.toString()),
      };
      await provider.request({
        method: "eth_sendTransaction",
        params: [transactionRequest],
      });

      // fund admin wallet FIRST via ethers send
      await attestJob({
        schemaUID,
        freelancerId,
        schema,
        jobHash,
        isComplete: false,
        price: price,
      });
      setJobStatus("pending");
      /**@dev SO CLOSE */
      // SO CLOSE to getting biconomy working with EAS, must be passing wrong wallets/addresses
      // because EAS contract is never called
      // Encode job data first
      // const updatedSchema = removeUUID(schema);
      // const schemaValues = {
      //   jobHash,
      //   isComplete: false,
      //   price: ethers.parseEther(price.toString()),
      // };
      // const constructedData = constructEncodedData(updatedSchema, schemaValues);
      // const schemaEncoder = new SchemaEncoder(updatedSchema);
      // const encodedData = schemaEncoder.encodeData(constructedData);

      // const embeddedWallet = wallets.find(
      //   (wallet) => wallet.walletClientType === "privy"
      // );

      // if (!embeddedWallet) return;
      // const provider = await embeddedWallet.getEthersProvider();
      // const signer = provider.getSigner();
      // const config = {
      //   privateKey:
      //     "da5956d415544a58662012572ea775615113350f0a2d5bed538bb150660c277d",
      //   biconomyPaymasterApiKey:
      //     "K8-IqGKRA.ed33f62b-b2a7-4f7a-be27-247959a067b7",
      //   bundlerUrl: `https://bundler.biconomy.io/api/v2/${BASE_SEPOILA_CHAIN_ID}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`, // <-- Read about this at https://docs.biconomy.io/dashboard#bundler-url
      //   rpcUrl: BASE_SEPOLIA_URL,
      // };

      // const smartWallet = await createSmartAccountClient({
      //   signer,
      //   biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
      //   bundlerUrl: config.bundlerUrl,
      // });

      // const saAddress = await smartWallet.getAccountAddress();
      // console.log("SA Address", saAddress);
      // const easContract = new ethers.Contract(
      //   BASE_SEPOLIA_EAS,
      //   EAS_JSON.abi,
      //   signer as unknown as ContractRunner // This is fine, since missing methods arent required for getting populateTransaction response
      // );
      // /**@dev No need to abi encode, just pass callData as normal object*/
      // const mockCallData = {
      //   schema: schemaUID,
      //   // TODO: get encoded data
      //   data: {
      //     recipient: freelancerId,
      //     revocable: true,
      //     refUID:
      //       "0x0000000000000000000000000000000000000000000000000000000000000000",
      //     data: encodedData,
      //     value: 0,
      //     expirationTime: 0,
      //   },
      //   attester: wallets[0].address,
      // };

      // // pass delegatedRequest argument, matching the method definition from EAS_ABI.json
      // const { data: unsignedTransaction } =
      //   await easContract.attest.populateTransaction(mockCallData);

      // // const COUNTER_CONTRACT = "0xc4602769d5F86B69332838770C2ee7DE9346239a";
      // // const counter = new ethers.Contract(
      // //   COUNTER_CONTRACT,
      // //   ["function increment()"],
      // //   provider as any
      // // );
      // // Build the transaction
      // const tx = {
      //   to: freelancerId,
      //   data: unsignedTransaction,
      // };

      // // Send the transaction and get the transaction hash
      // const userOpResponse = await smartWallet.sendTransaction(tx, {
      //   paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      // });
      // const { transactionHash } = await userOpResponse.waitForTxHash();
      // console.log("Transaction Hash", transactionHash);
      // const userOpReceipt = await userOpResponse.wait();
      // if (userOpReceipt.success == "true") {
      //   console.log("UserOp receipt", userOpReceipt);
      //   console.log("Transaction receipt", userOpReceipt.receipt);
      // }
    }

    if (jobStatus === "pending") {
      await attestJob({
        schemaUID,
        freelancerId,
        schema,
        jobHash,
        isComplete: true,
        price: price,
      });
      setJobStatus("complete");
    }

    if (jobStatus === "complete") {
      router.push("/job-board");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400 }}>
        <Typography variant="h5" component="h3" sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Typography variant="subtitle1" component="p" sx={{ marginBottom: 1 }}>
          {description}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Price: {price} ETH
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          Skills Offered:
        </Typography>
        <List>
          {skills.map((skill, i) => (
            <ListItem key={i}>
              <ListItemText primary={skill} />
            </ListItem>
          ))}
        </List>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount to Deposit"
            type="number"
            variant="outlined"
            fullWidth
            defaultValue={price}
            sx={{ marginBottom: 2 }}
            // inputProps={{ min: 0.0001 }} // Setting minimum amount to 1
          />
          {jobStatus === "open" && (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Deposit and Start Job
            </Button>
          )}
          {jobStatus === "pending" && (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Complete Job
            </Button>
          )}
          {jobStatus === "complete" && (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Back to Dashboard
            </Button>
          )}
        </form>
      </Paper>
    </Box>
  );
}
