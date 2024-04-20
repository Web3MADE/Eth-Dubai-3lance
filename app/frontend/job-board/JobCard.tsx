import { Money } from "@mui/icons-material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
interface JobCardProps {
  title: string;
  price: number;
  offer?: string;
  skills?: string[];
  onClick: () => void;
}

export default function JobCard({
  title,
  price,
  offer,
  skills,
  onClick,
}: JobCardProps) {
  return (
    <Card
      sx={{
        ":hover": {
          boxShadow: 10,
          cursor: "pointer",
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardHeader title={title}></CardHeader>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" component="div">
            {offer}
          </Typography>

          <CardActions
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              pl: 0,
              color: "gray",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Money sx={{ fontSize: "12px" }} />
              <Typography sx={{ fontSize: "12px" }}>
                {price.toString()} ETH
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SignalCellularAltIcon sx={{ fontSize: "12px" }} />
              <Typography sx={{ fontSize: "12px" }}>Expert</Typography>
            </Box>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
