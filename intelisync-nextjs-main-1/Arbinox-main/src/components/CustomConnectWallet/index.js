import { ACTIVE_NETWORK, NetworkContextName } from "@/utils";
import styled from "@emotion/styled";
import { Box, Button, Hidden } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const SettingMainBox = styled(Box)(({ theme }) => ({
  "& .tabButton": {
    padding: "14px 25px",
    // fontSize: theme.breakpoints.down("sm") ? "10px" : "14px",
    color: theme.palette.text.primary,
    fontWeight: "500",
    borderRadius: "50px",
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.02857em",
    borderRadius: "50px",
    borderBottom: "0px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "7px 18px",
      fontSize: "10px !important",
      whiteSpace: "pre",
    },
    "&.connected": {
      "&:hover": {
        color: "#000 !important",
        background:
          "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%) !important",
        borderBottom: "0px solid #a5ef70 !important",
      },
      color: "#000",
      background:
        "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%) !important",
    },
    "&.wrong-network": {
      "&:hover": {
        color: "#fff !important",
        background: "#ff0000ad !important",
        borderBottom: "0px solid #ff0000ad !important",
      },
      color: "#fff",
      background: "#ff0000ad !important",
    },
    "&.cursor": {
      cursor: "pointer",
    },
    "&.balance": {
      "&:hover": {
        // color: "#fff !important",
        color: theme.palette.text.primary,
        background: "transparent !important",
      },
      // color: "#fff",
      color: theme.palette.text.primary,
      background: "transparent !important",
      border: "1px solid #a5ef70 !important",
    },
  },
}));

const TabButton = ({ className, onClick, children }) => (
  <Button
    // key={index}
    size="md"
    fullWidth
    variant="contained"
    color="primary"
    // className={className}
    onClick={onClick}
    type="button"
    style={{
      display: "flex",
      alignItems: "center",
      width: "calc(100% - 65px)",
    }}
  >
    {children}
  </Button>
);

const ChainInfo = ({ chain, openAccountModal }) => (
  <TabButton
    className="tabButton balance cursor"
    onClick={openAccountModal}
    style={{ display: "flex", alignItems: "center" }}
  >
    {chain.hasIcon && (
      <div
        style={{
          background: chain.iconBackground,
          width: 20,
          height: 20,
          borderRadius: 999,
          overflow: "hidden",
          marginRight: 4,
        }}
      >
        {chain.iconUrl && (
          <img
            alt={chain.name ?? "Chain icon"}
            src={chain.iconUrl}
            style={{ width: 20, height: 20 }}
          />
        )}
      </div>
    )}
    {chain?.id === ACTIVE_NETWORK ? NetworkContextName : "Binance Chain"}
  </TabButton>
);

const AccountInfo = ({ account, openAccountModal }) => (
  <TabButton className="tabButton balance cursor" onClick={openAccountModal}>
    {account.displayName}
    {account.displayBalance ? ` (${account.displayBalance})` : ""}
  </TabButton>
);

export const CustomConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <SettingMainBox
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {!connected ? (
              <TabButton
                className="tabButton connected cursor"
                onClick={openConnectModal}
              >
                Connect Wallet
              </TabButton>
            ) : chain.unsupported ? (
              <TabButton
                className="tabButton wrong-network cursor"
                onClick={openChainModal}
                sx={{
                  background: "red !important",
                  backgroundColor: "red !important",
                }}
              >
                Wrong network
              </TabButton>
            ) : (
              <div style={{ display: "flex", gap: 12 }}>
                {" "}
                <AccountInfo
                  account={account}
                  openAccountModal={openAccountModal}
                />
                <Hidden smDown>
                  <ChainInfo chain={chain} openAccountModal={openChainModal} />
                </Hidden>
              </div>
            )}
          </SettingMainBox>
        );
      }}
    </ConnectButton.Custom>
  );
};
