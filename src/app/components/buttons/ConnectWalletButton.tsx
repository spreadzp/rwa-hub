
import { useSDK } from "@metamask/sdk-react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { formatAddress, formatBalance } from "@/utils/chain.utils";
import WalletIcon from "./WalletIcon";
import { useRwaHubStore } from "@/libs/store";
import { useEffect } from "react";

import { getUserWalletBalanceEth } from "@/libs/web3/web3";
import WalletAddressDisplay from "../common/WalletAddressDisplay";

import { getIconByName } from "./../common/Icons";
export const ConnectWalletButton = () => {
    const { sdk, connected, connecting, account, balance, chainId } = useSDK();
    const { setUserAddressWallet, userAddressWallet, userWalletBalance, setUserWalletBalance } = useRwaHubStore()

    const connect = async () => {
        try {
            await sdk?.connect();
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    const disconnect = () => {
        if (sdk) {
            sdk.terminate();
        }
    };
    useEffect(() => {
        if (connected) {
            setUserAddressWallet(account as string)
            console.log('@@@@ balance', balance)
            console.log('chainId :>>', chainId)
            if (account) {
                getUserWalletBalanceEth(account as string)
                    .then(res => {
                        console.log("🚀 ~ useEffect ~ res:", res)
                        setUserWalletBalance(res as string);
                    })
            }

        } else {
            setUserAddressWallet("")
        }

    }, [connected, account, setUserAddressWallet])


    return (
        <div className="relative">
            {connected ? (
                <div className="flex items-center ">
                    <div>
                        <div className="text-white">{formatBalance(userWalletBalance)}  ETH</div>
                        <WalletAddressDisplay address={userAddressWallet} />
                    </div>
                    <Popover>
                        <PopoverTrigger className="flex items-center">
                            <div>  {getIconByName('SignOut')}</div>
                        </PopoverTrigger>
                        <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
                            <button
                                onClick={disconnect}
                                className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
                            >
                                Disconnect
                            </button>
                        </PopoverContent>
                    </Popover>
                </div>
            ) : (
                <button disabled={connecting} onClick={connect}>

                    <WalletIcon className="mr-2 h-4 w-4" /> Connect Wallet
                </button>
            )}
        </div>
    );
};
