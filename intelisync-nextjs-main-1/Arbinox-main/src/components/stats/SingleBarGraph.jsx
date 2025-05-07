import { Box, Typography, Paper, IconButton, Divider } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { Bar } from "react-chartjs-2";

const SingleBarGraphComponent = styled(Box)(({ theme }) => ({
  "& .graphBox": {
    padding: "20px",
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
}));

export default function SingleBarGraph() {
  const singleBarGraphData = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Buy",
        backgroundColor: "#81E396",
        borderWidth: 1,
        data: [2000, 1800, 2000, 1650, 1850, 1500],
        barThickness: 10,
      },
    ],
  };

  const singleBarGraphOptions = {
    scales: {
      x: {
        type: "category",
        position: "bottom",
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        min: 0,
        max: 2000,
        stepSize: 500,
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
    <SingleBarGraphComponent>
      <Box className="mainGraph">
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
        <Bar data={singleBarGraphData} options={singleBarGraphOptions} />
      </Box>
    </SingleBarGraphComponent>
  );
}
