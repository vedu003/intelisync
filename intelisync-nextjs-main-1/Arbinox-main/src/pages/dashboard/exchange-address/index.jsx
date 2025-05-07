import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import Table1 from "./Table1";
import Table2 from "./Table2";
import toast from "react-hot-toast";
import axios from "axios";
import { api_configs } from "@/api-services";

const SettingMainBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .MuiSvgIcon-root.MuiSelect-icon ": {
    color: "#fff",
  },
  "& .filterpaperBox": {
    padding: "10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.04)",
    boxShadow: "none",
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
      background: "rgba(255, 255, 255, 0.07)",
    },
  },
}));

export default function ExchangeAddress() {
  const [tabView, setTabView] = useState("Exchange");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SettingMainBox>
      <Typography
        variant="h2"
        color="primary"
        style={{ fontSize: "35px", fontWeight: "400" }}
      >
        Exchnage Address
      </Typography>
      <Paper elevation={2} className="filterpaperBox">
        <Box className="tabBox">
          <Button
            className={`tabButton ${tabView === "Exchange" ? "active" : ""}`}
            onClick={() => setTabView("Exchange")}
          >
            Exchange
          </Button>
          <Button
            className={`tabButton ${tabView === "pairList" ? "active" : ""}`}
            onClick={() => setTabView("pairList")}
          >
            Pair List
          </Button>
        </Box>
      </Paper>
      {tabView === "Exchange" && <Table1 />}
      {tabView === "pairList" && <Table2 />}
    </SettingMainBox>
  );
}
ExchangeAddress.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
