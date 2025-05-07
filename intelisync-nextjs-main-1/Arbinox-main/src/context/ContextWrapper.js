import React, { useState, useEffect, createContext } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { apiRouterCall } from "../api-services/service";
import Cookies from "js-cookie";
import { api_configs } from "@/api-services";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAccount, useDisconnect, usePublicClient } from "wagmi";
import { formatEther, getContract } from "viem";
import ERC20ABI from "@/ABI/ERC20ABI.json";

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("user_token", accessToken);
    axios.defaults.headers.common.Authorization = `${accessToken}`;
    Cookies.set("user_token", accessToken, { expires: 1 }); // Expires in 1 day
  } else {
    localStorage.removeItem("user_token");
    delete axios.defaults.headers.common.Authorization;
    Cookies.remove("user_token");
  }
};
function checkLogin(token) {
  const user_token = Cookies.get("user_token");

  if (typeof window !== "undefined" && window.localStorage) {
    if (user_token) {
      const accessToken = window.localStorage.getItem("user_token") || token;
      return !!accessToken;
    } else {
      window.localStorage.removeItem("user_token");
      return false;
    }
  } else {
    return false;
  }
}

export default function ContextWrapper({ children, ...props }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const publicClient = usePublicClient();
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});
  const [connectedExchangeList, setConnectedExchangeList] = useState();
  const [openTrmConPol, setOpenTrmConPol] = useState(false);
  const [openWallletModal, setOpenWallletModal] = useState(false);
  const [subscriptionIdd, setSubscriptionIdd] = useState("");
  const [topHeading, setTopHeading] = useState("Dashboard");
  const [userTokenBalance, setUserTokenBalance] = useState({
    usdtBalance: 0,
    dscBalance: 0,
  });

  const cookieValue = Cookies.get("AcceptTerm&Condition");
  const router = useRouter();
  useEffect(() => {
    // Remove automatic wallet modal popup
    setOpenWallletModal(false);
  }, [isLogin, userData]);

  // console.log("- --------- walletAddress ", userData.walletAddress);
  // const connectWalletApi = async (address) => {
  //   try {
  //     const response = await apiRouterCall({
  //       method: "PUT",
  //       url: api_configs.updateWallet,
  //       bodyData: {
  //         walletAddress: address,
  //       },
  //     });
  //     if (response.data.responseCode === 200) {
  //       getProfileDataHandler(localStorage.getItem("user_token"));
  //     } else {
  //       toast.error(response?.data?.responseMessage);
  //       disconnect();
  //       console.log("Disconnect---");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleGetTokenBalance = async (address) => {
    try {
      const usdtContract = getContract({
        address: process.env.USDTTOKEN_ADDRESS,
        abi: ERC20ABI,
        client: publicClient,
      });

      const dscContract = getContract({
        address: process.env.DSCTOKEN_ADDRESS,
        abi: ERC20ABI,
        client: publicClient,
      });

      const getTokenBalance = await usdtContract.read.balanceOf([address]);
      const totalToken = formatEther(getTokenBalance);
      const getDscBalance = await dscContract.read.balanceOf([address]);
      const dscBalance = formatEther(getDscBalance);

      setUserTokenBalance((preData) => ({
        ...preData,
        usdtBalance: totalToken,
        dscBalance: dscBalance,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address && isLogin && isConnected) {
      //     connectWalletApi(address);
      handleGetTokenBalance(address);
    }
  }, [isConnected]);

  useEffect(() => {
    // console.log(" ----------- cookieValue ", cookieValue);
    if (!cookieValue) {
      setOpenTrmConPol(true);
    }
  }, [cookieValue]);

  const getProfileDataHandler = async (token) => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.getProfile,
        token: token,
      });
      if (response.data.responseCode === 200) {
        setUserData(response.data.result);
        let is_admin = response.data.result.userType;
        Cookies.set("is_admin", is_admin);
        if (response.data.result.subscriptionPlaneStatus) {
          getMyPlan(response.data.result.subscriptionPlaneId, token);
        }
        if (response.data.result.termsAndConditions == "ACCEPT") {
          setOpenTrmConPol(false); // must be false
        } else if (cookieValue) {
          setOpenTrmConPol(false);
        } else {
          setOpenTrmConPol(true);
        }
      } else {
        handleLogout("Your session has expired. Please log in again.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getMyPlan = async (iddd, token) => {
    // console.log(" ---------- getMyPlan", iddd);
    try {
      const res = await axios({
        method: "GET",
        url: api_configs.myPlan,
        headers: { token: token },
        params: {
          planStatus: "ACTIVE",
          limit: 10,
        },
      });
      if (res.data.responseCode === 200) {
        setSubscriptionIdd(res.data.result.docs[0].subScriptionPlanId);
        console.log(
          iddd,
          " ---------- getMyPlan",
          res.data.result.docs[0].subScriptionPlanId
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getConnectedExchangeList = async () => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.connectedExchangeList,
        token: window.localStorage.getItem("user_token"),
      });
      if (response.data.responseCode === 200) {
        setConnectedExchangeList(response.data.result);
        Cookies.set("is_exchange", response.data.result.length);
      }
    } catch (error) {
      console.log(error);
      Cookies.set("is_exchange", 0);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("user_token")) {
        getProfileDataHandler(window.localStorage.getItem("user_token"));
        getConnectedExchangeList(window.localStorage.getItem("user_token"));
      }
    }
  }, [isLogin]);

  const handleLogout = (mess) => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_token");
    data.userLogIn(false, null);
    router.replace("/");
    Cookies.remove("user_token");
    Cookies.remove("is_admin");
    Cookies.remove("is_exchange");
    // Cookies.remove("AcceptTerm&Condition");
    mess && toast.success(mess);
    disconnect();
    // toast.success("Your session has expired. Please log in again.");
  };

  //sign in using google
  const signInWithGoogle = () => {
    // signInWithPopup(auth, new GoogleAuthProvider());
  };
  //sign in using facebook
  const signInWithFacebook = () => {
    // signInWithPopup(auth, new FacebookAuthProvider());
  };
  let data = {
    topHeading,
    setTopHeading,
    userLoggedIn: isLogin,
    isAdmin: userData?.userType,
    userData,
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
    userTokenBalance,
    openWallletModal,
    setOpenWallletModal,
    isDashboardLoading: props.isDashboardLoading,
    connectedExchangeList,
    handleLogout: (e) => handleLogout(e),
    getProfileDataHandler: () =>
      getProfileDataHandler(localStorage.getItem("user_token")),
    handleGetTokenBalance: () => handleGetTokenBalance(address),
    getConnectedExchangeList: (t) => getConnectedExchangeList(t),
    signInWithFacebook,
    signInWithGoogle,
    openTrmConPol,
    setOpenTrmConPol,
    subscriptionIdd,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
