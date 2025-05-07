import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import {
  capitalizeFirstLetter,
  sortAddress,
  setCryptoDecimals,
  exportToCSV,
  fixDecimal,
  convertArrayToXLSX,
} from "@/utils";
import { toast } from "react-hot-toast";
import { api_configs } from "@/api-services";
import DashboardLayout from "@/layout/DashboardLayout";
import { AiOutlineCopy } from "react-icons/ai";
import CustomHead from "@/components/CustomHead";
import TableComp from "@/components/TableComp";
import MainFilter from "@/components/MainFilter";
import Popup from "@/components/DynamicModel";
import CommonConfirmationDialog from "@/components/CommonConfirmationDialog";
import { LuEye, LuRefreshCcw } from "react-icons/lu";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AppContext from "@/context/AppContext";
import { MdFormatListBulleted } from "react-icons/md";
import SortAddress from "@/utils/SortAddress";

const TransactionBox = styled("div")(({ theme }) => ({
  "& .tabmainBox": {
    width: "fit-content",
    background: "#FFFFFF08",
    borderRadius: "12px",
    display: "flex",
    padding: "0px",
    // padding: "8px",
    gap: "10px",
  },
  "& .transactionBox": {
    position: "relative",
    zIndex: "999",
    "& .mainTab": {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: "8px",
    },
    "& .tabActiveButtons": {
      padding: "14px 37px",
      fontFamily: "'Outfit', sans-serif",
      background: "linear-gradient(180deg, #806DFF 0%, #4A33E7 100%)",
      lineHeight: "21.71px",
      border: "1px solid #9A8AFE",
      boxShadow: "0px 0.83px 14.69px 0px #FFFFFF6E inset",
      borderBottom: "none !important",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
      },
      width: "100%",
      "& h6": {
        color: "#fff",
        fontSize: "15px",
        fontWeight: "400",
      },
    },
    "& .tabButtons": {
      // borderRadius: "10px",
      padding: "14px 37px",
      whiteSpace: "pre",
      cursor: "pointer",
      width: "100%",
      "& h6": {
        fontSize: "15px",
        fontWeight: "400",
        color: "#FFFFFF99",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
      },
    },
    "& h4": {
      fontWeight: 700,
    },
  },
  "& .tableBox": {
    minWidth: "800px",
  },
  "& .cardBox": {
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #cccccc36",
    background: "#33323882",
    marginBottom: "10px",
  },
  "& .contentBox": {
    textAlign: "right",
    width: "100%",
  },
}));

const tableHead = [
  {
    heading: "S. No",
    isMobile: true,
    column: 0,
  },
  {
    heading: "Pair",
    isMobile: true,
    column: 0,
  },

  {
    heading: "Exchange",
    isMobile: true,
    column: 0,
  },
  {
    heading: "Capital",
    isMobile: true,
    column: 1,
  },

  {
    heading: "Arb. Status",
  },
  {
    heading: "Profit",
    key: "profit",
    sortable: false, // for sorting it is true
    isMobile: true,
    column: 1,
  },
  {
    heading: "Trade Type",
    isMobile: true,
    column: 0,
  },
  {
    heading: "barStatus",
    isMobile: false,
    isNotShow: true,
  },
  {
    heading: "Strategy",
    isMobile: false,
    isNotShow: true,
  },
  {
    heading: "Open Time",
    isMobile: true,
    column: 2,
    isNotShow: false,
  },
  {
    heading: "Close Time",
    isMobile: true,
    column: 2,
    isNotShow: false,
  },
  { heading: "Status", isMobile: true, column: 2, isNotShow: false },
  { heading: "Action", isMobile: true, column: 2, isNotShow: false },

  // { heading: "Status" },
  // { heading: "Action" },
];

export default function Transection() {
  const token = window.localStorage.getItem("user_token");
  const auth = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [numPages, setNumPages] = useState(1);
  const [arbitrageData, setArbitargeData] = useState([]);
  const [strategyData, setstrategyData] = useState([]);
  const [_idd, set_idd] = useState("");
  const [openCancel, setOpenCancel] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [tab, setTab] = useState("listPlacedDirectTradeWithFilter");
  const [isClear, setIsClear] = useState(false);
  const [total, setTotal] = useState(1);
  const [isClearData, setIsClearData] = useState(true);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [filtersData, setFiltersData] = useState({
    fromDate: null,
    toDate: null,
    search: "",
    planStatus: "1",
    arbitrageType: "1",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "profit",
    direction: "normal",
  });
  const handleTab = (e) => {
    setTab(e);
    handleClear();
  };
  const getTransactionHistory = async (endPoint, pageNo) => {
    try {
      setArbitargeData([]);
      setIsClear(false);
      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url: api_configs[endPoint],
        headers: {
          token: token,
        },
        data: {
          search: filtersData?.search ? filtersData?.search : undefined,
          page: pageNo.toString(),
          limit: limit.toString(),
          arbitrageStatus:
            filtersData?.planStatus != "1"
              ? filtersData?.planStatus
              : undefined,
          arbitrageType:
            filtersData?.arbitrageType != "1"
              ? filtersData?.arbitrageType
              : undefined,
          fromDate: filtersData.fromDate
            ? moment(filtersData.fromDate).format("YYYY-MM-DD")
            : undefined,
          toDate: filtersData.toDate
            ? moment(filtersData.toDate).format("YYYY-MM-DD")
            : undefined,
          // sort:
          //   sortConfig?.direction === "normal"
          //     ? undefined
          //     : sortConfig?.direction === "asc"
          //     ? false
          //     : true,
        },
      });
      if (res.data.responseCode === 200) {
        setArbitargeData(res.data.result.docs);
        setIsClear(false);

        setNumPages(res.data.result.pages);
        setTotal(res.data.result.total);
        // setPage(res?.data?.result?.page);
      } else {
        setArbitargeData([]);
        setNumPages(0);
        setPage(0);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setArbitargeData([]);
      setNumPages(0);
      setPage(0);
      setIsLoading(false);
    }
  };
  const handleExport = async (endPoint) => {
    try {
      const res = await axios({
        method: "POST",
        url: api_configs[endPoint],
        headers: {
          token: token,
        },
        data: {
          search: filtersData?.search ? filtersData?.search : undefined,
          page: "1",
          limit: total.toString(),
          arbitrageStatus:
            filtersData?.planStatus != "1"
              ? filtersData?.planStatus
              : undefined,
          arbitrageType:
            filtersData?.arbitrageType != "1"
              ? filtersData?.arbitrageType
              : undefined,
          fromDate: filtersData.fromDate
            ? moment(filtersData.fromDate).format("YYYY-MM-DD")
            : undefined,
          toDate: filtersData.toDate
            ? moment(filtersData.toDate).format("YYYY-MM-DD")
            : undefined,
          // sort:
          //   sortConfig?.direction === "normal"
          //     ? undefined
          //     : sortConfig?.direction === "asc"
          //     ? false
          //     : true,
        },
      });
      if (res.data.responseCode === 200) {
        let currencyId = [];
        const title =
          tab == "listPlacedDirectTradeWithFilter"
            ? "Direct Arbitrage"
            : tab == "listPlacedTradeWithFilterIntraArb"
            ? "Intra Arbitrage"
            : tab == "listPlacedTriangularTradeWithFilter"
            ? "Triangular Arbitrage"
            : "";
        for (var i = 0; i < res.data.result.docs?.length; i++) {
          const arbitrageStatus = res.data.result.docs[i]?.arbitrageStatus;
          const base = res.data.result.docs[i]?.strategy[0]?.baseCurrency;
          const pair = res.data.result.docs[i]?.strategy[1]?.baseCurrency;
          const arbitrageType = res.data.result.docs[i]?.arbitrageType;
          const start = res.data.result.docs[i]?.start;
          const status = res.data.result.docs[i]?.status;
          const capital = res.data.result.docs[i]?.capital;
          const createdAt = res.data.result.docs[i]?.createdAt;
          const updatedAt = res.data.result.docs[i]?.updatedAt;

          let obj = {
            "Arbitrage Name": title,
            "Exchange Name": res.data.result.docs[i]?.exchangeName,
            Base: base ? base : "--",
            Pair: pair ? pair : "--",
            Capital:
              tab === "listPlacedDirectTradeWithFilter"
                ? capital + " " + pair
                : capital
                ? capital + " " + start
                : "",
            Profit: res.data.result.docs[i]?.profit
              ? res.data.result.docs[i]?.profit
              : 0,
            ArbitrageType: arbitrageType,
            Status: status,
            // "Arbitrage Status": arbitrageStatus,
            // Capital: capital,
            "Open Time": moment(createdAt).format("lll"),
            "Close Time":
              arbitrageStatus === "COMPLETED"
                ? moment(updatedAt).format("lll")
                : "Not Completed",
          };
          currencyId.push(obj);
        }
        convertArrayToXLSX(currencyId, `${title} transaction`);
      } else {
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleClearFilter = () => {
    if (!isClearData) {
      handleClear();
      setIsClear(true);
      setIsClearData(true);
    }
  };
  const handleClear = () => {
    setFiltersData({
      ...filtersData,
      ["fromDate"]: null,
      ["toDate"]: null,
      ["search"]: "",
      ["planStatus"]: "1",
      ["arbitrageType"]: "1",
    });
    setPage(0);
  };
  useEffect(() => {
    getTransactionHistory(tab, page + 1);
  }, [page, tab, limit, sortConfig]);
  useEffect(() => {
    if (isClear) {
      getTransactionHistory(tab, page + 1);
    }
  }, [isClear]);

  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <MdFormatListBulleted color="#fff" style={{ marginRight: "6px" }} />
        <Typography variant="h3" color="primary" whiteSpace="pre">
          Transactions
        </Typography>
      </Box>
    );
  }, []);

  function findGETAPIEndPoint(ty) {
    if (ty === "listPlacedDirectTradeWithFilter") {
      return "cancelledOrderDirectArb";
    } else if (ty === "listPlacedTradeWithFilterIntraArb") {
      return "cancelledOrderIntraArb";
    } else {
      return "cancelledOrderTriangular";
    }
  }

  const handleCancel = async () => {
    let endPoint = findGETAPIEndPoint(tab);
    try {
      setIsLoadingCancel(true);
      const res = await axios({
        method: "POST",
        url: api_configs[endPoint] + _idd,
        headers: {
          token: token,
        },
      });
      if (res.data.responseCode === 200) {
        set_idd("");
        setOpenCancel(false);
        getTransactionHistory(tab, page + 1);
        toast.success(res?.data?.responseMessage);
      } else {
        toast.success(res?.data?.responseMessage);
      }
      setIsLoadingCancel(false);
    } catch (error) {
      console.log(error);
      setIsLoadingCancel(false);
      if (error?.response) {
        toast.success(error?.response?.data?.responseMessage);
      } else {
        toast.success(error?.message);
      }
    }
  };

  const handleUpdateTrade = async (id) => {
    try {
      setUpdateLoading(id);
      const res = await axios({
        method: "PUT",
        url: api_configs[
          tab === "listPlacedTriangularTradeWithFilter"
            ? "updatePlacedTradeTri"
            : tab === "listPlacedTradeWithFilterIntraArb"
            ? "updatePlacedTradeIntra"
            : ""
        ],
        headers: {
          token: token,
        },
        data: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res?.data?.responseMessage);
        getTransactionHistory(tab, 1);
      } else {
        toast.error(res?.data?.responseMessage);
      }
      setUpdateLoading(null);
    } catch (error) {
      console.log(error);
      setUpdateLoading(null);
    }
  };
  return (
    <TransactionBox>
      <CustomHead
        title="Transaction | Me.Cap"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        transactionArbitrage
        isVideo={false}
      />
      <Box className="transactionBox">
        <Box mb={2} mt={2}>
          <Paper elevation={2} className="tabmainBox">
            <Box className="mainTab displayStart">
              <Box
                onClick={() => handleTab("listPlacedDirectTradeWithFilter")}
                className={
                  tab === "listPlacedDirectTradeWithFilter"
                    ? "tabActiveButtons directTabActive"
                    : "tabButtons"
                }
              >
                <Typography variant="h6" fontWeight="700" textAlign="center">
                  Direct
                </Typography>
              </Box>
              <Box
                onClick={() => handleTab("listPlacedTriangularTradeWithFilter")}
                className={
                  tab === "listPlacedTriangularTradeWithFilter"
                    ? "tabActiveButtons triangularTabActive"
                    : "tabButtons"
                }
              >
                <Typography variant="h6" fontWeight="700" textAlign="center">
                  Triangular
                </Typography>
              </Box>
              <Box
                onClick={() => handleTab("listPlacedTradeWithFilterIntraArb")}
                className={
                  tab === "listPlacedTradeWithFilterIntraArb"
                    ? "tabActiveButtons intraTabActive"
                    : "tabButtons"
                }
                disabled
              >
                <Typography variant="h6" fontWeight="700" textAlign="center">
                  Intra
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box mt={1} mb={2}>
          <Paper elevation={2}>
            <MainFilter
              filter={filtersData}
              setFilter={(data) => {
                setFiltersData(data);
                setIsClearData(false);
              }}
              clearFilters={handleClearFilter}
              onClickFun={() => {
                getTransactionHistory(tab, 0);
                setIsClearData(false);
              }}
              userData={[]}
              placeholder="Search by..."
              type="transactionArbitrage"
              handleExport={() => handleExport(tab)}
            />
          </Paper>
        </Box>

        <Box style={{ border: "none" }}>
          <TableComp
            isMobileAdaptive={true}
            tableHead={
              tab !== "listPlacedDirectTradeWithFilter"
                ? tableHead.filter((item) => item.heading !== "Pair")
                : tableHead
            }
            scoreListData={
              arbitrageData &&
              arbitrageData.map((value, i) => ({
                "S. No": page * limit + i + 1,
                Pair:
                  value.base && value.pair
                    ? `${value.base}/${value.pair}`
                    : "N/A",
                Exchange:
                  tab === "listPlacedDirectTradeWithFilter"
                    ? `${value?.strategy[0]?.exchange}/${value?.strategy[1]?.exchange}`
                    : value.exchangeName
                    ? value.exchangeName
                    : "N/A",
                Capital:
                  tab === "listPlacedDirectTradeWithFilter"
                    ? `${Number(parseFloat(value.capital).toFixed(5)) + " "} ${
                        value.pair
                      }`
                    : value.capital
                    ? Number(parseFloat(value.capital).toFixed(5)) +
                      " " +
                      value.start
                    : "",
                "Capital (USDT)": value.capitalInUSDT
                  ? value.capitalInUSDT
                  : "",
                "Arb. Status": value?.arbitrageStatus
                  ? value?.arbitrageStatus
                  : "-",
                Profit: value?.profit ? (
                  <span
                    style={{
                      color: value?.profit > 0 ? "#78e93c" : "red",
                    }}
                  >
                    {fixDecimal(value?.profit)}
                  </span>
                ) : (
                  "-"
                ),
                "Trade Type": value?.arbitrageType ? value?.arbitrageType : "-",
                "Open Time": moment(value?.createdAt).format("lll"),
                "Close Time":
                  value.arbitrageStatus === "COMPLETED"
                    ? moment(value?.updatedAt).format("lll")
                    : "--",

                Strategy: value.strategy,
                barStatus: value?.arbitrageStatus,
                Status:
                  value?.arbitrageStatus === "PENDING"
                    ? value.status
                    : value?.arbitrageStatus,
                Action: [
                  {
                    icon: (
                      <LuEye
                        style={{
                          background: "#FFFFFF1A",
                          padding: "8px",
                          borderRadius: "8px",
                        }}
                      />
                    ),
                    onClick: () => {
                      setstrategyData(value.strategy);
                      setOpen(true);
                    },

                    isMobile: false,
                    label: "View Strategy",
                    color: "primary",
                    variant: "contained",
                  },
                  {
                    icon: (
                      <DeleteOutlineIcon
                        style={{
                          background: "#DE363633",
                          color: "#DE3636",
                          padding: "6px",
                          borderRadius: "8px",
                        }}
                      />
                    ),
                    disabled: value?.arbitrageStatus !== "PENDING",
                    onClick: () => {
                      if (value?.arbitrageStatus == "PENDING") {
                        set_idd(value._id);
                        setOpenCancel(true);
                      }
                    },

                    isMobile: false,
                    label: "View Strategy",
                    color: "primary",
                    variant: "contained",
                  },

                  ...(value?.strategyType !== "direct" &&
                  value?.arbitrageStatus === "FAILED"
                    ? [
                        {
                          icon: (
                            <LuRefreshCcw
                              className={
                                updateLoading === value._id && "refresh-icon"
                              }
                              style={{
                                background: "#FFFFFF1A",
                                padding: "8px",
                                borderRadius:
                                  updateLoading === value._id ? "50%" : "8px",
                              }}
                            />
                          ),
                          onClick: () => {
                            !updateLoading &&
                              handleUpdateTrade(
                                value?._id,
                                value?.strategyType
                              );
                          },
                        },
                      ]
                    : []),
                ],
              }))
            }
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            noOfPages={numPages}
            noOfTotalPages={numPages}
            page={page}
            setPage={setPage}
            limit={limit}
            isLoading={isLoading}
            setLimit={setLimit}
            total={total}
          />
          {open && (
            <TransactionViewModal
              open={open}
              close={() => setOpen(false)}
              data={strategyData}
              tab={tab}
            />
          )}

          {openCancel && (
            <CommonConfirmationDialog
              open={openCancel}
              handleClose={() => setOpenCancel(false)}
              type="Disconnect"
              title="Cancel Arbitrage"
              heading={`Are you sure you want to cancel the arbitrage transaction?`}
              handleSubmit={(v) => handleCancel(v)}
              isLoading={isLoadingCancel}
            />
          )}
        </Box>
      </Box>
    </TransactionBox>
  );
}

Transection.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

const TransactionViewModal = ({ close, open, data, tab }) => {
  return (
    <Popup
      maxWidth={tab === "listPlacedTriangularTradeWithFilter" ? "md" : "sm"}
      open={open}
      handleClose={close}
      title="Transaction Details"
      actions=""
      titleIcon=""
      isLoading=""
      isRemove=""
    >
      <Grid container spacing={2}>
        {data &&
          data.map((item, i) => {
            return (
              <Grid
                item
                lg={tab === "listPlacedTriangularTradeWithFilter" ? 4 : 6}
                sm={tab === "listPlacedTriangularTradeWithFilter" ? 6 : 6}
                xs={12}
                md={tab === "listPlacedTriangularTradeWithFilter" ? 6 : 6}
              >
                <SubDetailCard item={item} index={i} />
              </Grid>
            );
          })}
      </Grid>
    </Popup>
  );
};

const SubDetailCard = ({ item, index }) => {
  return (
    <TransactionBox>
      <Box className="cardBox" key={`cccc${index}`} mt={2}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
            <Typography variant="body1">Type</Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography
                variant="body1"
                style={
                  item.action === "buy" ? { color: "green" } : { color: "red" }
                }
              >
                {item && item.action && capitalizeFirstLetter(item.action)}
              </Typography>
            </Box>
          </Grid>
          {item && item.coinName && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Pair</Typography>
            </Grid>
          )}
          {item && item.coinName && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.baseCurrency &&
                    item.quoteCurrency &&
                    `${item.baseCurrency}/${item.quoteCurrency}`}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.exchange && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Exchange</Typography>
            </Grid>
          )}
          {item && item.exchange && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.exchange &&
                    capitalizeFirstLetter(item.exchange)}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
            <Typography variant="body1">Price</Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography variant="body1">
                {item && item.price && fixDecimal(item.price)}
              </Typography>
            </Box>
          </Grid>
          {item && item.amount && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Amount</Typography>
            </Grid>
          )}
          {item && item.amount && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item && item.amount && setCryptoDecimals(item.amount)}
                </Typography>
              </Box>
            </Grid>
          )}

          {item && item.buyStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Buy Status</Typography>
            </Grid>
          )}
          {item && item.buyStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.buyStatus &&
                    capitalizeFirstLetter(item.buyStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
            <Typography variant="body1">Traded</Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography variant="body1">
                {item && item.isTrade ? "YES" : "NO"}
              </Typography>
            </Box>
          </Grid>
          {item && item.isWithdraw !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Withdrawed</Typography>
            </Grid>
          )}
          {item && item.isWithdraw !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item && item.isWithdraw ? "YES" : "NO"}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.isDeposit !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Withdrawed</Typography>
            </Grid>
          )}
          {item && item.isDeposit !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item && item.isDeposit ? "YES" : "NO"}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.orderId && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Order Id</Typography>
            </Grid>
          )}
          {item && item.orderId && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  <SortAddress isShowEnd={true} address={item?.orderId} />
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.withdrawId && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Withdraw Id</Typography>
            </Grid>
          )}
          {item && item.withdrawId && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.withdrawId &&
                    sortAddress(item?.withdrawId?.toString())}

                  <IconButton>
                    <img
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      src="images/copyimg.png"
                      onClick={() => toast.success("Copied")}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        width: "15px",
                      }}
                    />
                  </IconButton>
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.address && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Address</Typography>
            </Grid>
          )}
          {item && item.address && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.address &&
                    sortAddress(item?.address?.toString())}
                  <IconButton>
                    <img
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      src="images/copyimg.png"
                      onClick={() => toast.success("Copied")}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        width: "15px",
                      }}
                    />
                  </IconButton>
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.sellStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Sell Status</Typography>
            </Grid>
          )}
          {item && item.sellStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.sellStatus &&
                    capitalizeFirstLetter(item?.sellStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.depositStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Deposit Status</Typography>
            </Grid>
          )}
          {item && item.depositStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.depositStatus &&
                    capitalizeFirstLetter(item?.depositStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.status && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Status</Typography>
            </Grid>
          )}
          {item && item.status && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item && item.status && capitalizeFirstLetter(item?.status)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.receiveAmount && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Receive Amount</Typography>
            </Grid>
          )}
          {item && item.receiveAmount && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.receiveAmount &&
                    setCryptoDecimals(item?.receiveAmount)}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </TransactionBox>
  );
};
