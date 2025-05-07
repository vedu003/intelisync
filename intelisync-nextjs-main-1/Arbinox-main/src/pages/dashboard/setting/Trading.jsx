import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Switch,
  Button,
} from "@mui/material";

import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import { putAPIHandler } from "@/api-services/service";
import AppContext from "@/context/AppContext";
// const token = window.localStorage.getItem("user_token");

const SettingProfileBox = styled(Box)(({ theme }) => ({
  marginTop: "25px",
  "& .filterpaper": {
    padding: "22px 30px 40px",
    minHeight: "200px",
    "& p": {
      fontSize: "14px",
    },
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#222926",
    borderRadius: "10px",
    padding: "3px 0px 3px 10px",
    marginBottom: "10px",
  },
}));
const DisplayStart = styled("div")({
  display: "flex",
  alignItems: "center",
});
export default function Trading() {
  const auth = useContext(AppContext);
  const { userData } = auth;
  const [enableSwitch, setEnableSwitch] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [checkedNotification, setCheckedNotification] = useState();

  const handleNotification = async (checkStatus) => {
    setCheckedNotification(checkStatus);
    try {
      setIsLoading(true);
      const response = await putAPIHandler({
        endPoint: "enableDisableNotification",
        dataToSend: {
          notifications: {
            trade_error: checkStatus?.notiError,
            trade_cancel: checkStatus?.notiCancle,
            trade_success: checkStatus?.notiSuccess,
          },
        },
      });
      if (response.data.responseCode === 200) {
        auth.getProfileDataHandler(window.localStorage.getItem("user_token"));
        setEnableSwitch(response.data.result);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userData &&
      setCheckedNotification({
        notiSuccess: userData?.notifications?.trade_success,
        notiError: userData?.notifications?.trade_error,
        notiCancle: userData?.notifications?.trade_cancel,
      });
  }, [userData]);

  return (
    <SettingProfileBox>
      <Grid container spacing={2}>
        {/* <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper elevation={2} className="filterpaper">
            <Box>
              <Typography variant="h4" color="primary">
                Base Currency
              </Typography>
              <Box mt={2} mb={3}>
                <Typography variant="body2" color="secondary">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate.
                </Typography>
              </Box>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="faiji786@gmail.com"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton variant="contained" color="primary">
                        <MdKeyboardArrowDown />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper elevation={2} className="filterpaper">
            <Box>
              <Typography variant="h4" color="primary">
                Recommended Exchanges
              </Typography>
              <Box mt={2} mb={3}>
                <Typography variant="body2" color="secondary">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate.
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Button variant="contained" color="primary">
                  Binance
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "10px" }}
                >
                  Bitpanda All
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid> */}
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper elevation={2} className="filterpaper">
            <Box>
              <Typography variant="h4" color="primary">
                Notification
              </Typography>
              <Box mt={2} mb={3}>
                <Typography variant="body2" color="secondary">
                  Get notified by email about yor bot trades.
                </Typography>
              </Box>
              <Box mt={2} className="flexBox">
                <Typography variant="body2" color="secondary">
                  Notification on trade
                </Typography>
                <DisplayStart>
                  <Switch
                    checked={checkedNotification?.notiSuccess}
                    onChange={(e) =>
                      handleNotification({
                        ...checkedNotification,
                        notiSuccess: !checkedNotification?.notiSuccess,
                      })
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </DisplayStart>
              </Box>
              <Box className="flexBox">
                <Typography variant="body2" color="secondary">
                  Notification on trade error
                </Typography>
                <DisplayStart>
                  <Switch
                    checked={checkedNotification?.notiError}
                    onChange={(e) =>
                      handleNotification({
                        ...checkedNotification,
                        notiError: !checkedNotification?.notiError,
                      })
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </DisplayStart>
              </Box>
              <Box className="flexBox">
                <Typography variant="body2" color="secondary">
                  Notify on cancelled order
                </Typography>
                <DisplayStart>
                  <Switch
                    checked={checkedNotification?.notiCancle}
                    onChange={(e) =>
                      handleNotification({
                        ...checkedNotification,
                        notiCancle: !checkedNotification?.notiCancle,
                      })
                    }
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </DisplayStart>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </SettingProfileBox>
  );
}

Trading.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
