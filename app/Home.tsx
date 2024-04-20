"use client";
import { Box, Container } from "@mui/material";
// import CtaCard from "./frontend/components/home/CtaCard";
// import Hero from "./frontend/components/home/Hero";
// import Footer from "./frontend/components/shared/Footer";
// import Navbar from "./frontend/components/shared/Navbar";

export default function Home() {
  return (
    <main>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* <Navbar />
        <Hero /> */}
        <Container
          sx={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
        >
          {/* <CtaCard
            title="Find a Freelancer"
            description="Find your Web3 Freelancer now!"
            cta="Find"
            onClick={() => console.log("Find Freelancer")}
          />
          <CtaCard
            title="Find a Client"
            description="Find your perfect Client now!"
            cta="Find"
            onClick={() => console.log("Find Client")}
          /> */}
        </Container>
      </Box>

      <Box sx={{ marginTop: "8rem" }}>{/* <Footer /> */}</Box>
    </main>
  );
}
