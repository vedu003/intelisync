// "use server";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import ExchangeTab from "./ExchangeTab";
import DashboardLayout from "@/layout/DashboardLayout";
import AppContext from "@/context/AppContext";
import CustomHead from "@/components/CustomHead";
import { GrTransaction } from "react-icons/gr";
import { useRouter } from "next/router";

export default function ExchangeMain(props) {
  const [isConnected, setIsConnected] = useState(true);
  const auth = useContext(AppContext);
  const { userData } = auth;
  const router = useRouter();
  console.log(userData, " ----- subscriptionPlaneStatus ----- ");
  useEffect(() => {
    if (props?.is_exchange) {
      setIsConnected(false);
    }
  }, [props]);

  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <GrTransaction color="#fff" style={{ marginRight: "6px" }} />
        <Typography variant="h3" color="primary">
          Exchanges
        </Typography>
      </Box>
    );
  }, []);

  useEffect(() => {
    async function fetchData() {
      // "use server";
      const token = window.localStorage.getItem("user_token");
      try {
        const response = await fetch("/api/ExchangeList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await response.json();
        console.log(" ExchangeList data: ------- ", data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    // fetchData();
  }, []);

  return (
    <>
      <CustomHead
        title="Exchange | Me.Cap"
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      {!isConnected && (
        <Box
          className="paperBox displayCenter"
          style={{ flexDirection: "column" }}
        >
          <img
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            src="/images/exchnageimg.svg"
            alt="MoneyIcon"
          />
          <Typography variant="h6" color="#FFFFFFDE" fontWeight="500" mt={2.4}>
            {!userData.subscriptionPlaneStatus && userData.userType == "USER"
              ? "Buy Plan"
              : "Add your first exchange account!"}
          </Typography>
          <Typography
            variant="body1"
            color="#FFFFFF99"
            style={{
              maxWidth: "500px",
              textAlign: "center",
            }}
            mt={2.4}
          >
            {!userData.subscriptionPlaneStatus && userData.userType == "USER"
              ? "You haven't purchased a subscription yet. Please subscribe to access exchange account creation and trading features."
              : `You haven't created or added any exchange accounts yet, use the
            button above to either create a account for trading.`}
          </Typography>
          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // if (!userData.subscriptionPlaneStatus) {
                //   router.push("/dashboard/plans");
                // } else {
                setIsConnected(true);
                // }
              }}
            >
              {!userData.subscriptionPlaneStatus && userData.userType == "USER"
                ? "Buy Plan"
                : "Add New Exchange"}
            </Button>
          </Box>
        </Box>
      )}
      {isConnected && <ExchangeTab />}
      {/* {isConnected && <ExchangeTab />} */}
    </>
  );
}

ExchangeMain.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  const is_exchange = req.cookies.is_exchange;
  console.log(is_exchange == "0", " ----- is_exchange ", is_exchange);
  // if (is_exchange == "0") {
  //   return {
  //     redirect: {
  //       destination: "/is_exchange == "0"dashboard/new-exchanges",
  //       permanent: false,
  //     },
  //   };
  // }
  return { props: { is_exchange: is_exchange == "0" } };
}
