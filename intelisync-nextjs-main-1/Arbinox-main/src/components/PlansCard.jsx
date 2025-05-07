import styled from "@emotion/styled";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import BuyPlanModal from "./BuyPlanModal";
import { apiRouterCall } from "@/api-services/service";
import PhotoSkeleton from "./Skeletons/PhotoSkeleton";
import NoDataFound from "./NoDataFound";
import axios from "axios";
import { api_configs } from "@/api-services";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

const PlanComponent = styled("div")(({ theme }) => ({
  "& .plansCardBox": {
    borderRadius: "20px",
    padding: "24px 24px 60px",
  },
  "& span": {},
  "& h2": {
    fontSize: "34px",
  },

  "& .desscribeText": {
    fontSize: "42px",
    lineHeight: "55px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "30px",
    },
  },
  "& h3": {
    fontWeight: "600",
  },
  "& .placCardBox": {
    height: "100%",
  },
}));

const plansData = [
  {
    background:
      "linear-gradient(148.85deg, rgba(110, 13, 76, 0.7) 22%, rgba(53, 8, 43, 0.7) 82%)",
  },
  {
    background:
      "linear-gradient(148.85deg, rgba(32, 35, 91, 0.7) 22%, rgba(7, 9, 33, 0.7) 82%)",
  },
  {
    background:
      "linear-gradient(148.85deg, rgba(32, 72, 91, 0.7) 22%, rgba(7, 33, 31, 0.7) 82%)",
  },
];

function PlansCard({ type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [planListData, setPlanListData] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  const [discountPrice, setDiscountPrice] = useState(0);
  useEffect(() => {
    const source = axios.CancelToken.source();

    getDiscountPricing(source);

    return () => source.cancel();
  }, []);
  const getDiscountPricing = async (source) => {
    try {
      // setIsPriceLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.getDiscountPricing,
        source: source,
      });
      if (response.data.responseCode === 200) {
        setDiscountPrice(response.data.result.amount);
      } else {
        setDiscountPrice(0);
      }
    } catch (error) {
      setDiscountPrice(0);
      console.error(error);
    }
  };
  const getPlanListApi = async (source) => {
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs[type ? "subscriptionPlanList" : "getPlanList"],
        paramsData: !type
          ? {
              page: page,
              limit: 12,
            }
          : {},
        source: source,
      });
      if (response.data.responseCode === 200) {
        setPlanListData(
          type ? response?.data?.result : response?.data?.result?.docs
        );
        setNoOfPages(response.data.result.pages);
      } else {
        setPlanListData([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getPlanListApi(source);
    return () => {
      source.cancel();
    };
  }, [page]);

  return (
    <PlanComponent>
      <Box>
        <Grid container spacing={1.5}>
          {!isLoading &&
            planListData?.map((data, index) => (
              <Grid
                item
                lg={4}
                md={4}
                sm={6}
                xs={12}
                className="placCardBox"
                key={index}
              >
                <ScrollAnimation
                  animateIn="fadeInUp"
                  delay={index * 300}
                  style={{ width: "100%" }}
                >
                  <Box
                    className="plansCardBox"
                    style={{
                      background: plansData[Math.floor(index % 3)].background,
                      boxShadow: "0px 1px 0px 0px #FFFFFF1A inset",
                      minHeight: "280px",
                    }}
                  >
                    {data?.currentPlanStatus &&
                      data?.currentPlanStatus === "ACTIVE" &&
                      !type && (
                        <Typography
                          variant="body1"
                          fontWeight="600"
                          color="primary"
                          align="end"
                          style={{
                            color: "green",
                            position: "absolute",
                            top: "10px",
                            right: "24px",
                          }}
                        >
                          Active
                        </Typography>
                      )}
                    <Box
                      style={{
                        borderBottom: "1px solid #FFFFFF1A",
                        paddingBottom: "20px",
                      }}
                    >
                      <Box
                        className="displaySpacebetween"
                        style={{ gap: "10px" }}
                      >
                        <Tooltip
                          title={data?.title}
                          PopperProps={{
                            sx: {
                              "& .MuiTooltip-tooltip": {
                                backgroundColor: "#000000",
                                color: "#FFFFFFCC",
                                padding: "10px",
                                lineHeight: "15px",
                              },
                            },
                          }}
                        >
                          <Typography variant="h3" color="primary">
                            {data?.title?.length > 8
                              ? `${data?.title.slice(0, 6)}...`
                              : data?.title}
                          </Typography>
                        </Tooltip>
                        <Typography
                          variant="h2"
                          color="primary"
                          style={{ display: "flex", alignItems: "flex-end" }}
                        >
                          <PiCurrencyDollarSimpleBold />
                          {data?.price}
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "20.16px",
                            }}
                          >
                            /{data?.tenure} Months
                          </span>
                        </Typography>
                      </Box>
                      <Tooltip
                        title={data?.description}
                        PopperProps={{
                          sx: {
                            "& .MuiTooltip-tooltip": {
                              backgroundColor: "#000000",
                              color: "#FFFFFFCC",
                              padding: "10px",
                              lineHeight: "15px",
                            },
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="#FFFFFFCC"
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                          }}
                        >
                          {data?.description}
                        </Typography>
                      </Tooltip>
                    </Box>

                    <Typography
                      variant="body1"
                      fontWeight="600"
                      color="primary"
                      mt={2.4}
                    >
                      What you get
                    </Typography>

                    <Box className="displayStart" mt={2.4}>
                      <img src="/images/check.svg" alt="Check" />
                      <Typography variant="body1" color="primary" ml={1}>
                        {data?.arbitrageName?.length} Excahnges:{" "}
                        {data?.arbitrageName?.map((item) => item).join(", ")}
                      </Typography>
                    </Box>
                    <Box className="displayStart" mt={2.4}>
                      <img src="/images/check.svg" alt="Check" />
                      <Typography variant="body1" color="primary" ml={1}>
                        {data?.coins?.length} pairs
                      </Typography>
                    </Box>
                    <Box className="displayStart" mt={2.4}>
                      <img src="/images/check.svg" alt="Check" />
                      <Typography variant="body1" color="primary" ml={1}>
                        {data?.tenure} month duration
                      </Typography>
                    </Box>
                    {!type && (
                      <Box align="center" mt={4}>
                        <BuyPlanModal
                          data={data}
                          getPlanListApi={getPlanListApi}
                          discountPrice={discountPrice}
                        />
                      </Box>
                    )}
                  </Box>
                </ScrollAnimation>
              </Grid>
            ))}

          {isLoading &&
            Array.from({ length: 12 }).map((_, i) => {
              return (
                <Grid
                  item
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                  className="placCardBox"
                  key={i}
                >
                  <PhotoSkeleton />
                </Grid>
              );
            })}
        </Grid>

        {!isLoading && planListData && planListData?.length === 0 && (
          <NoDataFound text="No data found!" />
        )}
        {!isLoading && noOfPages > 1 && (
          <Box className="displayEnd" mt={3}>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </PlanComponent>
  );
}

export default React.memo(PlansCard);
