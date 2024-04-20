"use client";
import { Box, Button } from "@mui/material";
import { useLogin } from "@privy-io/react-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const { login } = useLogin({
    onComplete: async (user, isNewUser, wasAlreadyAuthenticated) => {
      if (isNewUser) {
        await fetch("/api/sign-in", {
          method: "POST",
          body: JSON.stringify({
            id: user.wallet?.address || "",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // TODO: Do we fetch user data from DB throughout app or just rely on privySDK context?
      router.push("/");

      console.log(
        "sucessfully logged in ",
        user,
        isNewUser,
        wasAlreadyAuthenticated
      );
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
    },
    onError: (error) => {
      console.log("erorr logging in ", error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1.5rem",
          width: "50%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={login}>
            Log in
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/happyfreelancer.jpeg"
            alt="Happy Freelancer"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Box>
    </Box>
  );
}
