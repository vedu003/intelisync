// ContactUs.js
import React from "react";
import { Box, Paper, Typography, Grid, Container } from "@mui/material";
import { styled } from "@mui/system";
import GoogleMap from "./GoogleMap";
import ContactForm from "./ContactForm";
import HomeLayout from "@/layout/HomeLayout";

const ContactSection = styled("Box")(({ theme }) => ({
  position: "relative",
  "& .formImgBox": {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function ContactUs() {
  return (
    <ContactSection>
      <img
        src="/images/contact_shade.svg"
        alt="Shade"
        className="shadeBoxContact"
      />
      <Container className="main-sectionGap1">
        <Typography variant="h2" color="primary" mb={2} fontWeight="500">
          Contact us
        </Typography>
        <Typography variant="body1" color="primary">
          Welcome to our Contact Page dedicated to Web3-focused inquiries.
        </Typography>
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12} sm={12} md={7}>
            <ContactForm />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={6}>
            <GoogleMap />
          </Grid> */}
        </Grid>
      </Container>
    </ContactSection>
  );
}

ContactUs.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
