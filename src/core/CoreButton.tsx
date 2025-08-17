import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const CoreButton = styled(Button)(() => ({
  fontFamily: "SF Pro Display, sans-serif",
  textTransform: "uppercase", // keep normal casing
  fontSize: "32px",
  padding: "8px 20px",
  borderRadius: "8px",

  // contained variant
  "&.MuiButton-contained": {
    backgroundColor: "green",
    color: "white",
    "&:hover": {
      backgroundColor: "darkgreen", // optional hover
    },
  },

  // outlined variant
  "&.MuiButton-outlined": {
    border: "2px solid white",
    color: "white",
    "&:hover": {
      border: "2px solid #cccccc",
      backgroundColor: "rgba(255, 255, 255, 0.08)", // subtle hover
    },
  },
}));
