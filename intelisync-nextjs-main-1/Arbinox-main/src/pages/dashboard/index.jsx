"user client";
import { Box, Typography, Grid, Paper, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api_configs } from "@/api-services";
import CombinedExtendedProfits from "./ExtendedProfit/CombinedExtendedProfits";
import PerformingCryptoAssests from "./performingCryptoAssests/PerformingCryptoAssests";
import TopCryptoAsset from "./ExtendedProfit/TopCryptoAsset";
import DashboardLayout from "@/layout/DashboardLayout";
import RecentTotalProfile from "./recentTotalProfile/RecentTotalProfile";
import WalletIcon from "@mui/icons-material/Wallet";
import AppContext from "@/context/AppContext";
import Image from "next/image";
import { fixDecimal } from "@/utils";
import { Lock } from "@mui/icons-material";
import { TbLayoutDashboard } from "react-icons/tb";

const DashboardPage = styled(Box)(({ theme }) => ({
  "& .paperContainer": {
    padding: "15px",
    position: "relative",
  },

  "& .mainDashboardCardBox": {
    "& h2": {
      fontSize: "25px",
    },
    "& .walletCard": {
      borderRadius: "10px",

      "& h5": {
        fontSize: "15px",
      },
      "& p": {
        fontSize: "12px",
        fontWeight: 400,
        [theme.breakpoints.down("lg")]: {
          fontSize: "12px",
        },
      },
      "& .displayStart": {
        alignItems: "flex-start",

        display: "flex",
        justifyContent: "flex-start",
      },
    },
  },
}));

export default function DashdoardHome() {
  const { exchangeList, setTopHeading } = useContext(AppContext);
  const token = window.localStorage.getItem("user_token");
  const [dashbaordData, setDashboardData] = useState({
    highestProfit: 0,
    totalArbitrage: 0,
    totalConnectedExchange: 0,
    totalLoss: 0,
    totalProfit: 0,
  });
  const [filterData, setFilterData] = useState({
    toDate: null,
    fromDate: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [allExchangeTotal, setallExchangeTotal] = useState(false);
  const [totalallExchangeTotalLocked, setallTotalallExchangeTotalLocked] =
    useState();

  const getConnectedExchangeBalanceList = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: api_configs.exchangeBalance,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode == 200) {
        //Total Wallet Balance
        setallExchangeTotal(response?.data?.result?.allExchangeTotal);
        setallTotalallExchangeTotalLocked(
          response?.data?.result?.allExchangeTotalLocked
        );
      } else {
        setallExchangeTotal(false);
      }
    } catch (error) {
      setallExchangeTotal(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getConnectedExchangeBalanceList();
  }, [token]);

  const getDashbaordDataHandler = async () => {
    try {
      setIsLoading(true);
      const dataToSend = {
        fromDate: filterData.fromDate ? filterData.fromDate : null,
        toDate: filterData.toDate ? filterData.toDate : null,
      };
      const response = await axios({
        method: "GET",
        url: api_configs.Dashboard,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response) {
        let response1 = response.data.result;
        setIsLoading(false);
        setDashboardData(response1);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("user_token")) {
      getDashbaordDataHandler();
    }
  }, [window.localStorage.getItem("user_token")]);

  const dashboardData = [
    {
      title: "Balance",
      balance: allExchangeTotal ? allExchangeTotal : 0,
      backgroundColorCode: "#FFFFFF08",
      description: "Application Wallet Balance",
      imgicon: "/images/Dashboard/dashicon_1.svg",
      icon: "",
      usdt: " USDT",
    },
    {
      title: "Lock Balance",
      balance: totalallExchangeTotalLocked ? totalallExchangeTotalLocked : 0,
      backgroundColorCode: "#FFFFFF08",
      description: "Lock Wallet Balance",
      imgicon: "",
      icon: (
        <Box
          style={{
            borderRadius: "50%",
          }}
          className="imageIcon"
        >
          <Lock sx={{ color: "#a2a2a3", padding: "10px" }} />
        </Box>
      ),
      usdt: " USDT",
    },
    {
      title: "Total Balance",
      balance: totalallExchangeTotalLocked
        ? allExchangeTotal
          ? allExchangeTotal + totalallExchangeTotalLocked
          : 0
        : 0,
      backgroundColorCode: "#FFFFFF08",
      description: "Total Wallet Balance",
      imgicon: "",
      icon: (
        <Box
          style={{
            borderRadius: "50%",
          }}
          className="imageIcon"
        >
          <WalletIcon sx={{ color: "#a2a2a3", padding: "10px" }} />
        </Box>
      ),
      usdt: " USDT",
    },
    {
      title: "Exchange",
      backgroundColorCode: "#FFFFFF08",
      balance: dashbaordData?.totalConnectedExchange,
      description: "Connected Exchange",
      imgicon: "/images/Dashboard/dashboard_2.svg",
      icon: "",
    },
    {
      title: "Transactions",
      backgroundColorCode: "#FFFFFF08",
      balance: dashbaordData?.totalArbitrage,
      description: "Transactions",
      imgicon: "/images/Dashboard/dashicon_3.svg",
      icon: "",
    },
    {
      title: "Total Profit",
      backgroundColorCode: "#FFFFFF08",
      balance: dashbaordData?.totalProfit,
      description: "Total Profit",
      imgicon: "/images/Dashboard/dashicon_4.svg",
      icon: "",
      usdt: " USDT",
    },
    {
      title: "Highest Profit",
      backgroundColorCode: "#FFFFFF08",
      balance: dashbaordData?.highestProfit,
      description: "Highest Profit",
      imgicon: "/images/Dashboard/dashboard_6.svg",
      icon: "",
      usdt: " %",
    },
  ];
  useEffect(() => {
    setTopHeading(
      <Box display="flex" alignItems="center">
        <TbLayoutDashboard color="#fff" style={{ marginRight: "6px" }} />
        <Typography variant="h3" color="primary" whiteSpace="pre">
          Dashboard
        </Typography>
      </Box>
    );
  }, []);

  return (
    <DashboardPage>
      <Box className="dashboardBox">
        <Box mb={1.4} className="mainDashboardCardBox">
          <Grid container spacing={1.4}>
            {dashboardData &&
              dashboardData?.map((data) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4}>
                  <Paper elevation={2} className="paperContainer">
                    {data?.imgicon ? (
                      <Image
                        width={44}
                        height={44}
                        src={data.imgicon}
                        alt="Icon"
                        className="imageIcon"
                      />
                    ) : (
                      data?.icon
                    )}
                    <Box className="walletCard">
                      <Box>
                        <Box className="displaySpacebetween">
                          <Typography variant="h5">
                            {data?.title ? data?.title : "N/A"}
                          </Typography>
                        </Box>

                        <Typography
                          variant="h2"
                          color="primary"
                          mt={1}
                          className="purpleTextgradient"
                        >
                          {Number(fixDecimal(data.balance))}
                          <span style={{ fontSize: "16px", fontWeight: "500" }}>
                            {data.usdt}
                          </span>
                        </Typography>

                        <Typography
                          variant="body1"
                          color="secondary"
                          noWrap
                          mt={1}
                        >
                          {data?.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box mb={1.4}>
          <Grid container spacing={1.4}>
            <Grid item xs={12} sm={12} md={6}>
              <RecentTotalProfile />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <PerformingCryptoAssests />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <CombinedExtendedProfits />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <TopCryptoAsset />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </DashboardPage>
  );
}

DashdoardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
