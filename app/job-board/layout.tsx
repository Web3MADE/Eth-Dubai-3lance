import { Box } from "@mui/material";
import Footer from "../frontend/shared/Footer";
import Navbar from "../frontend/shared/Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Box sx={{ mt: 4 }}>
        <Footer />
      </Box>
    </>
  );
}
