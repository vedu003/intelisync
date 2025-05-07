import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Drawer,
  Grid,
  Box,
  Container,
  IconButton,
  Hidden,
  Button,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import Scroll from "react-scroll";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../components/Logo";
import AppContext from "@/context/AppContext";
import PrivacyModal from "../LoginLayout/PrivacyModal";
import Cookies from "js-cookie";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import DialogActions from "@mui/material/DialogActions";
import { IoCloseSharp } from "react-icons/io5";

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "FAQs",
    href: "/static/faq",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

export default function Header() {
  const router = useRouter();
  const auth = useContext(AppContext);
  let token = window.localStorage.getItem("user_token");
  const { openTrmConPol, setOpenTrmConPol } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptPrivacyPolicy = () => {
    updateTermsAndConditions("ACCEPT");
    Cookies.set("AcceptTerm&Condition", "ACCEPT", { expires: 30 });
  };
  const handleDeclinePrivacyPolicy = () => {
    updateTermsAndConditions("DECLINE");
    Cookies.set("AcceptTerm&Condition", "DECLINE", { expires: 1 });
  };

  const updateTermsAndConditions = async (type) => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.updateTermsAndConditions,
        token: token,
        paramsData: { termsAndConditions: type },
      });
      if (response.data.responseCode === 200) {
        auth.getProfileDataHandler(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ScrollLink = Scroll.Link;
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
    <Toolbar className="topbarmainBox" style={{ padding: "0px" }}>
      <Box className="displaySpacebetween width100">
        {femmecubatorLogo}

        <Box className="displayStart" style={{ gap: "32px" }}>
          {getMenuButtons()}
        </Box>

        <Box>
          {!auth.userLoggedIn ? (
            <Box className="buttonTopbar">
              <Button
                onClick={() => {
                  router.push("/auth/login");
                }}
                sx={{
                  background: "black",
                  color: "white",
                  padding: "10px 30px",
                  border: "1px solid #B331FF",
                  fontWeight: "600",
                  fontSize: "17px",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "linear-gradient(90deg, #B331FF, #8F00EE)", // Gradient background
                    color: "black", // Hover text color
                    boxShadow: "0 0 10px #B331FF, 0 0 10px #8F00EE", // Glowing effect
                  },
                }}
              >
                Login
              </Button>
            </Box>
          ) : (
            <Box className="buttonTopbar">
              <Button
                variant="contained"
                className="ecoButton"
                color="primary"
                onClick={() => {
                  router.push("/dashboard");
                }}
                style={{ whiteSpace: "pre", marginRight: "15px" }}
              >
                Dashboard
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Toolbar>
  );

  const femmecubatorLogo = (
    <Box onClick={() => router.push("/")} align="left">
      <Logo style={{ width: "130px", height: "auto", marginTop:"5px"  }} className="logoImg1" />
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <Box>
          <ScrollLink to={label}>
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
          </ScrollLink>
        </Box>
      );
    });
  };

  const getMenuButtonsMobile = (handleDrawerClose) => {
    return headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <ScrollLink to={label}>
          <Button
            key={label}
            color="inherit"
            className={`menuButton ${isActive ? "active" : ""}`}
            onClick={() => {
              if (href !== "/price") {
                router.push(href);
              } else {
                router.push(`/?id=${label}`);
                handleDrawerClose();
              }
            }}
            style={{ display: "block", padding: "7px 17px !important" }}
          >
            {label}
          </Button>
        </ScrollLink>
      );
    });
  };

  const displayMobile = () => (
    <Box className="displaySpacebetween width100">
      <Hidden xsDown>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box style={{ padding: "10px" }}>
            <Box mb={3} mt={3}>
              {femmecubatorLogo}
            </Box>

            {getMenuButtonsMobile(handleDrawerClose)}
            {!auth.userLoggedIn ? (
              <Box className="buttonTopbar" mt={3}>
                <Button
                  variant="contained"
                  // className="ecoButton"
                  color="primary"
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                  style={{
                    background: "#FFFFFF",
                    color: "#000000",
                    padding: "10px 20px",
                    border: "none",
                    fontWeight: "600",
                  }}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <Box className="buttonTopbar">
                <Button
                  variant="contained"
                  className="ecoButton"
                  color="primary"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </Button>
              </Box>
            )}
            <Box className="displayStart" style={{ gap: "30px" }} mt={3}>
              {/* <IconButton
                target="_blank"
                href="https://www.instagram.com/mecapdsc/?utm_source=ig_web_button_share_sheet"
                className="socialButton"
              >
                <img
                  src="/images/Social/facebook.svg"
                  alt="Image"
                  className="socialButton"
                />
              </IconButton> */}
              <IconButton
                target="_blank"
                href="https://x.com/MECAP_DSC"
                className="socialButton"
              >
                <img src="/images/Social/twitter.svg" alt="Image" />
              </IconButton>
              <IconButton
                target="_blank"
                href="https://www.instagram.com/mecapdsc/?utm_source=ig_web_button_share_sheet"
                className="socialButton"
              >
                <img src="/images/Social/insta.svg" alt="Image" />
              </IconButton>

              <IconButton
                target="_blank"
                href="https://t.me/+8_3Ixon23pswZmQ8"
                className="socialButton"
              >
                <FaTelegramPlane style={{ color: "#fff", fontSize: "27px" }} />
                {/* <img src="/images/Social/insta.svg" alt="Image" /> */}
              </IconButton>
              {/* <IconButton target="_blank" className="socialButton">
                <img src="/images/Social/linkdin.svg" alt="Image" />
              </IconButton> */}
            </Box>
          </Box>
        </Drawer>
      </Hidden>
      <div>{femmecubatorLogo}</div>
      <Box className="topbarmainBox">
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
    </Box>
  );

  return (
    <>
      <AppBar
        elevation={0}
        className="backbarmainBox"
        style={{ padding: "14px 0" }}
      >
        <Container maxWidth="lg">
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
        {openTrmConPol && (
          <PrivacyModal
            open={openTrmConPol}
            handleClose={() => setOpenTrmConPol(false)}
            onAccept={handleAcceptPrivacyPolicy}
            onDecline={handleDeclinePrivacyPolicy}
          />
        )}
      </AppBar>
    </>
  );
}
