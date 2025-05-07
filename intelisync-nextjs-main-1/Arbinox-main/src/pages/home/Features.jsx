import styled from "@emotion/styled";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
const FeaturesComponent = styled("div")(() => ({
  ".borderBottom": {
    borderBottom: "1px solid #FFFFFF1A",
    paddingBottom: "24px",
    marginBottom: "24px",
  },
  ".upMarquee, .downMarquee": {
    width: "100%",
    height: "150px",
    overflow: "hidden",
  },

  "& .order1": {
    order: "1",
    "@media(max-width:600px)": {
      order: "2",
    },
  },
  "& .order2": {
    order: "2",
    "@media(max-width:600px)": {
      order: "1",
    },
  },
}));

export default function Features() {
  const featuresData = [
    {
      title: "DEX Integration",
      description:
        "Effortlessly connects with leading decentralized exchanges, unlocking top-tier arbitrage possibilities. ",
    },
    {
      title: "Smart Trading Automation",
      description:
        "Executes arbitrage strategies automatically on DEXs, maximizing returns with zero manual effort.",
    },
    {
      title: "Live Market Intelligence",
      description:
        "Delivers up-to-the-minute market data and insights to quickly spot and act on profitable trades. ",
    },
  ];

  const featuresData1 = [
    {
      title: "Built-In Risk Controls",
      description:
        "Equipped with sophisticated tools to manage risk and protect your capital during market fluctuations. ",
    },
    {
      title: "Easy-to-Use Platform",
      description:
        "Designed with both beginners and pros in mind, ensuring a smooth, efficient trading experience. ",
    },
    {
      title: "Secure Fund Handling",
      description:
        "Your assets stay in your own wallet—Arbinox only executes trades, keeping your funds safe and under your control. ",
    },
  ];

  return (
    <FeaturesComponent>
      <Box className="main-sectionGap">
        <Container>
          <Grid container spacing={2} alignItems="flex-start">
            {/* Features Section */}
            <Grid item lg={4.5} md={4} sm={5} xs={12}>
              <Box className="features-subheadingBox">
                <ScrollAnimation animateIn="fadeInLeft">
                  <Typography variant="h1" color="primary" gutterBottom>
                    Features & Benefits
                  </Typography>
                </ScrollAnimation>
              </Box>
              {featuresData.map((feature, index) => (
                <Box className={index < 2 ? "borderBottom" : ""} key={index}>
                  <ScrollAnimation animateIn="fadeInDown">
                    <Typography variant="h3" color="primary">
                      {feature.title}
                    </Typography>
                  </ScrollAnimation>
                  <ScrollAnimation animateIn="zoomIn">
                    <Typography variant="body1" color="secondary" mt={1.4}>
                      {feature.description}
                    </Typography>
                  </ScrollAnimation>
                </Box>
              ))}
            </Grid>
            <Grid item lg={1.5} md={2} sm={1} xs={12}></Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Box className="displayEnd" style={{ gap: "20px" }}>
                <Box className="featuresRightBox">
                  <figure>
                    <Image
                      src="/images/Fcard2.png"
                      alt="Features"
                      width="250"
                      quality={90}
                      height="151"
                      layout="responsive"
                    />
                  </figure>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box mt={6}>
            <Grid container spacing={2} alignItems="center">
              {/* Features Section */}{" "}
              <Grid item lg={6} md={6} sm={6} xs={12} className="order1">
                <Box className="displayStart" style={{ gap: "20px" }}>
                  <Box className="featuresRightBox">
                    <figure>
                      <Image
                        src="/images/Fcard1.png"
                        alt="Features"
                        width="272"
                        quality={90}
                        height="248"
                        layout="responsive"
                      />
                    </figure>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12} className="order2">
                <Box className="features-box">
                  {featuresData1.map((feature, index) => (
                    <Box
                      className={index < 2 ? "borderBottom" : ""}
                      key={index}
                    >
                      <ScrollAnimation animateIn="fadeInDown">
                        <Typography variant="h3" color="primary">
                          {feature.title}
                        </Typography>
                      </ScrollAnimation>
                      <ScrollAnimation animateIn="zoomIn">
                        <Typography variant="body1" color="secondary" mt={1.4}>
                          {feature.description}
                        </Typography>
                      </ScrollAnimation>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </FeaturesComponent>
  );
}
