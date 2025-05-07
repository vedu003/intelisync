import PlansCard from "@/components/PlansCard";
import DashboardLayout from "@/layout/DashboardLayout";
import styled from "@emotion/styled";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "@/context/AppContext";
const PlanComponent = styled("div")(({ theme }) => ({}));

export default function PlansDash() {
  const auth = useContext(AppContext);
  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <img
          src="/images/download.svg"
          width="20px"
          height="20px"
          style={{ marginRight: "6px" }}
        />
        <Typography variant="h3" color="primary" whiteSpace="pre">
          Subscription Plans
        </Typography>
      </Box>
    );
  }, []);
  return (
    <PlanComponent>
      <PlansCard />
    </PlanComponent>
  );
}

PlansDash.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
