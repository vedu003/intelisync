import React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Image from "next/image";

const RootContainer = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
  background: #000000;
`;

const LoaderImage = styled("img")`
  width: 200px;
  height: 50px;
`;

export default function PageLoading() {
  return (
    <RootContainer>
      <Box align="center">
        <Image
          height={132}
          width={177}
          quality={100}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          src="/images/logo.svg"
          alt="loader"
        />
        {/* <Typography variant="h5" color="secondary">
          Loading...
        </Typography> */}
      </Box>
    </RootContainer>
  );
}
