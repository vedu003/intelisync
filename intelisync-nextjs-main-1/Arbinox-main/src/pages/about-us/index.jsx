import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, styled } from "@mui/material";
import HomeLayout from "@/layout/HomeLayout";
import CustomHead from "@/components/CustomHead";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import CommentListSkeleton from "@/components/Skeletons/CommentListSkeleton";
import axios from "axios";

const CurrentPlanBox = styled("div")(({ theme }) => ({
  minHeight: "calc(100vh - 415px)",
  "& .filterpaper": {
    margin: "130px 0",

    [theme.breakpoints.down("sm")]: {
      margin: "90px 0",
    },
    "& h3": {
      fontSize: "25px",
    },
  },
}));

export default function Static() {
  const [staticContentData, setStaticContentData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getStaticContentApi = async (source) => {
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.viewStaticContent,
        paramsData: {
          type: "aboutUs",
        },
        source: source,
      });
      if (response.data.responseCode === 200) {
        setStaticContentData(response.data.result);
      } else {
        setStaticContentData();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getStaticContentApi(source);
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <CurrentPlanBox style={{ marginTop: "80px" }}>
      <CustomHead
        title="Static Content"
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Container>
        <Paper elevation={2} className="filterpaper" style={{margin: "2rem 0rem", paddingTop:"2rem"}}>
          <Box>
            <Typography variant="h2" color="primary">
              {staticContentData?.title || "About Us"}
            </Typography>
          </Box>
          {/* <Box mt={2} className="mainContent">
            {isLoading ? (
              [1, 2, 3, 4].map((itm) => <CommentListSkeleton key={itm} />)
            ) : (
              <Typography
                variant="body2"
                color="secondary"
                className="staticContent"
                dangerouslySetInnerHTML={{
                  __html: staticContentData?.description, // Using the defined termsContent
                }}
              />
            )}
          </Box> */}
        </Paper>
        <Box style={{ fontSize: "22px", lineHeight: "30px" }}>
          <p>
            Arbinox is the ultimate platform for crypto traders who want to stay
            ahead of the game. Designed by blockchain veterans and pro traders,
            Arbinox uncovers real-time arbitrage opportunities across top
            decentralized exchanges (DEXs), giving you the edge to profit from
            price differences—fast.
          </p>
          <p>
            Powered by advanced algorithms and live market data, Arbinox lets
            you trade smarter while staying in full control of your funds.
            There’s no middleman, no compromise—just seamless, secure automation
            that executes directly from your wallet.
          </p>
          <p>
            Whether you're a seasoned trader or just getting started, Arbinox
            gives you the tools to maximize returns, minimize risk, and move
            confidently in the world of DeFi. Speed. Security. Control. That’s
            the Arbinox advantage.
          </p>
        </Box>
      </Container>
    </CurrentPlanBox>
  );
}

Static.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
