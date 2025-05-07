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
  "& h3": {
    color: "#9090A3",
    fontSize: "600",
  },
}));

const AutoTradeTransaction = () => {
  return (
    <MainBox>
      <Box>
        <Paper elevation={2}>
          <Box>
            <Typography variant="h3" color="primary">
              Transaction Limit
            </Typography>
            <Box mt={4} className="displaySpacebetween">
              <TextField variant="outlined" name="password" placeholder="500" />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginLeft: "10px" }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </MainBox>
  );
};

export default AutoTradeTransaction;
