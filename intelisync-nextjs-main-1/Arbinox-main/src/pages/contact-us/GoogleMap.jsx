  import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
  import React from "react";
  import styled from "@emotion/styled";
  import { IoIosMail } from "react-icons/io";
  import { IoLocation } from "react-icons/io5";
  import { MdLocalPhone } from "react-icons/md";

  const MainComponent = styled("Box")(({ theme }) => ({
    "& .MuiIconButton-root": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  }));

  const GoogleMap = () => {
    return (
      <MainComponent>
        <Grid container spacing={2}>
          <Container>
          <Box mt={4} display="flex" justifyContent="flex-start">
              <img src="/images/contact_Us.svg" alt="Contact" />
            </Box>
            <Typography variant="body2" color="#182230" maxWidth='500px' mt={6}>
              ravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
              sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis
              parturient mo nt e s, nascetur ridiculus mus. Nam ferment um, nulla
              luctus pharetra vulputate, f e lis. tellus mollis orci, sed rhoncus
              sapien nunc eget odio. Lorem ipsum do lor s it am et, consectetur
              adipiscing el it. Aenean euismod bibendum laoreet. Proi n gr avid a
              dolor sit amet lacus accumsan et viverra justo commo do. Proin soda
              le s pulvinar tempor. Cum sociis natoque penatibus et magnis dis
              parturient mon tes, nascet ur ridiculus m
            </Typography>
          </Container>
        </Grid>
      </MainComponent>
    );
  };

  export default GoogleMap;
