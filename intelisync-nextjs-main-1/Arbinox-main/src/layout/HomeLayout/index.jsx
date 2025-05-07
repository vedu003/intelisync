import React from "react";
import Footer from "./Footer";
import Topbar from "./Topbar";
import { Box } from "@mui/material";
import { styled } from "@mui/system"; // Correct import for styled

const HomelayoutmainBox = styled(Box)(({ theme }) => ({
  "& .mainLayout-box": {
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    backgroundSize: "cover",
    backgroundColor: "#000000",
    // backgroundImage: "url(/images/back_home.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
}));

export default function HomeLayout({ children }) {
  return (
    <HomelayoutmainBox>
      <div className="mainLayout-box">
        <Topbar />
        <Box>{children}</Box>
        <Footer />
      </div>
    </HomelayoutmainBox>
  );
}
