//DetailsComponent

import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { fontSize, fontWeight, styled } from "@mui/system";
import { Box, Divider, Grid } from "@mui/material";
import { ExchangeLogo, countDecimalPlaces, fixDecimal } from "@/utils";
import Image from "next/image";

const DirectCardPaper = styled(Paper)(({ theme, ExecuteButtonType }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  // background: ExecuteButtonType ? "transparent" : "#000000",
  // padding: ExecuteButtonType ? 0 : "12px",
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
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "right",
    width: "100%",
  },
  "& .MuiAccordion-root.Mui-expanded": {
    margin: "0px !important",
  },
  "& .MuiAccordionSummary-root": {
    // background: "#FFFFFF0A !important",
    // background: ExecuteButtonType ? "red" : "#FFFFFF0A",
    padding: "0px 12px",
    minHeight: "29px",
    borderRadius: "8px",
    margin: "0px 0 5px",
    "& p": {
      fontSize: "11px",
      fontWeight: "500",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "#FFFFFF99",
    fontSize: "27px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "10px 0",
  },
  "& .MuiCollapse-wrapperInner": {
    paddingLeft: "0px",
  },
  "& .MuiAccordion-rounded:last-child": {
    borderRadius: "0px",
  },
  "& .MuiAccordionSummary-content.Mui-expanded ": {
    margin: "3px 0",
  },
  "& .MuiAccordionSummary-root.Mui-expanded ": {
    minHeight: "29px",
  },
  "& .trackbutton": {
    color: "#fff",
  },
  "& .MuiDivider-root": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "& .mainClass": {
    // backgroundColor: "rgba(255, 255, 255, 0.07)",
    // padding: "12px 10px 6px",
    borderRadius: "0px",
    borderBottom: "1px solid #FFFFFF1A",
    padding: "0px 0px 20px 0px",
  },
  "& .MuiPaper-root.MuiAccordion-root:before": {
    position: "absolute",
    left: 0,
    top: "-1px",
    right: 0,
    height: "1px",
    content: '""',
    opacity: 1,
    backgroundColor: "transparent",
  },
  "& .arbitrageBox": {
    backgroundColor: "transparent",
    padding: "11px 0px 0px",
    position: "relative",
  },
}));

const DetailsComponent = ({ data, ExecuteButtonType, setIsOpenTrade }) => {
  return (
    <DirectCardPaper elevation={2} ExecuteButtonType={ExecuteButtonType}>
      <Box className="mainClass">
        <Box className="displaySpacebetween">
          <Typography variant="h6" color="#80EC00">
            Buy
          </Typography>
          <Typography variant="body1" color="primary" mb={1}>
            {data.exchange1_price
              ? countDecimalPlaces(data.exchange1_price) > 6
                ? `${parseFloat(data.exchange1_price)?.toFixed(6)}`
                : data.exchange1_price
              : ""}{" "}
            &nbsp;&nbsp;
            <span
              style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "10px" }}
            >
              {data.pair}
            </span>
          </Typography>
          <Image
            height={25}
            width={25}
            quality={100}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            src={
              ExchangeLogo.find(
                (d) => d.title.toLowerCase() === data.buy.toLowerCase()
              ).img
            }
            alt=""
            style={{ height: "25px", width: "25px" }}
          />
        </Box>
        <Accordion style={{ background: "transparent", boxShadow: "none" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" color="secondary">
              {data.base}
            </Typography>
            <Box>
              <AccordionSummary
                style={{ background: "transparent", boxShadow: "none" }}
                expandIcon={<ExpandMoreIcon color="fff" />}
              >
                <Typography variant="body1">
                  {data.receiveExchange1
                    ? `${fixDecimal(data.receiveExchange1)}`
                    : ""}{" "}
                  {data.base}
                </Typography>
              </AccordionSummary>
              <Typography
                variant="body1"
                mt={1}
                style={{ fontSize: "11px" }}
                color="secondary"
              >
                {/* 0.0015 USDT per DENT */}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1"> {data.buy}</Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "10px", marginTop: "5px" }}
                color="secondary"
              >
                {data.pair}
              </Typography>
            </Box>
          </Box>
          <AccordionDetails
            style={{ padding: "0px", boxShadow: "none", display: "block" }}
          >
            <Divider />
            <Box mt={1} mb={1}>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Withdraw Fee :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {`${fixDecimal(data?.withdrawFee1)}`} {`${data?.base} `}
                </Typography>
              </div>
              <div
                className="displayCenter"
                style={{ marginTop: "3px", marginBottom: "3px" }}
              >
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Receive Amount :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {`${fixDecimal(data?.receiveExchange1)}`} {data?.base}
                </Typography>
              </div>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Volume :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {`${fixDecimal(data?.volume1)}`} {data?.base}
                </Typography>
              </div>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Trading fee :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {`${fixDecimal(data?.tradeFee1)} %`}
                </Typography>
              </div>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className="mainClass" mt={1}>
        <div>
          <div className="displaySpacebetween" style={{ paddingTop: "20px" }}>
            <Typography variant="h6" style={{ color: "#F61457" }}>
              Sell
            </Typography>
            <Typography variant="body1" color="primary" mb={1}>
              {data?.exchange2_price
                ? `${fixDecimal(data?.exchange2_price)}`
                : ""}{" "}
              &nbsp;&nbsp;
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "10px",
                  margin: "5px 0",
                }}
              >
                {data?.pair}
              </span>
            </Typography>
            <Image
              height={25}
              width={25}
              quality={100}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              src={
                ExchangeLogo.find(
                  (d) => d.title.toLowerCase() === data.sell.toLowerCase()
                ).img
              }
              alt=""
              style={{ height: "25px", width: "25px" }}
            />
          </div>
          <Accordion
            style={{
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" color="secondary" fontSize="12px">
                {" "}
                {data.base}
              </Typography>
              <Box>
                <AccordionSummary
                  style={{ background: "transparent", boxShadow: "none" }}
                  expandIcon={<ExpandMoreIcon color="fff" />}
                >
                  <Typography variant="body1">
                    {data?.receiveExchange2
                      ? `${fixDecimal(data?.receiveExchange2)}`
                      : ""}{" "}
                    {data.pair}
                  </Typography>
                </AccordionSummary>
                <Typography
                  variant="body1"
                  mt={1}
                  style={{ fontSize: "11px" }}
                  color="secondary"
                >
                  {/* 0.0015 USDT per DENT */}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1"> {data.sell}</Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: "10px", marginTop: "5px" }}
                  color="secondary"
                >
                  {data.pair}
                </Typography>
              </Box>
            </Box>
            <AccordionDetails
              style={{ padding: "0px", boxShadow: "none", display: "block" }}
            >
              <Divider />

              <Box mt={1} mb={1}>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Withdraw Fee :
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {`${fixDecimal(data?.withdrawFee2)}`} {`${data?.base} `}
                  </Typography>
                </div>
                <div
                  className="displayCenter"
                  style={{ marginTop: "3px", marginBottom: "3px" }}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Receive Amount :
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {`${fixDecimal(data?.receiveExchange2)}`} {data?.pair}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Volume :
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {data.volume2} {data.pair}
                  </Typography>
                </div>
                <div
                  className="displayCenter"
                  style={{ marginTop: "3px", marginBottom: "3px" }}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Trading fee :
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {`${fixDecimal(data?.tradeFee2)} %`}
                  </Typography>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
      <Box mt={1} className="arbitrageBox">
        <Grid container spacing={1} alignItems="center">
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <Typography
              variant="body1"
              color="#FFFFFF99"
              textAlign="left"
              fontSize="12px"
            >
              Arbitrage
            </Typography>

            <Box style={{ marginBottom: "4px" }}>
              <Typography
                variant="body1"
                color="#FFFFFF99"
                textAlign="left"
                fontSize="12px"
              >
                {fixDecimal(data?.PercentageProfit)}%{" "}
                {`(${fixDecimal(data?.profitInUsdt)} USDT)`}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            {" "}
            {!ExecuteButtonType && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    position: "absolute",
                    right: "4px",
                    top: "61px",
                    zIndex: "999",
                    padding: "9.7px 29px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenTrade(true);
                  }}
                >
                  Track Live
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        <Accordion
          style={{
            background: "transparent",
            boxShadow: "none",
            marginTop: "10px",
          }}
        >
          <div className="displaySpacebetween">
            <AccordionSummary
              style={{ background: "transparent", boxShadow: "none" }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="body1">
                {/* Capital {data.baseCapital} */}
                Capital {fixDecimal(data?.capital)}
              </Typography>
            </AccordionSummary>
          </div>
          <AccordionDetails
            style={{ padding: "0px", boxShadow: "none", display: "block" }}
          >
            {/* <div className="displaySpacebetween" style={{ marginTop: "16px" }}>
              <Box>
                <Typography variant="body1" color="secondary">
                  1st Level Arbitrage
                </Typography>
                <Typography variant="body1" color="primary">
                  10.40%(₹3964.706)
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="secondary">
                  2nd Level Arbitrage
                </Typography>
                <Typography variant="body1" color="primary">
                  10.40%(₹3964.706)
                </Typography>
              </Box>
            </div> */}
            <Box mt={3.4} mb={1}>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Start Currency:
                </Typography>
                <Typography variant="body1" className="graytext">
                  {data.pair}
                </Typography>
              </div>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Capital Amount :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {data?.baseCapital} {data?.pair}
                </Typography>
              </div>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Profit On Capital :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {`${fixDecimal(data?.profit)}`} {data?.pair}
                </Typography>
              </div>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Profit In USDT :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {`${fixDecimal(data?.profitInUsdt)}`} USDT
                </Typography>
              </div>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Profit Percentage :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {`${fixDecimal(data?.PercentageProfit)} %`}
                </Typography>
              </div>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      {/* <LiveTracking setOpen={setOpen} open={open} /> */}
    </DirectCardPaper>
  );
};

export default DetailsComponent;
