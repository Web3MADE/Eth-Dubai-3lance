"use client";
import {
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import {
  IJobSchemaData,
  useRegisterJobSchema,
} from "../hooks/useRegisterJobSchema";

export default function PostFreelanceJob() {
  const { ready: isWalletReady, wallets } = useWallets();
  const { registerJobSchema, loading, error } = useRegisterJobSchema();

  const status = {
    type: "string",
    name: "open",
  };
  const [title, setTitle] = useState({
    type: "string",
    name: "",
  });
  const [price, setPrice] = useState({
    type: "uint256",
    name: "",
  });
  const [offer, setOffer] = useState({
    type: "string",
    name: "",
  });
  const [skills, setSkills] = useState([
    {
      type: "string",
      name: "WebDevelopment",
    },
  ]);

  const availableSkills = [
    { name: "Blockchain" },
    { name: "SmartContracts" },
    { name: "WebDevelopment" },
    { name: "GraphicDesign" },
    { name: "ContentWriting" },
  ];

  const handleChangeTitle = (event: any) => {
    setTitle({ ...title, name: event.target.value });
  };

  const handleChangePrice = (event: any) => {
    setPrice({ ...price, name: event.target.value });
  };

  const handleChangeOffer = (event: any) => {
    setOffer({ ...offer, name: event.target.value });
  };

  const handleChangeSkills = (event: any) => {
    const {
      target: { value },
    } = event;

    const selectedSkill = value[value.length - 1];
    const skillAlreadyExists = skills.find(
      (skill) => skill.name === selectedSkill
    );
    if (skillAlreadyExists) return;
    console.log("skills ", skills);
    setSkills((prev) => [...prev, { type: "string", name: selectedSkill }]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const jobSchemaData: IJobSchemaData = {
      ownerAddress: wallets[0].address,
      projectID: { type: "bytes32", name: "1" },
      title: title,
      price: price,
      offer: offer,
      skills: skills,
      status: status,
    };
    const uid = await registerJobSchema(jobSchemaData);
    console.log("uid ", uid);
  };

  return (
    <Container maxWidth="sm">
      <h1>Post a Job</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="string"
          label="Title"
          value={title.name}
          onChange={handleChangeTitle}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          type="number"
          label="Price in ETH"
          value={price.name}
          onChange={handleChangePrice}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Offer"
          value={offer.name}
          onChange={handleChangeOffer}
          margin="normal"
          variant="outlined"
          multiline
          rows={3}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="skills-multiple-chip-label">
            Skills Offered
          </InputLabel>
          <Select
            labelId="skills-multiple-chip-label"
            id="skills-multiple-chip"
            multiple
            value={skills}
            onChange={handleChangeSkills}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value.name} label={value.name} />
                ))}
              </div>
            )}
          >
            {availableSkills.map((skill) => (
              <MenuItem key={skill.name} value={skill.name}>
                {skill.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Post Job
        </Button>
      </form>
    </Container>
  );
}
