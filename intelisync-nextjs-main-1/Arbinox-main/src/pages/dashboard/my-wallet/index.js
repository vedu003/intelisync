'use client'
import { Paper, Typography, Box, Grid, Avatar, styled } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import Deposite from './Deposite'
import WithdrawHistory from './WithdrawHistory'
import axios from 'axios'
import DepositeCard from './DepositeCard'
import { api_configs } from '@/api-services'
import { dataPostHandler } from '@/api-services/service'
import DataLoader from '@/components/DataLoader'
import { ExchangeArray, funConEx, getCoinImageDatahandler } from '@/utils'
import NoDataFoundFrame from '@/components/NoDataFoundFrame'
import MainFilter from '@/components/MainFilter'
import NoExchangeAdd from '@/components/NoExchangeAdd'
import AppContext from '@/context/AppContext'
import Image from 'next/image'

const MyWalletBox = styled('div')(({ theme }) => ({
  '& .mywalletBox': {
    position: 'relative',
    zIndex: '999',
    '& .historyBox': {
      padding: '20px 0px 0px'
    },
    '& .tabmainBox': {
      width: 'fit-content',
      background: '#FFFFFF08',
      borderRadius: '12px',
      display: 'flex',
      padding: '0px',
      gap: '10px'
    },
    '& .mainTab': {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      borderRadius: '8px',

      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap'
      }
    },
    '& .tabActiveButtons': {
      fontFamily: "'Outfit', sans-serif",
      background: 'linear-gradient(180deg, #806DFF 0%, #4A33E7 100%)',
      lineHeight: '21.71px',
      border: '1px solid #9A8AFE',
      boxShadow: '0px 0.83px 14.69px 0px #FFFFFF6E inset',
      borderBottom: 'none !important',
      color: '#fff',
      [theme.breakpoints.down('sm')]: {
        padding: '8px 12px'
      },
      '& h6': {
        fontSize: '15px',
        fontWeight: '400',
        color: '#ffffff'
      }
    },
    '& .tabButtons': {
      fontSize: '15px',
      fontWeight: '500',
      color: '#FFFFFF99',
      borderRadius: '8px !important',
      position: 'relative',
      padding: '14px 37px',
      [theme.breakpoints.down('sm')]: {
        padding: '10px 20px'
      },
      '& h6': {
        fontSize: '15px',
        fontWeight: '500',
        color: '#FFFFFF99'
      }
    }
  },
  '& .TitleBox': {
    '& h4': {
      color: '#fff',
      fontWeight: '700',
      fontSize: '27px'
    }
  },
  '& .root': {
    width: '100%',
    marginTop: '20px'
  },
  '& .AccordionBox': {
    color: '#fff',
    '& .icon1': {
      '& .MuiIconButton-root': {
        background: '#008000',
        padding: '6px'
      }
    },
    '& .icon2': {
      '& .MuiIconButton-root': {
        background: '#FF0000',
        padding: '6px'
      }
    }
  },
  '& .heading': {
    fontFamily: "'Inter'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px'
  },
  '& .mainBoxClass': {
    '& .headingBox': {
      background: 'linear-gradient(hsla(0,1%,50%,.07),hsla(0,3%,48%,.07))',
      borderRadius: '8px',
      padding: '10px',
      '& p': {
        color: '#9090A3',
        marginLeft: '8px'
      },
      '& h5': {
        fontWeight: 700,
        marginLeft: '8px'
      },
      '& .whiteBox': {
        borderRadius: '50%',
        background: '#FFF',
        width: '20px',
        height: '20px',
        '& img': {
          position: 'relative',
          width: '100%',
          backgroundSize: 'cover !important',
          backgroundRepeat: 'no-repeat !important',
          objectFit: 'cover !important'
        }
      },
      '& .filtersButton': {
        '& .filterIcon': {
          '& button': {
            background: '#4A4A57 !important',
            width: '37px',
            height: '37px',
            borderRadius: '10px',
            padding: '0px',
            '& svg': {
              position: 'absolute',
              color: '#FFFFFF',
              zIndex: 3
            }
          }
        }
      }
    },
    '& h5': {
      fontWeight: 700
    },
    '& .MuiCollapse-wrapperInner': {
      padding: '10px 10px 10px 0px !important'
    },
    '& .MuiAccordionDetails-root': {
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: '0px',
      margin: '8px 10px'
    },
    '& .MuiAccordion-root:before': {
      top: '0px',
      height: '0px'
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: '0px 0px !important'
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '0px !important'
    }
  }
}))

export default function Mywallet () {
  const token = window.localStorage.getItem('user_token')
  const auth = useContext(AppContext)
  const [tab, setTab] = useState('Deposit')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading1, setIsLoading1] = useState(false)
  const [withdrawalHistory, setWithdrawalHistory] = useState([])
  const [exchanges, setExchanges] = useState('1')
  const [isClearData, setIsClearData] = useState(true)
  const [filtersData, setFiltersData] = useState({
    arbitrageType: '1',
    registerType: '1',
    planStatus: '1',
    statusType: '1',
    search: '',
    fromDate: null,
    toDate: null
  })
  const [isClear, setIsClear] = useState(false) //total
  const [total, setTotal] = useState(1) //total

  const [noOfPages, setNoOfPages] = useState(1)
  const [connectExchangeBalanceList, setConnectedExchangeBalanceList] =
    useState({})
  const [page, setPage] = useState(1)
  const [coinImageData, setCoinImageData] = useState([])

  const getConnectedExchangeBalanceList = async () => {
    try {
      setIsLoading(true)
      const response = await dataPostHandler('exchangeBalance')
      // const coinImgArry = await getCoinImageDatahandler();
      if (response) {
        setIsLoading(false)
        // setCoinImageData(coinImgArry);
        setConnectedExchangeBalanceList(response?.data?.result)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getImages = async () => {
    try {
      // setIsLoading(true);
      // const response = await dataPostHandler("exchangeBalance");
      const coinImgArry = await getCoinImageDatahandler()
      if (coinImgArry?.length !== 0) {
        // setIsLoading(false);
        const initialCoin = {
          symbol: 'USD',
          name: 'USD',
          image: ''
        }
        setCoinImageData([initialCoin, ...coinImgArry])
        // setConnectedExchangeBalanceList(response?.data?.result);
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getConnectedExchangeBalanceList()
    getImages()
  }, [])

  const getWithdrawalHistory = async () => {
    setIsLoading1(true)
    try {
      const paramsData = {
        type: tab === 'Deposit' ? 'DEPOSITE' : 'WITHDRAW',
        page: page,
        limit: 15,
        fromDate: filtersData.fromDate
          ? moment(filtersData.fromDate).format('YYYY-MM-DD')
          : undefined,
        toDate: filtersData.toDate
          ? moment(filtersData.toDate).format('YYYY-MM-DD')
          : undefined,
        search: filtersData?.search ? filtersData?.search : undefined
      }
      const exhangeState = exchanges !== '1' ? { exchangeName: exchanges } : {}
      const res = await axios({
        method: 'GET',
        url: api_configs.withdrawDepositeHistory,
        headers: {
          token: token
        },
        params: {
          ...paramsData,
          ...exhangeState
        }
      })
      if (res.data.responseCode === 200) {
        setWithdrawalHistory(res?.data?.result?.docs)
        setNoOfPages(res?.data?.result?.pages)
        setIsLoading1(false)
      } else {
        setWithdrawalHistory([])
      }
    } catch (error) {
      setWithdrawalHistory([])
      console.log(error)
      setIsLoading1(false)
    }
  }

  // useEffect(() => {
  //   getWithdrawalHistory();
  // }, [isSearch, tab]);

  const handleClearFilter = () => {
    if (!isClearData) {
      handleClear()
      setIsClear(true)
      setIsClearData(true)
    }
  }
  const handleClear = () => {
    setFiltersData({
      ...filtersData,
      ['fromDate']: null,
      ['toDate']: null,
      ['search']: '',
      ['planStatus']: '1',
      ['arbitrageType']: '1'
    })
    setPage(1)
  }
  useEffect(() => {
    getWithdrawalHistory(tab, page)
  }, [page, tab])
  useEffect(() => {
    if (isClear) {
      getWithdrawalHistory(tab, page)
    }
  }, [isClear])
  useEffect(() => {
    auth?.setTopHeading(
      <Box display='flex' alignItems='center'>
        <Image
          height={24}
          width={24}
          quality={100}
          src='/images/wallet-04.svg'
          style={{ marginRight: '6px' }}
        />
        <Typography variant='h3' color='primary' whiteSpace='pre'>
          My Wallet
        </Typography>
      </Box>
    )
  }, [])

  function coinImage (value) {
    let newArray = []
    for (let i = 0; i < value?.length; i++) {
      for (let j = 0; j < coinImageData?.length; j++) {
        if (value[i]?.asset == coinImageData[j]?.symbol.toUpperCase()) {
          newArray.push({ ...value[i], img: coinImageData[j]?.image })
        }
      }
    }
    return newArray
  }

  const getBorderRadius = (tab, currentTab) => {
    if (tab === currentTab) {
      if (currentTab === 'Deposit') return '8px 0px 0px 8px'
      if (currentTab === 'Withdrawal') return '0px 8px 8px 0px'
    }
    return '0px'
  }

  const handleExport = () => {}
  return (
    // setExchanges={setExchanges}
    // exchanges={exchanges}
    <MyWalletBox>
      <Box className={'mainBoxClass'}>
        {isLoading && <DataLoader />}
        {!isLoading && connectExchangeBalanceList.length === 0 && (
          <Box className={'displayFlexCenter'}>
            <NoExchangeAdd />
          </Box>
        )}

        {connectExchangeBalanceList &&
          connectExchangeBalanceList?.responseResult &&
          funConEx(connectExchangeBalanceList?.responseResult)?.map(
            (data, index) => {
              return (
                <Box pt={1} pb={1}>
                  <Box
                    // width="100%"
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    className='headingBox'
                  >
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar src={data?.img} alt={data?.exchangeName} />
                      <Typography
                        className={'heading'}
                        variant='h5'
                        color='primary'
                      >
                        {data && data?.exchangeName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography className={'heading'}>
                        $
                        {data &&
                          data?.AccountBalance &&
                          data?.AccountBalance[
                            data?.AccountBalance?.length - 1
                          ] &&
                          data?.AccountBalance[data?.AccountBalance?.length - 1]
                            .totalBalance}
                      </Typography>
                    </Box>
                  </Box>
                  <Box pt={1}>
                    <Grid container spacing={2}>
                      {data &&
                        data?.AccountBalance &&
                        coinImage(data?.AccountBalance)?.map((item, indx) => (
                          <Grid item lg={3} md={4} sm={4} xs={12}>
                            <DepositeCard
                              data={item}
                              _id={data?._id}
                              index={indx}
                              exchangeName={data?.exchangeName}
                            />
                          </Grid>
                        ))}
                      {data && !data?.AccountBalance && (
                        <NoDataFoundFrame
                          data={`The wallet has not been fetched or connected.`}
                        />
                      )}
                    </Grid>
                  </Box>
                </Box>
              )
            }
          )}
      </Box>
      <Box className={'mywalletBox'}>
        <Box mb={1.5} mt={4}>
          <Paper elevation={2} className='tabmainBox displayStart'>
            <Box
              onClick={() => setTab('Deposit')}
              className={tab === 'Deposit' ? 'tabActiveButtons' : 'tabButtons'}
              style={{ borderRadius: getBorderRadius(tab, 'Deposit') }}
            >
              <Typography variant='h6' color='secondary' fontWeight='700'>
                Deposit History
              </Typography>
            </Box>
            <Box
              onClick={() => setTab('Withdrawal')}
              className={
                tab === 'Withdrawal' ? 'tabActiveButtons' : 'tabButtons'
              }
              style={{ borderRadius: getBorderRadius(tab, 'Withdrawal') }}
            >
              <Typography variant='h6' color='secondary' fontWeight='700'>
                Withdrawal History
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={2}>
              <MainFilter
                filter={filtersData}
                setFilter={data => {
                  setFiltersData(data)
                  setIsClearData(false)
                }}
                clearFilters={handleClearFilter}
                onClickFun={() => {
                  getWithdrawalHistory(tab, 1)
                  setIsClearData(false)
                }}
                userData={[]}
                placeholder='Search by Wallet Address...'
                type='walletType'
                excelData={withdrawalHistory}
                fileName={
                  tab === 'Deposit' ? 'Deposit_history' : 'Withdrawal_history'
                }
                searchPlaceHolder='Search by coin name'
                handleExport={handleExport}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} mt={1.4}>
            <Box>
              {tab === 'Deposit' && (
                <Deposite
                  isLoading={isLoading1}
                  withdrawalHistory={withdrawalHistory}
                  setNoOfPages={setNoOfPages}
                  page={page}
                  setPage={setPage}
                />
              )}
              {tab === 'Withdrawal' && (
                <WithdrawHistory
                  isLoading={isLoading1}
                  withdrawalHistory={withdrawalHistory}
                  setNoOfPages={setNoOfPages}
                  page={page}
                  setPage={setPage}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MyWalletBox>
  )
}

Mywallet.getLayout = function getLayout (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
