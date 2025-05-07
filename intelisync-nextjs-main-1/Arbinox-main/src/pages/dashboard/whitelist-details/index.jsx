"use client";
import { Box, Typography, Avatar, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { api_configs } from "@/api-services";
import { styled } from "@mui/material";
import DashboardLayout from "@/layout/DashboardLayout";
import { funConEx, getCoinImageDatahandler } from "@/utils";
import CustomHead from "@/components/CustomHead";
import GenerateAddress from "./GenerateAddress";
import TableComp from "@/components/TableComp";
import AppContext from "@/context/AppContext";
import { TbPlaylistAdd } from "react-icons/tb";

const UserManagementBox = styled("div")(({ theme }) => ({
  "& inviteBox": {
    position: "relative",
    zIndex: "999",
    "& .MuiIconButton-root": {
      padding: "0px",
    },
    "& .typoBox": {
      padding: "10px 0px 30px",
    },
    "& .invitebutton": {
      marginRight: "-13px",
      padding: "24px 39px",
    },
    "& .paperBox": {
      padding: "80px 30px",
      boredrRadius: "5px",
    },
    "& .invitelistBox": {
      padding: "30px 0px 10px",
      display: "flex",
      justifyContent: "space-between",
      textAlign: "center",
    },
    "& .tablepadding": {
      margin: "50px 0px 20px",
      [theme.breakpoints.down("xs")]: {
        margin: "20px 0px",
      },
    },
  },
}));
const tableHead = [
  {
    heading: "Coin",
  },
  {
    heading: "Address",
    isCopy: true,
  },
  {
    heading: "Network",
  },
  {
    heading: "Exchange",
  },
];
const boxDisplay = {
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export default function UserManagement() {
  const token = window.localStorage.getItem("user_token");
  const [whiteList, setinvitePlan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [coinImageData, setCoinImageData] = useState([]);
  const auth = useContext(AppContext);

  const getConnectedExchangeBalanceList = async () => {
    try {
      const coinImgArry = await getCoinImageDatahandler();
      GetWhiteListeHandle();
      if (coinImgArry?.length !== 0) {
        setCoinImageData(coinImgArry);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetWhiteListeHandle = async (value) => {
    try {
      setinvitePlan([]);
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: api_configs.getWithdrawAddress,
        headers: {
          token: token,
        },
      }).then(async (res) => {
        if (res.data.responseCode === 200) {
          let dataReponse = res.data.result.flatMap((exchange) =>
            exchange.address.map((address) => ({
              ...address,
              exchangeName: exchange.exchangeName,
            }))
          );
          setinvitePlan(dataReponse);
          setIsLoading(false);
        }
        setIsLoading(false);
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getConnectedExchangeBalanceList();
  }, []);
  function coinImage(value) {
    let newArray = [];
    for (let i = 0; i < value?.length; i++) {
      for (let j = 0; j < coinImageData?.length; j++) {
        if (value[i]?.coinName == coinImageData[j]?.symbol.toUpperCase()) {
          newArray.push({ ...value[i], coinImg: coinImageData[j]?.image });
        }
      }
    }
    return newArray;
  }

  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <TbPlaylistAdd
          height={24}
          width={24}
          quality={100}
          // src="/images/clock.svg"
          style={{ marginRight: "6px" }}
        />
        <Typography variant="h3" color="primary" whiteSpace="pre">
          Whitelist Details
        </Typography>
      </Box>
    );
  }, []);
  return (
    <UserManagementBox>
      <CustomHead
        title="Whitelist details | Me.Cap"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="inviteBox">
        <Box className="invitelistBox displaySpacebetween" mb={1}>
          <Typography mb={1} variant="h5" color="primary">
            Exchange Coin
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Generate
          </Button>
        </Box>
        <TableComp
          tableHead={tableHead}
          scoreListData={
            whiteList &&
            coinImage(funConEx(whiteList))?.map((value, index) => ({
              Coin: (
                <Box sx={boxDisplay}>
                  <Avatar
                    sx={{
                      height: 20,
                      width: 20,
                      borderRadius: "50%",
                      backgroundColor: "#fafafa",
                    }}
                    src={value?.coinImg}
                    alt=""
                  />{" "}
                  &nbsp; {value.coinName && value.coinName}
                </Box>
              ),
              Address: value?.address?.toString(),
              Network: value?.network ? value?.network : "-",
              Exchange: (
                <Box sx={boxDisplay}>
                  <Avatar
                    sx={{
                      height: 20,
                      width: 20,
                      borderRadius: "50%",
                      // backgroundColor: "#fafafa",
                    }}
                    src={value?.img}
                    alt=""
                  />{" "}
                  &nbsp; {value.exchangeName && value.exchangeName}
                </Box>
              ),
            }))
          }
          noOfPages={"numPages"}
          noOfTotalPages={"numPages"}
          page={"page"}
          setPage={"setPage"}
          limit={10}
          isLoading={isLoading}
          maxHeight="calc(100dvh - 295px)"
          NoDataFoundText="Whitelist Details not added"
        />
      </Box>
      {open && (
        <GenerateAddress
          setOpen={setOpen}
          open={open}
          callBack={GetWhiteListeHandle}
        />
      )}
    </UserManagementBox>
  );
}

UserManagement.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
