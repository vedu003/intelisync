import { Box, styled } from "@mui/material";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const MarquemainBox = styled("div")(({ theme }) => ({
  "& .marquenbanner": {
    padding: "20px 0",
    [theme.breakpoints.down("md")]: {
      background: "transparent",
    },
  },
}));

const clientData = [
  {
    image: "/images/shop_1.png",
  },
  {
    image: "/images/shop_2.png",
  },
  {
    image: "/images/shop_3.png",
  },
  {
    image: "/images/shop_4.png",
  },
  {
    image: "/images/shop_5.png",
  },
  {
    image: "/images/shop_7.png",
  },
  {
    image: "/images/shop_8.png",
  },
  {
    image: "/images/shop_9.png",
  },
  {
    image: "/images/shop_1.png",
  },
  {
    image: "/images/shop_2.png",
  },
  {
    image: "/images/shop_3.png",
  },
  {
    image: "/images/shop_4.png",
  },
];
export default function Client() {
  return (
    <MarquemainBox>
      <Box className="rotaeBox sectiongap-main">
        <Box className="marquenbanner">
          <Box align="center" mb={4}>
            <Image
              width="195"
              height="11"
              style={{ marginBottom: "20px" }}
              quality="100"
              src="/images/chainswesupport.png"
              alt="Image"
            />
          </Box>
          <div
            className="GradientBanner"
            style={{
              height: "auto",
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              border: "1px solid blue",
              borderRadius: "10px",
              margin: "auto",
              background: "rgba(58, 58, 58, 0)", // Semi-transparent background
              border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
              boxShadow: "0 0 15px #AA65FD, 0 0 30px #8514FF", // Glowing effect
              backdropFilter: "blur(10px)", // Blur effect
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Marquee>
              <Box className="displaySpacebetween" style={{ gap: "16px" }}>
                {clientData.map((data, i) => (
                  <Box className="clientbordergradient">
                    <Image
                      width={60}
                      height={60}
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      src={data.image}
                      alt="images"
                      className="clientImage"
                    />
                  </Box>
                ))}
              </Box>
            </Marquee>
          </div>
        </Box>
      </Box>
    </MarquemainBox>
  );
}
