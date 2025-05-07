import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  styled,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ExchangeLogo } from "@/utils";
import moment from "moment";
import toast from "react-hot-toast";
import { api_configs } from "@/api-services";
import axios from "axios";
import AppContext from "@/context/AppContext";
import { LuCopy } from "react-icons/lu";
import { Check } from "@mui/icons-material";
import Image from "next/image";
import ExchangeModal from "@/components/ExchangeModal";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";

const ConnectExchangeBox = styled("div")(({ theme }) => ({
  "& .customBox": {
    background: "#FFFFFF0A",
    padding: "12px",
    borderRadius: "6px",
  },
  "& .avtClass": {
    display: "flex",
    alignItems: "center",
  },
  "& .recentBox": {
    background: "#FFFFFF0A",
    borderRadius: "6px",
    padding: "10px",
  },
}));

export default function RecentConnectedExchange({ list }) {
  const auth = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false); // For modal state

  return (
    <ConnectExchangeBox>
      <Box>
        <Paper elevation={2} style={{ marginTop: "20px" }}>
          <Typography variant="h6" fontWeight="500" mb={4.9}>
            Recent
          </Typography>
          <Grid container spacing={2}>
            {list?.map((data, index) => (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box className="recentBox">
                  <Box className="displaySpacebetween">
                    <Box className="avtClass displayCenterStart">
                      <Image
                        width={10}
                        height={10}
                        quality={100}
                        alt="logo"
                        src={
                          ExchangeLogo.find(
                            (d) =>
                              d.title.toLowerCase() ===
                              data?.exchangeName.toLowerCase()
                          ).img
                        }
                        style={{
                          height: "25px",
                          width: "25px",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography
                        variant="h4"
                        color="primary"
                        fontWeight="500"
                        ml={1}
                      >
                        {data.exchangeName}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1.5}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item lg={8} md={11} sm={9} xs={12}>
                        <Box className="displayAlign">
                          <Typography
                            variant="body1"
                            fontWeight="500"
                            color="primary"
                          >
                            API KEY :
                          </Typography>
                          <CopyBox address={data?.apiKey} />
                        </Box>
                      </Grid>
                      <Grid item lg={4} md={4} sm={3} xs={12} align="right">
                        <DisconnectButton
                          data={data}
                          auth={auth}
                          modalOpen={modalOpen}
                          setModalOpen={setModalOpen}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            ))}
            {list?.length == 0 && (
              <NoDataFoundFrame data={"No exchanges have been added yet!"} />
            )}
          </Grid>
        </Paper>
      </Box>
    </ConnectExchangeBox>
  );
}

const DisconnectButton = ({ data, auth, modalOpen, setModalOpen }) => {
  const token = window.localStorage.getItem("user_token");

  const [isDeleting, setIsDeleting] = useState(false); //setIsDeleting

  const disConnectExchangeHandler = async () => {
    try {
      setIsDeleting(true);
      const dataToSend = {
        _id: data._id,
      };
      const response = await axios({
        method: "DELETE",
        url: api_configs.removeConnectedExchange,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.data.responseCode == 200) {
        setIsDeleting(false);
        toast.success("Exchange has been disconnected successfully.");
        auth.getConnectedExchangeList(token);
        setModalOpen(false);
      } else {
        setIsDeleting(false);
      }
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        style={{ padding: "14px 25px", minWidth: "130px" }}
        // onClick={() => disConnectExchangeHandler(data?._id)}
        onClick={() => setModalOpen(true)}
        disabled={isDeleting}
      >
        Disconnect
      </Button>
      {modalOpen && (
        <ExchangeModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          handleCallFunction={() =>
            !isDeleting && disConnectExchangeHandler(data?._id)
          }
          isDeleting={isDeleting}
        />
      )}
    </Box>
  );
};

const CopyBox = ({ address }) => {
  const [isShow, setisShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        value={isShow ? address : "XXXXXXXXXXXXXXXXXX"}
        // color='rgba(255, 255, 255, 1)'
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            background: "transparent",
            borderColor: "transparent !important",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          },

          "& .MuiOutlinedInput-input": {
            border: "none",
            padding: "0px",
            color: "#FFFFFFCC",
            fontSize: "14px",
          },
          "& .MuiInputBase-root": {
            border: "none",
            padding: "0px",
          },
        }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              {isShow && (
                <IconButton
                  onClick={handleCopyClick}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "2px",
                    marginLeft: "0px",
                  }}
                  disabled={copied}
                >
                  {copied ? <Check /> : <LuCopy />}
                </IconButton>
              )}
              {/* <IconButton
                edge="end"
                onClick={() => setisShow(!isShow)}
                sx={{
                  background: "transparent",
                  padding: "2px",
                }}
              >
                {isShow ? (
                  <IoMdEyeOff cursor="pointer" color="#575765" />
                ) : (
                  <IoMdEye cursor="pointer" color="#575765" />
                )}
              </IconButton> */}
            </InputAdornment>
          ),
        }}
      />
      {/* {isShow ? (
        <Box
          sx={{
            maxWidth: "140px",
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: "0px",
            scrollBehavior: "smooth",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              maxWidth: "150px",
              scrollBehavior: "smooth",
              wordBreak: "keep-all",
              margin: 0,
            }}
          >
            {address && address}{" "}
          </Typography>
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="secondary"
          sx={{
            wordBreak: "break-all",
          }}
        >
          XXXXXXXXXXXXXXXXXX
        </Typography>
      )} */}
      {/* <Box sx={{ display: "flex", alignItems: "center" }}>
        {isShow && (
          <IconButton
            onClick={handleCopyClick}
            style={{
              cursor: "pointer",
              border: "none",
              background: "transparent",
            }}
            disabled={copied}
          >
            {copied ? <Check /> : <LuCopy />}
          </IconButton>
        )}
        <IconButton onClick={() => setisShow(!isShow)}>
          {isShow ? (
            <IoMdEyeOff cursor="pointer" color="#575765" />
          ) : (
            <IoMdEye cursor="pointer" color="#575765" />
          )}
        </IconButton>
      </Box> */}
    </Box>
  );
};
