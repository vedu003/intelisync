import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const DonutChartGraph = ({ profitList }) => {
  // const [dataValue, setDataValue] = useState(
  //   parse(profitList?.profitPercentage)
  // );

  const data = {
    datasets: [
      {
        data: [
          profitList?.profitPercentage,
          100 - profitList?.profitPercentage,
        ],
        backgroundColor: ["#81e396", "transparent"],
        hoverBackgroundColor: ["#a4e27e", "transparent"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
      },
    },
    // elements: {
    //   arc: {
    //     borderWidth: 0,
    //   },
    // },
  };

  const chartContainerStyle = {
    position: "relative",
    width: "200px",
    height: "200px",
  };

  const percentageTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const circleStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "3px solid #cfcfcf",
    borderRadius: "50%",
    width: "80%",
    height: "80%",
    zIndex: 1,
    padding: "8px",
  };

  return (
    <Box>
      <div style={chartContainerStyle}>
        <div style={circleStyle}>
          <Doughnut data={data} options={options} />
        </div>
        <div style={percentageTextStyle}>
          <Typography variant="h6">
            1
            %
          </Typography>
        </div>
      </div>
      {/* <button onClick={() => updateData(40)}>Update Data</button> */}
    </Box>
  );
};

export default DonutChartGraph;
