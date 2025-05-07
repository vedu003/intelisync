import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { features } from "@/data";

import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import FolderIcon from "@mui/icons-material/Folder";
import CheckIcon from "@mui/icons-material/Check";

const CurrentPlanBox = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  "& .flexStyle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px 0px",
  },
  "& .textColor": {
    "& p": {
      fontSize: "16px",
      width: "100%",
      maxWidth: "515px",
      margin: "0 auto",
      padding: "14px 0px",
    },
  },
  "& .MuiDivider-root": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "& .paperBox": {
    height: "100%",
    borderRadius: "20px",
    padding: "0px",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    "@media(max-width:599px)": {
      marginBottom: "60px",
    },
  },
  "& .basicPlanBox": {
    padding: "18px",
    "& h6": {
      color: "rgb(23, 255, 230)",
      textAlign: "center",
      borderRadius: "10px",
      border: "1px solid",
      marginBottom: "5px",
    },
  },
  "& .featureControl": {
    padding: "18px",
  },
}));

const planData = [
  {
    text1: "Package 1",
    text2: "In publishing and graphic design, to demonstrate.",
    price: "$200/",
    month: "Month",
    isActive: false,
  },
  {
    text1: "Package 2",
    text2: "In publishing and graphic design, to demonstrate.",
    price: "$300/",
    month: "Month",
    isActive: true,
  },
  {
    text1: "Package 3",
    text2: "In publishing and graphic design, to demonstrate.",
    price: "$400/",
    month: "Month",
    isActive: false,
  },
];

export default function CurrentPlan() {
  return (
    <CurrentPlanBox>
      <Box className="filterpaper">
        <Typography variant="h4" color="primary" textAlign="center">
          Current Plans
        </Typography>
        <Box className="textColor">
          <Typography variant="body2" color="secondary" textAlign="center">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate.
          </Typography>
        </Box>
        <Box mt={4}>
          <Grid container spacing={2} justifyContent="center">
            {planData?.map((data, i) => {
              const featureCheckBackgroundColor = data.isActive
                ? "rgba(239, 93, 168, 1)"
                : "rgba(42, 171, 227, 1)";
              // i === 1 ? "rgba(239, 93, 168, 1)" : "rgba(42, 171, 227, 1)";
              const cardHeight = data.isActive
                ? { minHeight: "250px" }
                : { minHeight: "200px" };
              // i === 1 ? { minHeight: "250px" } : { minHeight: "200px" };

              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
                  <Paper elevation={2} className="paperBox" style={cardHeight}>
                    <Box className="basicPlanBox">
                      <Box>
                        {data.isActive && (
                          <Typography variant="h6" color="primary">
                            ACTIVE
                          </Typography>
                        )}
                        <Typography variant="h5" color="primary">
                          {data?.text1}
                        </Typography>
                        <Box
                          style={{ margin: "10px 0px 20px" }}
                          className="displaySpacebetween"
                        >
                          <Typography variant="body1" color="secondary">
                            {data?.text2}
                          </Typography>
                          <Box></Box>
                        </Box>
                        <Divider />
                        <Box className="flexStyle">
                          <Typography variant="h4" color="primary">
                            {data?.price}
                            <span
                              style={{ fontSize: "16px", fontWeight: "300" }}
                            >
                              {data?.month}
                            </span>
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              color: "#17FFE6",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            More Details
                          </Typography>
                        </Box>
                        <Divider />
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="body2"
                          color="primary"
                          style={{ fontWeight: "500", marginBottom: "16px" }}
                        >
                          Add Functions
                        </Typography>
                        {features.map((feature, index) => (
                          <FeatureListItem
                            key={index}
                            item={feature}
                            backgroundColor={featureCheckBackgroundColor}
                          />
                        ))}
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Button variant="contained" color="secondary">
                            Start for free
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </CurrentPlanBox>
  );
}

const FeatureListItem = ({ item, backgroundColor }) => {
  return (
    <Box>
      {item && item?.value && (
        <Grid container spacing={0}>
          <Grid item xs={1}>
            {item?.value && (
              <Box className="featureCheck">
                <CheckIcon
                  style={{
                    color: "#00C64F",
                    fontSize: "25px",
                  }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={11}>
            <Box>
              <Typography
                color="secondary"
                variant="body2"
                sx={{ marginLeft: "10px", marginBottom: "20px" }}
              >
                {item?.value}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
