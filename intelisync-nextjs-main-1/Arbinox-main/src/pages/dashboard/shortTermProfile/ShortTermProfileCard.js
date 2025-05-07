import { Box, Paper, Typography } from "@mui/material";
import React from "react";

// const useStyles = makeStyles((theme) => ({
//   combinedProfitsCardBox: {
//     backgroundColor: theme.palette.background.cardBackground,
//     borderRadius: "5px",
//     "& .headingBox": {
//       backgroundColor: theme.palette.background.cardHeader,
//       borderRadius: "5px 5px 0px 0px",
//       padding: "8px",
//       [theme.breakpoints.down("sm")]: {
//         padding: "5px",
//       },
//       "& p": {
//         color: "#FFF",

//         //  [theme.breakpoints.down("md")]:{
//         //   fontSize:"11px"
//         //  }
//       },
//     },
//     // "& p":{
//     //    [theme.breakpoints.down("lg")]:{
//     //     fontSize:"12px"
//     //    }
//     // },
//     "& .contentBox": {
//       "& h6": {
//         fontWeight: 400,
//         marginBottom: "8px",
//       },
//       "& h4": {
//         marginTop: "16px",
//       },
//       "& span": {
//         fontWeight: 400,
//         marginBottom: "16px",
//       },
//     },
//   },
// }));

export default function ShortTermProfileCard({ data }) {
  // const classes = useStyles();

  return (
    <Box className={"classes.combinedProfitsCardBox"}>
      <Box className="headingBox displayCenter">
        <Typography variant="body2" color="primary">
          {data?.heading ? data?.heading : "N/A"}
        </Typography>
      </Box>
      <Box className="contentBox displayColumn">
        <Typography variant="h4" color="primary">
          {data?.value ? data?.value : "N/A"}
        </Typography>
        <Typography variant="overline" color="primary">
          {data?.coinName ? data?.coinName : "N/A"}
        </Typography>
        <Typography variant="h6" color="primary">
          {data?.progress ? data?.progress : "N/A"}
        </Typography>
      </Box>
    </Box>
  );
}
