"use client";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**@dev AccountMenu tracks user authenticated state throughout app */
export default function AccountMenu() {
  const router = useRouter();
  // TODO: implement smart accounts for attestations
  // Smart account NOT needed for delegatedAttestation
  // const {
  //   ready,
  //   authenticated,
  //   user,
  //   zeroDevReady,
  //   sendTransaction,
  //   login,
  //   logout,
  // } = usePrivySmartAccount();
  const { wallets } = useWallets();

  const { ready, authenticated, user, login, logout } = usePrivy();

  console.log("account menu ", user);

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/sign-in");
    }
  }, [ready, authenticated, router]);

  // Demonstrate gas sponsorship via Biconomy SDK
  useEffect(() => {
    // const init = async () => {
    //   const embeddedWallet = wallets.find(
    //     (wallet) => wallet.walletClientType === "privy"
    //   );
    //   if (!embeddedWallet) return;
    //   // Switch the embedded wallet to your target network
    //   // Replace '80001' with your desired chain ID.
    //   await embeddedWallet.switchChain(BASE_SEPOILA_CHAIN_ID);
    //   const bundler: IBundler = new Bundler({
    //     bundlerUrl: `https://bundler.biconomy.io/api/v2/${BASE_SEPOILA_CHAIN_ID}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    //     chainId: BASE_SEPOILA_CHAIN_ID, // Replace this with your desired network
    //   });
    //   // Initialize your paymaster
    //   const paymaster: IPaymaster = new BiconomyPaymaster({
    //     paymasterUrl:
    //       "https://paymaster.biconomy.io/api/v1/84532/K8-IqGKRA.ed33f62b-b2a7-4f7a-be27-247959a067b7",
    //   });
    //   const provider = await embeddedWallet.getEthersProvider();
    //   const signer = provider.getSigner();
    //   // Initialize Biconomy's validation module with the ethers signer
    //   const validationModule = await ECDSAOwnershipValidationModule.create({
    //     signer: signer,
    //     moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE, // This is a Biconomy constant
    //   });
    //   const config = {
    //     privateKey:
    //       "da5956d415544a58662012572ea775615113350f0a2d5bed538bb150660c277d",
    //     biconomyPaymasterApiKey:
    //       "K8-IqGKRA.ed33f62b-b2a7-4f7a-be27-247959a067b7",
    //     bundlerUrl: `https://bundler.biconomy.io/api/v2/${BASE_SEPOILA_CHAIN_ID}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`, // <-- Read about this at https://docs.biconomy.io/dashboard#bundler-url
    //     rpcUrl: BASE_SEPOLIA_URL,
    //   };
    //   const smartWallet = await createSmartAccountClient({
    //     signer,
    //     biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
    //     bundlerUrl: config.bundlerUrl,
    //   });
    //   const saAddress = await smartWallet.getAccountAddress();
    //   console.log("SA Address", saAddress);
    //   const toAddress = "0xaddress"; // Replace with the recipient's address
    //   const transactionData = "0x123"; // Replace with the actual transaction data
    //   const COUNTER_CONTRACT = "0xc4602769d5F86B69332838770C2ee7DE9346239a";
    //   const counter = new ethers.Contract(
    //     COUNTER_CONTRACT,
    //     ["function increment()"],
    //     provider as any
    //   );
    //   console.log("counter ", counter);
    //   const incrementTx = await counter.increment.populateTransaction();
    //   // Build the transaction
    //   const tx = {
    //     to: "0x6116ABf3445d8744bF78c8c7B322cD5A91613fbA",
    //     data: incrementTx.data,
    //   };
    //   // Send the transaction and get the transaction hash
    //   const userOpResponse = await smartWallet.sendTransaction(tx, {
    //     paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    //   });
    //   const { transactionHash } = await userOpResponse.waitForTxHash();
    //   console.log("Transaction Hash", transactionHash);
    //   const userOpReceipt = await userOpResponse.wait();
    //   if (userOpReceipt.success == "true") {
    //     console.log("UserOp receipt", userOpReceipt);
    //     console.log("Transaction receipt", userOpReceipt.receipt);
    //   }
    // };
    // init();
  }, [wallets]);
  // const { user, authenticated, login, logout, zeroDevReady } =
  //   usePrivySmartAccount();
  // // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || authenticated;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleLogin() {
    login();
    handleClose();
  }

  function handleLogout() {
    logout();
    handleClose();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleProfile() {
    router.push("/profile");
  }

  function handleJobBoard() {
    router.push("/job-board");
  }

  function handleHome() {
    router.push("/");
  }

  console.log("Account Menu authenticated ");
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton onClick={handleClick}>
          <Avatar sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
      >
        {/* TODO: flags to show different options (logged in/out) */}
        {!disableLogin ? (
          <div key={"authenticated"}>
            <MenuItem onClick={handleLogin}>Create Account</MenuItem>
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          </div>
        ) : (
          <div key={"not-authenticated"}>
            <MenuItem onClick={handleHome}>Home</MenuItem>
            <MenuItem onClick={handleJobBoard}>Job Board</MenuItem>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
}
