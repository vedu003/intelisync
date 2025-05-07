import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { Box } from "@mui/material";
import AppContext from "@/context/AppContext";
import PageLoader from "@/components/PageLoader";

const RootContainer = styled("div")(({ theme }) => ({
  "& .MainLayoutmain": {
    zIndex: "1",
    overflow: "hidden",
    position: "relative",
    backgroundSize: "cover",
    backgroundColor: "#100E12",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },

  position: "relative",
  height: "100vh",
  "& .wrapper1": {
    // backgroundColor: "#000",
    // background: "rgba(13, 18, 16, 0.65)",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundSize: "cover",
    position: "relative",
    paddingTop: 91,
    minHeight: "calc(100vh - 75px)",
    "@media (min-width: 1199px)": {
      paddingLeft: "243px",
    },

    "@media (max-width:767px)": {
      paddingTop: "70px !important",
    },
  },
}));

const WrapperContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const ContentContainer = styled("div")(({ theme }) => ({
  flex: "1 1 auto",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  padding: "20px 23px 25px 45px",
  borderRadius: "50px",

  "@media(max-width:1200px)": {
    padding: "20px",
  },

  [theme.breakpoints.down("md")]: {
    padding: "15px",
  },
}));

const DashboardLayout = ({ children }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { isDashboardLoading } = useContext(AppContext);

  return (
    <RootContainer>
      <Box className="MainLayoutmain">
        <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className="wrapper1">
          <WrapperContainer>
            {" "}
            {!isDashboardLoading ? (
              <ContentContainer
                id="main-scroll"
                style={{ position: "relative" }}
              >
                {children}
              </ContentContainer>
            ) : (
              <PageLoader />
            )}
          </WrapperContainer>
        </div>
      </Box>
    </RootContainer>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
