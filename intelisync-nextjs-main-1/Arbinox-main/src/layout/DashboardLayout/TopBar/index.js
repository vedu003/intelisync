import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled } from "@mui/system";
import {
  IconButton,
  Toolbar,
  AppBar,
  Grid,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Hidden,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";
import Logo from "../../../components/Logo";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AppContext from "@/context/AppContext";
import Popup from "@/components/DynamicModel";
import Title from "@/components/Title";
import Image from "next/image";

import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ConnectWalletModal from "@/components/ConnectWalletModal";

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "7px 30px 7px 30px",
  [theme.breakpoints.down("sm")]: {
    padding: "0px 5px 0px 3px",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "0px",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: "pointer",
}));

const MainHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",

  "& svg": {
    // color: "#000",
  },
  "& .leftBox": {
    width: "455px",
    [theme.breakpoints.down("md")]: {
      width: "300px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "150px",
    },
  },
  "& .MuiButton-containedSecondary": {
    border: "1px solid #FFFFFF1A",
    background: "#FFFFFF0D",
    padding: "8px 18px",
    color: "#fff",
    ":hover": {
      color: "#fff",
    },
    "@media (max-width: 499px)": {
      fontSize: "12px",
    },
  },
  "& .helpCenterBtn": {
    background: "transparent",
    border: "none",
    boxShadow: "none !important",
  },
}));

const TopBar = ({ className, onMobileNavOpen }) => {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  const auth = useContext(AppContext);
  const { isConnected, address } = useAccount();

  const handelLogout = () => {
    try {
      setIsLogout(false);
      auth.handleLogout("Logout successfuly");
    } catch (error) {
      console.log("err", error);
    }
  };
  // console.log(" ------ auth ", auth.userData.walletAddress);
  // useEffect(() => {
  //   if (auth.userLoggedIn && !isConnected && !auth.userData.walletAddress) {
  //     auth.setOpenWallletModal(true);
  //   } else {
  //     auth.setOpenWallletModal(false);
  //   }
  // }, [isConnected, auth.userLoggedIn, auth.userData]);

  return (
    <AppBarContainer
      elevation={0}
      className={clsx(className)}
      color="inherit"
      style={{ backdropFilter: "blur(18px)", background: "transparent" }}
    >
      <StyledToolbar>
        <Hidden lgUp>
          <StyledIconButton color="#806DFF" onClick={onMobileNavOpen}>
            <MenuIcon style={{ color: "#806DFF", fontSize: "25px" }} />
          </StyledIconButton>
          <Title text="Dashboard" />
        </Hidden>
        &nbsp; &nbsp;
        <MainHeader>
          <Box
            className="displaySpacebetween dashTopbarres"
            style={{ width: "100%" }}
            mt={3}
          >
            <Box className="leftBox displayStart logoLeftImg">
              <Title text="Dashboard" className="" />
            </Box>
            <Box
              className="displayEnd walletresposnisiveBox"
              style={{ gap: "10px" }}
            >
              <Typography
                variant="body1"
                color="primary"
                className="helpcenter"
                onClick={() => router.push("/dashboard/my-account")}
              >
                Help Center
              </Typography>

              <Box
                ml={1}
                className={!isConnected ? "connect-custumButton" : ""}
              >
                <ConnectButton
                  showBalance={false}
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  label="Connect"
                />
              </Box>
              <IconButton
                onClick={() => setIsLogout(true)}
                className=" logoutButton2"
              >
                <FiLogOut style={{ color: "#DF3939", fontSize: "25px" }} />
              </IconButton>
            </Box>
          </Box>
          {isLogout && (
            <Popup
              maxWidth="xs"
              open={isLogout}
              handleClose={() => setIsLogout(false)}
              actions={[
                {
                  label: "Go Back",
                  onClick: () => setIsLogout(false),
                  color: "secondary",
                  variant: "contained",
                },
                {
                  label: "Confirm",
                  onClick: handelLogout,
                  color: "primary",
                  variant: "contained",
                },
              ]}
            >
              <Box
                align="center"
                sx={{
                  p: 2,
                }}
              >
                <Typography variant="h2" color="primary">
                  Logout
                </Typography>
                <Typography variant="body2" color="secondary" mt={0.4}>
                  Are you sure, you want to logout?
                </Typography>
              </Box>
            </Popup>
          )}
        </MainHeader>
      </StyledToolbar>
      {auth.openWallletModal && (
        <ConnectWalletModal openModal={auth.openWallletModal} />
      )}
    </AppBarContainer>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData() {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Hidden xsDown>
          <Box>
            <Typography variant="h5">NFT Marketplace</Typography>
            <Typography variant="body1" style={{ color: "#ffffff9c" }}>
              example@gmail.com
            </Typography>
          </Box>
        </Hidden>
        &nbsp; &nbsp;
        <Avatar src="images/google.png" alt="" />
      </Box>
    </>
  );
}
