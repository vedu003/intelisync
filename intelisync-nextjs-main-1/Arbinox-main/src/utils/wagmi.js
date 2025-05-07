"use client";
import { baseurl } from "@/api-services";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
const projectId = "5beb671f451a69c326ae5ba5fdbb8ad4";
const isProdEnv = process.env.NEXT_PUBLIC_NODE_ENV === "production";

if (!projectId) {
  throw new Error("WalletConnect Project ID is not defined");
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Other",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  {
    appName: "MeCap",
    projectId: projectId,
    appUrl: process.env.REDIRECT_URI,
  }
);

// const checkChain = baseurl.includes("mecap") ? bsc : bscTestnet;
const checkChain = bsc;

const transports = isProdEnv
  ? {
      [checkChain.id]: http(),
    }
  : {
      [checkChain.id]: http(),
    };

export const wagmiConfig = createConfig({
  chains: isProdEnv ? [checkChain] : [checkChain],
  connectors,
  transports,
  ssr: false,
});

export const explorerURL = checkChain?.blockExplorers?.default?.url;
