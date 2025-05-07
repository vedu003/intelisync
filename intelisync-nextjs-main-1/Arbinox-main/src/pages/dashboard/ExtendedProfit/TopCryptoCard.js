import { Box, Paper, Typography, styled } from "@mui/material";
import React from "react";

const CombinedProfitBox = styled("div")((theme) => ({
  "& .combinedProfitsCardBox": {
    height: "100%",
    background: "#1d2925",
    borderRadius: "5px",
    "& .headingBox": {
      background: "#3a544c",
      borderRadius: "5px 5px 0px 0px",
      padding: "10px",
      marginBottom: "8px",
      "& p": {
        color: "#FFF",
      },
    },
    "& .contentBox": {
      "& h5": {
        marginTop: "16px",
      },
      "& h6": {
        color: "#aef961",
      },
    },
  },
}));

export default function TopCryptoCard({ data }) {
  return (
    <CombinedProfitBox>
      <Box className="combinedProfitsCardBox">
        <Box className="headingBox displayCenter">
          <Typography variant="body2">
            {data?.heading ? data?.heading : "N/A"}
          </Typography>
        </Box>
        <Box className="contentBox displayColumn">
          <Box className="displayStart" mt={2}>
            {/* <Box className="blueBox displayCenter">
            <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src={data?.coinImg ? data?.coinImg : "N/A"} alt="conImg" />
          </Box> */}
            <Box>
              <Typography variant="body2">
                {data?.coin ? data?.coin : "N/A"}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6">
            {data?.value ? data?.value : "N/A"}
          </Typography>
          <Typography variant="overline">
            {data?.coinName ? data?.coinName : "N/A"}
          </Typography>
        </Box>
      </Box>
    </CombinedProfitBox>
  );
}
