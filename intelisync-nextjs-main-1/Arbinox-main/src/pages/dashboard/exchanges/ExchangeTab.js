import { Box, Divider, Grid, Paper, Typography, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ConnectedWithExchange from "./ConnectedWithExchange";
import RecentConnectedExchange from "./RecentConnectedExchange";
import { api_configs } from "@/api-services";
import AppContext from "@/context/AppContext";
import { apiRouterCall } from "@/api-services/service";

const ExchangeTabBox = styled("div")(({ theme }) => ({
  "& .mainBox": {
    "& .mainTab": {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: "50px",
      flexWrap: "wrap",
    },
    "& .tabmainBox": {
      width: "fit-content",
      padding: "5px !important",
      borderRadius: "44px",
      border: "none",
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
        "& h6": {
          fontSize: "12px !important",
        },
      },
    },

    "& .tabActiveButtons": {
      padding: "9px 25px",
      cursor: "pointer",
      whiteSpace: "pre",
      fontWeight: "500",
      color: "#000",
      borderRadius: "50px",
      border: "2px solid",
      borderColor: "transparent",
      background: "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%)",

      "& h6": {
        fontWeight: 500,
        fontSize: "14px",
        color: "#000",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
        "& h6": {
          fontSize: "12px !important",
        },
      },
    },
    "& .tabButtons": {
      "& h6": {
        fontWeight: 500,
        fontSize: "14px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
        "& h6": {
          fontSize: "12px !important",
        },
      },
    },
    "& h3": {
      fontWeight: 700,
    },
  },
}));
const ExchangeTab = () => {
  const auth = useContext(AppContext);
  const [tabs, setTabs] = useState("binding");
  const [exchangeList, setExchangeList] = useState([]);

  const getConnectedExchangeList = async () => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.connectedExchangePreviousList,
        token: window.localStorage.getItem("user_token"),
      });
      if (response.data.responseCode === 200) {
        let resultData = response.data.result.map((el) => {
          el.exchangeName = el.exchangeUID;
          return el;
        });
        // exchangeName
        setExchangeList(resultData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("user_token")) {
        getConnectedExchangeList(window.localStorage.getItem("user_token"));
      }
    }
  }, [tabs]);

  return (
    <ExchangeTabBox>
      <Box className="mainBox">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ConnectedWithExchange />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentConnectedExchange
              isDisconnected={true}
              // list={exchangeList}
              list={auth?.connectedExchangeList}
            />
          </Grid>
        </Grid>
      </Box>
    </ExchangeTabBox>
  );
};

export default ExchangeTab;
