"use client";
import React, { useState } from "react";
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  IconButton,
  styled,
  TablePagination,
  Pagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { bscRedirectUrl, sortAddressStart } from "@/utils";
import {
  ArrowDropDown,
  ArrowDropUp,
  CheckOutlined,
  ContentCopy,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import Link from "next/link";
import TopTradingSkeleton from "../Skeletons/TopTradingSkeleton";
import CustomTable from "./CustomTable";
import NoDataFound from "../NoDataFound";

const BoxCent = styled("div")(({ theme }) => ({
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
}));
const MainComponent = styled(Box)(({ theme }) => ({
  background: "transparent !important",
  border: "none",
  "& .tableContainer": {
    borderRadius: "10px",
    "& .MuiIconButton-root": {
      color: "rgb(255 202 100)",
      padding: "1px",
      height: "52px",
      width: "52px",
      marginRight: "5px",
    },
  },
  "& .MuiTableContainer-root": {},
}));
function TableComp({
  isMobileAdaptive,
  transactionRef,
  tableHead,
  scoreListData,
  noOfPages,
  page,
  setPage,
  isLoading,
  limit,
  setLimit,
  NoDataFoundText = "No data found",
  popupTitle,
  total,
  sortConfig,
  setSortConfig,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = "normal";
      }
    }

    setSortConfig({ key: direction === "normal" ? null : key, direction });
  };

  return (
    <MainComponent id="my-table" ref={transactionRef}>
      {isMobileAdaptive && isMobile ? (
        <>
          <CustomTable
            tableHead={tableHead}
            scoreListData={scoreListData}
            popupTitle={popupTitle}
          />
          {!isLoading && scoreListData && scoreListData.length === 0 && (
            <NoDataFound text={NoDataFoundText} />
          )}
          {isLoading &&
            Array.from({ length: 10 }).map((item, index) => (
              <TopTradingSkeleton
                key={index}
                skeleton={tableHead}
                isMobile={isMobile}
              />
            ))}
        </>
      ) : (
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 190px)",
          }}
          className={"tableContainer"}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <MemoizedTableRow tableHead={tableHead} sortConfig={sortConfig} />
            </TableHead>
            <TableBody>
              {scoreListData &&
                scoreListData.map((data, i) => (
                  <TableRow key={i}>
                    {tableHead &&
                      tableHead?.map((head, index) =>
                        head?.heading ===
                        "Strategy" ? null : head.isNotShow ? null : (
                          <StyledTableCell
                            style={{
                              borderBottom:
                                "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                            data={data}
                            head={head}
                            index={index + i}
                            isMobile={isMobile}
                          />
                        )
                      )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {!isLoading && scoreListData && scoreListData.length === 0 && (
            <NoDataFound text={NoDataFoundText} />
          )}
          {isLoading &&
            Array.from({ length: 10 }).map((item, index) => (
              <TopTradingSkeleton
                key={index}
                keyIndex={index}
                skeleton={tableHead}
                isMobile={isMobile}
              />
            ))}
        </TableContainer>
      )}

      {!total && !isLoading && noOfPages > 1 && (
        <Box my={2} display="flex" justifyContent="flex-end">
          <Pagination
            count={noOfPages}
            page={page}
            StyledTextMessage
            onChange={(e, value) => setPage(value)}
            variant="outlined"
          />
        </Box>
      )}
      {total > 10 && (
        <Box my={2} display="flex" justifyContent="flex-end">
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(e, value) => setPage(value)}
            rowsPerPage={limit}
            onRowsPerPageChange={(event) => {
              setLimit(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
          />
        </Box>
      )}
    </MainComponent>
  );
}

const StyledTableCell = ({ data, head, index, isMobile }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };

  return (
    <TableCell
      key={index}
      align={head?.heading === "Action" ? "start" : "start"}
      sx={{
        whiteSpace: "pre",
        "& a": {
          textDecoration: "none",
          color: "inherit",
          ":hover": {
            color: "#806DFF",
          },
        },
      }}
    >
      {head?.heading === "Action" ? (
        data[head?.heading]?.map((action, idx) =>
          action?.onClick ? (
            <IconButton
              size="small"
              key={idx}
              onClick={action?.onClick}
              disabled={!action?.icon}
              sx={{
                height: isMobile ? "20px" : "40px",
                width: isMobile ? "20px" : "40px",
                "& svg": {
                  fontSize: isMobile ? "14px" : "18px",
                },
                pointerEvents: action?.isPermitions ? "none" : "auto",
                "& svg": {
                  color: (theme) =>
                    action?.isPermitions
                      ? "#8a8383"
                      : theme.palette.primary.main,
                },
              }}
            >
              {action?.icon}
            </IconButton>
          ) : (
            action?.icon
          )
        )
      ) : head?.isCopy ? (
        data[head?.heading] && (
          <BoxCent>
            {head?.heading ? (
              <Link
                style={{
                  pointerEvents: head?.heading === "Txn Hash" ? "auto" : "none",
                }}
                target="_blank"
                href={bscRedirectUrl + "tx/" + data[head?.heading]}
              >
                {sortAddressStart(data[head?.heading])}
              </Link>
            ) : (
              <span>{sortAddressStart(data[head?.heading])}</span>
            )}{" "}
            {copied ? (
              <IconButton disabled>
                <CheckOutlined
                  style={{
                    fontSize: "15px",
                    color: "#78e93c",
                  }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleCopyClick(data[head?.heading])}>
                <ContentCopy
                  sx={{
                    cursor: "pointer",
                    fontSize: "15px",
                    color: (theme) => theme.palette.primary.main,
                  }}
                />
              </IconButton>
            )}
          </BoxCent>
        )
      ) : (
        <>{data[head?.heading] || "..."}</>
      )}
    </TableCell>
  );
};
export default React.memo(TableComp);

const MemoizedTableRow = React.memo(({ tableHead, sortConfig }) => (
  <TableRow style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
    {tableHead &&
      tableHead?.map((head, index) =>
        head?.heading === "Strategy" ? null : head.isNotShow ? null : (
          <TableCell
            align="start"
            key={index}
            onClick={() => head.sortable && handleSort(head.key)}
            sx={{ background: "#171619" }}
          >
            <Box className={head.sortable && "displayCenter"}>
              {head?.heading}
              {head.sortable && (
                <>
                  {sortConfig.direction === "asc" && <ArrowDropUp />}
                  {sortConfig.direction === "desc" && <ArrowDropDown />}
                  {sortConfig.direction === "normal" && (
                    <span>&nbsp;&nbsp;&nbsp;&ndash;</span>
                  )}
                </>
              )}
            </Box>
          </TableCell>
        )
      )}
  </TableRow>
));

{
  /* <TableBody>
  {scoreListData.map((data, i) => (
    <MemoizedTableRow
      key={i}
      data={data}
      tableHead={tableHead}
      isMobile={isMobile}
    />
  ))}
</TableBody> */
}
