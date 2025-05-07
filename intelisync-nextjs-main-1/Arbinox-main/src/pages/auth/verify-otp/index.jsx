import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import OTPInput from "react-otp-input";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import Timer from "@/components/Timer/Timer";
import CustomHead from "@/components/CustomHead";
import AppContext from "@/context/AppContext";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import GoogleAuthModal from "@/components/GoogleAuthModal";

const OtpComponent = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  zIndex: "999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .upperBox": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "16px",
  },
  "& .otpBox": {
    marginTop: "44px",
    "@media(max-width: 350px)": {
      marginTop: "30px",
    },
  },
  "& .mainBox": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    boxShadow: "none",
    padding: "40px",
    [theme.breakpoints.down("xs")]: {
      padding: "20px",
    },
  },

  "& .displayotp": {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  "& input": {
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    fontSize: "16px",
    height: "55px !important",
    width: "64px !important",
    marginRight: "14px",
    color: "#fff !important",
    background: "#FFFFFF0D",
    maxWidth: "400px",

    [theme.breakpoints.down("sm")]: {
      height: "50px !important",
      width: "50px !important",
    },
  },
  "& .otpInput:last-child": {
    marginRight: "0px !important", // remove marginRight for last input
  },
  "& .timeBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "24px",
  },
}));

export default function VerifyOtp() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const [OTP, setOTP] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [twoFaOpen, SetTwoFaOpen] = useState(false);
  let email = window.location.search.split("?")[1];

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("lastRoute", router.asPath);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location]);

  useEffect(() => {
    const lastRoute = sessionStorage.getItem("lastRoute");
    const previousRoute = sessionStorage.getItem("previousRoute");
    if (lastRoute && previousRoute) {
      sessionStorage.removeItem("lastRoute");
      sessionStorage.removeItem("previousRoute");
      router.replace(previousRoute);
    }
  }, [router]);

  const verifyOTPHandler = async () => {
    setIsVerify(true);
    try {
      const res = await apiRouterCall({
        method: "PATCH",
        url: api_configs.verifyOTP,
        bodyData: {
          email: email,
          otp: OTP,
        },
      });
      if (res.data.responseCode === 200) {
        if (res.data.result.googleAuthenction) {
          SetTwoFaOpen(true);
        } else {
          toast.success(res.data.responseMessage);
          auth.userLogIn(true, res.data.result?.token);
          window.sessionStorage.setItem("token", res.data.result?.token);
          router.replace("/dashboard");
        }
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsVerify(false);
    } catch (error) {
      console.log(error);
      setIsVerify(false);
    }
  };

  return (
    <OtpComponent>
      <Box className="otp-mainBox">
        <Box className="upperBox">
          <Typography variant="h2" color="#fff" className="loginText">
            OTP Verification
          </Typography>
          <Typography
            variant="body1"
            color="secondary"
            style={{
              maxWidth: window.innerWidth < 425 ? "300px" : "400px",
              // whiteSpace: "pre",
            }}
          >
            A 4- digit OTP has been sent to your registered email address{" "}
            {email}.
          </Typography>
        </Box>

        <Box className="otpBox">
          <OTPInput
            value={OTP}
            onChange={setOTP}
            inputType="number"
            numInputs={4}
            autoFocus={true}
            disabled={isVerify}
            renderInput={(props, index) => (
              <input
                {...props}
                className={`otpInput ${index === 5 ? "lastInput" : ""}`} // Apply 'lastInput' class for the last box
              />
            )}
            secure
          />
        </Box>

        <Box className="timeBox">
          <Timer email={email} setOTP={setOTP} />
        </Box>

        <Box mt={5.5} align="center">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            disabled={!OTP || OTP.length !== 4 || isVerify}
            onClick={verifyOTPHandler}
          >
            Submit {isVerify && <ButtonCircularProgress />}
          </Button>
        </Box>
      </Box>
      {twoFaOpen && (
        <GoogleAuthModal
          open={twoFaOpen}
          handleClose={() => SetTwoFaOpen(false)}
          type={email}
        />
      )}
    </OtpComponent>
  );
}

VerifyOtp.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
