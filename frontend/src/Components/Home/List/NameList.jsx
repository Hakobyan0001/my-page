import {
  Grid,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import styled from "@emotion/styled";
import NameListItem from "./NameListItem";
import request from "../../../service/request";
import usersStorage from "../../../utils/functions";

const StyledListItem = styled(ListItem)({
  backgroundColor: "#b5b2b2",
  border: "1px solid",
});
const StyledTypographyItem = styled(Typography)({
  textAlign: "center",
});
export default function NameList({
  footballersList,
  setFootballersList,
  listIsloading,
  setListIsLoading,
}) {
  useEffect(() => {
    async function fetchData() {
      try {
        setListIsLoading(true);
        const user = usersStorage.get("user");
        const data = await request.get("/footballersData", {
          headers: { Authorization: user.id },
        });
        setFootballersList(data);
      } catch (error) {
        console.error("Error fetching footballer data:", error);
      }
    }
    fetchData();
    setListIsLoading(false);
  }, [footballersList]);
  // console.log(footballersList);
  return (
    <Grid sx={{ m: "1%" }}>
      <StyledTypographyItem variant="h6">Footballers list</StyledTypographyItem>
      {listIsloading ? (
        footballersList && footballersList.length > 0 ? (
          footballersList.map((footballer, index) => (
            <Stack key={index}>
              <Skeleton sx={{ background: "#b5b2b2" }} variant="text" />
            </Stack>
          ))
        ) : (
          <Typography>No footballers to display</Typography>
        )
      ) : (
        <List sx={{ width: "100%" }}>
          {footballersList && footballersList.length > 0 ? (
            footballersList.map((footballer, index) => (
              <StyledListItem key={footballer.footballerId} disablePadding>
                <NameListItem
                  fullName={footballer.fullname}
                  footballerId={footballer.footballerId}
                  index={index}
                  setFootballersList={setFootballersList}
                  footballersList={footballersList}
                  setListIsLoading={setListIsLoading}
                />
              </StyledListItem>
            ))
          ) : (
            <StyledTypographyItem sx={{ textAlign: "center" }}>
              No footballers to display
            </StyledTypographyItem>
          )}
        </List>
      )}
    </Grid>
  );
}
