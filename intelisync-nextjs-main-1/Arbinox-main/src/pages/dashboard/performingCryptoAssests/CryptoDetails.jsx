import { Box, Divider, Grid, Typography, styled } from "@mui/material";
import React from "react";

const CryptoDetailsBox = styled("div")(({ theme }) => ({}));

// const useStyles = makeStyles((theme) => ({
//   mainBox: {
//     "& .imageBox": {
//       "& img": {
//         width: "100%",
//       },
//     },
//   },
// }));

const CryptoDetails = ({ recentData }) => {
  // const classes = useStyles();
  return (
    <CryptoDetailsBox>
      <Box className="displayCenter mainethBox" mt={4}>
        <Box className="displayStart ">
          <Typography variant="h1" className="greenText performanceText">
            {/* {recentData?.topPerformingCrypto?.profit
                  ? parseFloat(recentData?.topPerformingCrypto?.profit).toFixed(
                      2
                    )
                  : 0} */}
            3520
          </Typography>
          <Typography variant="h5" color="secondary" ml={1}>
            (USDT)
          </Typography>
        </Box>

        {/* <Box className="displayStart performanceBox" mt={3}>
              <Typography
                variant="h2"
                style={{ fontSize: "32px", whiteSpace: "pre" }}
              ></Typography>
              <Typography variant="h5" color="secondary" ml={1}>
                {recentData?.topPerformingCrypto?.crypto}
              </Typography>
            </Box> */}
        <img src="/images/lineborder.svg" className="borderBox" />
        <Box align="center" className="dougnmainBox displayStart">
          <Box className="maineth-Box displayStart">
            <Box align="center" className="ethinnerBox">
              <img src="/images/eth_1.svg" alt="etherum" />
            </Box>
          </Box>
          {/* <Typography variant="h5" mt={1}>
            ETHEREUM
          </Typography> */}
        </Box>
      </Box>
    </CryptoDetailsBox>
  );
};

export default CryptoDetails;
