import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2176';

export const baseurl = axios.defaults.baseURL;
export const baseurlSocket = baseurl.replace(/^http/, 'ws');

let user = `${baseurl}/api/v1/user`;
let admin = `${baseurl}/api/v1/admin`;
let staticContent = `${baseurl}/api/v1/static`;
let notification = `${baseurl}/api/v1/notification`;
let triangularArbitrage = `${baseurl}/api/v1/triangularArbitrage`;
let DirectArb = `${baseurl}/api/v1/directArbitrage`;
let IntraArb = `${baseurl}/api/v1/intraArbitrageSingleExchange`;
let analytics = `${baseurl}/api/v1/analytics`;
let wallet = `${baseurl}/api/v1/wallet`;
let loopArbitrage = `${baseurl}/api/v1/loopArbitrage`;
let newsLetter = `${baseurl}/api/v1/newsLetter`;
// /newsLetter/subscribe
export const api_configs = {
  // -----------Auth--------------

  updatePlacedTradeTri: `${triangularArbitrage}/updatePlacedTrade`,
  updatePlacedTradeIntra: `${IntraArb}/updatePlacedTrade`,
  // subscribe: `${newsLetter}/subscribe`,
  // user Login
  login: `${user}/userLogin`,
  socialLogin: `${user}/socialLogin`,
  userSignup: `${user}/userSignup`,
  verifyOTP: `${user}/verifyOTP`,
  forgotPasswordU: `${user}/forgotPassword`,
  resendOTPU: `${user}/resendOTP`,
  resetPasswordU: `${user}/resetPassword`,
  getProfile: `${user}/getProfile`,
  buySubscription: `${user}/buySubscription`,
  myPlan: `${user}/myPlan`,
  updateTermsAndConditions: `${user}/updateTermsAndConditions`,
  editUserProfile: `${user}/editUserProfile`,
  getPlan: `${user}/getPlan`,
  updateWallet: `${user}/updateWallet`,
  getPlanList: `${user}/getPlanList`,
  isValid: `${user}/isValid`,
  getPrice: `${user}/getPrice`,

  //AUTHENCATION
  verifyGoogleAuthenctionCodeForEnableDisable: `${admin}/verifyGoogleAuthenctionCodeForEnableDisable`,
  enableDisableGoogleAuthenction: `${admin}/enableDisableGoogleAuthenction`,
  verifyGoogleAuthenctionCode: `${admin}/verifyGoogleAuthenctionCode`,
  subscriptionPlanList: `${admin}/subscriptionPlanList`,
  userList: `${admin}/userList`,
  listUser: `${admin}/listUser`,
  getDiscountPricing: `${admin}/getDiscountPricing`,

  // admin
  forgotPassword: `${admin}/forgotPassword`,
  deleteUser: `${admin}/deleteUser`,
  changePassword: `${admin}/changePassword`,
  changePasswordUser: `${user}/changePassword`,
  editProfile: `${admin}/editProfile`,
  inviteUser: `${admin}/inviteUser`,
  inviteUserList: `${admin}/inviteUserList`,
  getUserList: `${admin}/getUserList`,
  inviteUserView: `${admin}/inviteUserView`,
  updatePermissions: `${admin}/updatePermissions`,
  subscriptionPlanListWithFilter: `${admin}/subscriptionPlanListWithFilter`,
  addSubscription: `${admin}/addSubscription`,
  editSubscription: `${admin}/editSubscription`,
  viewSubscription: `${admin}/viewSubscription`,
  listForUserBuySubcription: `${admin}/listForUserBuySubcription`,
  allListForUserBuySubcription: `${admin}/allListForUserBuySubcription`,
  blockUnblockSubscriptionPlan: `${admin}/blockUnblockSubscriptionPlan`,
  deleteInviteUser: `${admin}/deleteInviteUser`,
  blockUnblockInvitedUser: `${admin}/blockUnblockInvitedUser`,
  updateCapitalAmount: `${admin}/updateCapitalAmount`,
  getCapitalAmount: `${admin}/getCapitalAmount`,
  onOffHybrid: `${admin}/onOffHybrid`,

  //staticContent
  viewVideo: `${staticContent}/viewVideo`,
  videoList: `${staticContent}/videoList`,
  viewNews: `${staticContent}/viewNews`,
  newsList: `${staticContent}/newsList`,
  listStaticContent: `${staticContent}/listStaticContent`,
  editStaticContent: `${staticContent}/editStaticContent`,
  viewStaticContent: `${staticContent}/viewStaticContent`,
  addContactUs: `${user}/contact-us`,
  faqList: `${staticContent}/faqList`,
  deleteFAQ: `${staticContent}/deleteFAQ`,
  addFAQ: `${staticContent}/addFAQ`,
  editFAQ: `${staticContent}/editFAQ`,
  viewFAQ: `${staticContent}/viewFAQ`,
  signUpEmail: `${user}/signUpEmail`,
  verifyOTPEmail: `${user}/verifyOTPEmail`,
  resendOTPEmail: `${user}/resendOTPEmail`,
  signUpMobileNo: `${user}/signUpMobileNo`,
  verifyOTPMobileNo: `${user}/verifyOTPMobileNo`,
  resendOTPMobileNo: `${user}/resendOTPMobileNo`,
  loginEmail: `${user}/loginEmail`,
  loginMobileNo: `${user}/loginMobileNo`,
  viewMyProfile: `${user}/viewMyProfile`,
  forgotPasswordEmail: `${user}/forgotPasswordEmail`,
  forgotPasswordMobileNo: `${user}/forgotPasswordMobileNo`,
  subscribe: `${user}/subscribe`,

  //notification
  listNotification: `${notification}/listNotification`,
  readNotification: `${notification}/readNotification`,
  clearNotification: `${notification}/clearNotification`,
  enableDisableNotification: `${notification}/enableDisableNotification`,

  //triangularArbitrage
  filterProfitPathsTriangular: `${triangularArbitrage}/filterProfitPaths`,
  getDataAutoTradeOnOffTran: `${triangularArbitrage}/getDataAutoTradeOnOff`,
  tradeProfitPathsTriangular: `${triangularArbitrage}/tradeProfitPaths`,
  listPlacedTradeTriangular: `${triangularArbitrage}/listPlacedTrade`,
  viewPlacedTradeTriangular: `${triangularArbitrage}/viewPlacedTrade`,
  activeBlockvPlacedTradeTriangular: `${triangularArbitrage}/activeBlockPlacedTrade`,
  deletePlacedTradeTriangular: `${triangularArbitrage}/deletePlacedTrade`,
  cancelledOrderTriangular: `${triangularArbitrage}/cancelledOrder/`,
  autoTradeOnOffTriangular: `${triangularArbitrage}/autoTradeOnOff`,
  listPlacedTriangularTradeWithFilter: `${triangularArbitrage}/listPlacedTradeWithFilter`,
  listPlacedTradeWithFilterForParticularUserTriangular: `${triangularArbitrage}/listPlacedTradeWithFilterForParticularUser`,
  getDataSniperBotOnOffTran: `${triangularArbitrage}/getDataSniperBotOnOff`,
  sniperBotOnOffTriangular: `${triangularArbitrage}/sniperBotOnOff`,
  rebalancingTriangularTrade: `${triangularArbitrage}/rebalancingTrade`,
  getDataRebalancingBotOnOffTran: `${triangularArbitrage}/getDataRebalancingBotOnOff`,
  updatePlacedTradeTri: `${triangularArbitrage}/updatePlacedTrade`,

  // /intraArbitrageSingleExchange/getDataRebalancingBotOnOff
  //DirectArb
  profitPathsDirectArb: `${DirectArb}/profitPaths`,
  getDataAutoTradeOnOff: `${DirectArb}/getDataAutoTradeOnOff`,
  filterProfitPathsDirectArb: `${DirectArb}/filterProfitPaths`,
  autoTradeOnOffDirectArb: `${DirectArb}/autoTradeOnOff`,
  tradeProfitPathsDirectArb: `${DirectArb}/tradeProfitPaths`,
  listPlacedTradeDirectArb: `${DirectArb}/listPlacedTrade`,
  viewPlacedTradeDirectArb: `${DirectArb}/viewPlacedTrade/`,
  activeBlockvPlacedTradeDirectArb: `${DirectArb}/activeBlockvPlacedTrade`,
  deletePlacedTradeDirectArb: `${DirectArb}/deletePlacedTrade`,
  cancelledOrderDirectArb: `${DirectArb}/cancelledOrder/`,
  listPlacedDirectTradeWithFilter: `${DirectArb}/listPlacedTradeWithFilter`,
  listPlacedTradeWithFilterForParticularUser: `${DirectArb}/listPlacedTradeWithFilterForParticularUser`,
  rebalancingTradeIntra: `${IntraArb}/rebalancingTrade`,
  getDataSniperBotOnOff: `${DirectArb}/getDataSniperBotOnOff`,
  sniperBotOnOffDirectArb: `${DirectArb}/sniperBotOnOff`,

  //IntraArb
  profitPathsIntraArb: `${IntraArb}/profitPaths`,
  filterProfitPathsIntraArb: `${IntraArb}/filterProfitPaths`,
  autoTradeOnOffIntraArb: `${IntraArb}/autoTradeOnOff`,
  tradeProfitPathsIntraArb: `${IntraArb}/tradeProfitPaths`,
  listPlacedTradeIntraArb: `${IntraArb}/listPlacedTrade`,
  viewPlacedTradeIntraArb: `${IntraArb}/viewPlacedTrade/`,
  activeBlockvPlacedTradeIntraArb: `${IntraArb}/activeBlockvPlacedTrade`,
  deletePlacedTradeIntraArb: `${IntraArb}/deletePlacedTrade`,
  cancelledOrderIntraArb: `${IntraArb}/cancelledOrder/`,
  sniperBotOnOffIntraArb: `${IntraArb}/getDataSniperBotOnOff`,
  getDataAutoTradeOnOffArb: `${IntraArb}/getDataAutoTradeOnOff`,
  // sniperBotOnOff: `${IntraArb}//directArbitrage/getDataSniperBotOnOff`,  /intraArbitrageSingleExchange/sniperBotOnOff
  sniperBotOnOffIntraArbOnOf: `${IntraArb}/sniperBotOnOff`,
  rebalancingTradeIntra: `${IntraArb}/rebalancingTrade`,
  getDataRebalancingBotOnOffIntraArb: `${IntraArb}/getDataRebalancingBotOnOff`,
  updatePlacedTradeIntra: `${IntraArb}/updatePlacedTrade`,

  //analytics
  arbitrageData: `${analytics}/arbitrageData`,
  tradingDetails: `${analytics}/tradingDetails`,
  tradingView: `${analytics}/tradingView`,

  //wallet
  connectedExchangeList: `${wallet}/connectedExchangeList`,
  connectedExchangePreviousList: `${wallet}/connectedExchangePreviousList`,
  exchangeBalance: `${wallet}/exchangeBalance`,
  listExchange: `${wallet}/listExchange`,
  serverIPAddress: `${wallet}/serverIPAddress`,
  connectExchange: `${wallet}/connectExchange`,
  exchangeCoins: `${wallet}/exchangeCoins`,
  removeConnectedExchange: `${wallet}/removeConnectedExchange`,
  asks_bids_prices: `${wallet}/asks_bids_prices`,
  mexcPairList: `${wallet}/mexcPairList`,
  generateAddress: `${wallet}/generateAddress`,
  getWithdrawAddress: `${wallet}/getWithdrawAddress`,
  deposit: `${wallet}/deposit`,
  withdraw: `${wallet}/withdraw`,
  withdrawDetails: `${wallet}/withdrawDetails`,
  // withdrawHistory: `${wallet}/withdrawHistoryy`,
  Dashboard: `${wallet}/Dashboard`,
  DashboardRecentData: `${wallet}/DashboardRecentData`,
  cryptoAssetprofit: `${wallet}/cryptoAssetprofit`,
  mexcPairList: `${wallet}/mexcPairList`,
  // cryptoAssetprofit: `${wallet}/cryptoAssetprofit`,
  shortTimeProfit: `${wallet}/shortTimeProfit`,
  withdrawDepositeHistory: `${wallet}/withdrawDepositeHistory`,
  transationHistory: `${wallet}/transationHistory`,
  statistic: `${wallet}/statistic`,
  profitStats: `${wallet}/profitStats`,
  get_wallet_coinImageData: `${wallet}/coinImageData`,
  exchangeBalanceParticularUser: `${wallet}/exchangeBalanceParticularUser`,

  //notification
  listNotification: `${notification}/listNotification`,
  readNotification: `${notification}/readNotification`,
  clearNotification: `${notification}/clearNotification`,

  //DirectArb
  profitPathsDirectArb: `${DirectArb}/profitPaths`,
  filterProfitPathsDirectArb: `${DirectArb}/filterProfitPaths`,
  autoTradeOnOffDirectArb: `${DirectArb}/autoTradeOnOff`,
  tradeProfitPathsDirectArb: `${DirectArb}/tradeProfitPaths`,
  listPlacedTradeDirectArb: `${DirectArb}/listPlacedTrade`,
  viewPlacedTradeDirectArb: `${DirectArb}/viewPlacedTrade/`,
  activeBlockvPlacedTradeDirectArb: `${DirectArb}/activeBlockvPlacedTrade`,
  deletePlacedTradeDirectArb: `${DirectArb}/deletePlacedTrade`,
  cancelledOrderDirectArb: `${DirectArb}/cancelledOrder/`,

  //IntraArb
  profitPathsIntraArb: `${IntraArb}/profitPaths`,
  filterProfitPathsIntraArb: `${IntraArb}/filterProfitPaths`,
  autoTradeOnOffIntraArb: `${IntraArb}/autoTradeOnOff`,
  tradeProfitPathsIntraArb: `${IntraArb}/tradeProfitPaths`,
  listPlacedTradeIntraArb: `${IntraArb}/listPlacedTrade`,
  viewPlacedTradeIntraArb: `${IntraArb}/viewPlacedTrade/`,
  activeBlockvPlacedTradeIntraArb: `${IntraArb}/activeBlockvPlacedTrade`,
  deletePlacedTradeIntraArb: `${IntraArb}/deletePlacedTrade`,
  cancelledOrderIntraArb: `${IntraArb}/cancelledOrder/`,
  listPlacedTradeWithFilterIntraArb: `${IntraArb}/listPlacedTradeWithFilter`,

  //analytics
  arbitrageData: `${analytics}/arbitrageData`,
  tradingDetails: `${analytics}/tradingDetails`,
  tradingView: `${analytics}/tradingView`,

  //wallet
  listExchange: `${wallet}/listExchange`,
  serverIPAddress: `${wallet}/serverIPAddress`,
  connectExchange: `${wallet}/connectExchange`,
  exchangeCoins: `${wallet}/exchangeCoins`,
  removeConnectedExchange: `${wallet}/removeConnectedExchange`,
  asks_bids_prices: `${wallet}/asks_bids_prices`,
  pairList: `${wallet}/pairList`,

  //Loop Arbitrage
  filterProfitPathsLoop: `${loopArbitrage}/filterProfitPaths`,
  listPlacedTradeLoop: `${loopArbitrage}/listPlacedTrade`,
  tradeProfitPathsLoop: `${loopArbitrage}/tradeProfitPaths`,
  viewPlacedTradeLoop: `${loopArbitrage}/viewPlacedTrade`,
  activeBlockPlacedTradeLoop: `${loopArbitrage}/activeBlockvPlacedTrade`,
  cancelledOrderLoop: `${loopArbitrage}/cancelledOrder`,
  deletePlacedTradeLoop: `${loopArbitrage}/deletePlacedTrade`,
  autoTradeOnOffLoop: `${loopArbitrage}/autoTradeOnOff`,
  listPlacedLoopTradeWithFilter: `${loopArbitrage}/listPlacedTradeWithFilter`,
};
