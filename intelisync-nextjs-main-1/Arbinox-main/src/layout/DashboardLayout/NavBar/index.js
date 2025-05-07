import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import { CiWallet } from "react-icons/ci";
import { SlEarphones } from "react-icons/sl";
import { MdOutlineSettings } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import Link from "next/link";
import { MdFormatListBulleted } from "react-icons/md";
import NavItem from "./NavItem";
import { IoIosSettings } from "react-icons/io";
import { LuFileText } from "react-icons/lu";
import { styled } from "@mui/system";
import AppContext from "@/context/AppContext";
import { TbPlaylistAdd } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import Popup from "@/components/DynamicModel";

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root.MuiDrawer-paper": {
    width: "225px",
    background: "#1c1a1e",
    borderRight: "1px solid #806DFF",
  },
}));

const DesktopDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root.MuiDrawer-paper": {
    top: "24px",
    width: "250px",
    background: "#FFFFFF08",

    margin: "5px 10px 10px 15px",
    borderRadius: "12px",
    marginTop: "0px",
    marginLeft: "20px",
    overflow: "auto",
    height: "95dvh",
  },
}));

const SideMenuBox = styled(Box)({
  marginBottom: "10px",
  "& .MuiCollapse-wrapperInner": {
    marginTop: "-20px",
  },
});

const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: TbLayoutDashboard,
        href: "/dashboard",
        isHide: false,
      },

      {
        title: "Exchanges",
        icon: GrTransaction,
        href: "/dashboard/exchanges",
        isHide: false,
      },
      {
        title: "Arbitrage",
        icon: MdOutlineCurrencyExchange,
        href: "/dashboard/direct-arbitrage",
        isHide: false,
      },

      {
        title: "Transactions",
        icon: MdFormatListBulleted,
        href: "/dashboard/transaction-history",
        isHide: false,
      },
      {
        title: "My Wallet",
        icon: CiWallet,
        href: "/dashboard/my-wallet",
        isHide: false,
      },

      {
        title: "Subscription Plans",
        icon: IoIosSettings,
        href: "/dashboard/plans",
        isHide: false,
      },
      {
        title: "My Plan's",
        icon: LuFileText,
        href: "/dashboard/my-plan",
        isHide: false,
      },

      {
        title: "Pair WhiteList",
        icon: IoMdTime,
        href: "/dashboard/pair-whitelisted",
        isHide: false,
      },
      {
        title: "Whitelist Details",
        icon: TbPlaylistAdd,
        href: "/dashboard/whitelist-details",
        isHide: false,
      },
      // {
      //   title: "Stats",
      //   icon: MdHistory,
      //   href: "/dashboard/statistics",
      //   isHide: false,
      // },
      // {
      //   title: "Chart",
      //   icon: TfiBarChart,
      //   href: "/dashboard/chart",
      //   isHide: false,
      // },
      {
        title: "Settings",
        icon: MdOutlineSettings,
        href: "/dashboard/setting", // /dashboard/setting
        isHide: false,
      },
      {
        title: "Help Center",
        icon: SlEarphones,
        href: "/dashboard/my-account", // /dashboard/my-account
        isHide: false,
      },
    ],
  },
];

function renderNavItems({
  items,
  pathname,
  depth = 0,
  isAdmin,
  onMobileClose,
}) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) =>
          reduceChildRoutes({
            acc,
            item,
            pathname,
            depth,
            isAdmin,
            onMobileClose,
          }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth,
  isAdmin,
  onMobileClose: onMobileClose,
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = pathname === item.href;

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={open}
        title={item.title}
        onMobileClose={onMobileClose}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
          isAdmin: false,
          onMobileClose: onMobileClose,
        })}
      </NavItem>
    );
  } else {
    const isDirect = item.title === "QuantumFlow";
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
        onMobileClose={onMobileClose}
        style={{
          marginTop: isDirect ? "13px" : "",
          display: item.isHide
            ? item.isHide === isAdmin
              ? "block"
              : "none"
            : "block",
          whiteSpace: "wrap",
        }}
      />
    );
  }
  return acc;
}

const NavBar = ({ onMobileClose, openMobile }) => {
  const router = useRouter();
  const auth = useContext(AppContext);
  const [isLogout, setIsLogout] = useState(false);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.pathname]);
  const handelLogout = () => {
    try {
      setIsLogout(false);
      auth.handleLogout("Logout successfuly");
    } catch (error) {
      console.log("err", error);
    }
  };
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box style={{ padding: "16px" }} className="sideMenuBox">
          <Box className="dashboardProfie" align="center" mb={4}>
            <Avatar
              src={auth?.userData?.profilePic || ""}
              alt={auth?.userData?.firstName}
              className="dashAvtar"
            >
              {!auth?.userData?.profilePic &&
                auth?.userData?.firstName &&
                `${auth?.userData?.firstName[0]}${auth?.userData?.lastName[0]}`}
            </Avatar>
            <Typography
              variant="body2"
              fontWeight="600"
              color="#fff"
              mt={2}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "200px", // Adjust the width as needed
              }}
            >
              {`${
                auth?.userData?.firstName?.length > 14
                  ? `${auth?.userData?.firstName.slice(0, 11)}...`
                  : auth?.userData?.firstName
              } ${
                auth?.userData?.firstName?.length < 14
                  ? auth?.userData?.lastName?.length > 14
                    ? `${auth?.userData?.lastName.slice(0, 11)}...`
                    : auth?.userData?.lastName
                  : ""
              }`}
            </Typography>
            <Typography
              variant="body1"
              color="secondary"
              mt={0.5}
              mb={2.4}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "200px", // Adjust the width as needed
              }}
            >
              {auth?.userData?.email}
            </Typography>
          </Box>
          <SideMenuBox>
            {sections.map((section, i) => (
              <List
                style={{ marginLeft: "-14px" }}
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: router.pathname,
                  isAdmin: auth.isAdmin,
                  onMobileClose: onMobileClose,
                })}
              </List>
            ))}
          </SideMenuBox>
          {/* 
          <Button
            variant="contained"
            color="secondary"
            className="logoutButtonNew"
            onClick={() => setIsLogout(true)}
            startIcon={<TbLogout color="#FFFFFF99" />}
          >
            <span className={"spanBox"}> Log Out</span>
          </Button> */}
          <Box align="center" mt={4}>
            <Link href={`/`}>
              <Box className="mvpLogo">
                <img
                  src="/images/loginlogo.svg"
                  className="loginLogo"
                  width="100px"
                  height="100px"
                />
              </Box>
            </Link>
          </Box>
        </Box>
      </PerfectScrollbar>

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
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <MobileDrawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Box p={2}>{content}</Box>
        </MobileDrawer>
      </Hidden>
      <Hidden lgDown>
        <DesktopDrawer anchor="left" open variant="persistent">
          {content}
        </DesktopDrawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
