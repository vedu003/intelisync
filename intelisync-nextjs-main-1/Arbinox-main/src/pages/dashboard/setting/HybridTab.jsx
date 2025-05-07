import { Box, Typography, Paper, Switch } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/system";
import AppContext from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { api_configs } from "@/api-services";

const RebalanceAutoTradeBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .filterpaperBox": {
    padding: "10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
    background: "linear-gradient(hsla(0,1%,50%,.07),hsla(0,3%,48%,.07))",
    boxShadow: "none",
  },
}));

export default function HybridTab() {
  const auth = useContext(AppContext);
  const [checkHybrid, setCheckHybrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeHybridApi = async (checked) => {
    setCheckHybrid(checked);
    try {
      setIsLoading(true);
      const res = await axios({
        url: api_configs.onOffHybrid,
        method: "GET",
        headers: {
          token: localStorage.getItem("user_token"),
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        auth.getProfileDataHandler(localStorage.getItem("user_token"));
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.userData) {
      setCheckHybrid(auth.userData.isHybridOrder);
    }
  }, [auth.userData]);

  return (
    <RebalanceAutoTradeBox mt={4}>
      {/* <Paper elevation={2} className="filterpaperBox"> */}

      <Paper elevation={2} className="paperBox">
        <Box mb={2}>
          <Typography variant="h5" color="primary">
            Hybrid On/Off
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              display: "contents",
              pt: 1,
            }}
          >
            <span
              style={
                !checkHybrid
                  ? {
                      color: "red",
                    }
                  : {}
              }
            >
              {" "}
              Off
            </span>{" "}
            &nbsp;
            <Switch
              color="primary"
              onChange={() => handleChangeHybridApi(!checkHybrid)}
              checked={checkHybrid}
              name="checkedA"
              inputProps={{ "aria-label": "secondary checkbox" }}
              sx={{
                pointerEvents: isLoading ? "none" : "auto",
              }}
            />
            &nbsp;
            <span
              style={
                checkHybrid
                  ? {
                      color: "green",
                    }
                  : {}
              }
            >
              {" "}
              On
            </span>
          </Typography>
        </Box>
      </Paper>
    </RebalanceAutoTradeBox>
  );
}
