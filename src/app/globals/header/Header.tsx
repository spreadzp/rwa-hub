'use client';
import { useState } from "react";
import { getIconByName } from "../../components/common/Icons";
import ExternalMenu from "../../components/common/ExternalMenu";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { ConnectWalletButton } from "../../components/buttons/ConnectWalletButton";
import Title, { TitleEffect, TitleSize } from "@/app/components/common/Title";

export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const host =
        typeof window !== "undefined" ? window.location.host : "defaultHost";

    const sdkOptions = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "Next-Metamask-Boilerplate",
            url: host, // using the host constant defined above
        },
    };

    return (
        <header className="text-white p-4 w-full flex justify-center">
            <div className="container mx-auto flex  md:flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between w-full md:w-auto mb-4 md:mb-0">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {getIconByName('Burger')}
                    </button>
                    <div className="logo-rwa-hub"></div>
                    <Title
                        titleName="RWA - HUB"
                        titleSize={TitleSize.H1}
                        titleEffect={TitleEffect.Gradient}
                    />
                </div>
                <div className="w-full md:w-auto">
                    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
                        <ConnectWalletButton />
                    </MetaMaskProvider>
                </div>
            </div>
            <ExternalMenu
                isOpen={isMenuOpen}
                onClose={toggleMenu}
            />
        </header>
    );
}