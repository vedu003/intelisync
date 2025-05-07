import { Box } from "@mui/material";
import React, { useState } from "react";
// import LiveTracking from "./LiveTracking";
// import DetailsComponent from "./DetailsComponent";
import dynamic from "next/dynamic";

const DetailsComponent = dynamic(() => import("./DetailsComponent"));
const LiveTracking = dynamic(() => import("./LiveTracking"));

export default function DirectCard({ value, showPlacedExchange }) {
  const [isOpenTrade, setIsOpenTrade] = useState(false);

  const ArbitrageLiveData = (data) => {
    return (
      <Box>
        <DetailsComponent
          data={data}
          setIsOpenTrade={(e) => setIsOpenTrade(e)}
          isOpenTrade={isOpenTrade}
        />
      </Box>
    );
  };

  return (
    <Box>
      {!showPlacedExchange
        ? ArbitrageLiveData(value)
        : "ArbitrageHistoryData(value)"}
      {isOpenTrade && (
        <LiveTracking
          open={isOpenTrade}
          data={value}
          showPlacedExchange={showPlacedExchange}
          onClose={(data) => setIsOpenTrade(data)}
        />
      )}
    </Box>
  );
}
