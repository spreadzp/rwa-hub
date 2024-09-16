'use client'
import LoginPage from "@/app/components/ui/LoginPage";
import Landing from "@/app/globals/Landing/Landing";
import { useRwaHubStore } from "@/libs/store";
export default function Home() {
  const { userAddressWallet } = useRwaHubStore()
  return (
    <div className="">
      {userAddressWallet !== "" ? <Landing /> : <LoginPage />}
    </div>
  );
}