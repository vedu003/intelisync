import {
  Box,
  TableRow,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  IconButton,
  TablePagination,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import { sortAddress } from "@/utils";
// import CopyToClipboard from "react-copy-to-clipboard";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";
import DataLoader from "@/components/DataLoader";
import TableComp from "@/components/TableComp";
import SortAddress from "@/utils/SortAddress";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiTableCell-root": {
    padding: "25px 16px",
  },
  "& .tableBox": {
    minWidth: "800px",
  },
  "& .rowOdd": {
    background: "rgba(255, 255, 255, 0.04)",
  },
  "& .rowEven": {
    background: "rgb(16 21 17)",
  },
}));

const tableHead = [
  {
    heading: "S. No",
  },

  {
    heading: "Exchange",
  },
  {
    heading: "Coin",
  },
  {
    heading: "Address",
  },
  {
    heading: "Deposit amount",
  },
  {
    heading: "Date & Time",
  },
  { heading: "Status" },
];

const BodyData = [
  {
    id: "66581b717f44fb984e96616f",
    pair: "Sell",
    exchangeName: "Uniswap",
    capital: " 0.1 ETH",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "19",
    coin: "DOT",
    address: "250.878508",
  },
  {
    id: "66581b717f44fb984e96616g",
    pair: "Sell",
    exchangeName: "Uniswap",
    capital: " 0.1 ETH",
    status: "Active",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "46",
    coin: "DOT",
    address: "250.878508",
  },
  {
    id: "66581b717f44fb984e96616h",
    pair: "Sell",
    exchangeName: "Uniswap",
    capital: " 0.1 ETH",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "14",
    coin: "DOT",
    address: "250.878508",
  },
  {
    id: "66581b717f44fb984e96616e",
    pair: "Sell",
    exchangeName: "Uniswap",
    capital: " 0.1 ETH",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "52",
    coin: "DOT",
    address: "250.878508",
  },
  {
    id: "66581b717f44fb984e96616e",
    pair: "Sell",
    exchangeName: "Uniswap",
    capital: " 0.1 ETH",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "06",
    coin: "DOT",
    address: "250.878508",
  },
  {
    id: "66581b717f44fb984e96616r",
    pair: "Sell",
    exchangeName: "Uniswap",
    capital: " 0.1 ETH",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "10",
    coin: "DOT",
    address: "250.878508",
  },
  {
    id: "66581b717f44fb984e96616w",
    pair: "Sell",
    exchangeName: "Uniswap",
    capital: " 0.1 ETH",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "01",
    coin: "DOT",
    address: "250.878508",
  },
  {
    id: "66581b717f44fb984e96616c",
    pair: "Sell",
    exchangeName: "Uniswap",
    capital: " 0.1 ETH",
    status: "Pending",
    profit: "22",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "0.5",
    coin: "DOT",
    address: "250.878508",
  },
];

export default function Deposite({
  noOfPages,
  page,
  setPage,
  withdrawalHistory,
  isLoading,
}) {
  const [tab, setTab] = useState("listPlacedDirectTradeWithFilter");
  return (
    <MainBox>
      <TableComp
        maxHeight={"calc(100dvh - 400px)"}
        tableHead={
          tab !== "listPlacedDirectTradeWithFilter"
            ? tableHead.filter((item) => item.heading !== "Pair")
            : tableHead
        }
        scoreListData={
          withdrawalHistory &&
          withdrawalHistory.map((value, i) => ({
            "S. No": (page - 1) * 10 + i + 1,
            Pair:
              value.base && value.pair ? `${value.base}/${value.pair}` : "N/A",
            Exchange: value.exchangeName
              ? // ? `${value.base}/${value.pair}`
                `${value.exchangeName}`
              : "N/A",

            Coin: value.coin,
            Address: value?.address ? (
              <SortAddress address={value?.address} />
            ) : (
              "-"
            ),
            "Deposit amount": value?.amount
              ? value?.amount + " " + value.coin
              : "-",
            "Date & Time": moment(value?.createdAt).format("lll"),
            Status: value.status,
          }))
        }
        // noOfPages={numPages}
        // noOfTotalPages={numPages}
        // page={page}
        // setPage={setPage}
        // limit={10}
        isLoading={isLoading}
      />
    </MainBox>
  );
}
