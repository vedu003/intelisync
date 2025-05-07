import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Typography,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import { api_configs } from "@/api-services";
import axios from "axios";

const LivetableBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  "& .typoBox": {
    padding: "10px 0px 30px",
  },
  "& .invitebutton": {
    marginRight: "-13px",
    padding: "24px 39px",
  },
  "& .paperBox": {
    padding: "80px 30px",
    borderRadius: "5px",
  },
  "& .MuiTableContainer-root": {
    background: "#1c1a1e",
  },
  "& .invitelistBox": {
    padding: "30px 0px 10px",
  },
  "& .displaySpacearound": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "10px 0px",
    marginTop: "15px",
    background: "transparent",
  },
  "& .MuiTableCell-root": {
    color: "#fff",
  },
  "& .lastRow": {
    borderBottom: "none",
  },
}));
// const asksBids = [
//   { asksSize: "10", asksPrice: "$100", bidsSize: "15", bidsPrice: "$105" },
//   { asksSize: "20", asksPrice: "$200", bidsSize: "25", bidsPrice: "$205" },
//   { asksSize: "30", asksPrice: "$300", bidsSize: "35", bidsPrice: "$305" },
//   { asksSize: "40", asksPrice: "$400", bidsSize: "45", bidsPrice: "$405" },
// ];

export default function LiveTable({ data }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [asksBids, setAsksBids] = useState([]);
  const token = window.localStorage.getItem("user_token");

  const tradeProfitPathsDirectHandler = async (value) => {
    try {
      setIsProcessing(true);
      const dataToSend = {
        buyExchange: value.buy,
        sellExchange: value.sell,
        symbol1: value.base,
        symbol2: value.pair,
      };
      const response = await axios({
        method: "POST",
        url: api_configs.asks_bids_prices,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.status === 200) {
        // eslint-disable-line
        let asks = response.data.result?.asks ? response.data.result?.asks : [];
        let bids = response.data.result?.bids ? response.data.result?.bids : [];

        setIsProcessing(false);
        let combinedArray;
        if (asks.length > 0) {
          combinedArray = asks?.map((obj, index) => {
            return Object.assign({
              asksSize: obj[0],
              asksPrice: obj[1],
              bidsSize: bids.length > 0 ? bids[index][0] : "",
              bidsPrice: bids.length > 0 ? bids[index][1] : "",
            });
          });
        } else {
          combinedArray = bids?.map((obj, index) => {
            return Object.assign({
              asksSize: asks.length > 0 ? asks[index][0] : "",
              asksPrice: asks.length > 0 ? asks[index][1] : "",
              bidsSize: obj[0],
              bidsPrice: obj[1],
            });
          });
        }
        setAsksBids(combinedArray);
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };
  useEffect(() => {
    if (data && !isProcessing) {
      setIsProcessing(true);
      tradeProfitPathsDirectHandler(data);
    }
  }, [data]);
  return (
    <LivetableBox>
      <Box className="displaySpacearound">
        <Typography variant="h6" color="primary" style={{ fontSize: "14px" }}>
          ASKS {data?.base} {data?.pair}
        </Typography>
        <Typography variant="h6" color="primary" style={{ fontSize: "14px" }}>
          BIDS {data?.base} {data?.pair}
        </Typography>
      </Box>
      {asksBids?.length > 0 && (
        <TableContainer style={{ maxHeight: "calc(100dvh - 400px)" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>Size</TableCell>
                <TableCell sx={{ minWidth: "100px", textAlign: "center" }}>
                  Price
                </TableCell>
                <TableCell sx={{ minWidth: "200px", textAlign: "center" }}>
                  Size
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {asksBids &&
                asksBids.map((value, index) => (
                  <TableRow
                    key={index}
                    className={index === asksBids.length - 1 ? "lastRow" : ""}
                  >
                    <TableCell style={{ textAlign: "center" }}>
                      {value.asksSize}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {value.asksPrice}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {value.bidsSize}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {value.bidsPrice}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </LivetableBox>
  );
}
