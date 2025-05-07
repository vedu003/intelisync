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
// import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { sortAddress } from "@/utils";
// import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { AiOutlineCopy } from "react-icons/ai";
import DataLoader from "@/components/DataLoader";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";
import TableComp from "@/components/TableComp";
import SortAddress from "@/utils/SortAddress";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiTableCell-root": {
    padding: "25px 16px",
  },
  "& .tableBox": {
    minWidth: "800px",
  },
}));

const tableHead = [
  {
    heading: "S. No",
  },

  {
    heading: "Exchange",
  },
  // {
  //   heading: "Coin",
  // },

  {
    heading: "Withdraw Amount",
  },
  {
    heading: "Withdraw Wallet Address",
  },
  {
    heading: "Trx Hash",
  },
  // {
  //   heading: "Withdraw Id",
  // },
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
    amount: " 24.1 USDT",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "19",
    coin: "DOT",
    walletaddress: "250.878508",
    date: "Feb 1, 2024, 12:38:03 PM",
    trxaddress: "0x5gg56........utt568h",
  },
  {
    id: "66581b717f44fb984e96616g",
    pair: "Sell",
    exchangeName: "Uniswap",
    amount: " 24.1 USDT",
    status: "Active",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "46",
    coin: "DOT",
    walletaddress: "250.878508",
    address: "250.878508",
    date: "Feb 1, 2024, 12:38:03 PM",
    trxaddress: "0x5gg56........utt568h",
  },
  {
    id: "66581b717f44fb984e96616h",
    pair: "Sell",
    exchangeName: "Uniswap",
    amount: " 24.1 USDT",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    walletaddress: "250.878508",
    strategy: "Stop Loss",
    tradeTime: "14",
    coin: "DOT",
    address: "250.878508",
    date: "Feb 1, 2024, 12:38:03 PM",
    trxaddress: "0x5gg56........utt568h",
  },
  {
    id: "66581b717f44fb984e96616e",
    pair: "Sell",
    exchangeName: "Uniswap",
    amount: " 24.1 USDT",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    walletaddress: "250.878508",
    tradeTime: "52",
    coin: "DOT",
    address: "250.878508",
    date: "Feb 1, 2024, 12:38:03 PM",
    trxaddress: "0x5gg56........utt568h",
  },
  {
    id: "66581b717f44fb984e96616e",
    pair: "Sell",
    exchangeName: "Uniswap",
    amount: " 24.1 USDT",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "06",
    coin: "DOT",
    walletaddress: "250.878508",
    address: "250.878508",
    date: "Feb 1, 2024, 12:38:03 PM",
    trxaddress: "0x5gg56........utt568h",
  },
  {
    id: "66581b717f44fb984e96616r",
    pair: "Sell",
    exchangeName: "Uniswap",
    amount: " 24.1 USDT",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "10",
    coin: "DOT",
    address: "250.878508",
    walletaddress: "250.878508",
    date: "Feb 1, 2024, 12:38:03 PM",
    trxaddress: "0x5gg56........utt568h",
  },
  {
    id: "66581b717f44fb984e96616w",
    pair: "Sell",
    exchangeName: "Uniswap",
    amount: " 24.1 USDT",
    status: "Pending",
    profit: "250.878508",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    walletaddress: "250.878508",
    tradeTime: "01",
    coin: "DOT",
    address: "250.878508",
    date: "Feb 1, 2024, 12:38:03 PM",
    trxaddress: "0x5gg56........utt568h",
  },
  {
    id: "66581b717f44fb984e96616c",
    pair: "Sell",
    exchangeName: "Uniswap",
    amount: " 24.1 USDT",
    status: "Pending",
    profit: "22",
    tradeType: "Type",
    openDate: "09October2024",
    closeDate: "09October2024",
    strategy: "Stop Loss",
    tradeTime: "0.5",
    coin: "DOT",
    walletaddress: "250.878508",
    address: "250.878508",
    date: "Feb 1, 2024, 12:38:03 PM",
    trxaddress: "0x5gg56........utt568h",
  },
];

export default function WithdrawHistory({
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
              value.base && value.pair
                ? `${value.base}/${value.pair}`
                : // `${value.base}`
                  "N/A",
            Exchange:
              value.exchangeName && value.exchangeName
                ? // ? `${value.base}/${value.pair}`
                  `${value.exchangeName}`
                : "N/A",

            // Coin: value.coin,

            // Profit: value?.profit ? setCryptoDecimals(value?.profit) : "-",
            "Withdraw Amount": value?.amount,
            // ? value?.amount + " " + value.coin
            // : "-",
            // "Transaction Fee": value?.transactionFee
            //   ? value?.transactionFee + " " + value.coin
            //   : "-",
            "Withdraw Wallet Address": value?.walletaddress,
            "Trx Hash": value?.trxaddress,
            // "Withdraw Id": value?.withdrawId ? value?.withdrawId : "-",

            // "Date & Time": moment(value?.createdAt).format("lll"),
            "Date & Time": value?.date,

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
