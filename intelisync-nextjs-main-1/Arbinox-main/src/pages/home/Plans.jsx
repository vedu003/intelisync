import PlansCard from "@/components/PlansCard";
import styled from "@emotion/styled";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
const PlanComponent = styled("div")(({ theme }) => ({
  "& .plansCardBox": {
    borderRadius: "20px",
    padding: "24px 24px 54px",
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

const PlanDescription = ({ descriptions }) => (
  <>
    {descriptions.map((desc, index) => (
      <Box className="displayStart" mt={2.4} key={index}>
        <img src="/images/check.svg" alt="Check" />
        <Typography variant="body1" color="primary" ml={1}>
          {desc}
        </Typography>
      </Box>
    ))}
  </>
);

const plansData = [
  {
    planName: "Plan 1",
    planrice: "$ 99",
    descriptions: ["3 Excahnges", "15 pairs", "Quaterly"],
    background:
      "linear-gradient(148.85deg, rgba(110, 13, 76, 0.7) 22%, rgba(53, 8, 43, 0.7) 82%)",
    boxShadow: "0px 1px 0px 0px #FFFFFF1A inset",
  },
  {
    planName: "Plan 2",
    planrice: "$ 149",
    descriptions: ["5 Excahnges", "30 pairs", "Quaterly"],
    background:
      "linear-gradient(148.85deg, rgba(32, 35, 91, 0.7) 22%, rgba(7, 9, 33, 0.7) 82%)",
    boxShadow: "0px 1px 0px 0px #FFFFFF1A inset",
  },
  {
    planName: "Plan 3",
    planrice: "$ 199",
    descriptions: ["7 Excahnges", "50 pairs", "Quaterly"],
    background:
      "linear-gradient(148.85deg, rgba(32, 72, 91, 0.7) 22%, rgba(7, 33, 31, 0.7) 82%)",
    boxShadow: "0px 1px 0px 0px #FFFFFF1A inset",
  },
];

export default function Plans() {
  return (
    <PlanComponent>
      <Box className="main-sectionGap">
        <Container>
          <ScrollAnimation animateIn="fadeInDown">
            {/* <Typography variant="h1" color="primary" className="subheadinGap">
              Current Plans
            </Typography> */}
          </ScrollAnimation>
          {/* <PlansCard type="currentPlan" /> */}
          {/* <Grid container spacing={3}>
            {plansData.map((data, index) => (
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
                      background: data.background,
                      boxShadow: data.boxShadow,
                    }}
                  >
                    <Box
                      className="displaySpacebetween"
                      style={{
                        borderBottom: "1px solid #FFFFFF1A",
                        paddingBottom: "20px",
                      }}
                    >
                      <Box>
                        <Typography variant="h3" color="primary">
                          {data.planName}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          Testing Plan
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h2" color="primary">
                          {data.planrice}
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "20.16px",
                            }}
                          >
                            / 90 Days
                          </span>
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body1"
                      fontWeight="600"
                      color="primary"
                      mt={2.4}
                    >
                      What you get
                    </Typography>

                    <PlanDescription descriptions={data.descriptions} />
                  </Box>
                </ScrollAnimation>
              </Grid>
            ))}
          </Grid> */}
        </Container>
      </Box>
    </PlanComponent>
  );
}
