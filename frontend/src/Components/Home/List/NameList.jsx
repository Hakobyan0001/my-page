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

const StyledListItem = styled(ListItem)({
  backgroundColor: "#b5b2b2",
  border: "1px solid",
});
export default function NameList({
  footballersList,
  setFootballersList,
  listIsloading,
  setListIsLoading,
}) {
  useEffect(() => {
    async function fetchData() {
      setListIsLoading(true);
      const data = await request.get("/footballersData");
      setFootballersList(data);
    }
    fetchData();
    setListIsLoading(false);
  }, [footballersList]);

  return (
    <Grid sx={{ m: "1%" }}>
      <Typography sx={{ textAlign: "center" }} variant="h6">
        Footballers list
      </Typography>
      {listIsloading ? (
        footballersList.map((footballer, index) => (
          <Stack key={index}>
            <Skeleton sx={{ background: "#b5b2b2" }} variant="text" />
          </Stack>
        ))
      ) : (
        <List sx={{ width: "100%" }}>
          {footballersList.map((footballer, index) => (
            <StyledListItem key={footballer.footballerId} disablePadding>
              <NameListItem
                fullName={footballer.fullName}
                footballerId={footballer.footballerId}
                index={index}
                setFootballersList={setFootballersList}
                footballersList={footballersList}
                setListIsLoading={setListIsLoading}
              />
            </StyledListItem>
          ))}
        </List>
      )}
    </Grid>
  );
}
