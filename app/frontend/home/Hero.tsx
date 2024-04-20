"use client";
import { Box, Container, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Container
      sx={{
        display: "flex",
        position: "relative",
        justifyContent: "start",
        alignItems: "center",
        width: "100vw", // Full viewport width
        height: "300px", // Adjust based on your preference
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,1) 95%), url('/coderonthebeach2.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black", // Adjust text color based on your background image
      }}
    >
      <Box
        sx={{
          zIndex: 2, // Ensure text is above the background
          padding: "20px",
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{ color: "white", WebkitTextStroke: "0.5px black", flexGrow: 1 }}
        >
          3Lance
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "white", WebkitTextStroke: "0.7px black", flexGrow: 1 }}
        >
          Find the perfect freelancer for your project.
        </Typography>
      </Box>
    </Container>
  );
}
