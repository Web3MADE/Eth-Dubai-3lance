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
import { ParamType, ethers } from "ethers";
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
  schema: string;
  title: string;
  description: string;
  price: number;
  skills: any[];
}

export default function JobSummaryForm({
  schemaUID,
  freelancerId,
  schema,
  title,
  description,
  price,
  skills,
}: IJobSummaryForm) {
  const { attestJob } = useAttestJob();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle payment submission
    // 1. create hash via ethers of job details
    // 2. encode data and attest (hash, isComplete, price) + payment
    const types: ReadonlyArray<string | ParamType> = [
      "string",
      "string",
      "string",
    ];
    const values: ReadonlyArray<any> = [
      title,
      description,
      JSON.stringify(skills),
    ];

    const bytes32Hash = ethers.AbiCoder.defaultAbiCoder().encode(types, values);
    // TODO: call useAttestJob hook
    await attestJob({
      schemaUID,
      freelancerId,
      schema,
      jobHash: bytes32Hash,
      isComplete: false,
      price: price,
    });
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
            inputProps={{ min: 0.0001 }} // Setting minimum amount to 1
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Deposit and Start Job
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
