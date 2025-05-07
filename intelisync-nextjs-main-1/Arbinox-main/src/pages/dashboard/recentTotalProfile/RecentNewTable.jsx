import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CircleGraph from "./CircleGraph";
import { fixDecimal } from "@/utils";

const RecentNewTable = ({ recentData }) => {
  const totalCapital = recentData?.totalCapital
    ? parseFloat(recentData.totalCapital).toFixed(2)
    : 0;
  const totalProfit = recentData?.totalProfit
    ? parseFloat(recentData.totalProfit).toFixed(2)
    : 0;

  return (
    <Box className="displaySpacebetween performaince-gap" mt={6}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5} lg={4}>
          <Box
            className="displayStart performanceBox"
            sx={{
              alignItems: "flex-start !important",
            }}
          >
            <Typography
              variant="h2"
              style={{ fontSize: "26px", whiteSpace: "pre", textAlign: "left" }}
            >
              {totalCapital ? fixDecimal(totalCapital) : 0}
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              ml={1}
              style={{ textAlign: "left", fontSize: "14px", fontWeight: 500 }}
            >
              (USDT)
            </Typography>
          </Box>
          <Box className="displayStart performanceBox" mt={3}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {" "}
              <Typography
                variant="h2"
                style={{
                  fontSize: "22px",
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "24px",
                }}
              >
                {totalProfit ? fixDecimal(totalProfit) : 0}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  textAlign: "left",
                  fontSize: "12x !important",
                  fontWeight: 500,
                  lineHeight: "2px",
                  color: "#9D9D9D",
                  padding: "7px 0px 4px 0px",
                }}
              >
                Profit in USDT
              </Typography>{" "}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={1} lg={2} align="center">
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box align="center">
            <CircleGraph
              totalCapital={totalCapital}
              totalProfit={totalProfit}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecentNewTable;
