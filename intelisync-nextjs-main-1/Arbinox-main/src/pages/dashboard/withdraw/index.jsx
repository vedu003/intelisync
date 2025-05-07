"use client";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Avatar,
  styled,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import { IoCopyOutline } from "react-icons/io5";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import GoogleAuthModal from "@/components/GoogleAuthModal";
const DepositBox = styled("div")(({ theme }) => ({
  "& .qrBox": {
    padding: "80px",
  },
}));

export default function Withdraw() {
  const [authenticationSuccess, setAuthenticationSuccess] = useState(false);
  const router = useRouter();
  return (
    <DepositBox>
      <Box className="displayStart" mb={2.4}>
        <IconButton style={{ padding: "0px" }} onClick={() => router.back()}>
          <HiArrowNarrowLeft style={{ color: "#000000" }} />
        </IconButton>

        <Typography variant="h4" color="#000000" ml={1.4}>
          Withdraw
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={7}>
          <Paper elevation={2}>
            <Typography variant="body1" color="secondary" mb={2.4}>
              Withdraw Amount
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Enter amount in USDT"
              type="text"
              name="email"
            />
            <Box mt={3}>
              <Typography variant="body1" color="secondary" mb={1}>
                Enter wallet address
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Enter here"
                type="text"
                name="email"
              />
            </Box>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setAuthenticationSuccess(true);
                }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={5}></Grid>
      </Grid>
      {authenticationSuccess && (
        <GoogleAuthModal
          open={authenticationSuccess}
          handleClose={() => {
            setAuthenticationSuccess(false);
          }}
        />
      )}
    </DepositBox>
  );
}

Withdraw.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
