import { Box, styled } from "@mui/system";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)({
  margin: "theme.spacing(1)",
  textDecoration: "none",
  color: "#999999",
  "&:hover": {
    color: "#19191b",
  },
});
const StyledHeader = styled(Grid)({
  backgroundColor: "#8a2be2",
  direction: "row",
  justifyContent: "space-between",
  padding: "theme.spacing(2)",
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

export default function Header({ userName }) {
  return (
    <StyledHeader container>
      <Box>
        <StyledTypography variant="h4">
          Welcome back {userName}
        </StyledTypography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <StyledLink to="/login">
          Logout <LogoutIcon />
        </StyledLink>
      </Box>
    </StyledHeader>
  );
}
