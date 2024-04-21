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

  const { attestJob } = useAttestJob();
  const [jobStatus, setJobStatus] = React.useState(status);

  console.log("jobs status ", jobStatus);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle payment submission
    // 1. create hash via ethers of job details
    // TODO: call useAttestJob hook
    if (jobStatus === "open") {
      await attestJob({
        schemaUID,
        freelancerId,
        schema,
        jobHash,
        isComplete: false,
        price: price,
      });
      setJobStatus("pending");
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
