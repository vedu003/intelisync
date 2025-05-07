import {
  Box,
  Dialog,
  Button,
  DialogContent,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import OTPInput from "react-otp-input";
import Timer from "@/components/Timer/Timer";
import VerifiedModal from "./VerifiedModal";

const MainComponent = styled("div")({});
export default function EmailAuthModal({ open, handleClose }) {
  const [authenticationSuccess, setAuthenticationSuccess] = useState(false);
  return (
    <MainComponent>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent sx={{ padding: "12px" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: "18px", right: "18px" }}
          >
            <CloseIcon style={{ color: "rgba(0, 0, 0, 1)" }} />
          </IconButton>
          {/* Header */}
          <Box>
            <Box className="upperBox">
              <Typography variant="h5" color="rgba(0, 0, 0, 1)" align="center">
                Email Authentication
              </Typography>
              <Typography
                variant="body1"
                color="rgba(0, 0, 0, 0.6)"
                align="center"
                style={{ maxWidth: "400px" }}
              >
                You’ll receive a 6-digit verification code by your registered
                email. Please check your mailbox.
              </Typography>
            </Box>

            <Box className="displayCenter" mt={4}>
              <OTPInput
                numInputs={6}
                autoFocus={true}
                renderInput={(props, index) => (
                  <input
                    {...props}
                    style={{
                      width: "52px",
                      height: "54px",
                      marginRight: index === 5 ? "0px" : "12px",
                      textAlign: "center",
                      borderRadius: "8px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      fontSize: "24px",
                    }}
                  />
                )}
                secure
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "24px",
              }}
            >
              <Typography variant="body1" fontWeight="500" color="#fff">
                2:35
              </Typography>
              <Typography variant="body1" fontWeight="500" color="#fff">
                Resend OTP
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <Box display="flex" justifyContent="center" marginTop="24px">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => {
              handleClose();
              setAuthenticationSuccess(true);
            }}
          >
            Submit
          </Button>
        </Box>
      </Dialog>
      {authenticationSuccess && (
        <VerifiedModal
          open={authenticationSuccess}
          handleClose={() => {
            handleClose();
            setAuthenticationSuccess(false);
          }}
        />
      )}
    </MainComponent>
  );
}
