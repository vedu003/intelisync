import React from "react";
import { Box, Skeleton, styled } from "@mui/material";

const MainBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#232225",
  position: "relative",
  borderRadius: "8px",
  "& .MuiCardHeader-root": {
    padding: "0 0 16px 0",
  },
  "& .MuiCardContent-root": {
    padding: "16px 16px 16px 0",
  },
  "& .MuiSkeleton-root": {
    backgroundColor: "transparent !important",
  },
}));

const postStyles = {
  horseCard: { height: "130px", borderRadius: "10px" },
  phototab: { height: "300px" },
  default: { borderRadius: "20px", height: "270px", backgroundColor: "none" },
};

export default function PhotoSkeleton({ type }) {
  const skeletonStyle = postStyles[type] || postStyles.default;

  return (
    <MainBox>
      <Skeleton animation="wave" variant="rectangular" style={skeletonStyle} />
    </MainBox>
  );
}
