import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function NoDataFound({ text }) {
  return (
    <Box
      display="flex"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box align="center" pt={10} pb={3}>
        <Image
          height={210}
          width={207}
          quality={100}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          src={"/images/DarkFrame.png"}
          style={{ maxWidth: "205px" }}
          alt=""
        />
        <Typography variant="body2" color="secondary" mt={4}>
          {text || "No data found!"}
        </Typography>
      </Box>
    </Box>
  );
}
