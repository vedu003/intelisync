import { Box, IconButton, Paper, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import QRWalletModal from "./QRWalletModal";
import WalletSend from "./WalletSend";
import { dataPostHandler } from "@/api-services/service";
import { fixDecimal } from "@/utils";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: "0 0 20px",
  },
  "& .DepositeCardBox": {
    width: "100%",
    // maxWidth: "320px",
    // backgroundColor: "#26262C",
    // backgroundColor: theme.palette.background.default,
    borderRadius: "5px",
    "& .headingBox": {
      // backgroundColor: theme.palette.background.walletHeader,
      borderRadius: "5px 5px 0px 0px",
      padding: "10px",
      "& p": {
        // color: "#000",
        marginLeft: "8px",
      },
      "& h5": {
        fontWeight: 400,
        marginLeft: "8px",
        fontSize: "16px",
      },
      "& .whiteBox": {
        borderRadius: "50%",
        // background: "#FFF",
        width: "20px",
        height: "20px",
        "& img": {
          position: "relative",
          width: "100%",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          objectFit: "cover !important",
        },
      },
      "& .filtersButton": {
        "& .filterIcon1": {
          "& button": {
            background: "#4A4A57 !important",
            width: "37px",
            height: "37px",
            borderRadius: "10px",
            padding: "0px",
            "& svg": {
              position: "absolute",
              // color: "#FFFFFF",
              zIndex: 3,
            },
          },
        },
      },
    },
    "& .contentBox": {
      padding: "10px",
      "& p": {
        // color: "#9090A3",
        [theme.breakpoints.down("sm")]: {
          fontSize: "11px",
        },
      },
      "& .boldText": {
        "& p": {
          // color: "#000",
          fontWeight: 300,
          [theme.breakpoints.down("sm")]: {
            fontSize: "11px",
          },
        },
      },
    },
  },
}));

export default function DepositeCard({ data, exchangeName }) {
  const [openWalletRecive, setOpenWalletRecive] = useState(false);
  const [openWalletSend, setOpenWalletSend] = useState(false);
  const [add, setAdd] = useState("");
  const [isDepositLoading, setIsDepositLoading] = useState(false);
  const [errorMess, setErrorMess] = useState(false);
  const getConnectedExchangedata = async (exchangeName, data) => {
    const dataToSend = {
      exchangeId: exchangeName?.trim().toLowerCase(),
      coin: data?.asset,
    };
    try {
      setOpenWalletRecive(true);
      setIsDepositLoading(true);
      const response = await dataPostHandler("deposit", dataToSend);
      if (response.status === 200) {
        setErrorMess(false);
        setAdd(response?.data?.result);
        setIsDepositLoading(false);
      } else {
        setErrorMess(response?.data?.responseMessage);
        setIsDepositLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsDepositLoading(false);
    }
  };
  return (
    <MainBox>
      {" "}
      <Paper elevation={2}>
        <Box className={"DepositeCardBox"}>
          <Box className="headingBox displaySpacebetween">
            <Box className="displayStart">
              <Box className="whiteBox displayCenter">
                <img
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src={data?.img}
                  alt={data?.asset}
                />
              </Box>
              <Typography variant="h5" color="primary">
                {data.asset}
              </Typography>
              <Typography variant="body2" color="primary">
                ({exchangeName})
              </Typography>
            </Box>
            <Box className={`filtersButton displayEnd`}>
              {/* <Box className="filterIcon1">
                <IconButton
                  onClick={() => {
                    setOpenWalletSend(true);
                  }}
                >
                  <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/Arbitrage/upTransactionIcon.png" alt="" />
                </IconButton>
              </Box> 
              <Box ml={1} className="filterIcon1">
                <IconButton
                  onClick={() => {
                    // setOpenWalletRecive(true);
                    getConnectedExchangedata(exchangeName, data);
                  }}
                >
                  <img
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    src="/images/Arbitrage/downArrow.png"
                    alt=""
                  />
                </IconButton>
              </Box>*/}
            </Box>
          </Box>
          <Box className="contentBox">
            <Box className="displaySpacebetween">
              {" "}
              <Box className="boldText">
                <Typography variant="body1">Available Balance :</Typography>
              </Box>
              <Box className="displayStart">
                <Box className="boldText">
                  <Typography variant="body2" color="primary">
                    {fixDecimal(data?.free)}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ marginLeft: "8px" }}
                >
                  {/* USDT */}
                </Typography>
              </Box>
            </Box>
            <Box className="displaySpacebetween">
              {" "}
              <Box className="boldText">
                <Typography variant="body1">In Order Balance :</Typography>
              </Box>
              <Box className="displayStart">
                <Box className="boldText">
                  <Typography variant="body2" color="primary">
                    {fixDecimal(data?.locked)}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ marginLeft: "8px" }}
                >
                  {/* USDT */}
                </Typography>
              </Box>
            </Box>
            <Box className="displaySpacebetween">
              {" "}
              <Box className="boldText">
                <Typography variant="body1">Total Balance :</Typography>
              </Box>
              <Box className="displayStart">
                <Box className="boldText">
                  <Typography variant="body2" color="primary">
                    {fixDecimal(data?.total)}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ marginLeft: "8px" }}
                >
                  {/* USDT */}
                </Typography>
              </Box>
            </Box>
          </Box>
          {openWalletSend && (
            <WalletSend
              open={openWalletSend}
              setOpen={setOpenWalletSend}
              data={data}
              exchangeName={exchangeName}
            />
          )}
          {openWalletRecive && (
            <QRWalletModal
              open={openWalletRecive}
              setOpen={setOpenWalletRecive}
              data={data}
              exchangeName={exchangeName}
              isDepositLoading={isDepositLoading}
              add={add}
              errorMess={errorMess}
            />
          )}
        </Box>
      </Paper>
    </MainBox>
  );
}
