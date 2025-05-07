import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
const Root1 = styled("div")(({ theme }) => ({
  "& .loginlayoutleftSide": {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background: "#181619",
    // backgroundImage: "url(/images/login_back.png)",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    // WebkitBackgroundPosition: "top right",
    // backgroundPosition: "top right",

    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}));
export const btnArr = [
  { name: "Contact Us", route: "/" },
  { name: "Terms", route: "/" },
  { name: "Policy", route: "/" },
];
export default function LoginLayoutNew({ children }) {
  const router = useRouter();
  return (
    <Root1>
      <Grid container spacing={2}>
        <Grid item sm={5} xs={12}>
          <Box className="loginlayoutleftSide">
            <Box className="sideLayout" align="center">
              <Link href={`/`}>
                <Box className="mvpLogo">
                  <img src="/images/logo.svg" className="loginLogo" />
                </Box>
              </Link>
              <Typography
                variant="body1"
                color="secondary"
                mt={3}
                style={{ lineHeight: "24px" }}
              >
                Your all in one solution for crypto trading and exchange <br />
                Quick , Secure & Reliable
              </Typography>

              <Image
                width="657"
                height="622"
                src="/images/bgLogin.png"
                style={{
                  mixBlendMode: "lighten",
                }}
                layout="responsive"
              />
            </Box>
          </Box>
        </Grid>

        <Grid item sm={7} xs={12}>
          <Box className="rightlayoutleftSide">
            <Box className="sideLayout1">
              <Container className="containerBox">{children}</Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <div className="MainLayoutmain"></div> */}
    </Root1>
  );
}
