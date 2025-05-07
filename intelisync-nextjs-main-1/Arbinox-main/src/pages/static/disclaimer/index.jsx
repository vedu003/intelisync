import { Box, Typography, Container } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import HomeLayout from "@/layout/HomeLayout";
const MainDocumentBox = styled("div")(({ theme }) => ({
  "& .desscribeText": {
    fontSize: "42px",
    lineHeight: "55px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "30px",
    },
  },
}));
export default function Cookies() {
  return (
    <MainDocumentBox>
      <Box className="main-sectionGap1">
        <Container maxWidth="lg">
          <Box className="heading">
            <Typography variant="h2" color="primary" fontWeight="500">
              Cookie Policy
            </Typography>
          </Box>

          <Box className="main-sectionGap2" mt={4}>
            <Typography
              variant="h2"
              color="#9B95FF"
              className="desscribeText animatedText"
            >
              ME Cap is an advanced platform designed for crypto traders to take
              advantage of arbitrage opportunities across various decentralized
              exchanges (DEXs).
              <span style={{ color: "#202020" }}>
                Our system automates the trading process, allowing users to
                capitalize on price differences swiftly and efficiently. With ME
                Cap, traders maintain control of their funds, which remain in
                their own accounts.
              </span>
            </Typography>
          </Box>
        </Container>
      </Box>
    </MainDocumentBox>
  );
}

Cookies.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
