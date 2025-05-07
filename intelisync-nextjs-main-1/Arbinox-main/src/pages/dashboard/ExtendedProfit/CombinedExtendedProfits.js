import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CombinedProfitCard from "./CombinedProfitCard";
import axios from "axios";
import { api_configs } from "@/api-services";

const CombinedExtendedBox = styled("div")(({ theme }) => ({
  "& .paperContainer": {
    // minHeight: "206px",

    height: "100%",
    minHeight: "209px",
    [theme.breakpoints.down("sm")]: {
      padding: "6px",
      // background: "transparent",
    },
    // [theme.breakpoints.down("md")]: {
    //   height: "auto",
    // },
  },

  "& h5": {
    fontWeight: 500,
    fontSize: "16px",
  },
  "& .MuiAutocomplete-endAdornment": {
    position: "absolute",
    top: "calc(30% - 14px)",
  },
  "& .MuiAutocomplete-root .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
    minWidth: "52px",
  },
}));

export default function CombinedExtendedProfits() {
  const [isloading, setIsLoading] = useState(false);
  const [recentData, setRecentData] = useState({});
  const token = window.localStorage.getItem("user_token");
  const HandleRecentProfite = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.DashboardRecentData,
        headers: {
          token: token,
        },
        params: {
          hour: 720,
        },
      });

      if (response) {
        setRecentData(response.data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    HandleRecentProfite();
  }, []);

  return (
    <CombinedExtendedBox>
      <Paper elevation={2} className="paperContainer">
        <Box
          mb={2}
          className="displaySpacebetween combinedBox responsiveManage"
        >
          <Typography variant="h6" className="textDash" color="primary">
            Combined Extended Profits
          </Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4} md={4}>
            <CombinedProfitCard
              day={"30"}
              percentage={
                recentData?.total30DayProfit
                  ? parseFloat(recentData?.total30DayProfit).toFixed(2)
                  : 0
              }
              capital={
                recentData?.total30dayCaptial
                  ? parseFloat(recentData?.total30dayCaptial).toFixed(2)
                  : 0
              }
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <CombinedProfitCard
              day={"60"}
              percentage={
                recentData?.total60DayProfit
                  ? parseFloat(recentData?.total60DayProfit).toFixed(2)
                  : 0
              }
              capital={
                recentData?.total60dayCaptial
                  ? parseFloat(recentData?.total60dayCaptial).toFixed(2)
                  : 0
              }
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <CombinedProfitCard
              day={"90"}
              percentage={
                recentData?.total90DayProfit
                  ? parseFloat(recentData?.total90DayProfit).toFixed(2)
                  : 0
              }
              capital={
                recentData?.total90dayCaptial
                  ? parseFloat(recentData?.total90dayCaptial).toFixed(2)
                  : 0
              }
            />
          </Grid>
        </Grid>
      </Paper>
    </CombinedExtendedBox>
  );
}
