import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { display, fontSize, fontWeight, styled } from "@mui/system";
import { Box, Divider, Grid } from "@mui/material";
import { ExchangeLogo, fixDecimal } from "@/utils";
import Image from "next/image";

const DirectCardPaper = styled(Paper)(({ theme, ExecuteButtonType }) => ({
  "& img": {
    borderRadius: "50%",
  },
  "& p": {
    color: ExecuteButtonType ? "#000" : "#fff",
    fontWeight: ExecuteButtonType ? "600" : "400",
  },
  "& h5": {
    fontSize: "16px",
    color: "#7EE92F",
    position: "relative",
    top: "24px",
  },
  "& .graytext": {
    color: ExecuteButtonType ? "#000" : "rgba(255, 255, 255, 0.6)",
    textAlign: "right",
    width: "100%",
  },
  "& .MuiAccordion-root.Mui-expanded": {
    margin: "0px !important",
  },
  "& .MuiAccordionSummary-root": {
    // background: "#FFFFFF1A !important",

    background: ExecuteButtonType
      ? "#0000001A !important"
      : "#FFFFFF1A !important",
    padding: "0px 12px",
    minHeight: "29px",
    borderRadius: "8px",
    margin: "0px 0 5px",
    "& p": {
      fontSize: "11px",
      fontWeight: "500",
      // color: ExecuteButtonType ? "#fff" : "rgba(255, 255, 255, 0.6)",
    },
  },
  "& .MuiSvgIcon-root": {
    color: ExecuteButtonType ? "#000" : "#fff",
    fontSize: "17px",
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
    color: ExecuteButtonType ? "#000" : "#fff",
  },

  "& .grayText": {
    color: ExecuteButtonType
      ? "#00000099 !important"
      : "rgba(255, 255, 255, 0.6) !important",
  },
  "& .accordinbottomText": {
    color: ExecuteButtonType
      ? "#00000099 !important"
      : "rgba(255, 255, 255, 0.6) !important",
    fontSize: "12px !important",
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

    borderBottom: ExecuteButtonType
      ? "1px solid #0000001A"
      : "1px solid #FFFFFF1A",
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
    padding: "11px 0px 8px",
    position: "relative",
  },
}));

const DetailsComponent = ({ data, ExecuteButtonType, setIsOpenTrade }) => {
  return (
    <DirectCardPaper
      elevation={ExecuteButtonType ? 1 : 2}
      ExecuteButtonType={ExecuteButtonType}
      style={{ padding: "1px 20px 5px" }}
    >
      {data?.coins &&
        data?.coins.map((value, i) => {
          return (
            <>
              <CardsValues data={data} value={value} i={i} key={`coins${i}`} />
            </>
          );
        })}{" "}
      <Box mt={1} className="arbitrageBox">
        <Grid container spacing={1} alignItems="center">
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <Typography
              variant="body1"
              color="secondary"
              textAlign="left"
              className="grayText"
            >
              Arbitrage
            </Typography>
            <Box style={{ marginBottom: "4px" }}>
              <Typography
                variant="body1"
                color="secondary"
                textAlign="left"
                className="grayText"
              >
                {fixDecimal(data?.profitPercent)}%{" "}
                {`(${fixDecimal(data?.profit)} USDT)`}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={5} xs={12}>
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
        <Accordion style={{ background: "transparent", boxShadow: "none" }}>
          <div className="displaySpacebetween" style={{ marginTop: "10px" }}>
            <AccordionSummary
              style={{ background: "transparent", boxShadow: "none" }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="body1">
                Capital {fixDecimal(data?.capital)}
              </Typography>
            </AccordionSummary>
          </div>
          <AccordionDetails
            style={{ padding: "0px", boxShadow: "none", display: "block" }}
          >
            <Box mt={3} mb={1}>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  className="grayText"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Start Currency:
                </Typography>
                <Typography variant="body1" className="graytext">
                  {data?.pair}
                </Typography>
              </div>
              <div className="displayCenter" style={{ marginTop: "10px" }}>
                <Typography
                  variant="body1"
                  color="primary"
                  className="grayText"
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  Capital Amount :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {data?.capital} {data?.pair}
                </Typography>
              </div>
              <div className="displayCenter" style={{ marginTop: "10px" }}>
                <Typography
                  variant="body1"
                  color="primary"
                  className="grayText"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Profit On Capital :
                </Typography>
                <Typography variant="body1" className="graytext">
                  {`${fixDecimal(data?.profit)}`} {data?.pair}
                </Typography>
              </div>

              <div className="displayCenter" style={{ marginTop: "10px" }}>
                <Typography
                  variant="body1"
                  className="graytext"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Profit Percentage :
                </Typography>
                <Typography variant="body1" style={{ whiteSpace: "pre" }}>
                  {`${fixDecimal(data?.profitPercent)} %`}
                </Typography>
              </div>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </DirectCardPaper>
  );
};

export default DetailsComponent;

const CardsValues = ({ data, value, i }) => {
  return (
    <Box className="mainClass" mt={1}>
      <Box className="displaySpacebetween" style={{ marginTop: "15px" }}>
        <Typography
          variant="h6"
          color="#80EC00"
          style={{ color: Object.values(value)[0] !== "buy" && "#F61457" }}
        >
          {Object.values(value)[0] === "buy" && "BUY"}
          {Object.values(value)[0] !== "buy" && "SELL"}
        </Typography>
        <Typography variant="body1" color="primary" mb={1}>
          {Object.values(value)[0] === "buy"
            ? fixDecimal(value.buyAmount)
            : fixDecimal(value.sellAmount)}{" "}
          &nbsp;&nbsp;
          <span
            className="accordinbottomText"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "12px",
            }}
          >
            {value.quoteCurrency}
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
              (d) => d.title.toLowerCase() === data?.exchangeName.toLowerCase()
            ).img
          }
          alt=""
          // src="/images/binace_white.svg"
          style={{
            height: "25px",
            width: "25px",
            top: "45px",
            position: "relative",
          }}
        />
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
            style={{
              position: "relative",
              top: "14px",
            }}
          >
            {" "}
            {data?.pair}
          </Typography>
          <Box mt={1}>
            <AccordionSummary
              style={{ background: "transparent", boxShadow: "none" }}
              expandIcon={<ExpandMoreIcon color="fff" />}
            >
              <Typography variant="body1">
                {fixDecimal(value.receiveAmount)} {value?.baseCurrency}
              </Typography>
            </AccordionSummary>
            <Typography variant="body1" mt={1.4} color="secondary">
              <span className="accordinbottomText">
                {value.price ? fixDecimal(value.price) : ""}{" "}
                {value.quoteCurrency} per {value?.baseCurrency}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              //style={{ color: "transparent" }}
            >
              {" "}
              {data?.buy}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontSize: "10px",
                marginTop: "5px",
                // color: "transparent",
              }}
              color="secondary"
            >
              {data?.exchangeName}
            </Typography>
          </Box>
        </Box>
        <AccordionDetails
          style={{ padding: "0px", boxShadow: "none", display: "block" }}
        >
          <Divider />
          <Box mt={1} mb={1}>
            <div className="displayCenter" mt={1}>
              <Typography
                variant="body1"
                color="primary"
                className="grayText"
                style={{ width: "100%", textAlign: "left" }}
              >
                Buy price:
              </Typography>
              <Typography variant="body1" className="graytext">
                {value?.price ? value?.price : "--"}
              </Typography>
            </div>
            <div
              className="displayCenter"
              style={{ marginTop: "10px", marginBottom: "3px" }}
            >
              <Typography
                variant="body1"
                color="primary"
                className="grayText"
                style={{ width: "100%", textAlign: "left" }}
              >
                Trading charges:
              </Typography>
              <Typography variant="body1" className="graytext">
                {value?.fees ? value?.fees : "--"}
              </Typography>
            </div>
            <div className="displayCenter">
              <Typography
                variant="body1"
                color="primary"
                className="grayText"
                style={{ width: "100%", textAlign: "left", marginTop: "10px" }}
              >
                Final buy price:
              </Typography>
              <Typography variant="body1" className="graytext">
                {value?.finalPrice ? value?.finalPrice : "--"}
              </Typography>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
