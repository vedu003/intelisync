import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Box,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
  FormHelperText,
} from "@mui/material";
import styled from "@emotion/styled";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AppContext from "@/context/AppContext";
import { FiLogOut } from "react-icons/fi";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import { useAccount, useDisconnect } from "wagmi";
import SortAddress from "@/utils/SortAddress";
import { api_configs } from "@/api-services";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { Help } from "@mui/icons-material";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiPaper-root-MuiDialog-paper": {
    maxWidth: "550px",
  },
}));

const ReadProfileBox = styled("div")(({ theme }) => ({
  "& .MuiTypography-root-MuiDialogTitle-root": {
    color: "#fff",
    fontFamily: "Open Sans',sans-serif;",
    texAlign: "center",
    fontSize: "28px",
    paddingBottom: "16px",
    margin: "0px !important",
    padding: "0px !important",
  },

  "& .confirmationDialogBox": {
    "& p": {
      color: "rgba(0, 0, 0, 0.60)",
      fontFamily: "Gilroy-Light",
      textAlign: "center",
      width: "100%",
      maxWidth: "320px",
      margin: "16px 0px",
    },
  },
}));

export default function ConnectWalletModal({ openModal }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { getProfileDataHandler, setOpenWallletModal } = useContext(AppContext);
  const [errorMess, setErrorMess] = useState("");

  useEffect(() => {
    if (address && isConnected) {
      setErrorMess("");
      // connectWalletApi(address);
      setOpen(true);
    }
  }, [isConnected]);
  const connectWalletApi = async (address) => {
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "PUT",
        url: api_configs.updateWallet,
        bodyData: {
          walletAddress: address,
        },
      });
      if (response.data.responseCode === 200) {
        getProfileDataHandler(localStorage.getItem("user_token"));
        toast.success("Wallet address updated successfully.");
        setOpenWallletModal(false);
      } else {
        disconnect();
        console.log("Disconnect---");
        setErrorMess(response?.data?.responseMessage);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainBox>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        keepMounted
      >
        {" "}
        <ReadProfileBox>
          <DialogContent>
            <Box align="center" mt={3}>
              <Typography variant="h2" color="primary" fontWeight="500">
                Connect Wallet
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                mt={1.4}
                mb={open ? 0 : errorMess ? 1 : 4}
              >
                {open
                  ? "Are you sure you want to use this wallet ?"
                  : "Choose the wallet you want to connect with"}
              </Typography>
              <FormHelperText
                error
                sx={{
                  textAlign: "center",
                  maxWidth: "328px",
                }}
              >
                {errorMess}
              </FormHelperText>
            </Box>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            {open ? (
              <Box className="displayCenter" style={{ gap: "10px" }} mb={2}>
                <Box
                  variant="contained"
                  // style={{ background: "#DF3939", color: "#fff" }}
                  // onClick={() => disconnect()}
                >
                  <SortAddress address={address} />
                </Box>
              </Box>
            ) : (
              <Box
                className="displayCenter walletButtonBox"
                style={{ gap: "10px" }}
                mb={2}
              >
                <ConnectButton
                  style={{ background: "red" }}
                  showBalance={false}
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  label={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="/images/metamask.svg"
                        alt="Metamask"
                        width="32px"
                        height="32px"
                        style={{ marginRight: "8px" }}
                      />
                      <span>Metamask</span>
                    </div>
                  }
                />
              </Box>
            )}
          </DialogActions>
        </ReadProfileBox>
        {address && (
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              // style={{ background: "#DF3939", color: "#fff" }}
              onClick={async () => {
                await disconnect();
                setOpen(false);
              }}
              disabled={isLoading}
            >
              No
            </Button>{" "}
            <Button
              variant="contained"
              color="primary"
              // style={{ background: "#DF3939", color: "#fff" }}
              onClick={() => {
                connectWalletApi(address);
                // open ? disconnect() : setOpen(true);
              }}
              disabled={isLoading}
            >
              {isLoading ? <ButtonCircularProgress size={20} /> : "Yes"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </MainBox>
  );
}
