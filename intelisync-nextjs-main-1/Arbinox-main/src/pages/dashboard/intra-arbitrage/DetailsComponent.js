import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Box, Divider, Grid } from "@mui/material";
import { ExchangeLogo, fixDecimal } from "@/utils";
import AppContext from "@/context/AppContext";

const DirectCardPaper = styled(Paper)(({ theme, ExecuteButtonType }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  background: ExecuteButtonType ? "transparent" : "rgba(255, 255, 255, 0.03)",
  padding: ExecuteButtonType ? 0 : "12px",
  "& img": {
    borderRadius: "50%",
  },
  "& h6": {
    fontSize: "16px",
    color: "#21C763",
  },
  "& .modal": {
    "& .MuiPaper-root": {
      background: "transperent",
    },
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
    // background: "rgba(255, 255, 255, 0.05) !important",
    padding: "0px 6px",
    minHeight: "29px",
    borderRadius: "5px",
    margin: "0px 0 5px",
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
    fontSize: "17px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "3px 0",
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
    // borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "& .mainClass": {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    padding: "12px 10px 6px",
    borderRadius: "10px",
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "6px 10px 11px",
    borderRadius: "10px",
    position: "relative",
  },
}));

const DetailsComponent = ({ data, ExecuteButtonType, setIsOpenTrade }) => {
  const { userData } = useContext(AppContext);
  return (
    <DirectCardPaper
      ExecuteButtonType={ExecuteButtonType}
      style={{ border: "none" }}
    >
      {data?.coins &&
        data?.coins.map((value, i) => {
          return (
            <>
              <CardsValues data={data} value={value} i={i} key={`coins${i}`} />
            </>
          );
        })}{" "}
      <Box
        mt={1}
        className="arbitrageBox"
        // sx={ExecuteButtonType ? { display: "flex" } : {}}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <Typography variant="body1" color="secondary" textAlign="left">
              Arbitrage
            </Typography>

            <Box style={{ marginBottom: "4px" }}>
              <Typography variant="body1" color="primary" textAlign="left">
                {fixDecimal(data?.profitPercent)}%{" "}
                {`(${fixDecimal(data?.profit)} USDT)`}
              </Typography>
            </Box>
          </Grid>
          {!ExecuteButtonType && (
            <Grid item lg={5} md={5} sm={5} xs={12}>
              {" "}
              <>
                <Box
                  style={{
                    background: "#212623",
                    padding: "10px 11px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    position: "absolute",
                    right: "4px",
                    top: "21px",
                    // width: "100%",
                    zIndex: 999,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      !userData.subscriptionPlaneStatus &&
                      userData.userType == "USER"
                    ) {
                      toast.error(
                        "Please subscribe to access live arbitrage trading features."
                      );
                    } else {
                      setIsOpenTrade(true);
                    }
                  }}
                  // onClick={(e) => {
                  //   e.stopPropagation();
                  //   setIsOpenTrade(true);
                  // }}
                >
                  <Typography variant="body2">TRACK LIVE</Typography>
                </Box>
              </>
            </Grid>
          )}
        </Grid>
        <Accordion style={{ background: "transparent", boxShadow: "none" }}>
          <div className="displaySpacebetween">
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
            <Box mt={1} mb={1}>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Start Currency:
                </Typography>
                <Typography variant="body1" className="graytext">
                  {data?.pair}
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
                  {fixDecimal(data?.capital)} {data?.pair}
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
                  Profit Percentage :
                </Typography>
                <Typography variant="body1" className="graytext">
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
    <Box className={`mainClass ${"modal"}`} mt={1}>
      <Box className="displaySpacebetween">
        <Typography
          variant="h6"
          style={{ color: Object.values(value)[0] !== "buy" && "#FF1010" }}
        >
          {Object.values(value)[0] === "buy" && "BUY"}
          {Object.values(value)[0] !== "buy" && "SELL"}
        </Typography>
        <Typography variant="body2" color="primary">
          {Object.values(value)[0] === "buy"
            ? fixDecimal(value.buyAmount)
            : fixDecimal(value.sellAmount)}{" "}
          &nbsp;&nbsp;
          <span
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "10px",
            }}
          >
            {value.quoteCurrency}
          </span>
        </Typography>
        <img
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          src={
            ExchangeLogo.find(
              (d) => d.title.toLowerCase() === data?.exchangeName.toLowerCase()
            ).img
          }
          alt=""
          style={{ height: "25px", width: "25px" }}
        />
      </Box>
      <Accordion style={{ background: "transparent", boxShadow: "none" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2"> {data?.pair}</Typography>
          <Box>
            <AccordionSummary
              style={{ background: "transparent", boxShadow: "none" }}
              expandIcon={<ExpandMoreIcon color="fff" />}
            >
              <Typography variant="body1">
                {fixDecimal(value.receiveAmount)} {value?.baseCurrency}
              </Typography>
            </AccordionSummary>
            <Typography
              variant="body1"
              style={{ fontSize: "10px", margin: "3px 0px" }}
              color="secondary"
            >
              {value.price} {value.quoteCurrency} per {value?.baseCurrency}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1"> {data?.buy}</Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "10px", marginTop: "5px" }}
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
            <div className="displayCenter">
              <Typography
                variant="body1"
                color="primary"
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
              style={{ marginTop: "3px", marginBottom: "3px" }}
            >
              <Typography
                variant="body1"
                color="primary"
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
                style={{ width: "100%", textAlign: "left" }}
              >
                Final buy price:
              </Typography>
              <Typography variant="body1" className="graytext">
                {value?.finalPrice ? fixDecimal(value?.finalPrice) : "--"}
              </Typography>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
