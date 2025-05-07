import React, { useContext } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import AppContext from "@/context/AppContext";
import cryptoAnimation from "../../LottieAnimation/anim2.json";
import Lottie from "lottie-react";

const BannerComponent = styled("div")(({ theme }) => ({
  position: "relative", // Position relative to contain absolutely positioned elements
  height: "100vh", // Full height of the viewport
  overflow: "hidden", // Hide overflow for video
  display: "flex",
  alignItems: "flex-end",
  "@media (max-width: 767px)": {
    height: "70vh", // Full height of the viewport
  },
  "& h1": {
    fontSize: "42px",
    lineHeight: "54.25px !important",
    fontWeight: "600",
    maxWidth: "514px",
    "@media (max-width: 1400px)": {
      fontSize: "35px",
      lineHeight: "38px",
    },
  },
  "& p": {
    maxWidth: "400px",
  },
  "& .contentBx": {
    paddingBottom: "50px",
    "@media (max-width: 1400px)": {
      paddingBottom: "20px",
    },
  },
  "&::before": {
    borderBottom: "none !important",
    left: "0",
    bottom: "0",
    content: '""',
    position: "absolute",
    width: "100%",
    height: "200px",
    background: "rgb(0,0,0)",
    background:
      "linear-gradient(0deg, rgba(0,0,0,1) 9%, rgba(255,255,255,0) 93%)",
    zIndex: "1",
    "@media (max-width: 768px)": {
      height: "250px",
      bottom: "160px",
    },
  },
  "& video": {
    position: "absolute", // Absolute positioning for full coverage
    top: 10,
    left: 0,
    width: "100%", // Full width
    height: "100%", // Full height
    objectFit: "cover", // Cover the entire container
    zIndex: -1, // Send video to back
    "@media (max-width: 768px)": {
      width: "500px", // Full width
      height: "auto", // Full height
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "206px",
      top: "auto",
    },
  },
}));

const Video = styled("video")({});

export default function Banner() {
  const auth = useContext(AppContext);
  const router = useRouter();

  return (
    <BannerComponent className="">
      {/* <video autoPlay loop muted playsInline preload="auto">
        <source src="images/banner_home.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div
        className="TopBanner"
        style={{
          width: "100vw",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          className="BannerAnim"
          style={{
            width: "600px",
          }}
        >
          <Lottie animationData={cryptoAnimation} width={"400px"} speed={0.5} loop={true} />
          {/* <img src="./SlowAnim.gif" style={{height:"600px", width:"600px"}} alt="notcoming" /> */}
        </div>

        <div className="BannerText">
          <Container>
            <Box
              align="start"
              className="contentBx"
              style={{ zIndex: "3", position: "relative" }}
            >
              <Typography variant="h1" color="primary">
                Boost Your Crypto Earnings with Arbinox – The Ultimate Tool for
                Automated DEX Arbitrage!
              </Typography>

              <Typography variant="body1" color="secondary" mt={2} mb={4.1}>
                Streamline your trading, reduce exposure to risk, and seize
                profit-making opportunities across decentralized exchanges with
                ease.
              </Typography>
              <Button
                size="large"
                sx={{
                  background: "linear-gradient(90deg, #B331FF, #8F00EE)",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  boxShadow: "0 0 5px #B331FF, 0 0 5px #8F00EE", 
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => {
                  router.push(
                    auth.userLoggedIn ? "/dashboard" : "/auth/sign-up"
                  );
                }}
              >
                Get Started
              </Button>
            </Box>
          </Container>
        </div>
      </div>
    </BannerComponent>
  );
}
