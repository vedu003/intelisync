import React, { useState } from "react";
// import Papa from "papaparse";
import {
  Box,
  styled,
  Grid,
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const PerformingCryptoAssestsBox = styled("div")(({ theme }) => ({
  "& .mainfilter": {
    "& .displayCenterStart": {
      marginTop: "30px",
      "@media(max-width:599px)": {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    },
    "& .responsiveManage": {
      // [theme.breakpoints.down("sm")]: {
      //   flexWrap: "wrap",
      // },
    },
    "& .responsiveManageButton": {
      marginLeft: "10px",
      // [theme.breakpoints.down("sm")]: {
      //   marginTop: "8px",
      // },
    },
  },
}));

export default function MainFilter(props) {
  const {
    type,
    setToDate,
    toDate,
    setExchanges,
    exchanges,
    fromDate,
    setFromDate,
    setSearch,
    search,
    searchPlaceHolder,
    setisSearch,
    isSearch,
  } = props;

  console.log(" ----- isSearch ", isSearch);
  return (
    <PerformingCryptoAssestsBox>
      <Box className={"mainfilter"} mb={2}>
        <Box className="filterpaper">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Box mb={1}>
                <Typography variant="body2" color="primary">
                  Search
                </Typography>
              </Box>
              <TextField
                variant="outlined"
                fullWidth
                placeholder={
                  searchPlaceHolder ? searchPlaceHolder : "Search..."
                }
                name="search"
                value={search}
                onChange={(e) => {
                  if (e.target.value.length <= 256) {
                    setSearch(e.target.value);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Box mb={1}>
                <Typography variant="body2" color="primary">
                  Select
                </Typography>
              </Box>
              <FormControl variant="standard" fullWidth>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={exchanges}
                  onChange={(e) => setExchanges(e.target.value)}
                >
                  <MenuItem value={"1"}>Select Exchange</MenuItem>
                  <MenuItem value={"Binance"}>Binance</MenuItem>{" "}
                  <MenuItem value={"Mexc"}>Mexc</MenuItem>
                  <MenuItem value={"Kraken"}>Kraken</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Box mb={1}>
                <Typography variant="body2" color="primary">
                  From
                </Typography>
              </Box>
              <FormControl fullWidth>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  fullWidth
                  style={{ width: "100%" }}
                >
                  <DatePicker
                    fullWidth
                    value={fromDate}
                    onChange={(date) => {
                      setFromDate(new Date(date));
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    placeholder="DD/MM/YYYY"
                    disableFuture
                    InputProps={{ readOnly: true }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Box mb={1}>
                <Typography variant="body2" color="primary">
                  To
                </Typography>
              </Box>
              <FormControl fullWidth>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  fullWidth
                  style={{ width: "100%" }}
                >
                  <DatePicker
                    fullWidth
                    value={toDate}
                    onChange={(date) => {
                      setToDate(new Date(date));
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    placeholder="DD/MM/YYYY"
                    disableFuture
                    // minDate={fromDate}
                    InputProps={{ readOnly: true }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Box className="displayStart responsiveManage">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setisSearch(!isSearch)}
                >
                  Search
                </Button>{" "}
                {/* <Box className="responsiveManageButton">
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={downloadExcel}
                  disabled={isLoading}
                >
                  {isLoading ? "Downloading..." : "Export"}
                </Button>
              </Box> */}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => {
                  setFromDate(null);
                  setToDate(null);
                  setSearch("");
                  type === "wallet" && setExchanges("1");
                  setisSearch(!isSearch);
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PerformingCryptoAssestsBox>
  );
}
