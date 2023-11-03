import { Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import request from "../service/request";
import styled from "@emotion/styled";
import NameListItem from "./NameListItem";

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 330,
}));

const StyledListItem = styled(ListItem)({
  backgroundColor: "#b5b2b2",
  border: "1px solid",
});

export default function NameList({ footballersList, setFootballersList }) {
  useEffect(() => {
    async function fetchData() {
      const data = await request.get("/footballersData");
      setFootballersList(data);
    }
    fetchData();
  }, [footballersList]);

  return (
    <Grid sx={{ marginLeft: "200px" }}>
      <Typography
        sx={{ textAlign: "center", mb: "5px" }}
        variant="h6"
        component="div"
      >
        Footballers list
      </Typography>
      <StyledDiv>
        <List sx={{ padding: "0" }}>
          {footballersList.map((footballer, index) => (
            <StyledListItem
              component="div"
              key={footballer.footballerId}
              disablePadding
            >
              <NameListItem
                fullName={footballer.fullName}
                footballerId={footballer.footballerId}
                index={index}
                setFootballersList={setFootballersList}
                footballersList={footballersList}
              />
            </StyledListItem>
          ))}
        </List>
      </StyledDiv>
    </Grid>
  );
}
