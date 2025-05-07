import React from "react";
import {
  Box,
  Dialog,
  Button,
  DialogContent,
  Typography,
  styled,
} from "@mui/material";
const MainComponent = styled("div")({});

export default function PasswordSuccess({ open, handleClose }) {
  return (
    <MainComponent>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent sx={{ padding: "20px 12px" }}>
          <Box>
            <Box className="upperBox">
              <Typography variant="h5" color="#fff" align="center">
                Password Changed
              </Typography>
              <Typography variant="body1" color="#fff" align="center">
                Your password has been changed successfully.
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
