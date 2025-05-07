import { Box, Container, Paper, Typography } from "@mui/material";
import DashboardLayout from "../../../layout/DashboardLayout/index";
import React from "react";
import CustomHead from "@/components/CustomHead";

export default function Privacy() {
  return (
    <Box>
      <CustomHead
        title="Privacy Policy | Me.Cap"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Paper elevation={2} className="filterpaper">
        <Box>
          <Typography variant="h2" color="primary">
            Privacy Policy
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            style={{ color: "rgba(255, 255, 255, 0.60)" }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content In publishing and
            graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without
            relying on meaningful content
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

Privacy.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
