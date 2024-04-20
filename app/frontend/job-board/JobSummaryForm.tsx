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
import React from "react";

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
  title: string;
  description: string;
  price: number;
  skills: any[];
}

export default function JobSummaryForm({
  title,
  description,
  price,
  skills,
}: IJobSummaryForm) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle payment submission
    console.log("Payment submitted for:", price, " ETH");
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
            inputProps={{ min: 1 }} // Setting minimum amount to 1
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Deposit and Start Job
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
