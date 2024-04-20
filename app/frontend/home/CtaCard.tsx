import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

interface CtaCardProps {
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
}

export default function CtaCard({
  title,
  description,
  cta,
  onClick,
}: CtaCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body2" component="div">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: "1rem" }}>
        <Button sx={{ alignSelf: "start" }} variant="contained">
          {cta}
        </Button>
      </CardActions>
    </Card>
  );
}
