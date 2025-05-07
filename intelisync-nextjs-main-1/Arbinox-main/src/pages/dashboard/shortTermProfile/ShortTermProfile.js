import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
// import { useHistory } from "react-router-dom";
import { useRouter } from "next/router";
import ShortTermProfileCard from "./ShortTermProfileCard";

// const useStyles = makeStyles((theme) => ({
//   shortTermProfileBox: {
//     "& .combinedBox": {
//       marginBottom: "60px",
//     },
//     "& h5": {
//       fontWeight: 600,
//     },
//   },
//   formControl: {
//     maxWidth: "130px",
//     "& .MuiOutlinedInput-input": {
//       padding: "8px 14px",
//     },
//     "& svg": {
//       color: "#797979",
//     },
//   },
// }));

export default function ShortTermProfile() {
  // const classes = useStyles();
  // const history = useHistory();
  const [age, setAge] = React.useState("All");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const combinedExtendedProfitsData = [
    {
      heading: "Exchange 1",
      value: "2014.00",
      coinName: "(USDT)",
      progress: "47%",
    },
    {
      heading: "Exchange 2",
      value: "2014.00",
      coinName: "(USDT)",
      progress: "63%",
    },
    {
      heading: "Exchange 3",
      value: "2014.00",
      coinName: "(USDT)",
      progress: "74%",
    },
  ];

  return (
    <Box className={"classes.shortTermProfileBox"}>
      <Paper elevation={2}>
        <Box className="displaySpacebetween combinedBox responsiveManage">
          <Typography variant="h5">Short-Term Profits</Typography>
          <FormControl
            variant="standard"
            className={`${"classes.formControl"} responsiveManageButton`}
          >
            <Select
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              inputProps={{
                "aria-label": "Without label",
              }}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Ten"}>Ten</MenuItem>
              <MenuItem value={"Twenty"}>Twenty</MenuItem>
              <MenuItem value={"Fourty"}>Fourty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Grid container spacing={1}>
            {combinedExtendedProfitsData &&
              combinedExtendedProfitsData?.map((data, index) => {
                return (
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <ShortTermProfileCard data={data} index={index} />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
