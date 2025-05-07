import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import AutoTradeTab from "./AutoTradeTab";
import { useRouter } from "next/router";
import AppContext from "@/context/AppContext";
import { MdOutlineSettings } from "react-icons/md";
import SettingProfile from "./SettingProfile";
import HybridTab from "./HybridTab";

const SettingMainBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .MuiSvgIcon-root.MuiSelect-icon ": {
    color: "#fff",
  },
  "& .filterpaperBox": {
    width: "100%",
    maxWidth: "400px",
    padding: "0px !important",
    borderRadius: "8px",
    border: "none",
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
  "& .tabBox-main": {
    width: "fit-content",
    background: "#FFFFFF08",
    borderRadius: "12px",
    display: "flex",
    // padding: "8px",
    gap: "10px",
    "@media(max-width:767px)": {
      width: "100%",
    },
  },
}));

const getBorderRadius = (tabView, currentTab) => {
  if (tabView === currentTab) {
    if (currentTab === "Profile") return "8px 0px 0px 8px";
    if (currentTab === "auto") return "0px 0px 0px 0px";
    if (currentTab === "Hybrid") return "0px 8px 8px 0px";
  }
  return "0px";
};

export default function TradingSetting() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const [tabView, setTabView] = useState(
    router.query.type ? router.query.type : "Profile"
  );
  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <MdOutlineSettings color="#fff" style={{ marginRight: "6px" }} />
        <Typography variant="h3" color="primary" whiteSpace="pre">
          My Account
        </Typography>
      </Box>
    );
  }, []);

  return (
    <SettingMainBox>
      <Box
        className="transacMainBox  displaySpacebetween"
        style={{ marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}
      >
        <Box className="tabBox-main">
          <Button
            fullWidth
            className={`tabButton ${tabView === "Profile" ? "active" : ""}`}
            onClick={() => setTabView("Profile")}
            sx={{
              borderRadius: getBorderRadius(tabView, "Profile"),

              ":hover": {
                borderRadius: "8px 0px 0px 8px",
              },
            }}
          >
            Profile
          </Button>
          <Button
            fullWidth
            className={`tabButton ${tabView === "auto" ? "active" : ""}`}
            onClick={() => setTabView("auto")}
            style={{ borderRadius: getBorderRadius(tabView, "auto") }}
          >
            Auto Trading
          </Button>
          <Button
            fullWidth
            className={`tabButton ${tabView === "Hybrid" ? "active" : ""}`}
            onClick={() => setTabView("Hybrid")}
            sx={{
              borderRadius: getBorderRadius(tabView, "Hybrid"),
              ":hover": {
                borderRadius: "0px 8px 8px 0px",
              },
            }}
          >
            Hybrid
          </Button>
        </Box>
      </Box>

      {tabView === "Profile" && <SettingProfile />}
      {/* {tabView === "Trading" && <Trading />} */}
      {tabView === "auto" && <AutoTradeTab />}
      {tabView === "Hybrid" && <HybridTab />}
    </SettingMainBox>
  );
}
TradingSetting.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
