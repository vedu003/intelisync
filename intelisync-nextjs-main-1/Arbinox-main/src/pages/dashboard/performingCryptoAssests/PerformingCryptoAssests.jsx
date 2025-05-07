import { Box, Paper, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_configs } from "@/api-services";
import Crypto from "./Crypto";

const PerformingCryptoAssestsBox = styled("div")(({ theme }) => ({
  "& .mainBox": {
    "& .mainTab": {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "wrap",
      width: "fit-content",
      background: "#FFFFFF08",
      borderRadius: "8px",
    },
    "& .tabActiveButtons": {
      pointerEvents: "none",
      background: "#FFFFFF",
      padding: "8px 15px",
      transition: "all 500ms ease-in-out",
      cursor: "pointer",
      whiteSpace: "pre",
      color: "#000000",
      fontWeight: 500,
      "& p": {
        color: "#000000",
        fontWeight: 700,
      },
    },
    "& .tabButtons": {
      borderRadius: "5px",
      border: "1px solid transparent",
      background: theme.palette.background.tabBackground,
      padding: "8px 15px",
      whiteSpace: "pre",
      cursor: "pointer",
      "& p": {
        fontWeight: 500,
        fontSize: "12px",
      },
    },
    "& span": {
      marginLeft: "5px",
    },
    "& .paperContainer": {
      height: "100%",
      paddingBottom: "20px",
      [theme.breakpoints.down("md")]: {
        height: "auto",
      },
    },
  },
}));

const PerformingCryptoAssests = () => {
  const [tabs, setTabs] = useState("24");
  const [recentData, setRecentData] = useState({});
  const token = window.localStorage.getItem("user_token");

  const HandleRecentTotalData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.cryptoAssetprofit,
        headers: {
          token: token,
        },
        params: {
          hour: tabs,
        },
      });
      if (response) {
        setRecentData(response.data.result);
      }
    } catch (error) {
      console.log(" error ", error);
    }
  };

  useEffect(() => {
    if (tabs) {
      HandleRecentTotalData();
    }
  }, [tabs]);

  const getBorderRadius = (tabs, currentTab) => {
    if (tabs === currentTab) {
      if (currentTab === "24") return "8px 0px 0px 8px";
      if (currentTab === "168") return "0px 0px 0px 0px";
      if (currentTab === "720") return "0px 8px 8px 0px";
    }
    return "0px";
  };

  return (
    <PerformingCryptoAssestsBox>
      <Box className="mainBox">
        <Paper elevation={2} className="paperContainer">
          <Box
            className="displaySpacebetween"
            flexWrap="wrap"
            style={{ gap: "10px" }}
          >
            <Typography variant="h6" className="textDash">
              Total Profits <span style={{ color: "#FFFFFFB2" }}> (USDT)</span>
            </Typography>
            <Box className="mainTab">
              <Box
                className={tabs === "24" ? "tabActiveButtons" : "tabButtons"}
                onClick={() => setTabs("24")}
                style={{ borderRadius: getBorderRadius(tabs, "24") }}
              >
                <Typography variant="body1" color="secondary">
                  Daily
                </Typography>
              </Box>
              <Box
                className={tabs === "168" ? "tabActiveButtons" : "tabButtons"}
                onClick={() => setTabs("168")}
                style={{ borderRadius: getBorderRadius(tabs, "168") }}
              >
                <Typography variant="body1" color="secondary">
                  Weekly
                </Typography>
              </Box>
              <Box
                className={tabs === "720" ? "tabActiveButtons" : "tabButtons"}
                onClick={() => setTabs("720")}
                style={{ borderRadius: getBorderRadius(tabs, "720") }}
              >
                <Typography variant="body1" color="secondary">
                  Monthly
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* <TransBar /> */}
          {/* <CryptoDetails /> */}
          <Crypto recentData={recentData} />
        </Paper>
      </Box>
    </PerformingCryptoAssestsBox>
  );
};

export default PerformingCryptoAssests;
