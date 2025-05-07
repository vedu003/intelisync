"use client";
import { Box, Typography, styled } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import CustomHead from "@/components/CustomHead";
import DashboardLayout from "@/layout/DashboardLayout";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import TableComp from "@/components/TableComp";
import AppContext from "@/context/AppContext";
import Image from "next/image";
const TransactionBox = styled("div")(({ theme }) => ({
  "& .transactionBox": {
    position: "relative",
    zIndex: "999",
    // maxWidth: "1000px",
    "& .MuiTableCell-root": {
      padding: "25px 16px",
    },
    "& .viewMoreStyle": {
      background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  "& .tableBox": {
    minWidth: "800px",
  },
  "& .cardBox": {
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #cccccc36",
    background: "rgba(0, 0, 0, 0.08)",
    marginBottom: "10px",
  },
  "& .contentBox": {
    textAlign: "right",
    width: "100%",
  },
}));

const tableHead = [
  {
    heading: "Sr. No",
  },
  {
    heading: "Exchange",
  },
  {
    heading: "Pair",
  },
];

export default function PairWhitelisted() {
  const [pairDetail, setPairDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AppContext);

  const pairWhiteListedList = async () => {
    setIsLoading(true);
    try {
      const res = await apiRouterCall({
        method: "GET",
        url: api_configs.mexcPairList,
      });
      if (res.data.responseCode === 200) {
        setPairDetail(res.data.result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <Image
          height={24}
          width={24}
          quality={100}
          src="/images/clock.svg"
          style={{ marginRight: "6px" }}
        />
        <Typography variant="h3" color="primary" whiteSpace="pre">
          Pair Whitelist
        </Typography>
      </Box>
    );
  }, []);

  useEffect(() => {
    pairWhiteListedList();
  }, []);
  return (
    <TransactionBox>
      <CustomHead
        title="MEXC Pair List List | Me.Cap"
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="transactionBox">
        <TableComp
          tableHead={tableHead}
          scoreListData={
            pairDetail &&
            pairDetail.map((value, index) => ({
              "Sr. No": index + 1,
              Exchange: "MEXC",
              Pair: value,
              // Pair: "BAL/USDT",
            }))
          }
          noOfPages={"numPages"}
          noOfTotalPages={"numPages"}
          page={"page"}
          setPage={"setPage"}
          limit={10}
          isLoading={isLoading}
          // maxHeight="calc(100dvh - 120px)"
        />
      </Box>
    </TransactionBox>
  );
}
PairWhitelisted.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
