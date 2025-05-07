import { Box, Typography, Paper, Grid, Switch, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { styled } from "@mui/system";
import TradeCheck from "@/components/TradeCheck";
import toast from "react-hot-toast";

const BotSettingBox = styled(Box)(({ theme }) => ({
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
  },
  "& .tabButton": {
    fontSize: "15px !important",
    fontWeight: "400 !important",
    color: "#FFFFFF99 !important",
    // borderRadius: "8px !important",
    whiteSpace: "pre",
    position: "relative",
    padding: "12px 37px",
    "@media(max-width:767px)": {
      padding: "8px 12px",
    },
    "&:hover": {
      color: "#0C151D !important",
      background: "#FFFFFF !important",
    },
    "&.active": {
      fontFamily: "'Outfit', sans-serif",
      background: "#FFFFFF !important",
      lineHeight: "21.71px",

      borderBottom: "none !important",
      color: "#0C151D !important",
    },
  },
}));

const getBorderRadius = (tabView, currentTab) => {
  if (tabView === currentTab) {
    if (currentTab === "Direct") return "8px 0px 0px 8px";
    if (currentTab === "Triangular") return "0px 0px 0px 0px";
    if (currentTab === "Intra") return "0px 8px 8px 0px";
  }
  return "0px";
};

export default function BotSetting({ botType }) {
  const [tabView, setTabView] = useState("Direct");

  return (
    <BotSettingBox>
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <Paper elevation={2} className="paperBox">
            <Box mb={2.5}>
              <Typography variant="h6" color="primary">
                Strategy
              </Typography>
            </Box>
            <Box className="tabBox">
              <Button
                fullWidth
                className={`tabButton ${tabView === "Direct" ? "active" : ""}`}
                onClick={() => setTabView("Direct")}
                // onClick={() => toast.error("Coming Soon!")}
                style={{ borderRadius: getBorderRadius(tabView, "Direct") }}
              >
                Direct Arbitrage
              </Button>
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
                Intra
              </Button>
            </Box>
            {tabView === "Triangular" && (
              <TradeCheck type="Triangular" botType={botType} />
            )}
            {tabView === "Intra" && (
              <TradeCheck type="Intra" botType={botType} />
            )}
            {tabView === "Direct" && (
              <TradeCheck type="Direct" botType={botType} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </BotSettingBox>
  );
}
