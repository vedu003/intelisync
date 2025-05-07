import { Box, Paper, Typography, styled } from "@mui/material";
import React from "react";

const CombinedProfitBox = styled(Box)(({ theme }) => ({
  "& .combinedProfitsCardBox": {
    "& .headingBox": {
      borderBottom: "1px solid rgba(128, 128, 128, 0.33)",
      paddingBottom: "5px",
      "& p": {
        fontSize: "15px",
      },
    },
    "& .contentBox": {
      "& h5": {
        marginTop: "9px",
      },
    },
  },
}));

export default function CombinedProfitCard({ day, capital, percentage }) {
  return (
    <CombinedProfitBox>
      <Paper elevation={1}>
        <Box className="combinedProfitsCardBox">
          <Box className="headingBox displayCenter">
            <Typography variant="body2" color="#FFFFFF80">
              {day} Days
            </Typography>
          </Box>
          <Box className="contentBox" mt={4} mb={0}>
            <Typography variant="h6" color="#FFFFFF" align="center">
              {Number(capital)}{" "}
              <span style={{ color: "#806DFF" }}> {Number(percentage)}</span>
            </Typography>

            <Typography
              variant="body1"
              color="#FFFFFF"
              align="center"
              mt={1}
              style={{ fontWeight: "600", fontSize: "12px" }}
            >
              USDT
            </Typography>
            <Typography
              variant="body1"
              color="#FFFFFF"
              align="center"
              mt={1}
              style={{
                fontWeight: "600",
                fontSize: "12px",
                color: "transparent",
              }}
            >
              BTC
            </Typography>
          </Box>
        </Box>
      </Paper>
    </CombinedProfitBox>
  );
}
