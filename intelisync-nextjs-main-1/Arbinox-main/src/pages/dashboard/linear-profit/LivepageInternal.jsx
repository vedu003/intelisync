import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { fontWeight, styled } from "@mui/system";
import { Box, Divider, Grid } from "@mui/material";
import Image from "next/image";

// Styled component for DirectCardPaper with the same CSS
const DirectCardPaper = styled(Box)(({ ExecuteButtonType }) => ({
  "& img": {
    borderRadius: "50%",
  },

  "& h5": {
    fontSize: "16px",
    color: "#7EE92F",
    position: "relative",
    top: "24px",
  },
  "& .graytext": {
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "right",
    width: "100%",
  },
  "& .MuiAccordion-root.Mui-expanded": {
    margin: "0px !important",
  },
  "& .MuiAccordionSummary-root": {
    background: "#FFFFFF1A",
    padding: "0px 12px",
    minHeight: "29px",
    borderRadius: "8px",
    margin: "0px 0 5px",
  },
  "& .MuiSvgIcon-root": {
    color: "#FFFFFF",
    fontSize: "17px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "10px 0",
  },
  "& .MuiCollapse-wrapperInner": {
    paddingLeft: "0px",
  },
  "& .MuiAccordionSummary-content.Mui-expanded ": {
    margin: "3px 0",
  },
  "& .MuiAccordionSummary-root.Mui-expanded ": {
    minHeight: "38px",
  },
  "& .grayText": {
    color: "#FFFFFF99",
  },
  "& .accordinbottomText": {
    color: "#00000099",
    fontSize: "12px",
  },
  "& .MuiAccordionDetails-root": {
    borderBottom: "2px solid #FFFFFF1A",
    paddingBottom: "12px !important",
  },
  "& .mainClass": {
    // borderBottom: "1px solid #0000001A",
    padding: "0px 0px 20px 0px",
  },
  "& .arbitrageBox": {
    backgroundColor: "transparent",
    padding: "11px 0px 8px",
    position: "relative",
  },
}));

// Static DetailsComponent
const LivepageInternal = () => {
  const staticData = {
    profitPercent: 0.37,
    profit: 0.34,
    capital: 1000,
    pair: "BTC/USDT",
    exchangeName: "Binance",
    coins: [
      {
        buyAmount: 1000,
        sellAmount: 1500,
        quoteCurrency: "USDT",
        baseCurrency: "BTC",
        price: 0.0015,
        receiveAmount: 1500,
        fees: 0.01,
        finalPrice: 0.0014,
      },
      // Adding another coin
      {
        // buyAmount: 2000,
        sellAmount: 2500,
        quoteCurrency: "ETH",
        baseCurrency: "USDT",
        price: 0.032,
        receiveAmount: 3000,
        fees: 0.015,
        finalPrice: 0.0315,
      },
    ],
  };

  return (
    <DirectCardPaper ExecuteButtonType={false} style={{ padding: "0px" }}>
      {staticData.coins.map((value, i) => (
        <StaticCard value={value} key={`coins${i}`} />
      ))}

      <Box mt={1} className="arbitrageBox">
        <Box className="displaySpacebetween" style={{ gap: "10px" }}>
          <Box className="larnText displayCenter">
            <Typography variant="body1" color="#FFFFFF" fontWeight="500">
              0.10% ($0.195)
            </Typography>
          </Box>

          <Button variant="contained" color="primary" size="large">
            Submit
          </Button>
        </Box>
      </Box>

      <Box className="displayCenter" mt={3}>
        <Typography
          variant="body1"
          color="#FFFFFF99"
          style={{ whiteSpace: "pre", fontWeight: "500" }}
        >
          Block Confirmations
        </Typography>
        <Typography variant="body1" className="graytext" color="#FFFFFF">
          1
        </Typography>
      </Box>

      <Box className="displayCenter" mt={2}>
        <Typography
          variant="body1"
          color="#FFFFFF99"
          style={{ whiteSpace: "pre", fontWeight: "500" }}
        >
          Network
        </Typography>
        <Typography variant="body1" className="graytext" color="#FFFFFF">
          BNB-NETWORK
        </Typography>
      </Box>
    </DirectCardPaper>
  );
};

// Static card to display each value in the coins array
const StaticCard = ({ value }) => {
  return (
    <Box className="mainClass" mt={1}>
      <Box className="displaySpacebetween" style={{ marginTop: "15px" }}>
        <Typography
          variant="h6"
          color={value.buyAmount ? "#806DFF" : "#F61457"}
        >
          {value.buyAmount ? "BUY" : "SELL"}
        </Typography>
        <Typography variant="body1" fontWeight="600" color="primary">
          70.00
        </Typography>
        <Typography variant="body1" color="primary" mb={1}>
          {/* {value.buyAmount ? value.buyAmount : value.sellAmount} &nbsp;&nbsp;
          <span className="accordinbottomText" style={{ fontSize: "12px" }}>
            {value.quoteCurrency}
          </span> */}
        </Typography>
      </Box>
      <Accordion style={{ background: "transparent", boxShadow: "none" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ marginTop: "-10px" }}
        >
          <Typography
            variant="body1"
            color="secondary"
            className="grayText"
            mt={1}
          >
            DENT
          </Typography>
          <Box mt={1.4}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="body1"
                color="#FFFFFF"
                mr={3}
                style={{ fontWeight: "500", fontSize: "14px" }}
              >
                {value.receiveAmount} BTC
              </Typography>
            </AccordionSummary>
            <Typography
              variant="body1"
              color="secondary"
              className="grayText"
              mt={1}
            >
              0.0015 USDT per DENT
            </Typography>
          </Box>

          <Image
            height={25}
            width={25}
            quality={100}
            src="/images/eth_white.svg"
            alt="Exchange Logo"
            style={{
              height: "25px",
              width: "25px",
              top: "5px",
              position: "relative",
            }}
          />
        </Box>

        <AccordionDetails style={{ padding: "0px", display: "block" }}>
          <Box mt={3} mb={1}>
            <div className="displayCenter" mt={1}>
              <Typography
                variant="body1"
                color="#FFFFFF99"
                style={{ whiteSpace: "pre", fontWeight: "500" }}
              >
                Buy price:
              </Typography>
              <Typography variant="body1" className="graytext" color="#FFFFFF">
                {value.price ? value.price : "--"}
              </Typography>
            </div>
            <div className="displayCenter" style={{ marginTop: "10px" }}>
              <Typography
                variant="body1"
                color="#FFFFFF99"
                style={{ whiteSpace: "pre", fontWeight: "500" }}
              >
                Trading charges:
              </Typography>
              <Typography variant="body1" className="graytext">
                {value.fees ? value.fees : "--"}
              </Typography>
            </div>
            <div className="displayCenter" style={{ marginTop: "10px" }}>
              <Typography
                variant="body1"
                color="#FFFFFF99"
                style={{ whiteSpace: "pre", fontWeight: "500" }}
              >
                Final Buy Price
              </Typography>
              <Typography variant="body1" className="graytext">
                {value.fees ? value.fees : "--"}
              </Typography>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LivepageInternal;
