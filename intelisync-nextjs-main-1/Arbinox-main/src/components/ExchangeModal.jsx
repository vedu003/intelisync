import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";
import ButtonCircularProgress from "./ButtonCircularProgress";

const MainComponent = styled("div")({});

export default function ExchangeModal({
  open,
  handleClose,
  handleCallFunction,
  isDeleting,
}) {
  return (
    <MainComponent>
      <Dialog
        open={open}
        onClose={() => !isDeleting && handleClose()}
        fullWidth
        maxWidth="xs"
        style={{ borderRadius: "24px" }}
      >
        <DialogContent style={{ paddingBottom: "32px" }}>
          <Box align="right">
            <IconButton
              disabled={isDeleting}
              onClick={handleClose}
              style={{ padding: "0px", marginTop: "-10px" }}
            >
              <IoClose style={{ fontSize: "30px" }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Typography variant="h2" color="#fff" fontWeight="500">
              Disconnect Exchange
            </Typography>
            <Typography variant="body1" color="#fff" mt={1.4}>
              Are you sure do you want to disconnect this Exchnage?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <Button
              variant="contained"
              style={{ width: "70%" }}
              color="primary"
              onClick={handleCallFunction}
              disabled={isDeleting}
            >
              Disconnect {isDeleting && <ButtonCircularProgress />}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </MainComponent>
  );
}
