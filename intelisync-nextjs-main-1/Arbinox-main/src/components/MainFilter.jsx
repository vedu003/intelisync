import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/system";
import { Dayjs } from "dayjs";
import { FiDownload } from "react-icons/fi";

const MainFilterBox = styled(Box)(({ theme }) => ({
  "& .filterpaper": {
    padding: "30px",
  },
  "& .textFieldBox": {
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      zIndex: "1",
    },
    "&  .MuiAutocomplete-endAdornment": {
      position: "absolute",
      right: "0px",
      top: "calc(30% - 14px) !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#FFFFFF66",
    },
  },
  "& .csvButton": {},
  "& .MuiAutocomplete-endAdornment": {
    marginRight: "0px",
  },
  "& .MuiAutocomplete-endAdornment": {
    position: "absolute",
    right: "0px",
    top: "calc(40% - 14px)",
  },
  "& .sideButton": {
    background: "#FFFFFF1A",
    color: "#FFFFFFCC",
    boxShadow: "none",
    border: "none",
    "& :hover": {
      background: "#FFFFFF1A",
      color: "#fff",
      boxShadow: "none",
    },

    [theme.breakpoints.down("md")]: {
      marginTop: "0px",
    },
  },
  "& .MuiButtonBase-root": {
    height: "50px",
  },
  "& .MuiInputBase-root": {
    height: "50px",
    fontSize: "16px",
    border: "1px solid #FFFFFF0D",
    padding: "12px 14px",
    borderRadius: "8px",
    lineHeight: "22.68px",
    paddingLeft: "0px",
  },
  "& .MuiInput-input": {
    color: "#FFFFFF66",
  },
  "& .MuiOutlinedInput-input": {
    color: "#FFFFFF66",
    fontSize: "15px",
  },
  "& .MuiSelect-icon": {
    color: "#FFFFFF66",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    background: "none",
    border: "none",
  },
  "& .MuiInput-input": {
    // padding: "0px",
    paddingLeft: "16px",
    color: "#FFFFFF66",
  },
}));

export default function MainFilter({
  filter,
  setFilter,
  clearFilters,
  onClickFun,
  userData,
  type,
  placeholder,
  handleExport,
}) {
  // const [filter, setFilter] = useState({
  //   arbitrageType: "1",
  //   registerType: "1",
  //   planStatus: "1",
  //   statusType: "1",
  //   search: "",
  //   fromDate: null,
  //   toDate: null,
  // });
  const statusType = [
    {
      label: "ACTIVE",
      value: "ACTIVE",
    },
    {
      label: "BLOCK",
      value: "BLOCK",
    },
  ];
  const registerType = [
    {
      label: "REGISTER",
      value: "REGISTER",
    },
    {
      label: "SUBSRCIPTION",
      value: "SUBSRCIPTION",
    },
  ];
  const planStatus = [
    {
      label: "ACTIVE",
      value: "ACTIVE",
    },
    {
      label: "INACTIVE",
      value: "INACTIVE",
    },
  ];
  const arbitrageType = [
    // {
    //   label: "AUTO",
    //   value: "AUTO",
    // },
    {
      label: "SNIPER",
      value: "SNIPER",
    },
    {
      label: "MANUAL",
      value: "MANUAL",
    },
  ];
  const transactionArbitrage = [
    {
      label: "PENDING",
      value: "PENDING",
    },
    {
      label: "COMPLETED",
      value: "COMPLETED",
    },
    {
      label: "CANCELLED",
      value: "CANCELLED",
    },
    {
      label: "FAILED",
      value: "FAILED",
    },
  ];
  return (
    <MainFilterBox>
      <Grid container spacing={1.4} alignItems="flex-end">
        {type !== "transactionArbitrage" && (
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Box mt={2} mb={1}>
              <Typography variant="body1" color="#FFFFFFCC">
                Search
              </Typography>
            </Box>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={placeholder}
              onChange={(e) => {
                setFilter({ ...filter, ["search"]: e.target.value });
              }}
              value={filter.search}
            />
          </Grid>
        )}

        {type === "userManagement" && (
          <>
            <Grid item xs={12} sm={6} md={2}>
              <Box mt={2} mb={1}>
                <Typography variant="body1" color="#FFFFFFCC">
                  Type
                </Typography>
              </Box>
              <FormControl variant="standard" fullWidth>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.registerType}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      registerType: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={"1"} disabled>
                    Select type
                  </MenuItem>
                  {registerType &&
                    registerType.map((option) => (
                      <MenuItem value={option.label}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Box mb={1}>
                <Typography variant="body1" color="#FFFFFFCC">
                  Plan Status
                </Typography>
              </Box>
              <FormControl variant="standard" fullWidth>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.planStatus}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      planStatus: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={"1"} disabled>
                    Select
                  </MenuItem>
                  {planStatus &&
                    planStatus.map((option) => (
                      <MenuItem value={option.label}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Box mt={2} mb={1}>
                <Typography variant="body1" color="#FFFFFFCC">
                  Status Type
                </Typography>
              </Box>
              <FormControl variant="standard" fullWidth>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.statusType}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      statusType: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={"1"} disabled>
                    Select Type
                  </MenuItem>
                  {statusType &&
                    statusType.map((option) => (
                      <MenuItem value={option.label}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {type === "transactionMgmt" && (
          <Grid item xs={12} sm={6} md={2}>
            <Box mt={2} mb={1}>
              <Typography variant="body1" color="#FFFFFFCC">
                Plan Status
              </Typography>
            </Box>
            <FormControl variant="standard" fullWidth>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                placeholder="Select"
                value={filter.planStatus}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    planStatus: e.target.value,
                  });
                }}
              >
                <MenuItem value={"1"} disabled>
                  Select
                </MenuItem>
                {planStatus &&
                  planStatus.map((option) => (
                    <MenuItem value={option.label}>{option.label}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {type === "transactionArbitrage" && (
          <>
            <Grid item xs={12} sm={6} md={2}>
              <Box mb={1}>
                <Typography variant="body1" color="#FFFFFFCC">
                  Trade Type
                </Typography>
              </Box>
              <FormControl variant="outlined" color="primary" fullWidth>
                <Select
                  color="primary"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.arbitrageType}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      arbitrageType: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="1">Select</MenuItem>
                  {arbitrageType &&
                    arbitrageType.map((option) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box mb={1}>
                <Typography variant="body1" color="#FFFFFFCC">
                  Status
                </Typography>
              </Box>
              <FormControl variant="outlined" fullWidth>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.planStatus}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      planStatus: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="1">Select</MenuItem>
                  {transactionArbitrage &&
                    transactionArbitrage.map((option) => (
                      <MenuItem value={option.label}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {/* {type !== "transactionMgmt" && (
          <>
            <Grid item xs={12} sm={6} md={2.1}>
                        <Box mb={1}>
                <Typography variant="body1" color="#FFFFFFCC">
                  Exchange
                </Typography>
              </Box>
              <FormControl variant="standard" fullWidth>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.arbitrageType}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      arbitrageType: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="1">Select</MenuItem>
                  {arbitrageType &&
                    arbitrageType.map((option) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2.1}>
              <Box mb={1}>
                <Typography variant="body1" color="#FFFFFFCC">
                  Coin
                </Typography>
              </Box>
              <FormControl
                variant="standard"
                fullWidth
                sx={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.1) ",
                }}
              >
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
               
                >
                  <MenuItem value="1">Select</MenuItem>
              
                  {arbitrageType &&
                    arbitrageType.map((option) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )} */}

        <Grid item xs={12} sm={6} md={2.1}>
          <Box className="textFieldBox">
            <Box mb={1}>
              <Typography variant="body1" color="#FFFFFFCC">
                From
              </Typography>
            </Box>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              fullWidth
              style={{ width: "100%" }}
            >
              <DatePicker
                inputVariant="outlined"
                format="DD/MM/YYYY"
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                placeholder="DD/MM/YYYY"
                disableFuture
                fullWidth
                value={filter.fromDate}
                onChange={(date) => {
                  setFilter({
                    ...filter,
                    fromDate: date ? date.startOf("day") : null,
                  });
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{
                  readOnly: true, // Make the input field read-only
                  disabled: true,
                }}
                renderInput={(params) => (
                  <TextField
                    disabled
                    {...params}
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      readOnly: true, // Make the input field read-only
                      zIndex: "9999",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => params.inputProps.onClick()}
                            edge="end"
                          >
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2.1}>
          <Box className="textFieldBox">
            <Box mb={1}>
              <Typography variant="body1" color="#FFFFFFCC">
                To
              </Typography>
            </Box>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              fullWidth
              style={{ width: "100%" }}
            >
              <DatePicker
                fullWidth
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                value={filter.toDate}
                disableFuture
                minDate={filter.fromDate ? filter.fromDate : null}
                onChange={(date) => {
                  setFilter({
                    ...filter,
                    toDate: new Date(date),
                  });
                }}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="sideButton1">
          <Box className="displayStart" style={{ gap: "12px" }}>
            <Button
              variant="contained"
              color="primary"
              className="applyButton"
              onClick={onClickFun}
              // onClick={() => {
              //   if (
              //     filter.fromDate !== null ||
              //     filter.toDate !== null ||
              //     filter.search !== "" ||
              //     filter.planStatus !== "1" ||
              //     filter.arbitrageType !== "1"
              //   ) {
              //     onClickFun();
              //   }
              // }}
            >
              Apply
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="sideButton applyButton resetButton"
              onClick={() => {
                clearFilters();
              }}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              color="primary"
              style={{ padding: "14.7px 52px" }}
              className="sideButton downloadButton1 exportButton"
              startIcon={
                <FiDownload style={{ fontSize: "20px", color: "#fff" }} />
              }
              onClick={handleExport}
            >
              Export
            </Button>
          </Box>
        </Grid>
      </Grid>
    </MainFilterBox>
  );
}
