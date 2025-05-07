import { Box, Button, Container, Typography, styled } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ExchangeTabBox = styled("div")((theme) => ({
  "& .mainBox": {
    "& .mainTab": {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: "50px",
      flexWrap: "wrap",
    },
    "& .paperBox": {
      marginTop: "24px",
    },
    "& .tabActiveButtons": {
      background: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
      borderRadius: "10px",
      margin: "5px",
      padding: "10px 25px",
      cursor: "pointer",
      whiteSpace: "pre",
      "& h6": {
        fontWeight: 400,
      },
      // "&:hover": {
      //   borderRadius: "5px",
      //   color: "#fff",
      // },
    },
    "& .tabButtons": {
      borderRadius: "10px",
      margin: "5px",
      padding: "10px 25px",
      whiteSpace: "pre",
      cursor: "pointer",

      "& h6": {
        fontWeight: 400,
      },
    },
    "& h3": {
      fontWeight: 700,
    },
  },
}));

const ExchangeTab = () => {
  const router = useRouter();

  return (
    <ExchangeTabBox>
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h3" color="primary">
          Exchange
        </Typography>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center" }}>
            <Image
              height={168}
              width={168}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              src="/images/DashboardIcon/profileMoneyIcon.png"
              alt="MoneyIcon"
              style={{ marginBottom: "16px" }}
            />
            <Typography variant="h6" color="primary">
              Add your first exchange account &nbsp;!
            </Typography>
            <Typography variant="body2" color="primary">
              You haven't created or added any exchange accounts yet. Use the
              button below to add an account for trading.
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/dashboard/exchanges")}
                // onClick={() => setIsConnected(true)}
              >
                Add New Exchange
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ExchangeTabBox>
  );
};

export default ExchangeTab;
