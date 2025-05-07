import { Box, Typography, Grid, Paper } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import DualBarGraph from "./DualBarGraph";
import DonutChart from "./DonatChart";
import SingleBarGraph from "./SingleBarGraph";

const PersonalStatsComponent = styled("div")(({ theme }) => ({
  "& .graphBox": {
    borderRadius: "15px",
    "& .graphItemBox": {
      "& .barGraphBox": {
        borderRadius: "20px",
        flexDirection: "column",
        padding: "30px",
        background: "#00000073",
        width: "100%",
      },
    },
  },
  "& .paperresponsive": {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
}));

export default function PersonalStats({ newArrayDataUser, profitList }) {
  return (
    <PersonalStatsComponent>
      <Box className="graphBox">
        <Box className="graphItemBox" my={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Paper elevation={2} style={{}} className="paperresponsive">
                <DualBarGraph newArrayDataUser={newArrayDataUser} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Paper elevation={2} style={{}} className="paperresponsive">
                <DonutChart profitList={profitList} />
              </Paper>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={2} style={{}} className="paperresponsive">
                <SingleBarGraph />
              </Paper>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </PersonalStatsComponent>
  );
}
