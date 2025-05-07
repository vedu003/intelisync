import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Drawer,
  Grid,
  Box,
  Container,
  IconButton,
  Avatar,
  Hidden,
  Typography,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../components/Logo";

const headersData = [
  // {
  //   label: "About",
  //   href: "/static?aboutUs",
  // },
  // {
  //   label: "Pricing",
  //   href: "/price",
  // },
  // {
  //   label: "Dashboard",
  //   href: "/dashboard/direct-exchange",
  // },
];

export default function Header() {
  const router = useRouter();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      setState((prevState) => ({
        ...prevState,
        mobileView: window.innerWidth < 1220,
      }));
    };

    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);

    return () => {
      window.removeEventListener("resize", setResponsiveness);
    };
  }, []);

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const displayDesktop = () => (
    <Toolbar className="topbarmainBox">
      {femmecubatorLogo}
      {/* <Grid
        container
        item
        direction="row"
        justify="flex-end"
        alignItems="center"
        style={{ paddingLeft: "0px" }}
        className="displayEnd"
      >
        {getMenuButtons()}
        <Box className="buttonTopbar">
          <Button
            variant="contained"
            className="ecoButton"
            color="primary"
            onClick={() => {
              router.push("/auth/login");
            }}
            style={{ whiteSpace: "pre", marginRight: "15px" }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            className="ecoButton"
            color="secondary"
            onClick={() => {
              router.push("/auth/signup");
            }}
            style={{ whiteSpace: "pre" }}
          >
            Sign Up
          </Button>
        </Box>
      </Grid> */}
    </Toolbar>
  );

  const femmecubatorLogo = (
    <Box
      onClick={() => router.push("/")}
      style={{ cursor: "pointer" }}
      display="flex"
      justifyContent="center"
    >
      <Logo className="logoImg" />
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <Button
          key={label}
          color="inherit"
          className={`menuButton ${isActive ? "active" : ""}`}
          onClick={() => {
            router.push(href);
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const getMenuButtonsMobile = () => {
    return headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <Button
          key={label}
          color="inherit"
          className={`menuButton1 ${isActive ? "active" : ""}`}
          onClick={() => {
            router.push(href);
          }}
          style={{ textAlign: "center" }}
        >
          {label}
        </Button>
      );
    });
  };

  const displayMobile = () => (
    <Toolbar className={""}>
      <Hidden xsDown>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box style={{ padding: "20px" }}>
            <Box mb={3}>{femmecubatorLogo}</Box>

            {getMenuButtonsMobile()}
            <Box className="buttonTopbar">
              {/* <Button
                variant="contained"
                className="ecoButton"
                color="primary"
                onClick={() => {
                  router.push("/auth/signup");
                }}
                style={{
                  whiteSpace: "pre",
                  marginTop: "13px",
                  minWidth: "147px",
                }}
              >
                Sign Up
              </Button> */}
              <Button
                variant="contained"
                className="ecoButton"
                color="primary"
                onClick={() => {
                  router.push("/auth/login");
                }}
                style={{
                  whiteSpace: "pre",
                  marginTop: "13px",
                  minWidth: "147px",
                }}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Hidden>
      <Box className="topbarmainBox">
        <div>{femmecubatorLogo}</div>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-haspopup="true"
          onClick={handleDrawerOpen}
        >
          <MenuIcon
            width="60px"
            height="60px"
            style={{
              color: "rgb(255,255,255)",
              fontSize: "30px",
            }}
          />
        </IconButton>
      </Box>
    </Toolbar>
  );

  return (
    <>
      <AppBar elevation={0} className="backbarmainBox">
        <Container className={""} maxWidth="lg">
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>
    </>
  );
}
