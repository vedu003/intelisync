import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WeeklyDays from "./WeeklyDays";
import axios from "axios";
import { api_configs } from "@/api-services";
import RecentNewTable from "./RecentNewTable";
import { MenuProps } from "@/pages/auth/sign-up";

const RecentTotalBox = styled("div")(({ theme }) => ({
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
      borderRadius: "0px",
      padding: "8px 20px",
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
      background: "theme.palette.background.tabBackground",
      padding: "8px 20px",
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
      // minHeight: "206px",
      paddingBottom: "38px",
      height: "100%",
      [theme.breakpoints.down("md")]: {
        height: "auto",
      },
    },
  },
}));

const RecentTotalProfile = () => {
  const theme = useTheme();
  // const isBreaks = useMediaQuery(theme.breakpoints.down("lg"));

  const isBreaks = useMediaQuery("(max-width:1385px)");
  console.log("theme", theme);
  // const classes = useStyles();
  const [tabs, setTabs] = useState("24");
  const [isloading, setIsLoading] = useState(false);
  const [recentData, setRecentData] = useState({});
  const token = window.localStorage.getItem("user_token");

  const HandleRecentTotalData = async () => {
    try {
      setIsLoading(true);

      const response = await axios({
        method: "GET",
        url: api_configs.DashboardRecentData,
        headers: {
          token: token,
        },
        params: {
          hour: tabs,
        },
      });
      if (response) {
        setIsLoading(false);
        setRecentData(response.data.result);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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
      if (currentTab === "168") return "0px";
      if (currentTab === "720") return "0px";
      if (currentTab === "2160") return "0px 8px 8px 0px";
    }
    return "0px";
  };

  return (
    <RecentTotalBox>
      <Box className="mainBox">
        <Paper elevation={2} className="paperContainer">
          <Box
            className="displaySpacebetween"
            flexWrap="wrap"
            style={{ gap: "10px" }}
          >
            <Typography variant="h6" className="textDash" color="primary">
              Performance Overview
            </Typography>
            {isBreaks ? (
              <Box
                className="mainTab displayStart"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "34px !important",
                  },
                }}
              >
                <FormControl variant="outlined" fullWidth color="primary">
                  <Select
                    labelId="transactiosetTabsn-tab-select"
                    id="transaction-tab-select"
                    value={tabs}
                    onChange={(e) => {
                      setTabs(e.target.value);
                    }}
                    displayEmpty
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Select Transaction Tab" }}
                    color="primary"
                    sx={{ height: "44px" }}
                  >
                    <MenuItem value="24">1 Days</MenuItem>
                    <MenuItem value="168">7 Days</MenuItem>
                    <MenuItem value="720">30 Days</MenuItem>
                    <MenuItem value="2160">90 Days</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Box className="mainTab">
                <Box
                  className={tabs === "24" ? "tabActiveButtons" : "tabButtons"}
                  onClick={() => setTabs("24")}
                  style={{ borderRadius: getBorderRadius(tabs, "24") }}
                >
                  <Typography variant="body1" color="secondary">
                    1 Day
                  </Typography>
                </Box>
                <Box
                  className={tabs === "168" ? "tabActiveButtons" : "tabButtons"}
                  onClick={() => setTabs("168")}
                  style={{ borderRadius: getBorderRadius(tabs, "168") }}
                >
                  <Typography variant="body1" color="secondary">
                    7 Days
                  </Typography>
                </Box>
                <Box
                  className={tabs === "720" ? "tabActiveButtons" : "tabButtons"}
                  onClick={() => setTabs("720")}
                  style={{ borderRadius: getBorderRadius(tabs, "720") }}
                >
                  <Typography variant="body1" color="secondary">
                    30 Days
                  </Typography>
                </Box>
                <Box
                  className={
                    tabs === "2160" ? "tabActiveButtons" : "tabButtons"
                  }
                  onClick={() => setTabs("2160")}
                  style={{ borderRadius: getBorderRadius(tabs, "2160") }}
                >
                  <Typography variant="body1" color="secondary">
                    90 Days
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            <RecentNewTable recentData={recentData} />
          </Box>
        </Paper>
      </Box>
    </RecentTotalBox>
  );
};

export default RecentTotalProfile;
