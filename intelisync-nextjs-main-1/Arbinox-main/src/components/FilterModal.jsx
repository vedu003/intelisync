import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Dialog,
  Divider,
  Autocomplete,
  InputAdornment,
  DialogTitle,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { border, borderRadius, borderTop, styled } from "@mui/system";
import { ExpandMore } from "@mui/icons-material";
import { api_configs } from "@/api-services";
import axios from "axios";

const FilterModalBox = styled(Box)(({ theme }) => ({
  position: "relative",

  [theme.breakpoints.down("xs")]: {
    padding: "10px",
  },
  "& h6": {
    fontSize: "20px",
    fontWeight: "600",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
    color: "rgba(255, 255, 255, 0.4)",
    "-webkit-text-fill-color": "#fff !important",
  },
  "& .MuiSelect-selectMenu": {
    fontSize: "14px",
  },
  "& .MuiTextField-root": {
    border: "1px solid #FFFFFF0D",
    borderRadius: "8px",
  },
  "& .textBox": {
    "& .MuiInputBase-root": {
      background: "transparent",
      boxShadow: "none",
      color: "#fff",
      borderRadius: "0px !important",
      fontSize: "14px",
      height: "33px",
    },

    "& .MuiInput-underline:before": {
      left: "0",
      right: "0",
      bottom: "0",
      content: '"\\00a0"',
      position: "absolute",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderBottom: "1px solid gray",
      pointerEvents: "none",
    },
  },

  "& .buttonBox": {
    padding: "24px 0 0px",
  },
}));
const selectoption2 = [
  { title: "Select Coin" },
  { title: "ETH" },
  { title: "BNB" },
];
const selectoption1 = [
  { title: "Select Exchange" },
  { title: "Binance" },
  { title: "Bitstamp" },
  { title: "Kraken" },
  { title: "OKEX" },
];
// const CancelButton = styled(Button)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   right: 0,

//   svg: {
//     fontWeight: "700",
//   },
// }));

function FilterModal({
  open,
  setOpen,
  filterData,
  setFilterData,
  setFilterStatus,
  type,
}) {
  const [exchangeList, setExchangeList] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const token = window.localStorage.getItem("user_token");

  const getCurrentExchangeListHandler = async () => {
    try {
      // const response = await getDataHandlerAPI("listExchange", token);
      const response = await axios({
        method: "GET",
        url: api_configs.listExchange,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode == 200) {
        let exchangeListData = [];
        for (var i = 0; i < response.data.result.length; i++) {
          exchangeListData.push(response.data.result[i]?.uid);
        }

        setExchangeList(
          exchangeListData?.filter((item) => item !== "coinbasepro")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTokenListHandler = async (_id) => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.exchangeCoins,
        headers: {
          token: token,
        },
        params: {
          uid: _id,
        },
      });
      if (response.data.responseCode === 200) {
        setCoinList(response.data.result.coins);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentExchangeListHandler();
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        classes={{
          paper: "dialog",
        }}
      >
        <DialogTitle style={{ padding: "0px", textAlign: "right" }}>
          <IconButton
            onClick={() => setOpen(false)}
            style={{
              // position: "absolute",
              // right: "-6px",
              // top: "-6px",
              padding: "2px",
            }}
          >
            <AiOutlineClose
              fontSize="25px"
              style={{
                color: "#fff",
              }}
            />
          </IconButton>
        </DialogTitle>
        <FilterModalBox>
          <Box align="center">
            <Typography variant="h6" color="#ffffff">
              Apply Filters
            </Typography>
            <Typography variant="body1" color="secondary" mt={1}>
              Are you sure do you want to disconnect this Exchnage?
            </Typography>
          </Box>
          {/* <Typography variant="h6" color="#000000">
            Apply Filters
          </Typography> */}

          {/* <Typography variant="body2" color="secondary">
            Filter Name
          </Typography>
          <Box mt={1}>
            <TextField fullWidth variant="outlined" />
          </Box> */}

          <Box mt={3}>
            <Typography variant="body2" color="#FFFFFF99">
              From exchange (Max 10 exchange)
            </Typography>

            <Box
              mt={1}
              style={{ width: "100%", position: "relative" }}
              className="autocompleBox"
            >
              <Autocomplete
                freeSolo
                disableClearable
                fullWidth
                // value="Select Exchange"
                // PaperComponent={({ children }) => (
                //   <Paper className={classes.dropdownBack}>{children}</Paper>
                // )}
                size="small"
                multiple
                limitTags={10}
                options={exchangeList.filter(function (x) {
                  return (
                    filterData.fromExchange.filter(function (y) {
                      return y == x;
                    }).length == 0
                  );
                })}
                onChange={(e, v) => {
                  setFilterData({
                    fromExchange: v,
                    toExchange: filterData.toExchange,
                    toExchange1: filterData.toExchange1,
                    startToken: filterData.startToken,
                  });
                  getTokenListHandler(v[0]);
                }}
                // options={selectoption1.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",

                      endAdornment: (
                        <InputAdornment position="end">
                          <ExpandMore
                            style={{ color: "#FFFFFF99" }}
                            {...params}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          {type !== "triangular" && (
            <>
              {" "}
              <Box align="center" mt={1.4}>
                <IconButton>
                  <img
                    // onDragStart={(e) => e.preventDefault()}
                    // onContextMenu={(e) => e.preventDefault()}
                    src="/images/downarow.svg"
                    alt="icon"
                  />
                </IconButton>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="#FFFFFF99">
                  To exchange (Max 10 exchange)
                </Typography>

                <Box
                  mt={1}
                  style={{ width: "100%", position: "relative" }}
                  className="autocompleBox"
                >
                  <Autocomplete
                    freeSolo
                    disableClearable
                    fullWidth
                    // PaperComponent={({ children }) => (
                    //   <Paper className={classes.dropdownBack}>{children}</Paper>
                    // )}
                    size="small"
                    multiple
                    limitTags={10}
                    options={exchangeList.filter(function (x) {
                      return (
                        filterData.fromExchange.filter(function (y) {
                          return y == x;
                        }).length == 0
                      );
                    })}
                    onChange={(e, v) => {
                      setFilterData({
                        fromExchange: filterData.fromExchange,
                        toExchange: v,
                        toExchange1: filterData.toExchange1,
                        startToken: filterData.startToken,
                      });
                    }}
                    // options={selectoption1.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // placeholder="Percentage"
                        placeholder="Select"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                          endAdornment: (
                            <InputAdornment position="end">
                              <ExpandMore
                                style={{ color: "#FFFFFF99" }}
                                {...params}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </>
          )}
          {type == "loop" && (
            <>
              {" "}
              <Box align="center" mt={1}>
                <IconButton>
                  <img
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    src="/images/exchangearbitrage.png"
                    alt="icon"
                  />
                </IconButton>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="#FFFFFF99">
                  To exchange (Max 10 exchange)
                </Typography>

                <Box
                  mt={1}
                  style={{ width: "100%", position: "relative" }}
                  className="autocompleBox"
                >
                  <Autocomplete
                    freeSolo
                    disableClearable
                    fullWidth
                    // PaperComponent={({ children }) => (
                    //   <Paper className={classes.dropdownBack}>{children}</Paper>
                    // )}

                    size="small"
                    multiple
                    limitTags={10}
                    options={exchangeList.filter(function (x) {
                      return (
                        filterData.fromExchange.filter(function (y) {
                          return y == x;
                        }).length == 0
                      );
                    })}
                    onChange={(e, v) => {
                      setFilterData({
                        fromExchange: filterData.fromExchange,
                        toExchange: filterData.toExchange,
                        toExchange1: v,
                        startToken: filterData.startToken,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // placeholder="Percentage"
                        placeholder="Select"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                          endAdornment: (
                            <InputAdornment position="end">
                              <ExpandMore
                                style={{ color: "#00000066" }}
                                {...params}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </>
          )}

          {/* <Box mt={3}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="(This filters are applied locally on the current list)"
            />
          </Box> */}

          <Box className="displayCenter buttonBox">
            {/* <Button variant="contained" color="primary">
              SAVE
            </Button>{" "}
            &nbsp; &nbsp; */}
            <Button
              variant="contained"
              color="secondary"
              // onClick={() => setOpen(false)}
              onClick={() => {
                setFilterData(
                  type === "triangular"
                    ? {
                        fromExchange: [],
                        toExchange: [],
                        toExchange1: [],
                        startToken: [],
                      }
                    : {
                        fromExchange: [],
                        toExchange: [],
                        startToken: [],
                        depth: "3",
                      }
                );
                setFilterStatus(false);
                setOpen(false);
              }}
            >
              Close
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setFilterStatus(true);
                setOpen(false);
              }}
            >
              Apply
            </Button>
          </Box>
        </FilterModalBox>
      </Dialog>
    </>
  );
}

export default FilterModal;
