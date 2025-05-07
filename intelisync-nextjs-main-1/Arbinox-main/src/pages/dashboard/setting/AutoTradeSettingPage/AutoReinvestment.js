import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    background: "rgba(255, 255, 255, 0.07)",
  },
  "& h3": {
    color: "#9090A3",
    fontWeight: "600",
  },
}));

const AutoReinvestment = () => {
  return (
    <MainBox>
      <Box>
        <Paper elevation={2}>
          <Box>
            <Typography variant="h3" color="primary">
              Profit Reinvestment Percentage
            </Typography>
            <Box mt={4} className="displaySpacebetween">
              <TextField
                // type={showPassword ? "text" : "password"}
                variant="outlined"
                name="password"
                placeholder="100%"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginLeft: "10px" }}
              >
                Update
              </Button>
            </Box>
            <Typography
              style={{ marginTop: "10px" }}
              variant="body1"
              color="primary"
            >
              *Any Percentage less than 100% will be sent to the profit
              Distributiion Center
            </Typography>
          </Box>
        </Paper>
      </Box>
    </MainBox>
  );
};

export default AutoReinvestment;
