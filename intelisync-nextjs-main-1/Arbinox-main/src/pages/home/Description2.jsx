import { Box, Container, Typography, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

// Styled container for content
const ContetnBox = styled("div")(({ theme }) => ({
  padding: "20px 0 40px",
  "& .desscribeText": {
    fontSize: "42px",
    lineHeight: "55px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "30px",
    },
    "& span": {
      opacity: 0.2, // Initially low opacity for shadow effect
      transition: "opacity 0.1s ease-in-out", // Animate opacity change
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0 20px",
  },
}));

export default function Client() {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Function to split text into individual characters and wrap them in spans
  const wrapCharacters = (text) => {
    return text.split("").map((char, index) => <span key={index}>{char}</span>);
  };

  useEffect(() => {
    const handleScrollAnimation = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (textRef.current) {
        const sectionTop =
          textRef.current.getBoundingClientRect().top + scrollPosition;
        const sectionHeight = textRef.current.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        const chars = textRef.current.querySelectorAll("span");

        // Calculate progress relative to the section entering and leaving the viewport
        const sectionVisibleProgress = Math.min(
          Math.max(
            (scrollPosition - sectionTop + windowHeight) / (windowHeight * 0.8),
            0
          ),
          1
        );

        // Animate each character based on this progress
        chars.forEach((char, index) => {
          const charProgress = index / chars.length; // When each character should appear
          if (sectionVisibleProgress > charProgress) {
            char.style.opacity = 1; // Make the character fully visible
          } else {
            char.style.opacity = 0.2; // Keep it in shadow state until it's time to show
          }
        });
      }
    };

    window.addEventListener("scroll", handleScrollAnimation);

    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Trigger animation when section is in view
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <ContetnBox>
      <Container>
        <Box className="main-sectionGap">
          {/* <Typography
            ref={textRef}
            variant="h2"
            color="#9B95FF"
            className="desscribeText"
          >
            {wrapCharacters(
              "Arbinox technology is built on sophisticated algorithms that scan and compare price differences across decentralized exchanges. Developed by blockchain experts and experienced traders, our platform is optimized for speed, accuracy, and security, ensuring users can act on market opportunities without delay. With Arbinox, you retain full control over your funds, as our bot performs the trades directly on your account. "
            )}
          </Typography> */}
          <h2
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
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
            Arbinox is a cutting-edge platform built for crypto traders to
            leverage arbitrage opportunities across multiple centralized
            exchanges (CEXs). Our automated system streamlines the trading
            process, enabling users to quickly and efficiently profit from price
            discrepancies between exchanges. With Arbinox, your funds always
            stay secure in your own accounts—giving you full control at all
            times. The platform features intuitive tools, live market insights,
            and an easy-to-use interface to help you trade smarter and more
            effectively.
          </h2>
        </Box>
      </Container>
    </ContetnBox>
  );
}
