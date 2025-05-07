// MyComponent.js
import { getContract, parseUnits } from "viem";
import ERC20ABI from "@/ABI/ERC20ABI.json";
import MultiSigWalletABI from "@/ABI/MultiSigWalletABI.json";
import { useWalletClient, useAccount, usePublicClient } from "wagmi";
import toast from "react-hot-toast";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";

const Blockchainfunction = ({ auth }) => {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();

  const handleBuyPlan = async (values, depositFun) => {
    try {
      const tokenAmount = parseUnits(values.amount.toString(), 18);

      const multiSigContract = getContract({
        address: process.env.MULTISIG_WALLET,
        abi: MultiSigWalletABI,
        client: walletClient,
      });

      const usdtContract = getContract({
        address: values.tokenAddress,
        abi: ERC20ABI,
        client: walletClient,
      });

      const allowance = await usdtContract.read.allowance([
        address,
        process.env.MULTISIG_WALLET,
      ]);

      if (Number(allowance) < Number(tokenAmount)) {
        const approvalReceipt = await usdtContract.write.approve(
          [process.env.MULTISIG_WALLET, tokenAmount],
          { from: address }
        );

        await publicClient.waitForTransactionReceipt({
          confirmations: 4,
          hash: approvalReceipt,
        });
      }

      const receipt = await multiSigContract.write[depositFun]([tokenAmount], {
        from: address,
      });

      await publicClient.waitForTransactionReceipt({
        confirmations: 4,
        hash: receipt,
      });

      await handleBuyPlanApi(values, receipt);
      return true;
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("User rejected the request.");
      return false;
    }
  };

  const handleBuyPlanApi = async (values, receipt) => {
    try {
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.buySubscription,
        bodyData: {
          subscriptionId: values?.subscriptionId,
          amount: Number(values.amount),
          transactionHash: receipt || `r_${Math.floor(Math.random() * 10000)}`,
          isValid: values?.isValid,
          coin: values?.coin,
        },
      });

      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        auth.getProfileDataHandler(); // Refresh profile data
        auth.handleGetTokenBalance(); // Refresh token balance
        return true; // Return true on successful API call
      } else {
        toast.error(response.data.responseMessage);
        return false; // Return false on API error
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("Error occurred while processing the transaction.");
      return false; // Return false on error
    }
  };

  return {
    handleBuyPlan,
  };
};

export default Blockchainfunction;
