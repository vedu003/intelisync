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

const Crypto = ({ recentData }) => {
  // const classes = useStyles();
  return (
    <CryptoDetailsBox>
      <Box className="displaySpacebetween" mt={6}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5} lg={4}>
            <Box className="displayStart performanceBox">
              <Typography
                variant="h2"
                style={{ fontSize: "26px", whiteSpace: "pre" }}
              >
                {recentData?.topPerformingCrypto?.profit
                  ? parseFloat(recentData?.topPerformingCrypto?.profit).toFixed(
                      2
                    )
                  : 0}
              </Typography>
              <Typography variant="h5" color="secondary" ml={1}>
                (USDT)
              </Typography>
            </Box>

            <Box className="displayStart performanceBox" mt={3}>
              <Typography
                variant="h2"
                style={{ fontSize: "26px", whiteSpace: "pre" }}
              ></Typography>
              <Typography variant="h5" color="secondary" ml={1}>
                {recentData?.topPerformingCrypto?.crypto}
                {/* Tx’s */}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={1} lg={2} align="center">
            <Divider
              orientation="vertical"
              // style={{
              //   borderRight: "2px solid #444444",
              //   height: "150px",
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box align="center">
              <Box className="maineth-Box">
                <Box align="center" className="ethinnerBox">
                  <img src="/images/etherum.png" alt="etherum" />
                </Box>
              </Box>
              <Typography
                variant="body2"
                color="primary"
                fontWeight="500"
                mt={2}
              >
                ETHEREUM
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </CryptoDetailsBox>
  );
};

export default Crypto;
