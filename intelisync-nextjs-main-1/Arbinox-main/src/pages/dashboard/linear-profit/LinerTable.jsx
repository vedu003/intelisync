import {
  Box,
  TableRow,
  styled,
  TableCell,
  TableContainer,
  Table,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import LinearViewpage from "./LinearViewpage";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiTableCell-root": {
    padding: "25px 16px",
    minWidth: "240px",

    position: "relative",
    "&::before": {
      position: "absolute",
      width: "1px",
      height: "68%",
      content: "''",
      borderLeft: "1px dashed #FFFFFF1A",
      top: "17%",
      left: "0px",
    },
  },
  "& .MuiTableContainer-root": {
    background: "transparent",
  },
  "& .MuiTableRow-root": {
    background: "#000000",
    margin: "12px 0",
    borderRadius: "20px",
    display: "block",
    width: "100%",
  },
  "& .tableBox": {
    minWidth: "800px",
  },
  "& .rowOdd": {
    background: "rgba(255, 255, 255, 0.04)",
  },
  "& .rowEven": {
    background: "rgb(16 21 17)",
  },
}));

const CustomTableCell = ({ title, quantity, price, color }) => (
  <TableCell component="th" scope="row">
    <Box className="displaySpacebetween">
      <Typography variant="body1" color={color} fontWeight="600">
        {title}
      </Typography>
      <img src="/images/binance_1.svg" />
    </Box>
    <Box className="displayCenter linerarCenterButton" mt={2}>
      <Typography variant="body1" color="primary">
        {quantity}
      </Typography>
    </Box>
    <Box className="displayCenter" mt={1.4}>
      <Typography variant="body1" color="secondary">
        {price}
      </Typography>
    </Box>
  </TableCell>
);

// Main Component
export default function LinerTable({}) {
  const [authenticationSuccess, setAuthenticationSuccess] = useState(false);
  const [authSettingData, setAuthSettingData] = useState(false);
  const [tab, setTab] = useState("listPlacedDirectTradeWithFilter");
  const data = [
    {
      title: "BUY",
      quantity: "47340.11 DENT",
      price: "0.0015 USDT per DENT",
      color: "#80EC00",
    },
    {
      title: "SELL",
      quantity: "47340.11 DENT",
      price: "0.0015 USDT per DENT",
      color: "#F61457",
    },
    {
      title: "SELL",
      quantity: "47340.11 DENT",
      price: "0.0015 USDT per DENT",
      color: "#F61457",
    },
    {
      title: "Triangular",
      quantity: "47340.11 DENT",
      price: (
        <>
          Arbitrage <span style={{ color: "#80EC00" }}>0.37% (0.34 USDT)</span>
        </>
      ),
      color: "primary",
    },
  ];

  return (
    <MainBox>
      <TableContainer>
        <Table>
          {Array(5)
            .fill(null)
            .map((_, idx) => (
              <TableRow key={idx}>
                {data.map((item, i) => (
                  <CustomTableCell key={i} {...item} />
                ))}
                <TableCell component="th" scope="row">
                  <Box
                    className="displayCenter"
                    mt={1.4}
                    style={{
                      flexDirection: "column",
                      gap: "10px",
                      padding: "8px 25px",
                    }}
                  >
                    <Button variant="contained" style={{ padding: "9px 31px" }}>
                      Trade Now
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        background: "#FFFFFF1A",
                        color: "#fff",
                        padding: "9px 31px",
                      }}
                      onClick={() => {
                        // handleClose();
                        setAuthenticationSuccess(true);
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </TableContainer>

      {authenticationSuccess && (
        <LinearViewpage
          open={authenticationSuccess}
          handleClose={() => {
            // handleClose();
            setAuthenticationSuccess(false);
          }}
        />
      )}
    </MainBox>
  );
}
