import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  FormControlLabel,
  Radio,
  Tooltip,
  FormHelperText,
} from "@mui/material";
import styled from "@emotion/styled";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import Blockchainfunction from "@/utils/Blockchainfunction";
import AppContext from "@/context/AppContext";
import axios from "axios";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { CustomConnectWallet } from "./CustomConnectWallet";

const PlanComponent = styled(Box)(({ theme }) => ({
  "& .plansCardBox": {
    borderRadius: "20px",
    padding: "24px 24px 60px",
    background:
      "linear-gradient(148.85deg, rgba(110, 13, 76, 0.7) 22%, rgba(53, 8, 43, 0.7) 82%)",
  },
  "& span": {},
  "& h2": {
    fontSize: "34px",
  },

  "& .desscribeText": {
    fontSize: "42px",
    lineHeight: "55px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "30px",
    },
  },
  "& h3": {
    fontWeight: "600",
  },
  "& .placCardBox": {
    height: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BuyPlanModal({ data, getPlanListApi, discountPrice }) {
  const auth = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const { isConnected, address, chain } = useAccount();
  console.log("chain", chain);
  const [isLoading, setIsLoading] = useState(false);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [checkDiscount, setCheckDiscount] = useState(false);
  const [ischeckted, setIscheckted] = useState();
  const [dscPrice, setDscPrice] = useState(0);
  const [errorMess, setErrorMess] = useState("");
  const { handleBuyPlan } = Blockchainfunction({ auth });
  const checkUsdtPrice = checkDiscount
    ? Number(data?.price) - discountPrice
    : data?.price;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMess("");
  };

  const checkEligbleDiscount = async () => {
    try {
      setErrorMess("");
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.isValid,
      });
      if (response.data.responseCode === 200) {
        setCheckDiscount(true);
      } else {
        setErrorMess(response.data.responseMessage);
        setCheckDiscount(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const checkDscPrice = async (source) => {
    try {
      setIsPriceLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.getPrice,
        paramsData: {
          amount: checkUsdtPrice,
          coin: "DSC",
        },
        source: source,
      });
      if (response.data.responseCode === 200) {
        setDscPrice(response.data.result.finalResult);
      } else {
        setDscPrice(0);
      }
      setIsPriceLoading(false);
    } catch (error) {
      setIsPriceLoading(false);
      console.error(error);
    }
  };

  const handlePayAmount = async (price) => {
    try {
      setErrorMess("");
      setIsBuyLoading(true);

      auth.handleGetTokenBalance(address);
      if (
        Number(price) <=
        Number(
          auth?.userTokenBalance[
            ischeckted === "0" ? "usdtBalance" : "dscBalance"
          ]
        )
      ) {
        const apiObj = {
          subscriptionId: data?._id,
          amount: Number(price),
          isValid: checkDiscount,
          coin: ischeckted === "0" ? "USDT" : "DSC",
          tokenAddress:
            ischeckted === "0"
              ? process.env.USDTTOKEN_ADDRESS
              : process.env.DSCTOKEN_ADDRESS,
        };
        const payres = await handleBuyPlan(
          apiObj,
          ischeckted === "0" ? "depositUSDT" : "depositToken"
        );
        if (payres) {
          getPlanListApi();
          setOpen(false);
        }
      } else {
        toast.error("Your balance is too low. Please add more funds.");
      }
      setIsBuyLoading(false);
    } catch (error) {
      setIsBuyLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (ischeckted === "1") {
      checkDscPrice(source);
    }
    return () => source.cancel();
  }, [ischeckted === "1"]);

  return (
    <PlanComponent>
      <React.Fragment>
        <Button
          variant="contained"
          Size="large"
          color="primary"
          onClick={handleClickOpen}
          // disabled
          disabled={
            data?.lowerPlanStatus === "INACTIVE" ||
            (data?.currentPlanStatus && data?.currentPlanStatus === "ACTIVE")
          }
        >
          {data?.currentPlanStatus === "ACTIVE"
            ? "Purchased"
            : data?.lowerPlanStatus === "INACTIVE"
            ? "Downgrade Plan"
            : "Buy Plan"}
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => !isBuyLoading && handleClose()}
          fullWidth
          maxWidth="md"
          sx={{ pointerEvents: isBuyLoading ? "none" : "auto" }}
        >
          <IconButton
            onClick={() => !isBuyLoading && handleClose()}
            style={{
              marginTop: "-12px",
              justifyContent: "flex-end",
              padding: "0px",
              width: "auto",
            }}
          >
            <IoCloseSharp style={{ fontSize: "27px" }} />
          </IconButton>
          <DialogTitle style={{ padding: "0 0 40px" }}>
            <Box align="center">
              <Typography variant="h6" color="primary">
                Validate For Discount
              </Typography>
              <Typography variant="body1" color="secondary" mt={1}>
                Validate yourself for get discount
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box align="right"></Box>
            <Grid container spacing={3}>
              <Grid
                item
                lg={5.5}
                md={5.5}
                sm={5.5}
                xs={12}
                className="placCardBox"
              >
                <Box className="plansCardBoxDash">
                  <Box
                    className="displaySpacebetween"
                    style={{
                      borderBottom: "1px solid #FFFFFF1A",
                      paddingBottom: "20px",
                    }}
                  >
                    <Box>
                      <Tooltip
                        placement="bottom"
                        title={data?.title}
                        PopperProps={{
                          sx: {
                            "& .MuiTooltip-tooltip": {
                              backgroundColor: "#000000",
                              color: "#FFFFFFCC",
                              padding: "10px",
                              lineHeight: "15px",
                            },
                          },
                        }}
                      >
                        <Typography
                          color="primary"
                          variant="h3"
                          style={{
                            whiteSpace: "nowrap",
                            // fontSize: "14px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                            maxWidth: "120px",
                            wordBreak: "break-word",
                          }}
                        >
                          {data?.title}
                        </Typography>
                      </Tooltip>

                      {/* <Typography variant="h3" color="primary">
                        {data?.title}
                      </Typography> */}

                      <Tooltip
                        placement="bottom"
                        title={data?.description}
                        PopperProps={{
                          sx: {
                            "& .MuiTooltip-tooltip": {
                              backgroundColor: "#000000",
                              color: "#FFFFFFCC",
                              padding: "10px",
                              lineHeight: "15px",
                            },
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="#FFFFFFCC"
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                            maxWidth: "230px",
                            wordBreak: "break-word",
                          }}
                        >
                          {data?.description}
                        </Typography>
                      </Tooltip>
                      {/* <Typography variant="body1" color="primary">
                        {data?.description}
                      </Typography> */}
                    </Box>
                    <Box>
                      <Typography variant="h2" color="primary">
                        $ {data?.price}
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "20.16px",
                          }}
                        >
                          /{data?.tenure} Months
                        </span>
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="body1"
                    fontWeight="600"
                    color="primary"
                    mt={2.4}
                  >
                    What you get
                  </Typography>
                  <Box className="displayStart" mt={2.4}>
                    <img src="/images/check.svg" alt="Check" />
                    <Typography variant="body1" color="primary" ml={1}>
                      {data?.arbitrageName?.length} Excahnges:{" "}
                      {data?.arbitrageName?.map((item) => item).join(", ")}
                    </Typography>
                  </Box>
                  <Box className="displayStart" mt={2.4}>
                    <img src="/images/check.svg" alt="Check" />
                    <Typography variant="body1" color="primary" ml={1}>
                      {data?.coins?.length} pairs
                    </Typography>
                  </Box>
                  <Box className="displayStart" mt={2.4}>
                    <img src="/images/check.svg" alt="Check" />
                    <Typography variant="body1" color="primary" ml={1}>
                      {data?.tenure} month duration
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                lg={1}
                md={1}
                sm={1}
                xs={12}
                className="borderCenter"
              ></Grid>
              <Grid
                item
                lg={5.5}
                md={5.5}
                sm={5.5}
                xs={12}
                className="placCardBox"
              >
                <Box align="center">
                  <Typography
                    variant="body1"
                    color="primary"
                    className="checkplanBox"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      !isBuyLoading && !isLoading && checkEligbleDiscount()
                    }
                  >
                    {isLoading
                      ? "Loading..."
                      : checkDiscount
                      ? `Discount: ${discountPrice} USDT`
                      : "Check Eligible For Discount"}
                  </Typography>
                </Box>
                <Box className="displaySpacebetween" mt={4}>
                  <Typography variant="body1" color="secondary">
                    Plan Price
                  </Typography>
                  <Typography
                    variant="body1"
                    color="secondary"
                    className="priceBox"
                  >
                    {data?.price} USDT
                  </Typography>
                </Box>
                {checkDiscount && (
                  <Box className="displaySpacebetween" mt={1}>
                    <Typography variant="body1" color="secondary">
                      Discount
                    </Typography>
                    <Typography
                      variant="body1"
                      color="secondary"
                      className="priceBox"
                    >
                      {discountPrice} USDT
                    </Typography>
                  </Box>
                )}
                <Box className="displaySpacebetween" mt={1}>
                  <Typography variant="body1" color="secondary">
                    Payable Amount
                  </Typography>
                  <Typography
                    variant="body1"
                    color="secondary"
                    className="priceBox"
                  >
                    {checkUsdtPrice} USDT
                  </Typography>
                </Box>
                <Box mt={5} style={{ borderTop: "2px dashed #FFFFFF1A" }}>
                  <Typography variant="body1" color="secondary" mt={4}>
                    Please choose any one token for the payment
                  </Typography>
                </Box>

                <Box
                  className="displayStart"
                  mt={2}
                  onClick={() => setIscheckted("0")}
                  style={{ cursor: "pointer" }}
                >
                  <FormControlLabel
                    control={<Radio checked={ischeckted == "0"} />}
                  />
                  <Typography
                    variant="body1"
                    color="#FFFFFF99"
                    style={{ marginLeft: "-11px" }}
                  >
                    USDT (bep20)
                  </Typography>
                </Box>
                <Box
                  className="displayStart"
                  onClick={() => setIscheckted("1")}
                  style={{ cursor: "pointer" }}
                >
                  <FormControlLabel
                    control={<Radio checked={ischeckted == "1"} />}
                  />
                  <Typography
                    variant="body1"
                    color="#FFFFFF99"
                    style={{ marginLeft: "-11px" }}
                  >
                    DSC
                  </Typography>
                </Box>
                <Box mt={2}>
                  {errorMess && (
                    <FormHelperText error>{errorMess}</FormHelperText>
                  )}
                </Box>
                <Box mt={2.4} align="center">
                  {!isConnected ? (
                    <>
                      {/* <ConnectButton
                      showBalance={false}
                      accountStatus={{
                        smallScreen: "avatar",
                        largeScreen: "full",
                      }}
                      label="Connect"
                    /> */}

                      <CustomConnectWallet
                        style={{ width: "calc(100% - 65px)" }}
                      />
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ width: "calc(100% - 65px)" }}
                      disabled={isBuyLoading || !ischeckted || isPriceLoading}
                      onClick={() =>
                        handlePayAmount(
                          ischeckted === "0" ? checkUsdtPrice : dscPrice
                        )
                      }
                    >
                      Pay :{" "}
                      {ischeckted === "0"
                        ? `${checkUsdtPrice} USDT`
                        : `${dscPrice} DSC`}{" "}
                      {isBuyLoading && <ButtonCircularProgress />}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </PlanComponent>
  );
}
export default React.memo(BuyPlanModal);
