import {
  Box,
  Dialog,
  Button,
  DialogContent,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const MainComponent = styled("div")({});
export default function VerifiedModal({ open, handleClose }) {
  return (
    <MainComponent>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent sx={{ padding: "20px 12px" }}>
          <Box>
            <Box className="upperBox">
              <Typography variant="h5" color="#fff" align="center">
                Verified
              </Typography>
              <Typography variant="body1" color="#fff" align="center">
                Verified Successfully
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          marginTop="24px"
          marginBottom="10px"
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClose}
          >
            Done
          </Button>
        </Box>
      </Dialog>
    </MainComponent>
  );
}
