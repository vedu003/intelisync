import { Box, Typography, Paper, styled } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DashboardLayout from "@/layout/DashboardLayout";
import { useRouter } from "next/router";
import { getAPIHandler } from "@/api-services/service";
import NoDataFound from "@/components/NoDataFound";
import moment from "moment";
import MainFilter from "@/components/MainFilter";
import CustomHead from "@/components/CustomHead";
import TableComp from "@/components/TableComp";
import AppContext from "@/context/AppContext";
import { setCryptoDecimals } from "@/utils";

const SubscriptionPlanStyle = styled("div")(({ theme }) => ({
  "& subscribtionBox": {
    position: "relative",
    zIndex: "999",
    "& .MuiIconButton-root": {
      padding: "0px",
    },

    "& .typoBox": {
      padding: "10px 0px 30px",
    },
    "& .invitebutton": {
      marginRight: "-13px",
      padding: "24px 39px",
    },
    "& .paperBox": {
      padding: "80px 30px",
      boredrRadius: "5px",
    },
    "& .invitelistBox": {
      padding: "30px 0px 10px",
      display: "flex",
      justifyContent: "space-between",
      textAlign: "center",
    },
    "& .tablepadding": {
      margin: "50px 0px 20px",
      [theme.breakpoints.down("xs")]: {
        margin: "20px 0px",
      },
    },
  },
  "& .tableBox": {
    minWidth: "800px",
  },
  "& .rowEven": {
    background: "rgb(16 21 17)",
  },
}));

const tableHead = [
  {
    heading: "Sr. No",
  },
  {
    heading: "Plan Name",
  },
  {
    heading: "Plan Amount",
  },
  {
    heading: "Paid Amount",
  },

  {
    heading: "Plan Status",
  },
  {
    heading: "Start Time",
  },
  { heading: "End Time" },
  {
    heading: "Txn Hash",
    isCopy: true,
  },
];
export default function MyPlan() {
  const auth = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [invitePlan, setinvitePlan] = useState([]);
  const router = useRouter();
  const [numPages, setNumPages] = useState(1);
  const [subscribeList, setSubscribeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isClearData, setIsClearData] = useState(true);
  const [filtersData, setFiltersData] = useState({
    fromDate: null,
    toDate: null,
    search: "",
    planStatus: "1",
  });

  const viewSubscriptionListApi = async (source) => {
    try {
      setIsClear(false);
      setIsLoading(true);
      const response = await getAPIHandler({
        endPoint: "myPlan",
        paramsData: {
          search: filtersData?.search ? filtersData?.search : null,
          page: page,
          limit: 10,
          planStatus:
            filtersData?.planStatus !== "1" ? filtersData?.planStatus : null,
          fromDate: filtersData.fromDate
            ? moment(filtersData.fromDate).format("YYYY-MM-DD")
            : null,
          toDate: filtersData.toDate
            ? moment(filtersData.toDate).format("YYYY-MM-DD")
            : null,
        },
        source: source,
      });
      if (response.data.responseCode === 200) {
        setIsClear(false);
        let dataReponse = response.data.result.docs?.map((data) => ({
          planName: data.planName,
          planAmount: data.planAmount,
          amount: data.amount,
          pay_currency: data.pay_currency,
          planStatus: data.planStatus,
          startTime: data.startTime,
          endTime: data.endTime,
          transactionHash: data.transactionHash,
        }));
        setinvitePlan(dataReponse);
        setNumPages(response.data.result?.pages);
        setSubscribeList(response.data.result?.docs);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setSubscribeList([]);
      setNumPages(1);
      setIsLoading(false);
    }
  };

  const handleClearFilter = () => {
    if (!isClearData) {
      setFiltersData({
        ...filtersData,
        ["fromDate"]: null,
        ["toDate"]: null,
        ["search"]: "",
        ["planStatus"]: "1",
      });
      // viewSubscriptionListApi();
      setPage(1);
      setIsClear(true);
      setIsClearData(true);
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
          planStatus:
            filtersData?.planStatus !== "1" ? filtersData?.planStatus : null,
          fromDate: filtersData.fromDate
            ? moment(filtersData.fromDate).format("YYYY-MM-DD")
            : null,
          toDate: filtersData.toDate
            ? moment(filtersData.toDate).format("YYYY-MM-DD")
            : null,
        },
      });
      if (res.data.responseCode === 200) {
        let currencyId = [];
        for (var i = 0; i < res.data.result.docs?.length; i++) {
          const result = res.data.result.docs[i];
          const planName = result.planName;
          const planAmount = result.planAmount;
          const amount = result.amount;
          const pay_currency = result.pay_currency;
          const planStatus = result.planStatus;
          const startTime = result.startTime;
          const endTime = result.endTime;
          const transactionHash = data.transactionHash;

          let obj = {
            "Plan Name": planName,
            "Plan Amount": planAmount,
            "Paid Amount": amount,
            "Pay Currency": pay_currency,
            "Plan Status": planStatus,
            "Start Time": moment(startTime).format("lll"),
            "End Time": moment(endTime).format("lll"),
            "Txn Hash": transactionHash,
          };
          currencyId.push(obj);
        }
        exportToCSV(currencyId, "myPlans");
      } else {
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    viewSubscriptionListApi(source, page);
    return () => {
      source.cancel();
    };
  }, [page]);

  useEffect(() => {
    if (isClear) {
      const source = axios.CancelToken.source();
      viewSubscriptionListApi("", page);
      return () => {
        source.cancel();
      };
    }
  }, [isClear]);

  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <img
          src="/images/arbi_text.svg"
          width="24px"
          height="24px"
          style={{ marginRight: "6px" }}
        />
        <Typography variant="h3" color="primary" style={{ whiteSpace: "pre" }}>
          My Plan's
        </Typography>
      </Box>
    );
  }, []);
  return (
    <SubscriptionPlanStyle>
      <Box className="subscribtionBox">
        {/* <Typography mb={3} variant="h3" color="primary">
          My Plan List
        </Typography> */}
        <Box mb={3}>
          <Paper elevation={2}>
            <MainFilter
              filter={filtersData}
              setFilter={(data) => {
                setFiltersData(data);
                setIsClearData(false);
              }}
              clearFilters={handleClearFilter}
              onClickFun={() => {
                viewSubscriptionListApi("", 1);
                setIsClearData(false);
              }}
              userData={invitePlan}
              placeholder="Search by plan name"
              type="transactionMgmt"
              fileNames={"my_plans"}
              handleExport={() => handleExport()}
            />
          </Paper>
        </Box>
        <TableComp
          tableHead={tableHead}
          scoreListData={
            subscribeList &&
            subscribeList.map((value, i) => ({
              "Sr. No": (page - 1) * 10 + i + 1,
              "Plan Name": value?.planName ? value?.planName : "",
              "Plan Amount": value?.planAmount
                ? `${value?.planAmount} ${value?.pay_currency}`
                : "",
              "Paid Amount": value?.amount
                ? `${value?.amount} ${value?.pay_currency}`
                : "",

              "Plan Status": value?.planStatus ? value?.planStatus : "-",
              "Start Time": moment(value?.startTime).format("lll"),
              "End Time": moment(value?.endTime).format("lll"),
              "Txn Hash": value?.transactionHash ? value?.transactionHash : "-",
            }))
          }
          noOfPages={numPages}
          noOfTotalPages={numPages}
          page={page}
          setPage={setPage}
          limit={10}
          isLoading={isLoading}
          NoDataFoundText="No subscription purchased"
        />
      </Box>
    </SubscriptionPlanStyle>
  );
}

MyPlan.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
