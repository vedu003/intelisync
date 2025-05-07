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
// import TopCryptoCard from "./TopCryptoCard";
import axios from "axios";
import { api_configs } from "@/api-services";
const CombinedProfitBox = styled("div")((theme) => ({
  "& .combinedProfitsCardBox": {
    // height: "100%",
  },
}));

const TopCryptoAssetBox = styled("div")(({ theme }) => ({
  "& .topCryptoAsset": {
    "& .headingBox": {
      borderBottom: "1px solid rgba(128, 128, 128, 0.33)",
      paddingBottom: "5px",
      "& h5": {
        fontWeight: 300,
        fontSize: "18px",
      },
      "& p": {
        fontSize: "15px",
      },
    },

    "& .MuiAutocomplete-endAdornment": {
      position: "absolute",
      top: "calc(30% - 14px)",
    },
    "& .MuiAutocomplete-root .MuiAutocomplete-inputRoot .MuiAutocomplete-input":
      {
        minWidth: "52px",
      },
    "& .paperContainer": {
      height: "100%",
      // minHeight: "206px",
      [theme.breakpoints.down("md")]: {
        height: "auto",
      },
    },
  },
}));

export default function TopCryptoAsset() {
  const [cryptoData, setCryptoData] = useState({});
  const token = window.localStorage.getItem("user_token");
  const HandleCryptoAssest = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.cryptoAssetprofit,
        headers: {
          token: token,
        },
        params: {
          hour: 720,
        },
      });

      if (response) {
        setCryptoData(response.data.result);
      }
    } catch (error) {
      console.log(" error ", error);
    }
  };
  useEffect(() => {
    HandleCryptoAssest();
  }, []);

  return (
    <TopCryptoAssetBox>
      <Paper elevation={2}>
        <Box className="topCryptoAsset">
          <Box
            mb={2}
            className="displaySpacebetween combinedBox responsiveManage"
          >
            <Typography variant="h6" className="textDash" color="primary">
              Top Performing Crypto
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={4}>
              <TopCryptoCard
                day={"1"}
                cryptoData={cryptoData}
                capital={
                  cryptoData?.topPerformingCrypto30?.profit
                    ? parseFloat(
                        cryptoData?.topPerformingCrypto30.profit
                      ).toFixed(2)
                    : 0
                }
                currency={
                  cryptoData?.topPerformingCrypto30?.crypto
                    ? cryptoData?.topPerformingCrypto30.crypto
                    : 0
                }
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <TopCryptoCard
                day={"7"}
                cryptoData={cryptoData}
                capital={
                  cryptoData?.topPerformingCrypto60?.profit
                    ? parseFloat(
                        cryptoData?.topPerformingCrypto60.profit
                      ).toFixed(2)
                    : 0
                }
                currency={
                  cryptoData?.topPerformingCrypto60?.crypto
                    ? cryptoData?.topPerformingCrypto60.crypto
                    : 0
                }
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <TopCryptoCard
                day={"30"}
                cryptoData={cryptoData}
                capital={
                  cryptoData?.topPerformingCrypto90?.profit
                    ? parseFloat(
                        cryptoData?.topPerformingCrypto90.profit
                      ).toFixed(2)
                    : 0
                }
                currency={
                  cryptoData?.topPerformingCrypto90?.crypto
                    ? cryptoData?.topPerformingCrypto90.crypto
                    : " "
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </TopCryptoAssetBox>
  );
}

function TopCryptoCard({ data, day, cryptoData, capital, currency }) {
  return (
    <CombinedProfitBox>
      <Paper elevation={1}>
        <Box className="combinedProfitsCardBox">
          <Box className="headingBox displayCenter">
            <Typography variant="body2" color="#FFFFFF80">
              {day ? day : "N/A"} Days
              {/* 1 Days */}
            </Typography>
          </Box>
          <Box className="displayCenter" mt={3}>
            <img src="/images/eth.svg" />
            &nbsp;&nbsp;
            <Typography
              variant="body2"
              color="#ffffff"
              align="center"
              className="ethText"
            >
              Etherium
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="body2"
              color="#52525C"
              align="center"
              fontWeight="500"
            >
              ETH
            </Typography>
          </Box>
          <Box className="contentBox displayColumn" mt={1}>
            <Box className="displayStart">
              <Box>
                <Typography variant="h6" color="#ffffff" align="center">
                  {capital ? capital : "0"}
                  {/* 2014.00 */}
                </Typography>
              </Box>
            </Box>
            {/* <Typography variant="h6" mt={1}>
            {currency ? currency : "N/A"}
          </Typography> */}
            <Typography
              variant="body1"
              color="#ffffff"
              align="center"
              fontSize="12px"
            >
              {/* (USDT) */}
              {currency ? "(" + currency + ")" : ""}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </CombinedProfitBox>
  );
}
