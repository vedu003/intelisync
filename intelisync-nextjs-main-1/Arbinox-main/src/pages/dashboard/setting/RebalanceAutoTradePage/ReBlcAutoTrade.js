import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import IntraArbitrage from "./IntraArbitrage";
import TriangularArbitage from "./TriangularArbitage";
import toast from "react-hot-toast";

const RebalanceAutoTradeBox = styled(Box)(({ theme }) => ({
  "& .filterpaperBox": {
    padding: "10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
    boxShadow: "none",
  },
  "& .tabBox": {
    display: "flex",
    background: "#FFFFFF08",
    borderRadius: "8px",
    padding: "0px !important",
    width: "100%",
  },
  "& .tabButton": {
    padding: "10px 25px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#FFFFFF99",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 16px",
      fontSize: "10px !important",
    },
    "&:hover": {
      color: "#FFFFFF99",
      background: "none",
    },
    "&.active": {
      color: "#000",
      background: "#fff",
    },
  },
}));

const getBorderRadius = (tabView, currentTab) => {
  if (tabView === currentTab) {
    if (currentTab === "Intra") return "0px 8px 8px 0px";
    if (currentTab === "Triangular") return "8px 0px 0px 8px";
  }
  return "0px";
};

export default function ReBlcAutoTrade() {
  const [tabView, setTabView] = useState("Triangular");

  return (
    <RebalanceAutoTradeBox>
      <Grid container>
        <Grid item sm={12} xs={12}>
          <Paper elevation={2} className="paperBox">
            <Box mb={2}>
              <Typography variant="h5" color="primary">
                Strategy
              </Typography>
            </Box>
            <Box className="tabBox">
              <Button
                fullWidth
                className={`tabButton ${
                  tabView === "Triangular" ? "active" : ""
                }`}
                onClick={() => setTabView("Triangular")}
                style={{ borderRadius: getBorderRadius(tabView, "Triangular") }}
              >
                Triangular
              </Button>
              <Button
                fullWidth
                className={`tabButton ${tabView === "Intra" ? "active" : ""}`}
                onClick={() => setTabView("Intra")}
                // onClick={() => toast.error("Coming Soon!")}
                style={{ borderRadius: getBorderRadius(tabView, "Intra") }}
              >
                Integrated
              </Button>
            </Box>
            {tabView === "Triangular" && <TriangularArbitage />}
            {tabView === "Intra" && <IntraArbitrage />}
          </Paper>
        </Grid>
      </Grid>
    </RebalanceAutoTradeBox>
  );
}
