import { Box, Typography, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import PersonalStats from "@/components/stats/PersonalStats";
import GlobalStats from "@/components/stats/GlobalStats";
import DashboardLayout from "@/layout/DashboardLayout";
import { api_configs } from "@/api-services";
import axios from "axios";
import moment from "moment";
import CustomHead from "@/components/CustomHead";

const StatisticsComponent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .filterpaperBox": {
    padding: "10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
  },
  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
  },
  "& .tabButton": {
    borderRadius: "5px",
    width: "110px",
    height: "50px",
    fontSize: "14px",
    fontWeight: "400",
    color: "#fff",
    margin: "0 5px",
    borderRadius: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      width: "100px",
    },
    "&:hover": {
      borderRadius: "5px",
      color: "#fff",
    },
    "&.active": {
      color: "#fff",
      borderRadius: "5px",
      background: "rgba(255, 255, 255, 0.05)",
    },
  },
}));

export default function Statistics() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [tabView, setTabView] = useState("personal");
  const [newArrayDataUser, setnewArrayDataUser] = useState({});
  const [profitList, setProfitList] = useState({});

  const statisticHandlerChart = async () => {
    try {
      setIsLoading1(true);
      const res = await axios({
        method: "GET",
        url: api_configs.profitStats,
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
        params: {
          type: "year",
        },
      });
      if (res.data.responseCode === 200) {
        // const entries = Object.entries(res?.data?.result);
        // let newarraybuy = [];
        // let newarraysell = [];
        // let newarray4 = [];
        // const monthArr = [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        //   "Oct",
        //   "Nov",
        //   "Dec",
        // ];
        // for (var i = 0; i < entries?.length; i++) {
        //   newarraybuy.push(entries[i][1]?.buy);
        //   newarraysell.push(entries[i][1]?.sell);
        //   // newarray3.push(moment(entries[i][1]?.date).format("MMM Do YY"));
        //   newarray4.push(monthArr[entries[i][1]?.month - 1]);
        // }
        setProfitList(res.data.result);
        setIsLoading1(false);
      }
      setIsLoading1(false);
    } catch (error) {
      console.log("err ", error);
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    statisticHandlerChart();
  }, []);
  const statisticHandlerprofitStats = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: api_configs.statistic,
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
        params: {
          type: "year",
        },
      });
      if (res.data.responseCode === 200) {
        const entries = Object.entries(res?.data?.result);
        let newarraybuy = [];
        let newarraysell = [];
        let newarray4 = [];
        const monthArr = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        for (var i = 0; i < entries?.length; i++) {
          newarraybuy.push(entries[i][1]?.buy);
          newarraysell.push(entries[i][1]?.sell);
          // newarray3.push(moment(entries[i][1]?.date).format("MMM Do YY"));
          newarray4.push(monthArr[entries[i][1]?.month - 1]);
        }
        setnewArrayDataUser({ newarraybuy, newarraysell, newarray4 });
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("err ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    statisticHandlerprofitStats();
  }, []);

  return (
    <StatisticsComponent>
      <CustomHead
        title="Statistics | Me.Cap"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Typography
        variant="h2"
        color="primary"
        style={{ fontSize: "35px", fontWeight: "400" }}
      >
        Statistics
      </Typography>
      {/* <Paper elevation={2} className="filterpaperBox">
        <Box className="tabBox">
          <Button
            className={`tabButton ${tabView === "personal" ? "active" : ""}`}
            onClick={() => setTabView("personal")}
          >
            Your Stats
          </Button>
          <Button
            className={`tabButton ${tabView === "global" ? "active" : ""}`}
            onClick={() => setTabView("global")}
          >
            Global Stats
          </Button>
        </Box>
      </Paper> */}
      {tabView === "personal" && (
        <PersonalStats
          tabView={tabView}
          newArrayDataUser={newArrayDataUser}
          profitList={profitList}
        />
      )}
      {tabView === "global" && (
        <GlobalStats
          tabView={tabView}
          newArrayDataUser={newArrayDataUser}
          profitList={profitList}
        />
      )}
    </StatisticsComponent>
  );
}

Statistics.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
