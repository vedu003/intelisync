"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Box,
  Button,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import DashboardLayout from "../../../layout/DashboardLayout/index";
import { ExpandMore } from "@mui/icons-material";
import TriangularCard from "./TriangularCard";
import FilterModal from "@/components/FilterModal";
import AppContext from "@/context/AppContext";
import axios from "axios";
import { api_configs, baseurlSocket } from "@/api-services";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";
import CustomHead from "@/components/CustomHead";
import DataLoader from "@/components/DataLoader";
import toast from "react-hot-toast";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { handleNegativeValue, maxCapitalsLimit } from "@/utils";
import { useRouter } from "next/router";

const ExchangeContainer = styled("div")({
  position: "relative",
  zIndex: "999",
  "& .MuiSvgIcon-root.MuiSelect-icon ": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-input": {
    color: "#fff",
    fontSize: "16px",
    padding: "10px 2px",
    fontWeight: "400",
  },
  "& .invitebutton": {
    marginRight: "-9px",
    padding: "9px 28px",
    zIndex: 999,
    borderRadius: "8px",
    background: "#FFFFFF0D",
    border: "1px solid #FFFFFF1A",
    boxShadow: "none",
  },
  "& .tabBox-main": {
    width: "fit-content",
    background: "#FFFFFF08",
    borderRadius: "12px",
    display: "flex",
    // padding: "8px",
    gap: "10px",
    "@media(max-width:767px)": {
      width: "100%",
    },
  },

  "& .tabButton": {
    fontSize: "15px",
    fontWeight: "400",
    color: "#FFFFFF99",
    // borderRadius: "8px !important",
    position: "relative",
    padding: "14px 37px",
    "@media(max-width:767px)": {
      padding: "8px 12px",
    },
    "&:hover": {
      color: "#ffffff",
      background: "linear-gradient(90deg, #806DFF 0%, #4A33E7 100%)",
    },
    "&.active": {
      fontFamily: "'Outfit', sans-serif",
      background: "linear-gradient(180deg, #806DFF 0%, #4A33E7 100%)",
      lineHeight: "21.71px",
      border: "1px solid #9A8AFE",
      boxShadow: "0px 0.83px 14.69px 0px #FFFFFF6E inset",
      borderBottom: "none !important",
      color: "#fff",
    },
  },
  "& .boxControl": {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: "14px 10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
  },
  "& .textfieldBox": {
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      border: "none",
      borderRadius: "10px",
      height: "54px",
    },
    "& .MuiFormControl-root.MuiTextField-root": {
      width: "100%",
      maxWidth: "294px",
      border: "1px solid #00000080",
      borderRadius: "10px",
      // "@media(max-width:767px)": {
      //   maxWidth: "100%",
      // },
    },
  },
  "& .autocompleBox": {
    marginRight: "8px",
  },
});

export default function Triangular() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const token = window.localStorage.getItem("user_token");
  const [open, setOpen] = useState(false);
  const [tabView, setTabView] = useState("triangularArb");
  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <img
          src="/images/arbi_text.svg"
          width="24px"
          height="24px"
          style={{ marginRight: "6px" }}
        />
        <Typography variant="h3" color="primary">
          Arbitrage
        </Typography>
      </Box>
    );
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [triangularArbitrageData, setTriangularArbitrageData] = useState([]);
  const [isSocLoading, setIsSocLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    fromExchange: [],
    toExchange: [],
    startToken: [],
    depth: 3,
  });
  const [amountCapital, setAmountCapital] = useState("");
  const [isSubmit, setisSubmit] = useState(false);
  const [filterStatus, setFilterStatus] = React.useState(false);

  const getUpdateCapitalAmount = async () => {
    setisSubmit(true);
    if (amountCapital < 50 || amountCapital > maxCapitalsLimit) {
      setisSubmit(false);
      return;
    }
    try {
      const dataToSend = {
        type: "TRIANGULAR",
        amount: amountCapital.toString() ? amountCapital.toString() : "0",
      };
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: api_configs.updateCapitalAmount,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.data.responseCode == 200) {
        toast.success(" Capital amount updated successfully.");
        auth.getProfileDataHandler(token);
        getCapitalAmount();
        setFilterStatus(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response) {
        toast.success(error.response.data.responseMessage);
      } else {
        toast.success(error.message);
      }
    }
  };

  const getCapitalAmount = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: api_configs.getCapitalAmount,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode == 200) {
        setAmountCapital(response.data?.result?.triangular);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCapitalAmount();
  }, []);

  useEffect(() => {
    setIsSocLoading(true);
    setTriangularArbitrageData([]);
    const web = new WebSocket(baseurlSocket);
    const accessToken = token;
    if (accessToken) {
      try {
        web.onopen = () => {
          const dataToSend = {
            token: accessToken,
            options: "triangularProfitpath",
            uid:
              filterData.fromExchange.length !== 0
                ? filterData.fromExchange
                : null,
            coins:
              filterData.startToken.length !== 0 ? filterData.startToken : null,
            depth: filterData.depth !== 0 ? filterData.depth : null,
          };

          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            if (event.data !== "[object Promise]" && event.data !== "null") {
              let obj = JSON.parse(event.data);

              if (obj.responseCode === 200) {
                setTriangularArbitrageData(obj.responseResult);
                setIsSocLoading(false);
              } else {
                setTriangularArbitrageData([]);
                setIsSocLoading(false);
              }
            }
          };
        };
        return () => {
          web.close();
        };
      } catch (err) {
        setIsSocLoading(false);
      }
    }
  }, [token, filterStatus]);

  const getBorderRadius = (tabView, currentTab) => {
    if (tabView === currentTab) {
      if (currentTab === "directArb") return "8px 0px 0px 8px";
      if (currentTab === "triangularArb") return "0px 0px 0px 0px";
      if (currentTab === "integratedArb") return "0px 8px 8px 0px";
    }
    return "0px";
  };

  // useEffect(() => {
  //   auth?.setTopHeading(
  //     <Box display="flex" alignItems="center">
  //       <MdOutlineCurrencyExchange
  //         color="#fff"
  //         style={{ marginRight: "6px" }}
  //       />
  //       <Typography variant="h3" color="primary" whiteSpace="pre">
  //         Arbitrage
  //       </Typography>
  //     </Box>
  //   );
  // }, []);

  return (
    <ExchangeContainer>
      <Box
        className="transacMainBox displaySpacebetween"
        style={{ marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}
      >
        <Box className="tabBox-main">
          <Button
            fullWidth
            className={`tabButton ${
              tabView === "WalletTransaction" ? "active" : ""
            }`}
            // onClick={() => toast.error("Coming Soon!")}
            onClick={() => router.push("/dashboard/direct-arbitrage")}
            sx={{
              borderRadius: getBorderRadius(tabView, "WalletTransaction"),
              ":hover": {
                borderRadius: "8px 0px 0px 8px",
              },
            }}
          >
            Direct
          </Button>
          <Button
            fullWidth
            className={`tabButton ${
              tabView === "triangularArb" ? "active" : ""
            }`}
            onClick={() => setTabView("triangularArb")}
            style={{
              borderRadius: getBorderRadius(tabView, "triangularArb"),
              pointerEvents: "none",
            }}
          >
            Triangular
          </Button>
          <Button
            fullWidth
            className={`tabButton ${
              tabView === "integratedArb" ? "active" : ""
            }`}
            onClick={() => router.push("/dashboard/intra-arbitrage")}
            // onClick={() => toast.error("Coming Soon!")}
            sx={{
              borderRadius: getBorderRadius(tabView, "integratedArb"),
              ":hover": {
                borderRadius: "0px 8px 8px 0px",
              },
            }}
          >
            Intra
          </Button>
        </Box>
        <Box
          className="textfieldBox displayCenter"
          style={{ alignItems: "flex-start" }}
        >
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter amount"
              value={amountCapital}
              type="number"
              onKeyPress={(event) => {
                if (
                  event?.key === "-" ||
                  event?.key === "+" ||
                  event?.key === "*" ||
                  event?.key === "/"
                ) {
                  event.preventDefault();
                }
              }}
              onKeyDown={(event) => handleNegativeValue(event)}
              onChange={(e) => setAmountCapital(e.target.value)}
              error={isSubmit && amountCapital == ""}
              inputProps={{
                maxLength: maxCapitalsLimit.toString().length,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      className="invitebutton"
                      disabled={amountCapital === ""}
                      onClick={getUpdateCapitalAmount}
                    >
                      Go
                    </Button>
                  </InputAdornment>
                ),
                sx: { paddingLeft: "12px" },
              }}
            />
            <FormHelperText error>
              {!isSocLoading &&
              isSubmit &&
              (amountCapital == Number?.MAX_VALUE || amountCapital === "")
                ? "Amount is required."
                : !isSocLoading && amountCapital < Number(50)
                ? "Amount should be greater than 50."
                : !isSocLoading && amountCapital > Number(maxCapitalsLimit)
                ? "The amount should reach its maximum limit!"
                : ""}
            </FormHelperText>
          </Box>

          <Button
            variant="contained"
            color="primary"
            className="invitebutton"
            onClick={handleOpen}
            style={{ padding: "13px 20px", marginLeft: "10px", height: "51px" }}
          >
            Filter
          </Button>
        </Box>
      </Box>

      <Grid container spacing={1.4}>
        {!isSocLoading &&
          triangularArbitrageData &&
          triangularArbitrageData.map((data, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} align="center" key={index}>
              <TriangularCard value={data} type="volume" />
            </Grid>
          ))}
        {!isSocLoading &&
          triangularArbitrageData &&
          triangularArbitrageData.length === 0 && (
            <Box
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              width="100%"
            >
              <NoDataFoundFrame data="Not showing profit paths" />
            </Box>
          )}
        {isSocLoading && (
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            width="100%"
          >
            <DataLoader />
          </Box>
        )}
      </Grid>

      <FilterModal
        setOpen={setOpen}
        open={open}
        type="triangular"
        filterData={filterData}
        setFilterData={setFilterData}
        setFilterStatus={setFilterStatus}
      />
    </ExchangeContainer>
  );
}
Triangular.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
