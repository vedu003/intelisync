import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Switch,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import {
  apiRouterCall,
  getAPIHandler,
  putAPIHandler,
} from "@/api-services/service";
import AppContext from "@/context/AppContext";
import GoogleAuthModal from "@/components/GoogleAuthModal";
import EmailAuthModal from "@/components/EmailAuthModal";
import axios from "axios";
import { api_configs } from "@/api-services";

const DisplayStart = styled("div")({
  display: "flex",
  alignItems: "center",
});
const SettingProfileBox = styled(Box)(({ theme }) => ({
  marginTop: "25px",
  "& label": {
    color: "#fff",
  },
  "& .filterpaper": {
    padding: "25px",
    minHeight: "150px",
    "& p": {
      fontSize: "15px",
    },
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.primary,
    background: theme.palette.background.textFeild,
    paddingLeft: "10px",
    borderRadius: "10px",
    height: "59px",
    // border: "1px solid #80808014",
  },
}));

export default function SettingProfile() {
  const auth = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [google2FaData, setGoogle2FaData] = useState();
  const [twoFaOpen, SetTwoFaOpen] = useState(false);

  const handleCloseEmailModal = () => {
    setEmailModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleGetGooleData = async (source) => {
    try {
      setIsGoogleLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.enableDisableGoogleAuthenction,
        source: source,
      });
      if (response?.data?.responseCode === 200) {
        setGoogle2FaData(response.data.result);
      } else {
        setGoogle2FaData();
      }
      setIsGoogleLoading(false);
    } catch (error) {
      setIsGoogleLoading(false);
      console.log(error);
    }
  };

  return (
    <SettingProfileBox>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Paper elevation={2}>
            <Typography variant="body2" color="primary">
              {" "}
              Account
            </Typography>

            <Typography variant="body1" color="secondary" mb={5}>
              View your account details and stay informed with notifications
              sent to your registered email address.
            </Typography>
            <FormControl fullWidth sx={{ p: 1 }}>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Email"
                value={auth?.userData?.email}
                disabled
                inputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper elevation={2}>
            <Typography variant="body2" color="primary">
              {" "}
              Security
            </Typography>
            <Typography variant="body1" color="secondary">
              {" "}
              Add an extra layer of security by enabling Two-Factor
              Authentication (2FA) for safer access to your account.
            </Typography>
            <Box className="displayStart" mt={8}>
              <Typography variant="body1" color="primary" fontWeight="500">
                {" "}
                Add an extra layer of security using 2FA
              </Typography>
              <DisplayStart
                onClick={() => {
                  if (!auth?.userData?.speakeasy) {
                    handleGetGooleData(axios.CancelToken.source());
                  }
                  SetTwoFaOpen(true);
                }}
              >
                <Switch
                  name="checkedA"
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                  sx={{ pointerEvents: "none" }}
                  checked={auth?.userData?.speakeasy}
                />
              </DisplayStart>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {twoFaOpen && (
        <GoogleAuthModal
          open={twoFaOpen}
          handleClose={() => SetTwoFaOpen(false)}
          google2FaData={google2FaData}
          isLoadingData={isGoogleLoading}
        />
      )}
      {/* <GoogleAuthModal open={modalOpen} handleClose={handleCloseModal} /> */}
      <EmailAuthModal
        open={emailModalOpen}
        handleClose={handleCloseEmailModal}
      />
    </SettingProfileBox>
  );
}

SettingProfile.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
