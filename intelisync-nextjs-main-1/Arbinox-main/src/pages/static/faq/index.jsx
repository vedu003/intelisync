import { Box, Grid, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Accordions from "./Accordions";
import HomeLayout from "@/layout/HomeLayout";
import CommentListSkeleton from "@/components/Skeletons/CommentListSkeleton";
import NoDataFound from "@/components/NoDataFound";
import axios from "axios";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";

const StyledFaqSection = styled("Box")(({ theme }) => ({
  "& .faqMainBox": {
    "& .heading": {
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.6)",
    },
    "& .description": {
      fontWeight: 400,
      color: "#FFF",
    },
    "& .blogmainBox1": {
      padding: "0px 0 80px",
      marginTop: "50px",
    },
  },
}));

export default function faq() {
  const [faqListData, setFaqListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFaqListApi = async (source) => {
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.faqList,
        source: source,
      });
      if (response.data.responseCode === 200) {
        setFaqListData(response?.data?.result?.docs || []);
      } else {
        setFaqListData([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    getFaqListApi(source);
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <StyledFaqSection>
      <Container className="rotaeBox main-sectionGap1">
        <Box mb={3}>
          <Typography variant="h2" color="primary" mb={2} fontWeight="500">
            FREQUENTLY ASKED QUESTIONS
          </Typography>
        </Box>

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((itm) => <CommentListSkeleton />)
              : faqListData?.map((item, index) => (
                  <ScrollAnimation
                    animateIn="slideInDown"
                    delay={index * 300}
                    style={{ width: "100%" }}
                    key={index}
                  >
                    <Accordions data={item} />
                  </ScrollAnimation>
                ))}
            {!isLoading && faqListData?.length === 0 && <NoDataFound />}
          </Grid>
        </Grid>
      </Container>
    </StyledFaqSection>
  );
}

faq.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
