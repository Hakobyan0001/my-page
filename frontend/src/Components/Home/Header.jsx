import { Box, styled } from "@mui/system";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const StyledHeader = styled(Grid)({
  backgroundColor: "#8a2be2",
  direction: "row",
  justifyContent: "space-between",
});
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: {
    xs: theme.typography.h6.fontSize,
    sm: theme.typography.h6.fontSize,
    md: theme.typography.h5.fontSize,
  },
  margin: theme.spacing(1),
  padding: theme.spacing(2),
}));
const StyledLink = styled(Link)({
  display: "flex",
  justifyContent: "center",
  textDecoration: "none",
  color: "#999999",
  "&:hover": {
    color: "#19191b",
  },
});

export default function Header({ userName }) {
  return (
    <StyledHeader container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <StyledTypography variant="h4">
          Welcome back {userName}
        </StyledTypography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", m: "1%", p: "1%" }}>
        <StyledLink to="/login">
          Logout <LogoutIcon />
        </StyledLink>
      </Box>
    </StyledHeader>
  );
}
