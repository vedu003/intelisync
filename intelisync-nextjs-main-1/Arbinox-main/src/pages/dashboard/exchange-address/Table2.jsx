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
export default function Table2() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const token = window.localStorage.getItem("user_token");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setsearch] = useState("");
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [isClear, setIsClear] = useState(false);
  // const [page, setPage] = useState(1);
  const [subscribeListData, setSubscribeListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState();
  const [deleteLoader, setDeleteLoader] = useState(false);

  const handleClickOpen = (data) => {
    setOpen(true);
    setId(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const hancleClear = () => {
    setsearch("");
    setToDate(null);
    setFromDate(null);
    setIsClear(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    if (isClear) {
      setIsLoading(true);
      subscribeListHandler();
    }
  }, [isClear]); // eslint-disable-line
  useEffect(() => {
    setIsLoading(true);
    subscribeListHandler();
  }, [page, rowsPerPage, search]); // eslint-disable-line
  const subscribeListHandler = async () => {
    try {
      // setSubscribeListData([]);
      // setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: api_configs.subscriptionPlanListWithFilter,
        params: {
          page: page,
          limit: rowsPerPage,
          search: search !== "" ? search : null,
          fromDate: fromDate
            ? moment(fromDate).format("YYYY-MM-DDT00:00").toString()
            : null,
          toDate: toDate
            ? moment(toDate).format("YYYY-MM-DDT11:59").toString()
            : null,
        },
        headers: {
          token: token,
        },
      });
      if (res.data.responseCode === 200) {
        setNoOfPages(res.data.result.pages);
        setRowsPerPage(res.data.result.limit);
        setSubscribeListData(res.data.result.docs);
        setIsLoading(false);
      } else {
        setNoOfPages(1);
        setRowsPerPage(10);
        setPage(1);
        setSubscribeListData([]);
        setIsLoading(false);
      }
      setIsClear(false);
    } catch (error) {
      console.log(error);
      setIsClear(false);
      setIsLoading(false);
      setNoOfPages(1);
      setRowsPerPage(10);
      setPage(1);
      setSubscribeListData([]);
    }
  };

  const blocksubscriptionHandler = async (_id) => {
    setDeleteLoader(true);
    try {
      const res = await axios({
        method: "PUT",
        url: api_configs.blockUnblockSubscriptionPlan,
        headers: {
          token: token,
        },
        data: {
          subscriptionId: _id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setDeleteLoader(false);
        setOpen(false);
        subscribeListHandler();
      } else {
        toast.error(res.data.responseMessage);
        setDeleteLoader(false);
      }
    } catch (error) {
      console.log(error);
      setDeleteLoader(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={2}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  key={"id"}
                  align={"center"}
                  // style={{ minWidth: column.minWidth }}
                >
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
                      <TableCell key={"Sr.No."} align={"center"}>
                        {index + 1}
                      </TableCell>
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
                      <TableCell>
                        {" "}
                        <IconButton
                          onClick={() =>
                            router.push({
                              pathname: "/dashboard/add-pricing",
                              search: row?._id,
                              hash: "view",
                            })
                          }
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        &nbsp;&nbsp;&nbsp;
                        <IconButton
                          disabled={row?.status === "BLOCK"}
                          onClick={() =>
                            router.push({
                              pathname: "/dashboard/add-pricing",
                              search: row?._id,
                              hash: "edit",
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        &nbsp;&nbsp;&nbsp;
                        <IconButton
                          style={
                            row?.status === "BLOCK"
                              ? { color: "red" }
                              : { color: "green" }
                          }
                          onClick={() => handleClickOpen(row)}
                        >
                          <BlockOutlined />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {noOfPages > 1 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            // count={rows.length}
            // page={page}
            // onPageChange={handleChangePage}

            count={noOfPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
      {open && (
        <Dialog
          maxWidth="xs"
          fullWidth
          open={open}
          keepMounted
          onClose={() => handleClose()}
        >
          <Box className="newModalBorder">
            <Box className="mainbox1">
              <DialogContent>
                <Box align="center">
                  <Typography
                    variant="h2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                      fontWeight: "300",
                      marginBottom: "16px",
                    }}
                  >
                    {Id?.status === "ACTIVE" ? "Block" : "Unblock"}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {Id?.status === "ACTIVE"
                      ? "Are you sure you want to blocked?"
                      : "Are you sure you want to unblocked?"}
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Box mt={2} mb={2} maxWidth="400px">
                  <Button
                    className="outlined"
                    style={{ padding: "8px 20px" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClose()}
                    disabled={deleteLoader}
                  >
                    Cancel
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    className="transparentbutton"
                    style={{ padding: "8px 20px" }}
                    onClick={() => blocksubscriptionHandler(Id?._id)}
                    disabled={deleteLoader}
                  >
                    {deleteLoader ? "Progess..." : "Confirm"}
                  </Button>
                </Box>
              </DialogActions>
            </Box>
          </Box>
        </Dialog>
      )}
    </Box>
  );
}
