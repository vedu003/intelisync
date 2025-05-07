import DataLoader from "@/components/DataLoader";
// import QRCodeGenerator from "@/components/QRCodeGenerator";
import { sortAddress } from "@/utils"; // sortAddressWalletDeposite seems unused
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";

const MainBox = styled(Box)(({ theme }) => ({
  "& .mainQRBox": {
    padding: "20px",
    "& h6": {
      fontWeight: 700,
    },
    "& .addressBox": {
      padding: "10px",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #414040",
      background: "#1E1E1E",
      "& p": {
        color: "#FFF",
        fontWeight: 500,
      },
      "& .addressText": {
        color: "rgba(255, 255, 255, 0.60)",
        fontWeight: 400,
      },
    },
  },
  "& .qrCodeBox": {
    width: "200px",
    height: "200px",
    padding: "10px",
    backgroundColor: "#FFF",
    "& img": {
      width: "100%",
      maxWidth: "200px",
    },
  },
}));

const QRWalletModal = ({
  open,
  setOpen,
  data,
  exchangeName,
  add,
  isDepositLoading,
  errorMess,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(add?.address).then(() => {
      toast.success("Address copied to clipboard!");
    });
  };

  return (
    <MainBox>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Box className="mainQRBox">
            {isDepositLoading ? (
              <DataLoader />
            ) : (
              <Box className="displayColumn">
                <Typography variant="h6" color="primary">
                  {data.asset} ({exchangeName})
                </Typography>
                {!errorMess && (
                  <>
                    <Box mt={3} className="qrCodeBox">
                      {/* {add?.address && (
                        <QRCodeGenerator qrCodeText={add?.address} />
                      )} */}
                    </Box>
                    <Box mt={2} className="addressBox displaySpacebetween">
                      <Box>
                        <Typography variant="body2" color="primary">
                          {add?.network}
                        </Typography>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="primary"
                            className="addressText"
                          >
                            {sortAddress(add?.address)}
                          </Typography>
                          <IconButton onClick={handleCopy}>
                            <MdOutlineContentCopy color="#FF6905" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions justifyContent="space-evenly" mt={3} mb={3}>
          {!errorMess && (
            <Button variant="contained" color="primary" onClick={handleCopy}>
              Copy
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </MainBox>
  );
};

export default QRWalletModal;
