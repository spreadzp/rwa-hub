import { create } from "zustand"

interface RwaHubStore {
    userAddressWallet: string;
    setUserAddressWallet: (userAddressWallet: string) => void;
    userWalletBalance: string;
    setUserWalletBalance: (userWalletBalance: string) => void;
}

export const useRwaHubStore = create<RwaHubStore>((set) => ({
    userAddressWallet: "",
    setUserAddressWallet: (userAddressWallet: string) => set({ userAddressWallet }),
    userWalletBalance: "",
    setUserWalletBalance: (userWalletBalance: string) => set({ userWalletBalance }),
}))