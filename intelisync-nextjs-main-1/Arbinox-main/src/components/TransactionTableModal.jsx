import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const MainComponent = styled("div")({
  "& .dialog-content": {
    padding: "32px",
  },
  "& .header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  "& .transaction-info": {
    marginBottom: "24px",
  },
  "& .pairs-box": {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
});

export default function TransactionTableModal({ open, handleClose }) {
  return (
    <MainComponent>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent sx={{ padding: "12px" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: "18px", right: "18px" }}
          >
            <CloseIcon style={{ color: "#fff" }} />
          </IconButton>
          {/* Header */}
          <Box align="center" mt={1.5}>
            <Typography variant="h2" color="primary">
              Transaction Details
            </Typography>
          </Box>

          {/* Transaction Info */}
          <Typography variant="body1" color="secondary" align="center" mt={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br /> Aenean euismod bibendum laoreet. Proin gravida dolor si.
          </Typography>

          {/* Transaction Details */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
              marginTop: "24px",
            }}
          >
            <Typography variant="body1" color="#FFFFFF99">
              Pairs
            </Typography>
            <Typography variant="body1" color="primary">
              ETH-BTC
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography variant="body1" color="#FFFFFF99">
              Exchange
            </Typography>
            <Typography variant="body1" color="primary">
              Kraken
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography variant="body1" color="#FFFFFF99">
              Trading Status
            </Typography>
            <Typography variant="body1" color="primary">
              Pending
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography variant="body1" color="#FFFFFF99">
              Start Date
            </Typography>
            <Typography variant="body1" color="primary">
              Feb 1, 2024, 12:38:03 PM
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography variant="body1" color="#FFFFFF99">
              End Date
            </Typography>
            <Typography variant="body1" color="primary">
              Feb 1, 2024, 12:38:03 PM
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography variant="body1" color="#FFFFFF99">
              Strategy
            </Typography>
            <Typography variant="body1" color="primary">
              Stop Loss
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" color="#FFFFFF99">
              Trade Time
            </Typography>
            <Typography variant="body1" color="primary">
              4
            </Typography>
          </Box>

          {/* Close Button */}
        </DialogContent>
        <Box display="flex" justifyContent="center" marginTop="24px">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ minWidth: "289px" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </MainComponent>
  );
}
