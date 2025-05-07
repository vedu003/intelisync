import React, { useState } from "react";
import { Typography, Box, Grid, LinearProgress, Divider } from "@mui/material";
import axios from "axios";
import LiveTable from "./LiveTable";
import { styled } from "@mui/system";
// import Popup from "@/components/DynamicModel";
import toast from "react-hot-toast";
import { api_configs } from "@/api-services";

import dynamic from "next/dynamic";

const Popup = dynamic(() => import("@/components/DynamicModel"));
const DetailsComponent = dynamic(() => import("./DetailsComponent"));
// import DetailsComponent from "./DetailsComponent";

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

function LiveTracking({ data, open, onClose }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const token = window.localStorage.getItem("user_token");

  const tradeProfitPathsDirectHandler = async (value) => {
    try {
      setIsProcessing(true);
      // return;
      const dataToSend = {
        base: value.base,
        pair: value.pair,
        buy: value.buy,
        exchange1_price: value.exchange1_price,
        sell: value.sell,
        exchange2_price: value.exchange2_price,
        capital: value.baseCapital,
        capitalInUSDT: value.capital,
      };
      const apiEndPointCheck = "tradeProfitPathsDirectArb";
      const response = await axios({
        method: "POST",
        url: api_configs[apiEndPointCheck],
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.status == 200) {
        toast.success(response.data.responseMessage);
        onClose(false);
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
        onClose(false);
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
        toast.error(error.message);
      }
    }
  };
  return (
    <LivetableBox>
      <Popup
        maxWidth="xxl"
        open={open}
        handleClose={() => {
          if (!isProcessing) {
            onClose(false);
          }
        }}
        isLoading={isProcessing}
        title="Live tracking"
        actions={[
          {
            label: "Submit",
            onClick: () => tradeProfitPathsDirectHandler(data),
            color: "secondary",
            variant: "contained",
            isLoading: isProcessing,
          },
        ]}
      >
        <Box align="center">
          <Typography variant="h2" color="primary" style={{ fontSize: "35px" }}>
            Live tracking
          </Typography>
        </Box>
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
          <Grid container spacing={1} alignItems="center">
            <Grid item lg={4} md={4} sm={6} xs={12}></Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Box display="flex" alignItems="center">
                <Box className="displayStart">
                  <Typography variant="body1" color="primary">
                    Asks
                  </Typography>
                  <RedBox className="redBox" ml={2}></RedBox>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{
                    height: 10,
                    width: "100%",
                    borderRadius: 5,
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    colorPrimary: {
                      width: "50%",
                      backgroundColor: "transparent",
                      border: "1px solid gray",
                    },
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 5,
                      backgroundColor: "#FF3939",
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Box display="flex" alignItems="center">
                <Box className="displayStart">
                  <Typography variant="body1" color="primary">
                    Bids
                  </Typography>
                  <GreenBox className="greenBox" ml={2}></GreenBox>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{
                    height: 10,
                    width: "100%",
                    borderRadius: 5,
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    colorPrimary: {
                      width: "50%",
                      backgroundColor: "transparent",
                      border: "1px solid gray",
                    },
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 5,
                      backgroundColor: "#5CD748",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box mt={4} mb={3}>
            <Divider />
          </Box>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={6} xs={12} className="liveleftBox">
              <DetailsComponent
                data={data}
                ExecuteButtonType={true}
                onClose={() => onClose()}
              />
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <Box mb={3}>
                <Typography variant="h5" color="primary">
                  Order Book
                </Typography>
                <LiveTable data={data} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Popup>
    </LivetableBox>
  );
}

export default LiveTracking;
