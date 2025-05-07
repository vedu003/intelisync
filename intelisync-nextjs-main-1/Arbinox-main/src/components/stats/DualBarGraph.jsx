import { Box, Typography, Paper, IconButton, Divider } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { Bar } from "react-chartjs-2";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";

const DualBarGraphComponent = styled(Box)(({ theme }) => ({
  "& .mainGraph": {
    padding: "22px 30px 40px",
  },
}));

export default function DualBarGraph({ newArrayDataUser }) {
  
  const dualBarGraphData = {
    labels: newArrayDataUser?.newarray4,
    datasets: [
      {
        label: "Buy",
        backgroundColor: "rgba(116, 176, 250, 1)",
        borderWidth: 1,
        data: newArrayDataUser?.newarraybuy,
        barThickness: 10,
      },
      {
        label: "Sell",
        backgroundColor: "#81E396",
        borderWidth: 1,
        // data: [1600, 2000, 2400, 2800, 3200, 3500],
        data: newArrayDataUser?.newarraysell,
        barThickness: 10,
      },
    ],
  };

  const dualBarGraphOptions = {
    scales: {
      x: {
        type: "category",
        position: "bottom",
        grid: {
          display: false,
        },
        categorySpacing: 0.5, // Increase this value to adjust the space between labels
      },
      y: {
        grid: {
          display: false,
        },
        // min: 0,
        // max: 100, // Increase the max value for taller bars
        stepSize: 2,
        ticks: {
          callback: function (value) {
            if (value === 0) return "0";
            return value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        borderRadius: 50,
      },
    },
  };

  return (
    <DualBarGraphComponent>
      <Box>
        <Box mb={5}>
          <Box mt={2}>
            <Typography variant="h5" color="primary">
              Buy and Sells
            </Typography>
          </Box>
          {/* <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Box
              color="primary"
              style={{
                height: "0px",
                position: "absolute",
                right: "10px",
                top: "5px",
                cursor: "pointer",
              }}
            >
              <CloseIcon color="secondary" />
            </Box>
            <Box
              color="primary"
              style={{
                height: "0px",
                position: "absolute",
                right: "40px",
                top: "5px",
                cursor: "pointer",
              }}
            >
              <RemoveIcon color="secondary" />
            </Box>
          </Box> */}
          <Box mt={1}>
            <Divider />
          </Box>
        </Box>
        <Bar data={dualBarGraphData} options={dualBarGraphOptions} />
      </Box>
    </DualBarGraphComponent>
  );
}
