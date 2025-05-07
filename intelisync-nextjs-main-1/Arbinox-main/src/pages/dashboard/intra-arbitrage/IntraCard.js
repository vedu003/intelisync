import { Box, Divider } from "@mui/material";
import React, { useState } from "react";
import Popup from "@/components/DynamicModel";
import toast from "react-hot-toast";
import axios from "axios";
import { api_configs } from "@/api-services";
// import DetailsComponent from "./DetailsComponent";
import DetailsComponent from "../trainguler-arbitrage/DetailsComponent";

export default function TriangularCard({ value }) {
  const [openLiveTrackingModal, setOpenLiveTrackingModal] = useState(false);
  const [isOpenTrade, setIsOpenTrade] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = window.localStorage.getItem("user_token");

  const tradeProfitPathsDirectHandler = async (value) => {
    setIsProcessing(true);
    // console.log(" ------- value ", value);
    // return;
    try {
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
        url: api_configs.tradeProfitPathsIntraArb,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.status == 200) {
        toast.success(response.data?.responseMessage);
        setIsProcessing(false);

        setIsOpenTrade(false);
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
      <DetailsComponent
        data={value}
        openLiveTrackingModal={openLiveTrackingModal}
        setOpenLiveTrackingModal={setOpenLiveTrackingModal}
        setIsOpenTrade={setIsOpenTrade}
        isOpenTrade={isOpenTrade}
      />
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
              color: "primary",
              variant: "contained",
              isLoading: isProcessing,
            },
          ]}
        >
          <DetailsComponent
            data={value}
            ExecuteButtonType={true}
            onClose={() => setIsOpenTrade(false)}
          />
        </Popup>
      )}
    </Box>
  );
}
