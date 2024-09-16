import React, { useState, useCallback } from 'react';
import RwaPreparation from './RwaPreparation';
import { mintToken } from '@/libs/web3/web3';
import { useRwaHubStore } from '@/libs/store';

const RwaMinting: React.FC = () => {
    const [urlPreparationData, setUrlPreparationData] = useState<string | null>(null);
    const { userAddressWallet } = useRwaHubStore();

    const mintRwa = useCallback(async (url: string) => {

        const hash = await mintToken(userAddressWallet, url);
        console.log("🚀 ~ mintRwa ~ hash:", hash);
    }, [userAddressWallet]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-3xl font-bold mb-6  text-yellow-200">RWA Minting Page</h1>
            <RwaPreparation onPreparationComplete={(url) => setUrlPreparationData(url)} />
            {urlPreparationData && (
                <button
                    onClick={() => mintRwa(urlPreparationData)}
                    className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    MintRwa
                </button>
            )}
        </div>
    );
};

export default RwaMinting;