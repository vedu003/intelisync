import { Box, Typography, Grid, Paper } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import DualBarGraph from "./DualBarGraph";
import DonutChart from "./DonatChart";
import SingleBarGraph from "./SingleBarGraph";
import BuyCellTable from "./BuyCellTable";
import MostTradedCoin from "./MostTradedCoin";

const PersonalStatsComponent = styled(Box)(({ theme }) => ({
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

export default function GlobalStats({ tabView, newArrayDataUser, profitList }) {
  return (
    <PersonalStatsComponent>
      <Box className="graphBox">
        <Box className="graphItemBox" my={1}>
          <Grid container spacing={3} display="flex" justifyContent="center">
            <Grid item xs={12} sm={6} md={6}>
              <Paper elevation={2} style={{}} className="paperresponsive">
                <DualBarGraph newArrayDataUser={newArrayDataUser} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Paper elevation={2} style={{}} className="paperresponsive">
                <DonutChart
                  //  tabView={tabView}
                  profitList={profitList}
                />
              </Paper>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={2} style={{}} className="paperresponsive">
                <BuyCellTable tabView={tabView} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MostTradedCoin tabView={tabView} />
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </PersonalStatsComponent>
  );
}
