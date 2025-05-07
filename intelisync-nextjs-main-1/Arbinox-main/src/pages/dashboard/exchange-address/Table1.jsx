import React, { useContext, useEffect, useState } from "react";
import AppContext from "@/context/AppContext";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { api_configs } from "@/api-services";
import EditIcon from "@mui/icons-material/Edit";
import { BlockOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  IconButton,
  Button,
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import toast from "react-hot-toast";

const columns = [
  // { id: "index", label: "id", minWidth: 80 },
  { id: "title", label: "Plan Name", minWidth: 150 },

  {
    id: "value",
    label: "Price",
    minWidth: 120,
    align: "right",
  },
  {
    id: "noOfTrade",
    label: "No of Trade to execute",
    minWidth: 120,
    align: "center",
  },
  {
    id: "noOfExchange",
    label: "Max no. of exchange",
    minWidth: 120,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 120,
    align: "center",
  },
  {
    id: "updatedAt",
    label: "Date & Time",
    minWidth: 120,
    align: "center",
    format: "date",
  },
];
export default function Table1() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const token = window.localStorage.getItem("user_token");
  const [subscribeListData, setSubscribeListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setIsLoading(true);
    subscribeListHandler();
  }, []);

  const subscribeListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: api_configs.getWithdrawAddress,
        headers: {
          token: token,
        },
      });
      if (res.data.responseCode === 200) {
        setSubscribeListData(res.data.result);
        setIsLoading(false);
      } else {
        setSubscribeListData([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setSubscribeListData([]);
    }
  };

  return (
    <Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={2}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell key={"id"} align={"center"}>
                  Sr. No.
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key={"Action"}
                  align={"center"}
                  // style={{ minWidth: column.minWidth }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscribeListData &&
                subscribeListData.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={index + 1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && column.format === "date"
                              ? moment(value).format("lll")
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
