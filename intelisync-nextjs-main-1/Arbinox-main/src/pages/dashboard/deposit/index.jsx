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
const DepositBox = styled("div")(({ theme }) => ({
  "& .qrBox": {
    padding: "80px",
  },
}));

export default function Deposit() {
  const router = useRouter();
  return (
    <DepositBox>
      <Box className="displayStart" mb={2.4}>
        <IconButton style={{ padding: "0px" }} onClick={() => router.back()}>
          <HiArrowNarrowLeft style={{ color: "#000000" }} />
        </IconButton>

        <Typography variant="h4" color="#000000" ml={1.4}>
          Deposit
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={7}>
          <Paper elevation={2}>
            <Typography variant="body1" color="secondary" mb={2.4}>
              Address
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              placeholder="0*5677676557......867968968kkjggjkfsgv"
              type="text"
              name="email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        background: "transparent",
                        marginLeft: "0px",
                        padding: "1px",
                      }}
                      onClick={() => setShowPassword(!showPassword)} // You can handle password visibility toggle if needed.
                      edge="start"
                    >
                      <IoCopyOutline style={{ color: "#FFFFFF66" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box mt={3}>
              <Button variant="contained" color="primary" size="large">
                Share
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Paper elevation={2} className="qrBox">
            <Box align="center">
              <img src="/images/sacnner_1.svg" />
              <Typography variant="body1" color="secondary" mt={4}>
                Ensure the network you choose to deposit matches the withdrawl
                network or asset may be lost .
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </DepositBox>
  );
}

Deposit.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
