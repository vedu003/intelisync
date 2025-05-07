import React, { useEffect } from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Box } from "@mui/material";
import Banner from "./home/Banner";
import Scroll from "react-scroll";
import CustomHead from "@/components/CustomHead";
import Client from "./home/Client";
import Description from "./home/Description";
import Description2 from "./home/Description2";
import Features from "./home/Features";
import Plans from "./home/Plans";
export default function HomePage() {
  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("id")) {
      let param = searchParams.get("id");
      const getdiv = document.getElementById(param);
      const ofsetTop = getdiv.offsetTop - 30;
      var scroll = Scroll.animateScroll;
      scroll.scrollTo(ofsetTop, param);
    }
  }, [location.pathname]);
  return (
    <>
      <CustomHead
        title="Me.Cap"
        image="/images/fav_icon.svg"
        video=""
        isVideo={false}
      />
      <Box>
        <Box className="bannerlanding">
          <Banner />
          <Client />
          <Description />
          <Features />
          <Plans />
          <Description2 />
        </Box>
      </Box>
    </>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
