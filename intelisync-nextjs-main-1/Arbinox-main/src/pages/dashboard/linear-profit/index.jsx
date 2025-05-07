"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import FilterModal from "@/components/FilterModal";
import DashboardLayout from "@/layout/DashboardLayout";

import { handleNegativeValue, maxCapitalsLimit } from "@/utils";
import { useRouter } from "next/router";
import LinerTable from "./LinerTable";

const ExchangeContainer = styled("div")({
  "& .invitebutton": {
    marginRight: "-9px",
    padding: "9px 28px",
    zIndex: "999",
    borderRadius: "8px !important",
  },
});
const DisplayStart = styled("div")({
  display: "flex",
  alignItems: "center",
});
export default function Linerprofit() {
  const token = window.localStorage.getItem("user_token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [filterStatus, setFilterStatus] = React.useState(false);
  const [amountCapital, setAmountCapital] = useState("");

  const getUpdateCapitalAmount = async () => {
    if (amountCapital < 50 || amountCapital > maxCapitalsLimit) {
      setisSubmit(false);
      return;
    }
    try {
      const dataToSend = {
        type: "DIRECT",
        amount: amountCapital.toString(),
      };
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: api_configs.updateCapitalAmount,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      console.log(response, " response------ ");
      if (response.status == 200) {
        toast.success("Capital amount updated successfully.");
        getCapitalAmount();
        setFilterStatus(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response) {
        toast.success(error.response.data.responseMessage);
      } else {
        toast.success(error.message);
      }
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isSocLoading, setIsSocLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    fromExchange: [],
    toExchange: [],
    startToken: [],
  });

  return (
    <ExchangeContainer>
      <Box>
        <Typography variant="h4" color="#000000">
          Linear Profit Opportunities
        </Typography>
        <Typography variant="body1" color="#000000" mt={0}>
          This type of arbitrage is found between the same/different exchanges,
          different markets.
        </Typography>
      </Box>
      <Box
        className="displaySpacebetween"
        mt={2}
        style={{ gap: "10px" }}
        mb={2}
      >
        <Box className="textfieldBox displayCenter">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter amount"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="primary"
                    className="invitebutton"
                    // disabled={amountCapital === ""}
                    // onClick={getUpdateCapitalAmount}
                  >
                    Go
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ padding: "8px 40px" }}
        >
          Filter
        </Button>
      </Box>
      <LinerTable />
      {open && (
        <FilterModal
          setOpen={setOpen}
          open={open}
          type="direct"
          filterData={filterData}
          setFilterData={setFilterData}
          setFilterStatus={setFilterStatus}
        />
      )}
    </ExchangeContainer>
  );
}
Linerprofit.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
