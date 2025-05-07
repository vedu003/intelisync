import { api_configs } from "@/api-services";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { styled } from "@mui/system";
import AppContext from "@/context/AppContext";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";

const IntraArbitrageBox = styled(Box)(({ theme }) => ({
  // "& button": {
  //   color: "rgba(255, 255, 255, 0.07)",
  // },
  "& .MuiOutlinedInput-input": {
    background: "rgba(255, 255, 255, 0.07)",
  },
  "& .MuiSelect-outlined.MuiSelect-outlined": {
    paddingRight: "50px",
  },
  "& .MuiOutlinedInput-adornedEnd": {
    padding: "0px",
  },
  "& .MuiSelect-outlined": {
    background: theme.palette.background.selectButton,
    border: "0px",
  },
  "& h3": {
    fontWeight: "600",
  },
  "& p": {
    // fontSize: "14px",
    fontWeight: "300",
  },
  "& .menuItemBox": {
    "& p": {
      fontWeight: "600",
    },
  },
  "& .modelbtn": {
    maxWidth: "333px",
  },
  "& .MuiSwitch-root": {
    marginLeft: "-11px",
  },
}));
const IntraArbitrage = () => {
  const auth = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoTradeOn, setIsAutoTradeOn] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [waitingTime, setWaitingTime] = useState("");
  const [rebalancingNumber, setRebalancingNumber] = useState("");

  useEffect(() => {
    setIsAutoTradeOn(auth.userData?.rebalancingTrade?.intraSingleExchange);
  }, [auth.userData]);
  const rebalanceTradeApi = async () => {
    setIsSubmit(true);
    if (
      waitingTime !== "" &&
      rebalancingNumber !== "" &&
      rebalancingNumber <= "5"
    ) {
      setIsSubmit(false);
      try {
        setIsLoading(true);
        const res = await axios({
          url: api_configs.rebalancingTradeIntra,
          method: "POST",
          headers: {
            token: window.localStorage.getItem("user_token"),
          },
          data: {
            waitingTime: waitingTime.toString(),
            arbitrageName: "IntraSingleExchange",
            rebalancingNumber: rebalancingNumber.toString(),
          },
        });
        if (res.data.responseCode === 200) {
          toast.success(res.data.responseMessage);
          setIsLoading(false);
          setIsAutoTradeOn(!isAutoTradeOn);
          getRebalancing();
        } else {
          setIsLoading(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.responseMessage);
        }
      }
    }
  };

  const getRebalancing = async () => {
    try {
      const res = await axios({
        url: api_configs.getDataRebalancingBotOnOffIntraArb,
        method: "GET",
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
      });
      if (res.data.responseCode === 200) {
        let result = res.data.result;
        setRebalancingNumber(result.rebalancingNumber);
        setWaitingTime(result.waitingTime);
        setIsAutoTradeOn(true);
      }
    } catch (error) {
      console.log(error);
      setRebalancingNumber("");
      setWaitingTime("");
      setIsAutoTradeOn(false);
    }
  };

  useEffect(() => {
    if (isAutoTradeOn) {
      getRebalancing();
    }
  }, [isAutoTradeOn]);

  return (
    <IntraArbitrageBox>
      <Box>
        <Box mt={2}>
          <Typography variant="h6" color="primary">
            QuantumBridge Smart Limit Order
          </Typography>

          <Switch
            onChange={() => {
              waitingTime !== "" &&
                rebalancingNumber !== "" &&
                rebalanceTradeApi();
            }}
            checked={isAutoTradeOn}
            name="checkedA"
            disabled={!isAutoTradeOn}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Box>
        <Box mt={2}>
          <Typography
            style={{ marginBottom: "8px" }}
            variant="body2"
            color="primary"
          >
            Waiting Time (in hours)
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <TextField
              type="number"
              variant="outlined"
              name="waitingTime"
              placeholder="Please enter waiting time in hours"
              value={waitingTime}
              fullWidth
              disabled={isLoading || isAutoTradeOn}
              autoComplete="off"
              // onChange={(e) => setWaitingTime(e.target.value)}

              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  setWaitingTime(e.target.value);
                }
              }}
            />
            <FormHelperText error>
              {isSubmit &&
                waitingTime == "" &&
                "Please enter waiting time in hours."}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box mt={2}>
          <Typography
            style={{ marginBottom: "8px" }}
            variant="body2"
            color="primary"
          >
            Rebalancing Number (number of times)
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <TextField
              type="number"
              variant="outlined"
              name="rebalancingNumber"
              placeholder="Please enter the rebalancing number of times"
              value={rebalancingNumber}
              fullWidth
              disabled={isLoading || isAutoTradeOn}
              autoComplete="off"
              // onChange={(e) => setRebalancingNumber(e.target.value)}

              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  setRebalancingNumber(e.target.value);
                }
              }}
            />

            <FormHelperText error>
              {isSubmit &&
                rebalancingNumber == "" &&
                "Please enter rebalancing number of times."}
              {rebalancingNumber !== "" &&
                rebalancingNumber > 5 &&
                "Rebalancing number should be 5 or less than 5 times."}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box mt={3}>
          <Button
            className="modelbtn"
            color="primary"
            variant="contained"
            // disabled={isLoading || isAutoTradeOn}
            sx={{ pointerEvents: isLoading || isAutoTradeOn ? "none" : "" }}
            onClick={() => rebalanceTradeApi()}
          >
            Update{isLoading && <ButtonCircularProgress />}
          </Button>
        </Box>
      </Box>
    </IntraArbitrageBox>
  );
};

export default IntraArbitrage;
