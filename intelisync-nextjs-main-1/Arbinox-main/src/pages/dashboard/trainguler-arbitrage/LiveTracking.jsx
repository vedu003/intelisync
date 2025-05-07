import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Switch,
  LinearProgress,
  Dialog,
  Divider,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import DetailsComponent from "./DetailsComponent";
import LiveTable from "./LiveTable";
import { styled } from "@mui/system";

const LivetableBox = styled(Box)(({ theme }) => ({
  "& .MuiDivider-root": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
}));
const GreenBox = styled(Box)`
  width: 36px;
  height: 36px;
  background-color: #5cd748;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const RedBox = styled(Box)`
  width: 36px;
  height: 36px;
  background-color: #ff3939;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const directdata = [
  {
    buyPrice: "14192.00",
    currencyImage: "/images/gatelo.png",
    price: "5233.1703 USDT",
    title: "RFUEL",
    buyPriceText: "Buy price:",
    buyPriceValue: " $5276.1045",
    tradingText: "Trading charges:",
    tradingValue: "$5276.1045",
    finalBuyText: "Final buy price:",
    finalBuyValue: "  $5276.10457",
    convertImage: "/images/bitbns.png",
    convertText1: "OXT",
    convertText2: "BCH",
    convertTo: "BitBns",
    sellImage: "/images/gatelo.png",
    exchange: "Gatelo",
    sellNameValue: " $5276.1045",
    sellNameText: "Sell price:",
    cryptoTradingText: "Crypto trading charges:",
    cryptoTradingValue: "  $13.1903(0.25%)",
    cryptoNetText: "Crypto transfer network:",
    cryptoNetValue: "   $5289.2984",
    tradingChargesText: " Trading charges:",
    tradingChargesValue: "$5289.2984",
    finalSellText: "Final sell price:",
    finalSellValue: " $5289.2984",
  },
];
function LiveTracking({ data, open, onClose }) {
  return (
    <>
      <LivetableBox>
        <Dialog
          open={open}
          onClose={() => onClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
          className="paperClass"
        >
          <Box
            className="livetrackBox"
            sx={{
              position: "relative",
              [(theme) => theme.breakpoints.down("xs")]: {
                padding: "10px",
              },
              "& .MuiSelect-selectMenu": {
                fontSize: "16px",
              },
              "& .greenprogressbar": {
                position: "relative",
              },
            }}
          >
            <IconButton
              className="cancelBtn"
              onClick={() => onClose(false)}
              sx={{
                position: "absolute",
                top: "-18px",
                right: "-18px",
                width: "60px",
                height: "60px",
                "& svg": {
                  fontWeight: "700",
                  fontSize: "30px",
                },
              }}
            >
              <IoClose />
            </IconButton>
            <Grid container spacing={1} alignItems="center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box>
                  <Typography
                    variant="h2"
                    color="primary"
                    style={{ fontSize: "35px" }}
                  >
                    Live tracking
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4} mb={3}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className="displayStart" mb={3}></Box>

                <DetailsComponent
                  data={data}
                  ExecuteButtonType={true}
                  onClose={() => onClose()}
                />
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </LivetableBox>
    </>
  );
}

export default LiveTracking;
