import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  styled,
  FormHelperText,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { dataPostHandler } from "@/api-services/service";
import { handleNegativeValue } from "@/utils";
import { api_configs } from "@/api-services";
import toast from "react-hot-toast";
import AppContext from "@/context/AppContext";
const MainBox = styled("div")(({ theme }) => ({
  "& .mainQRBox": {
    "& h5": {
      fontWeight: 700,
    },
    "& p": {
      fontWeight: 400,
    },
  },
  "& .qrCodeBox": {
    width: "200px",
    height: "200px",
    padding: "10px",
    backgroundColor: "#FFF",
    "& img": {
      width: "100%",
      maxWidth: "200px",
    },
  },
}));

const WalletSend = ({ open, setOpen, data, exchangeName }) => {
  const [exchangeId, setexchangeId] = useState("");
  const [amount, setAmount] = useState(Number.MAX_VALUE);
  const auth = useContext(AppContext);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsLoading1, setIsLoading1] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const token = window.localStorage.getItem("token");
  const [walletAddress, setWalletAddress] = useState("");
  const [withdrawalDetails, setWithdrawDetails] = useState("");
  const [details, setDetials] = useState("");
  const [networkData, setNetworkData] = useState("");

  const sendWithdrawTokenHandler = async () => {
    setisSubmit(true);
    if (
      amount.trim() == "" ||
      (exchangeId.trim() == "" &&
        (networkData.trim() == "" || walletAddress.trim() == ""))
    ) {
      return;
    }

    setIsLoading(true);
    let fromExcId = auth?.connectedExchangeList?.find(
      (data, i) => data?.exchangeName == exchangeName
    )._id;
    try {
      const response = await axios({
        method: "POST",
        url: api_configs.withdraw,
        headers: {
          token: token,
        },
        data: {
          fromExchangeId: fromExcId,
          fromCoin: data?.asset,
          toExchangeId: walletAddress || networkData ? undefined : exchangeId,
          toCoin: data?.asset,
          amount: amount,
          withdrawAddess: walletAddress ? walletAddress : undefined,
          network: walletAddress ? networkData : undefined,
        },
      });
      if (response.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(response.data.responseMessage);
        setOpen(false);
        setisSubmit(false);
        setAmount("");
        setexchangeId("");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error?.response);
      if (error.response) {
        toast.error(error?.response?.data?.responseMessage);
      } else {
        toast.error(error?.response?.message);
      }
    }
  };

  const getDashbaordDataHandler = async () => {
    const dataToSend = {
      exchange: exchangeName,
    };
    try {
      setIsLoading1(true);
      const response = await dataPostHandler("withdrawDetails", dataToSend);
      if (response) {
        setWithdrawDetails(response?.data?.result);
        const datas = [];
        for (const key in response?.data?.result) {
          if (data.asset === response?.data?.result[key].base) {
            datas.push(response?.data?.result[key]);
          }
        }
        setDetials(datas);
        setIsLoading1(false);
      } else {
        setIsLoading1(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    if (exchangeName || open) {
      getDashbaordDataHandler();
    }
  }, [exchangeName, open]);

  const handleChangessss = (event) => {
    const result = event.target.value.replace(/[^a-z]/gi, "");
    setNetworkData(result.toUpperCase());
  };

  return (
    <MainBox>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Box className={"mainQRBox"}>
            <Box className={"qrcodeBox"}>
              <Typography variant="h5" color="primary">
                {data.asset} ({exchangeName})
              </Typography>

              <Box mt={2} mb={2}>
                <Box mb={1}>
                  <Typography variant="body2">Enter amount</Typography>
                </Box>
                <TextField
                  placeholder="Coin amount"
                  variant="outlined"
                  value={amount == Number.MAX_VALUE ? "" : amount}
                  disabled={IsLoading}
                  onChange={(e) => setAmount(e.target.value)}
                  error={isSubmit && amount == ""}
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
                />
                <FormHelperText error className={"helperText"}>
                  {isSubmit &&
                  (amount == Number.MAX_VALUE || amount.trim() === "")
                    ? "Amount is required."
                    : amount < Number(details[0]?.minimumwithdrawal) &&
                      "Amount should be greater than  minimum withdraw."}
                </FormHelperText>
              </Box>
              <Box>
                {/* <Box mb={1}>
                <Typography variant="body2">Wallet address</Typography>
              </Box>
              <TextField placeholder="USDT wallet address" variant="outlined" /> */}
                <Box my={3}>
                  <FormControl
                    variant="standard"
                    fullWidth
                    className={"formControl"}
                    error={isSubmit && exchangeId == ""}
                  >
                    <Select
                      name="exchangeId"
                      value={exchangeId}
                      disabled={IsLoading || networkData}
                      onChange={(e) => {
                        setexchangeId(e.target.value);
                      }}
                      error={isSubmit && exchangeId == ""}
                      displayEmpty
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                      fullWidth
                    >
                      <MenuItem value="">Choose your Exchange</MenuItem>
                      {auth?.connectedExchangeList &&
                        auth?.connectedExchangeList?.map((map, i) => {
                          if (map?.exchangeName == exchangeName) {
                            return;
                          }
                          return (
                            <MenuItem value={map?._id}>
                              {map?.exchangeName}
                            </MenuItem>
                          );
                        })}
                    </Select>
                    {!networkData && (
                      <FormHelperText error className={"helperText"}>
                        {isSubmit &&
                          exchangeId == "" &&
                          "Choose withdrawal exchange."}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <Box mt={2} mb={1}>
                    <Typography variant="body2" color="secondary">
                      Withdraw Address
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder=" Withdraw Address"
                    name="Coin"
                    value={walletAddress}
                    disabled={IsLoading || exchangeId}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                  <Box mt={2} mb={1}>
                    <Typography variant="body2" color="secondary">
                      Network
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder=" Enter network"
                    name="network"
                    value={networkData}
                    disabled={IsLoading || exchangeId}
                    onChange={handleChangessss}
                  />
                </Box>
                <Box mt={2} mb={1}>
                  <Typography variant="body1" color="secondary">
                    Minimum Withdraw :{" "}
                    {details[0]?.minimumwithdrawal
                      ? Number(details[0]?.minimumwithdrawal)?.toFixed(6)
                      : "0"}
                  </Typography>
                </Box>
                <Box mt={2} mb={1}>
                  <Typography variant="body1" color="secondary">
                    Withdraw fee :{" "}
                    {details[0]?.withdrawFee
                      ? Number(details[0]?.withdrawFee)?.toFixed(6)
                      : "0"}
                  </Typography>
                </Box>
              </Box>

              <Box className="displayCenter" mt={3} mb={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendWithdrawTokenHandler}
                >
                  Send
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginLeft: "8px" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </MainBox>
  );
};

export default WalletSend;
