import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CircleGraph from "./CircleGraph";

const WeeklyDays = ({ recentData }) => {
  const totalCapital = recentData?.totalCapital
    ? parseFloat(recentData.totalCapital).toFixed(2)
    : 0;
  const totalProfit = recentData?.totalProfit
    ? parseFloat(recentData.totalProfit).toFixed(2)
    : 0;

  return (
    <Box>
      <Box className="displayCenter mainethBox" mt={4}>
        <Box className="displayCenter ">
          <Typography variant="h1" className="greenText performanceText">
            {/* {totalCapital} */}
            3520
          </Typography>
          <Typography variant="h5" color="secondary" ml={1}>
            (USDT)
          </Typography>
        </Box>
        {/* <Box className="displayCenter " mt={3}>
            <Typography variant="h1">{totalProfit}</Typography>
            <Typography variant="h5" color="secondary" ml={1}>
              profit
            </Typography>
          </Box> */}
        <img src="/images/lineborder.svg" className="borderBox" />
        <Box className="dougnmainBox displayStart" align="center">
          <CircleGraph
            // totalCapital={totalCapital}
            // totalProfit={totalProfit}

            totalCapital={100}
            totalProfit={40}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WeeklyDays;
