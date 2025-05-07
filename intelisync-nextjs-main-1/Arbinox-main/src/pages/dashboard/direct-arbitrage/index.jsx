"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Box,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import FilterModal from "@/components/FilterModal";
import DashboardLayout from "@/layout/DashboardLayout";
import axios from "axios";
import { api_configs, baseurlSocket } from "@/api-services";
import DirectCard from "./DirectCard";
import NoDataFound from "@/components/NoDataFound";
import DataLoader from "@/components/DataLoader";
import toast from "react-hot-toast";
import { handleNegativeValue, maxCapitalsLimit } from "@/utils";
import { useRouter } from "next/router";
import AppContext from "@/context/AppContext";
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
      border: "1px solid #FFFFFF1A",
      borderRadius: "10px",
      background: "#100e12",
    },
  },
});

export default function Direct() {
  const token = window.localStorage.getItem("user_token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const auth = useContext(AppContext);
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

  const [isLoading, setIsLoading] = useState(false);
  const [isSocLoading, setIsSocLoading] = useState(true);
  const [directArbitrageData, setDirectArbitrageData] = useState([]);
  const [tabView, setTabView] = useState("directArb");
  const router = useRouter();
  const [filterData, setFilterData] = useState({
    fromExchange: [],
    toExchange: [],
    startToken: [],
  });
  const [isSubmit, setisSubmit] = useState(false);
  const [filterStatus, setFilterStatus] = React.useState(false);
  const [amountCapital, setAmountCapital] = useState("");

  const getUpdateCapitalAmount = async () => {
    if (amountCapital < 50 || amountCapital > maxCapitalsLimit) {
      setisSubmit(false);
      return;
    }
    try {
      const dataToSend = {
        type: "DIRECT",
        amount: amountCapital.toString(),
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
      console.log(response, " response------ ");
      if (response.status == 200) {
        toast.success("Capital amount updated successfully.");
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
        setAmountCapital(response.data?.result?.direct);
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
    setDirectArbitrageData([]);
    const web = new WebSocket(baseurlSocket);
    const accessToken = token;
    if (accessToken) {
      try {
        web.onopen = () => {
          const dataToSend = {
            token: accessToken,
            options: "directProfitpath",
            exchange1:
              filterData.fromExchange.length !== 0
                ? filterData?.fromExchange
                : null,
            exchange2:
              filterData.toExchange.length !== 0
                ? filterData?.toExchange
                : null,
            startToken:
              filterData.startToken.length !== 0 ? filterData.startToken : null,
          };
          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            if (event.data !== "[object Promise]" && event.data !== "null") {
              let obj = JSON.parse(event.data);
              if (obj.responseCode === 200) {
                setDirectArbitrageData(obj.responseResult);
                setIsSocLoading(false);
              } else {
                setDirectArbitrageData([]);
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

  return (
    <ExchangeContainer>
      <Box
        className="transacMainBox  displaySpacebetween"
        style={{ marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}
      >
        <Box className="tabBox-main">
          <Button
            fullWidth
            className={`tabButton ${tabView === "directArb" ? "active" : ""}`}
            // onClick={() => toast.error("Coming Soon!")}
            // onClick={() => router.push("/dashboard/direct-arbitrage")}
            sx={{
              borderRadius: getBorderRadius(tabView, "directArb"),
              pointerEvents: "none",
            }}
          >
            Direct
          </Button>
          <Button
            fullWidth
            className={`tabButton ${
              tabView === "triangularArb" ? "active" : ""
            }`}
            // onClick={() => setTabView("triangularArb")}
            onClick={() => router.push("/dashboard/trainguler-arbitrage")}
            sx={{
              borderRadius: getBorderRadius(tabView, "triangularArb"),
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
          directArbitrageData &&
          directArbitrageData?.map((data, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} align="center" key={index}>
              <DirectCard
                value={data}
                ExecuteButtonType={false}
                key={index}
                type={"direct"}
              />
            </Grid>
          ))}

        {!isSocLoading &&
          directArbitrageData &&
          directArbitrageData.length === 0 && (
            <Box
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              width="100%"
            >
              <NoDataFound text="Not showing profit paths" />
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

      {open && (
        <FilterModal
          setOpen={setOpen}
          open={open}
          type="direct"
          filterData={filterData}
          setFilterData={setFilterData}
          setFilterStatus={setFilterStatus}
        />
      )}
    </ExchangeContainer>
  );
}
Direct.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
