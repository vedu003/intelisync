import React from "react";
import {
  TableContainer,
  Table,
  Box,
  TableCell,
  TableBody,
  TableRow,
  Skeleton,
} from "@mui/material";

export default function TopTradingSkeleton({ keyIndex, skeleton, isMobile }) {
  return (
    <Table>
      <TableBody>
        <TableRow>
          {skeleton &&
            skeleton
              .slice(0, isMobile ? 3 : skeleton.length)
              ?.map((data, i) => (
                <TableCell key={keyIndex + i}>
                  <Box className="skeltonKey">
                    <Skeleton animation="wave" height={25} width="100%" />
                  </Box>
                </TableCell>
              ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
