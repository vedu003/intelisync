import { Box, Divider, Typography, Paper, Button } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import ReBlcAutoTrade from "./RebalanceAutoTradePage/ReBlcAutoTrade";
import AutoTradeSettingPage from "./AutoTradeSettingPage";

const AutoTradeTabBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .filterpaperBox1": {
    borderRadius: "8px",
    marginBottom: "32px",
    padding: "0px !important",
    // background: "#FFFFFF08",
    boxShadow: "none",
    width: "100%",
  },
  "& .tabBox": {
    display: "flex",
  },
  "& .tabButton": {
    fontSize: "15px !important",
    fontWeight: "400 !important",
    color: "#FFFFFF99 !important",
    // borderRadius: "8px !important",
    whiteSpace: "pre",
    position: "relative",
    padding: "14px 37px",
    "@media(max-width:767px)": {
      padding: "8px 12px",
    },
    "&:hover": {
      color: "#ffffff",
      background: "linear-gradient(90deg, #806DFF 0%, #4A33E7 100%)",
    },
    "&.active": {
      fontFamily: "'Outfit', sans-serif",
      background:
        "linear-gradient(180deg, #806DFF 0%, #4A33E7 100%) !important",
      lineHeight: "21.71px",
      border: "1px solid #9A8AFE",
      boxShadow: "0px 0.83px 14.69px 0px #FFFFFF6E inset",
      borderBottom: "none !important",
      color: "#fff !important",
    },
  },
}));

const getBorderRadius = (tabs, currentTab) => {
  if (tabs === currentTab) {
    if (currentTab === "sniperAutoTrade") return "8px 0px 0px 8px";
    if (currentTab === "rebalancingAutoTrade") return "0px 8px 8px 0px";
  }
  return "0px";
};

export default function AutoTradeTab() {
  const [tabs, setTabs] = useState("sniperAutoTrade");
  return (
    <Box mt={4}>
      {/* <AutoTradeTabBox>
        <Paper elevation={2} className="filterpaperBox1">
          <Box className="tabBox">
            <Button
              fullWidth
              className={`tabButton ${
                tabs === "sniperAutoTrade" ? "active" : ""
              }`}
              onClick={() => setTabs("sniperAutoTrade")}
              // onClick={() => setTabs("sniperAutoTrade")}
              style={{ borderRadius: getBorderRadius(tabs, "sniperAutoTrade") }}
            >
              Sniper Auto Trade
            </Button>
            <Button
              fullWidth
              className={`tabButton ${
                tabs === "rebalancingAutoTrade" ? "active" : ""
              }`}
              onClick={() => setTabs("rebalancingAutoTrade")}
              style={{
                borderRadius: getBorderRadius(tabs, "rebalancingAutoTrade"),
              }}
            >
            Smart Limit Orders
          </Button>
          </Box>
        </Paper>
      </AutoTradeTabBox> */}

      <Box my={3}>
        {/* <Typography variant="h6" color="primary" fontWeight="700" mb={1}>
          {tabs === "sniperAutoTrade"
            ? "Bot Setting for Sniper Trade"
            : tabs === "autoTradeSetting"
            ? "Bot Setting for Auto Trade"
            : tabs === "rebalancingAutoTrade"
            ? "Smart Limit Orders"
            : ""}
        </Typography> */}
      </Box>
      <Box>
        {tabs === "autoTradeSetting" && <AutoTradeSettingPage botType={tabs} />}

        {tabs === "sniperAutoTrade" && <AutoTradeSettingPage botType={tabs} />}
        {tabs === "rebalancingAutoTrade" && <ReBlcAutoTrade />}
      </Box>
    </Box>
  );
}
AutoTradeTab.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
