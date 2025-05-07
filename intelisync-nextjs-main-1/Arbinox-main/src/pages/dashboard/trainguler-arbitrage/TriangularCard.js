import { Box, Divider } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import DetailsComponent from "./DetailsComponent";
import toast from "react-hot-toast";
import { api_configs } from "@/api-services";

import dynamic from "next/dynamic";

const Popup = dynamic(() => import("@/components/DynamicModel"));
// import Popup from "@/components/DynamicModel";
export default function TriangularCard({ value }) {
  const [isOpenTrade, setIsOpenTrade] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = window.localStorage.getItem("user_token");

  const tradeProfitPathsDirectHandler = async (value) => {
    try {
      setIsProcessing(true);
      const dataToSend = {
        exchangeName: value.exchangeName,
        capital: value.capital,
        start: value.start,
        expectedProfit: value.profit,
        strategy: value.coins,
        capitalInUSDT: value.capitalInUSDT,
      };
      const response = await axios({
        method: "POST",
        url: api_configs.tradeProfitPathsTriangular,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.status == 200) {
        toast.success(response.data?.responseMessage);
        setIsProcessing(false);
        setIsOpenTrade(false);
        // onClose(false);
      } else {
        setIsProcessing(false);
        toast.error(response.data?.responseMessage);
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      if (error.response) {
        toast.error(error.response.data?.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Box>
      <DetailsComponent data={value} setIsOpenTrade={setIsOpenTrade} />
      {isOpenTrade && (
        <Popup
          maxWidth="sm"
          open={isOpenTrade}
          handleClose={() => {
            if (!isProcessing) {
              setIsOpenTrade(false);
            }
          }}
          isLoading={isProcessing}
          title="Live tracking"
          actions={[
            {
              label: "Submit",
              onClick: () => tradeProfitPathsDirectHandler(value),
              color: "secondary",
              variant: "contained",
              isLoading: isProcessing,
            },
          ]}
        >
          <DetailsComponent
            data={value}
            setIsOpenTrade={setIsOpenTrade}
            ExecuteButtonType={true}
          />
        </Popup>
      )}
    </Box>
  );
}
