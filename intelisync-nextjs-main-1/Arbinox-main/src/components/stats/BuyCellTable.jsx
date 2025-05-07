import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Divider,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { IoMdAdd } from "react-icons/io";
import DonutChartGraph from "./DonutChartGraph";

const MainComponent = styled("div")(({ theme }) => ({
  "& .mainCardBox": {
    "& .donutBox": {
      borderRadius: "20px",
      flexDirection: "column",

      width: "100%",
      "& .donutGraph": {
        width: "275px",
        height: "275px",
        margin: "0 auto",
        position: "relative",
        [theme.breakpoints.down("sm")]: {
          width: "200px",
          height: "200px",
        },
        "& h4": {
          position: "absolute",
          textAlign: "center",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      },
    },
  },
  "& .circleAdd": {
    backgroundColor: "#38d059",
    width: "20px",
    height: "20px",
    borderRadius: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      color: "#fff",
      fontSize: "20px",
    },
  },
  "& .MuiTableBody-root": {
    background: "none",
  },
  "& .triggerscrollBox": {
    height: "155px",
    overflow: "auto",
  },
}));

const BuyCellTable = ({ tabView }) => {
  const donutData = {
    labels: ["Profile Stats"],
    datasets: [
      {
        data: [50], // Ensure data is in an array
        backgroundColor: ["#988AFF", "#E4E0FF"],
        borderWidth: 2,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const tabledata = [
    {
      Trigger: "Strategy",
      Buys: "123",
      Profits: "20%",
    },
    {
      Trigger: "Strategy",
      Buys: "123",
      Profits: "20%",
    },
    {
      Trigger: "Strategy",
      Buys: "123",
      Profits: "20%",
    },
    {
      Trigger: "Strategy",
      Buys: "123",
      Profits: "20%",
    },
    {
      Trigger: "Strategy",
      Buys: "123",
      Profits: "20%",
    },
    {
      Trigger: "Strategy",
      Buys: "123",
      Profits: "20%",
    },
  ];
  return (
    <MainComponent>
      <Box elevation={2} className="mainGraph">
        <Box>
          <Box mt={2}>
            <Typography variant="h5" color="primary">
              Profit Stats2
            </Typography>
          </Box>

          <Box mt={1}>
            <Divider />
          </Box>
        </Box>
        <Box className="mainCardBox">
          {/* <Box className="donutBox" style={{ position: "relative" }}>
          <Box className="donutGraph">
            <Doughnut data={donutData} options={donutOptions} />
            <Typography variant="h4">
              {donutData.datasets[0].data[0]}% 
            </Typography>
          </Box>
        </Box> */}
          <Box mt={3} className="displayCenter">
            <DonutChartGraph />
          </Box>
        </Box>
        {tabView === "global" && (
          <>
            <TableContainer className="triggerscrollBox">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Trigger</TableCell>
                    <TableCell>Buys</TableCell>
                    <TableCell>Profits</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tabledata.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell>{value.Trigger}</TableCell>
                      <TableCell>{value.Buys}</TableCell>
                      <TableCell>{value.Profits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </MainComponent>
  );
};

export default BuyCellTable;
