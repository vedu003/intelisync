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
  const checkStaticType =
    location?.search?.split("?")[1] == "disclaimer"
      ? "riskDisclosure"
      : location?.search?.split("?")[1];
  const [staticContentData, setStaticContentData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getStaticContentApi = async (source) => {
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.viewStaticContent,
        paramsData: {
          type: "privacyPolicy",
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
        <Paper elevation={2} className="filterpaper">
          <Box>
            <Typography variant="h2" color="primary">
              {staticContentData?.title || "Privacy Policy"}
            </Typography>
          </Box>
          <Box mt={2} className="mainContent">
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
          </Box>
        </Paper>
      </Container>
    </CurrentPlanBox>
  );
}

Static.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
