import React, { useContext, useState, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  Typography,
  Container,
  Paper,
  Select,
  MenuItem,
  Avatar,
  TextField,
  FormHelperText,
  styled,
  Checkbox
} from '@mui/material'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Form, Formik } from 'formik'
import * as yep from 'yup'
import { ExchangeArray, funConEx, sortAddress } from '@/utils'
import AppContext from '@/context/AppContext'
import { api_configs } from '@/api-services'
import Image from 'next/image'
import SortAddress from '@/utils/SortAddress'

const ConnectExchangeBox = styled('div')(({ theme }) => ({
  '& .serverBox': {
    background: '#FFFFFF0D',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '24px',
    maxWidth: '460px',
    marginBottom: '69px',
    '& span': {
      textTransform: 'initial',
      marginTop: '50px',
      // color: "#9090A3",
      lineHeight: '1'
    }
  },
  '& .MuiSelect-select': {
    padding: '15px',
    border: '1px solid #FFFFFF0D',
    borderRadius: '8px',
    background: '#FFFFFF0D'
  },
  '& .checkAckBox': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '28px'
  },
  '& .forgetBox': {
    '& h4': {
      fontSize: '20px'
    },
    '& h2': {
      textAlign: 'center'
    },

    '& .forwardBox': {
      textAlign: 'center'
    },
    '& h5': {
      lineHeight: 'normal'
    }
  },

  '& .exchangeBox': {
    position: 'relative',
    zIndex: '999',

    '& h4': {
      color: '#E9CB59'
    },
    '& h2': {
      color: '#9090A3',
      fontWeight: 500,
      textAlign: 'center',
      margin: '8px 0px'
    },
    '& p': {
      fontWeight: '400',
      color: '#9090A3'
    }

    // "& .MuiInput-underline:before": {
    //   borderBottom: "2px solid rgba(255, 255, 255, 0.25)",
    // },
  },
  '& .avtClx': {
    '& .MuiAvatar-root': {
      width: '20px',
      height: '20px',
      marginLeft: '5px'
    }
  }
}))

export default function ConnectedWithExchange () {
  const token = window.localStorage.getItem('user_token')
  const [exchangeList, setExchangeList] = useState([])
  const [isRemember, setIsRemember] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [serverIPAddress, setServerIPAddress] = useState('')
  const [sbmtBtnTxt, setSbmtBtnTxt] = useState('Submit')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const auth = useContext(AppContext)
  const [exchnageType, setExchangeType] = useState(0)
  let maxAPILength = 510
  const formInitialSchema = {
    apikey: '',
    secretkey: '',
    passphrase: '',
    apiMemo: '',
    exchnageType: ''
  }

  const formValidationSchema = yep.object().shape(
    exchnageType === 'coinbasepro'
      ? {
          exchnageType: yep.string().required('Please select your exchange.'),
          apikey: yep
            .string()
            .required('Please enter your API key.')
            // .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          secretkey: yep
            .string()
            .required('Please enter your secret key.')
            // .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          apiMemo: yep
            .string()
            .required('Please enter your passphrase key')
            // .min(10, "Please enter atleast 10 characters.")
            .max(maxAPILength, `You can enter only ${maxAPILength} characters.`)
        }
      : exchnageType === 'bitmart'
      ? {
          exchnageType: yep.string().required('Please select your exchange.'),
          apikey: yep
            .string()
            .required('Please enter your API key.')
            // .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          secretkey: yep
            .string()
            .required('Please enter your secret key.')
            // .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          apiMemo: yep
            .string()
            .required('Please enter your apiMemo key')
            // .min(10, "Please enter atleast 10 characters.")
            .max(maxAPILength, `You can enter only ${maxAPILength} characters.`)
        }
      : {
          exchnageType: yep.string().required('Please select your exchange.'),
          apikey: yep
            .string()
            .required('Please enter your API key.')
            // .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          secretkey: yep
            .string()
            .required('Please enter your secret key.')
            // .min(10, "Please enter atleast 10 characters.")
            .max(maxAPILength, `You can enter only ${maxAPILength} characters.`)
        }
  )

  const getExchangeListHandler = async token => {
    try {
      // const response = await getDataHandlerAPI("listExchange", token);
      const response = await axios({
        method: 'GET',
        url: api_configs.listExchange,
        headers: {
          token: token
        }
      })
      if (response) {
        const filterFun = response.data.result
        // cansole.log("filterFun", filterFun);
        // let newArray = [];
        // for (let i = 0; i < filterFun.length; i++) {
        //   newArray.push({ ...filterFun[i], ...ExchangeArray[i] });
        // }
        setExchangeList(filterFun)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getServerIPHandler = async token => {
    try {
      // const response = await getDataHandlerAPI("serverIPAddress");
      const response = await axios({
        method: 'GET',
        url: api_configs.serverIPAddress
      })
      if (response) {
        setServerIPAddress(response.data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const connectExchangeHandler = async (values, resetForm) => {
    try {
      setSbmtBtnTxt('Processing...')
      let apiMemo = values.exchnageType === 'bitmart' ? values.apiMemo : null
      let passphrase = values.exchnageType !== 'bitmart' ? values.apiMemo : null
      const dataToSend = {
        uid: values.exchnageType,
        apiKey: values.apikey,
        secretKey:
          exchnageType == 'coinbase'
            ? String(values.secretkey).replace(/\\n/g, '\n')
            : values.secretkey,
        // passphrase: values.passphrase,
        customerId: '',
        tradePassword: '',
        passphrase: passphrase,
        apiMemo: apiMemo
      }
      setIsProcessing(true)
      // const response = await dataPostHandler("connectExchange", dataToSend);
      const response = await axios({
        method: 'POST',
        url: api_configs.connectExchange,
        headers: {
          token: token
        },
        data: dataToSend
      })
      if (response.status === 200) {
        setIsProcessing(false)
        resetForm({ values: '' })
        toast.success(response.data.responseMessage)
        auth.getConnectedExchangeList(token)
        setSbmtBtnTxt('Submit')
      } else {
        setIsProcessing(false)
        toast.error(response.data.responseMessage)
        setSbmtBtnTxt('Submit')
      }
    } catch (error) {
      console.log(error)
      setIsProcessing(false)
      if (error.response) {
        toast.error(error.response.data.responseMessage)
      } else {
        toast.error(error.message)
      }

      setSbmtBtnTxt('Submit')
    }
  }

  useEffect(() => {
    if (token) {
      getExchangeListHandler(token)
      getServerIPHandler(token)
    }
  }, [token]) // eslint-disable-line

  // function funConEx(value) {
  //   let newArray = [];
  //   for (let i = 0; i < value.length; i++) {
  //     newArray.push({ ...value[i], ...ExchangeArray[i] });
  //   }
  //   return newArray;
  // }

  return (
    <ConnectExchangeBox>
      <Box>
        <Paper elevation={2} style={{ marginTop: '20px' }}>
          <Typography variant='h6' fontWeight='500' mb={4.9}>
            Binding
          </Typography>
          <Formik
            initialValues={formInitialSchema}
            initialStatus={{
              success: false,
              successMsg: ''
            }}
            validationSchema={formValidationSchema}
            onSubmit={(values, { resetForm }) => {
              connectExchangeHandler(values, resetForm)
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue
            }) => (
              <Form>
                <Box mt={2} mb={1}>
                  <Typography variant='body1' color='primary' mb={1}>
                    Connected Exchange
                  </Typography>
                  <FormControl
                    variant='standard'
                    fullWidth
                    className='formControl'
                  >
                    <Select
                      name='exchnageType'
                      // name="apikey"
                      variant='standard'
                      value={exchnageType}
                      error={Boolean(
                        touched.exchnageType && errors.exchnageType
                      )}
                      onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={e => {
                        handleChange(e)
                        // console.log("e.target.value", e.target.value);
                        setExchangeType(e.target.value)
                      }}
                      style={{ pointer: 'cursor' }}
                      fullWidth
                    >
                      <MenuItem value='0'>
                        <Typography variant='body1' color='secondary'>
                          Choose your exchange
                        </Typography>
                      </MenuItem>
                      {/* <MenuItem value="1">
                        <Box>
                          <Typography>Exchange & Arbi</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="2">
                        <Box>
                          <Typography>Copy & management</Typography>
                        </Box>
                      </MenuItem> */}
                      {exchangeList &&
                        funConEx(exchangeList)?.map((map, i) => {
                          return (
                            <MenuItem value={map?.uid}>
                              <Box
                                className='avtClx'
                                value={map?.uid}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Image
                                  height={20}
                                  width={20}
                                  quality={100}
                                  src={map?.img}
                                  alt={map?.exchangeName}
                                  style={{
                                    borderRadius: '50%',
                                    height: '26px',
                                    width: '26px'
                                  }}
                                />

                                <span style={{ padding: '0 0 0 10px' }}>
                                  {map?.exchangeName}
                                </span>
                              </Box>
                            </MenuItem>
                          )
                        })}
                    </Select>
                  </FormControl>
                  <FormHelperText error className={'classes.helperText'}>
                    {touched.exchnageType && errors.exchnageType}
                  </FormHelperText>
                </Box>
                <Typography variant='body1' color='primary' mb={1} mt={2.5}>
                  Enter API Key
                </Typography>
                <TextField
                  fullWidth
                  variant='standard'
                  id='standard-basic'
                  placeholder='Please enter your API Key'
                  style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                  name='apikey'
                  value={values.apikey}
                  error={Boolean(touched.apikey && errors.apikey)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{ maxLength: maxAPILength + 1 }}
                />
                <FormHelperText error className={'classes.helperText'}>
                  {touched.apikey && errors.apikey}
                </FormHelperText>
                <Box mt={2.5}>
                  <Typography variant='body1' color='primary' mb={1}>
                    Enter Secret Key
                  </Typography>
                  <TextField
                    fullWidth
                    variant='standard'
                    id='standard-basic'
                    placeholder='Please enter your secret key'
                    name='secretkey'
                    value={values.secretkey}
                    error={Boolean(touched.secretkey && errors.secretkey)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{ maxLength: maxAPILength + 1 }}
                  />
                  <FormHelperText error className={'classes.helperText'}>
                    {touched.secretkey && errors.secretkey}
                  </FormHelperText>
                </Box>

                {values.exchnageType === 'coinbasepro' && (
                  <>
                    <Box my={2}>
                      <TextField
                        fullWidth
                        variant='outlined'
                        className='webkitcss'
                        id='standard-basic'
                        placeholder='Enter passphrase Key'
                        name='apiMemo'
                        value={values.apiMemo}
                        error={Boolean(touched.apiMemo && errors.apiMemo)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ maxLength: maxAPILength + 1 }}
                      />
                      <FormHelperText error className={'classes.helperText'}>
                        {touched.apiMemo && errors.apiMemo}
                      </FormHelperText>
                    </Box>
                  </>
                )}
                {values.exchnageType === 'bitmart' && (
                  <>
                    <Box my={2}>
                      <Typography variant='body2'>
                        Enter API Memo Key
                      </Typography>
                      <TextField
                        fullWidth
                        variant='standard'
                        id='standard-basic'
                        placeholder='Enter API Memo Key'
                        name='apiMemo'
                        value={values.apiMemo}
                        error={Boolean(touched.apiMemo && errors.apiMemo)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ maxLength: maxAPILength + 1 }}
                      />
                      <FormHelperText error className={'classes.helperText'}>
                        {touched.apiMemo && errors.apiMemo}
                      </FormHelperText>
                    </Box>
                  </>
                )}

                {/* <Box mt={2.5}> */}
                {/* <Checkbox defaultChecked /> */}
                {/* <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="500"
                    mb={1.5}
                  >
                    Move forward for OTP Verification
                  </Typography>
                  <Typography
                    variant="body1"
                    color="#FFFFFF99"
                    style={{ maxWidth: "550px" }}
                  >
                    You’ll receive a 6-digit verification code in your
                    registered email. Please check your mailbox.
                  </Typography>
                </Box> */}

                <Box
                  style={{
                    // marginLeft: '-8px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                  }}
                  className='checkAckBox'
                  onClick={() => !isProcessing && setIsRemember(!isRemember)}
                >
                  <Checkbox
                    checked={isRemember}
                    style={{
                      padding: '0px 2px 0px 0px',
                      color: '#98A2B3',
                      borderRadius: '6px'
                    }}
                  />
                  <Typography
                    variant='body1'
                    color='primary'
                    style={{ maxWidth: '550px' }}
                    ml={1.4}
                  >
                    I acknowledge that by providing my exchange API. I authorise
                    bitedge platform to access my account for trade execution. I
                    accept sole responsibility for keeping my API credentials
                    secure
                  </Typography>
                </Box>

                <Box mt={2.5}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={isProcessing || !isRemember}
                  >
                    {sbmtBtnTxt}
                    {/* {isProcessing && <ButtonCircularProgress />} */}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box className='serverBox'>
            <Typography
              variant='h5'
              fontWeight='600'
              mb={1}
              sx={{ display: 'flex' }}
            >
              Server IP Address is  
            </Typography>
            {['40.172.91.14', '51.112.24.233', '40.172.79.240'].map(ip => (
              <Typography
                variant='body1'
                fontWeight='400'
                mb={1}
                sx={{ display: 'flex' }}
              >
                {/* Server IP Address is   */}
                <SortAddress address={ip} showFull={true} />
              </Typography>
            ))}
            <Typography variant='body1' color='secondary' maxWidth={600}>
              Please whitelist the IP address above in your exchange settings
              before attempting to connect.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ConnectExchangeBox>
  )
}
